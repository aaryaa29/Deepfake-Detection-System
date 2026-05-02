import os
import cv2
import numpy as np
import traceback
import io
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from PIL import Image
from PIL.ExifTags import TAGS

app = FastAPI(title="Deepfake Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "deepfake_detector_final.h5")
model = None

try:
    os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"
    print(f"Loading model from {MODEL_PATH}...")
    model = load_model(MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    traceback.print_exc()


# ===================== LAYER 1: METADATA SCANNER =====================
def check_ai_metadata(image_bytes: bytes) -> dict:
    """Scan EXIF/XMP/IPTC for AI-generation markers."""
    reasons = []
    score = 0.0

    try:
        img = Image.open(io.BytesIO(image_bytes))

        # --- Check EXIF for camera info ---
        exif = {}
        if hasattr(img, '_getexif') and img._getexif():
            for tag_id, val in img._getexif().items():
                exif[TAGS.get(tag_id, tag_id)] = val

        software = str(exif.get('Software', '')).lower()
        ai_keywords = ['gemini', 'dall-e', 'midjourney', 'stable diffusion',
                       'firefly', 'imagen', 'openai', 'generated', 'synthetic']
        for kw in ai_keywords:
            if kw in software:
                reasons.append(f"AI software in EXIF: {software}")
                score += 0.85
                break

        camera_fields = sum(1 for f in ['Make','Model','FocalLength','ExposureTime','ISOSpeedRatings'] if f in exif)
        if camera_fields == 0 and len(exif) < 5:
            reasons.append("No camera metadata found")
            score += 0.3

        # --- Scan raw bytes for XMP/IPTC AI markers ---
        ai_markers = [
            b'trainedAlgorithmicMedia', b'DigitalSourceType',
            b'compositeWithTrainedAlgorithmicMedia',
            b'synthid', b'SynthID', b'C2PA', b'c2pa',
            b'google:genai', b'GoogleAI', b'contentCredentials',
        ]
        for marker in ai_markers:
            if marker in image_bytes:
                reasons.append(f"AI marker found: {marker.decode('utf-8', errors='ignore')}")
                score += 0.9
                break
    except Exception as e:
        print(f"Metadata check error: {e}")

    return {'is_ai': score >= 0.5, 'confidence': min(score, 1.0), 'reasons': reasons}


# ===================== LAYER 2: FREQUENCY ANALYSIS =====================
def analyze_frequency(img_rgb: np.ndarray) -> dict:
    """FFT + DCT frequency analysis to detect AI smoothness."""
    reasons = []
    score = 0.0

    try:
        gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY).astype(np.float32)
        f_shift = np.fft.fftshift(np.fft.fft2(gray))
        magnitude = np.log1p(np.abs(f_shift))

        h, w = magnitude.shape
        cy, cx = h // 2, w // 2
        y, x = np.ogrid[:h, :w]
        dist = np.sqrt((y - cy)**2 + (x - cx)**2)

        r_low = min(h, w) // 8
        r_mid = min(h, w) // 4

        total = magnitude.sum() + 1e-10
        low_e = magnitude[dist <= r_low].sum() / total
        high_e = magnitude[dist > r_mid].sum() / total
        ratio = high_e / (low_e + 1e-10)

        if ratio < 0.4:
            reasons.append(f"Low high-freq energy ratio ({ratio:.3f})")
            score += 0.4

        # Radial spectrum smoothness
        max_r = min(cy, cx)
        profile = []
        for r in range(1, max_r, 2):
            ring = (dist >= r-1) & (dist < r+1)
            if ring.any():
                profile.append(magnitude[ring].mean())
        if len(profile) > 10:
            diffs = np.diff(profile)
            smoothness = np.std(diffs) / (np.mean(np.abs(diffs)) + 1e-10)
            if smoothness < 1.2:
                reasons.append(f"Smooth spectrum ({smoothness:.3f})")
                score += 0.3

        # DCT block analysis
        if gray.shape[0] >= 64 and gray.shape[1] >= 64:
            ratios = []
            for _ in range(20):
                ys = np.random.randint(0, gray.shape[0]-8)
                xs = np.random.randint(0, gray.shape[1]-8)
                blk = cv2.dct(gray[ys:ys+8, xs:xs+8])
                t = np.abs(blk).sum() + 1e-10
                ratios.append(np.abs(blk[4:, 4:]).sum() / t)
            if np.mean(ratios) < 0.05:
                reasons.append(f"Low DCT high-freq ({np.mean(ratios):.4f})")
                score += 0.3
    except Exception as e:
        print(f"Frequency analysis error: {e}")

    return {'is_ai': score >= 0.4, 'confidence': min(score, 1.0), 'reasons': reasons}


# ===================== LAYER 3: NOISE / STATISTICAL ANALYSIS =====================
def analyze_statistics(img_rgb: np.ndarray) -> dict:
    """Detect unnaturally clean noise profiles typical of AI images."""
    reasons = []
    score = 0.0

    try:
        gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)

        # Noise estimation via Laplacian
        noise_var = cv2.Laplacian(gray, cv2.CV_64F).var()
        if noise_var < 100:
            reasons.append(f"Very low noise ({noise_var:.1f})")
            score += 0.35

        # Color channel correlation
        img_f = img_rgb.astype(np.float32)
        r, g, b = img_f[:,:,0].ravel(), img_f[:,:,1].ravel(), img_f[:,:,2].ravel()
        avg_corr = (np.corrcoef(r,g)[0,1] + np.corrcoef(r,b)[0,1] + np.corrcoef(g,b)[0,1]) / 3
        if avg_corr > 0.95:
            reasons.append(f"High channel correlation ({avg_corr:.4f})")
            score += 0.25

        # Local variance uniformity
        lm = cv2.blur(gray.astype(np.float64), (7,7))
        lsm = cv2.blur(gray.astype(np.float64)**2, (7,7))
        lv = lsm - lm**2
        cv_val = np.std(lv) / (np.mean(lv) + 1e-10)
        if cv_val < 1.5:
            reasons.append(f"Uniform texture ({cv_val:.3f})")
            score += 0.25

        # Saturation distribution
        hsv = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2HSV)
        sat = hsv[:,:,1].astype(np.float64)
        if np.std(sat) < 30 and np.mean(sat) > 40:
            reasons.append(f"Narrow saturation dist (std:{np.std(sat):.1f})")
            score += 0.2
    except Exception as e:
        print(f"Stats analysis error: {e}")

    return {'is_ai': score >= 0.3, 'confidence': min(score, 1.0), 'reasons': reasons}


