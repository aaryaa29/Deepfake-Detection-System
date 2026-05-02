import traceback
import os
import numpy as np
import cv2
from tensorflow.keras.models import load_model

# Load face detector
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

def extract_face(img_rgb):
    gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    if len(faces) == 0:
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.05, minNeighbors=3, minSize=(20, 20))
    if len(faces) == 0:
        return None
    x, y, w, h = max(faces, key=lambda f: f[2] * f[3])
    pad_w, pad_h = int(w * 0.2), int(h * 0.2)
    x1, y1 = max(0, x - pad_w), max(0, y - pad_h)
    x2, y2 = min(img_rgb.shape[1], x + w + pad_w), min(img_rgb.shape[0], y + h + pad_h)
    return cv2.resize(img_rgb[y1:y2, x1:x2], (224, 224))

def preprocess(img_rgb):
    img = cv2.resize(img_rgb, (224, 224))
    return np.expand_dims(img.astype(np.float32) / 255.0, axis=0)

def predict_tta(model, img_rgb):
    p1 = float(model.predict(preprocess(img_rgb), verbose=0)[0][0])
    p2 = float(model.predict(preprocess(cv2.flip(img_rgb, 1)), verbose=0)[0][0])
    return (p1 + p2) / 2.0

with open("results.txt", "w") as f:
    try:
        f.write("Loading model (deepfake_detector_final.h5)...\n")
        model = load_model('deepfake_detector_final.h5')
        f.write("Loaded model successfully\n\n")

        base = r"c:\Users\asus\OneDrive\Desktop\dfds project\images"
        images = [
            os.path.join(base, "fake.png"),
            os.path.join(base, "real.png"),
            os.path.join(base, "real2.png"),
        ]

        # --- Without face detection (baseline) ---
        f.write("=" * 50 + "\n")
        f.write("BASELINE (no face detection, no TTA)\n")
        f.write("=" * 50 + "\n")
        for img_path in images:
            img = cv2.imdecode(np.fromfile(img_path, dtype=np.uint8), cv2.IMREAD_COLOR)
            if img is None:
                f.write(f"{img_path}: Could not read\n")
                continue
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            inp = preprocess(img_rgb)
            pred = float(model.predict(inp, verbose=0)[0][0])
            label = "REAL" if pred >= 0.5 else "FAKE"
            conf = pred if pred >= 0.5 else 1 - pred
            f.write(f"{img_path}: raw={pred:.4f} -> {label} ({conf*100:.2f}%)\n")

        # --- With face detection + TTA ---
        f.write("\n" + "=" * 50 + "\n")
        f.write("IMPROVED (face detection + TTA)\n")
        f.write("=" * 50 + "\n")
        for img_path in images:
            img = cv2.imdecode(np.fromfile(img_path, dtype=np.uint8), cv2.IMREAD_COLOR)
            if img is None:
                f.write(f"{img_path}: Could not read\n")
                continue
            img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            face = extract_face(img_rgb)
            if face is not None:
                f.write(f"{img_path}: [FACE DETECTED] ")
                pred = predict_tta(model, face)
            else:
                f.write(f"{img_path}: [NO FACE - full image] ")
                pred = predict_tta(model, img_rgb)
            label = "REAL" if pred >= 0.5 else "FAKE"
            conf = pred if pred >= 0.5 else 1 - pred
            f.write(f"raw={pred:.4f} -> {label} ({conf*100:.2f}%)\n")

    except Exception as e:
        f.write(f"Error: {traceback.format_exc()}\n")
