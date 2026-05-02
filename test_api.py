import requests
import numpy as np
import cv2
import os

# Create a dummy image
img = np.zeros((224, 224, 3), dtype=np.uint8)
cv2.imwrite("dummy_test.jpg", img)

url = "http://127.0.0.1:8000/predict"
with open("dummy_test.jpg", "rb") as f:
    files = {"file": ("dummy_test.jpg", f, "image/jpeg")}
    try:
        response = requests.post(url, files=files)
        print("Status code:", response.status_code)
        print("Response:", response.text)
    except Exception as e:
        print("Failed to connect:", e)