# ===================== PREPROCESSING =====================
def preprocess_image(img_rgb):
    img = cv2.resize(img_rgb, (224, 224))
    img = img.astype(np.float32) / 255.0
    return np.expand_dims(img, axis=0)


# ===================== PREDICTION ENDPOINT =====================
@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    global model
    if model is None:
        raise HTTPException(status_code=500, detail="Model is not loaded on the server.")

    try:
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image file.")

        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # Run all 3 pre-CNN layers
        meta = check_ai_metadata(contents)
        freq = analyze_frequency(img_rgb)
        stat = analyze_statistics(img_rgb)

        print(f"[Meta] ai={meta['is_ai']}, conf={meta['confidence']:.2f}, {meta['reasons']}")
        print(f"[Freq] ai={freq['is_ai']}, conf={freq['confidence']:.2f}, {freq['reasons']}")
        print(f"[Stat] ai={stat['is_ai']}, conf={stat['confidence']:.2f}, {stat['reasons']}")

        # CNN prediction
        input_data = preprocess_image(img_rgb)
        cnn_val = float(model.predict(input_data, verbose=0)[0][0])
        print(f"[CNN] raw={cnn_val:.4f}")

        # Combine scores
        pre_score = meta['confidence']*0.45 + freq['confidence']*0.30 + stat['confidence']*0.25
        flags = sum([meta['is_ai'], freq['is_ai'], stat['is_ai']])
        print(f"[Combined] pre_score={pre_score:.3f}, flags={flags}/3")

        # Decision logic
        if meta['confidence'] >= 0.8:
            label, confidence = "FAKE", max(meta['confidence'], 0.92)
        elif flags >= 2 and pre_score >= 0.35:
            label, confidence = "FAKE", min(0.5 + pre_score, 0.95)
        elif flags >= 1 and pre_score >= 0.25 and cnn_val < 0.7:
            label, confidence = "FAKE", min(0.5 + pre_score, 0.90)
        else:
            if cnn_val >= 0.5:
                label = "REAL"
                confidence = cnn_val * (0.85 if flags > 0 else 1.0)
            else:
                label, confidence = "FAKE", 1.0 - cnn_val

        print(f"[Result] {label} ({confidence*100:.1f}%)")

        return {
            "prediction": label,
            "confidence": round(confidence * 100, 2),
        }

    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


@app.get("/")
async def root():
    return {"message": "Deepfake Detection API is running."}
