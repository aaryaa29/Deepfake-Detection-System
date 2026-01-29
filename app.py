import gradio as gr
import numpy as np
import cv2
from tensorflow.keras.models import load_model
import os

# Load model (relative path)
MODEL_PATH = os.path.join("model", "deepfake_detector_final.keras")
model = load_model(MODEL_PATH)

def predict_image(image):
    image = np.array(image)

    # Handle RGBA images
    if image.shape[-1] == 4:
        image = image[:, :, :3]

    image = cv2.resize(image, (224, 224))
    image = image / 255.0
    image = np.expand_dims(image, axis=0)

    prediction = model.predict(image)[0][0]

    if prediction >= 0.5:
        label = "REAL"
        confidence = prediction
    else:
        label = "FAKE"
        confidence = 1 - prediction

    return f"{label} (Confidence: {confidence:.2f})"

interface = gr.Interface(
    fn=predict_image,
    inputs=gr.Image(type="pil", label="Upload Image"),
    outputs=gr.Textbox(label="Prediction"),
    title="Deepfake Detection System",
    description="Upload an image to check whether it is REAL or FAKE."
)

interface.launch()
