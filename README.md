# Deepfake Detection System

A deep learning–based system to detect whether an image is **REAL or FAKE** using a trained CNN model. The project includes an interactive **Gradio web interface** for real-time image-based inference.

---

## Features
- CNN-based deepfake detection
- Binary classification (Real vs Fake)
- Confidence score for predictions
- Interactive Gradio UI

---

## Tech Stack
- Python  
- TensorFlow / Keras  
- OpenCV  
- Gradio  

---

## Model Performance
- **Test Accuracy:** ~96%  
- **Test AUC:** ~0.99  

These metrics were achieved on unseen test data, indicating strong generalization.

---

## How to Run

 1. Install dependencies: pip install -r requirements.txt
 2. Run the application: python app.py

## Model Download

Due to GitHub file size limits, the trained model file is not included in this repository.

### Use the Pretrained Model (Recommended)
1. Download the trained model from this link:
(https://drive.google.com/file/d/1cP_IIB5yS7MA2OUUZQKpbj3ltzZu_rtA/view?usp=drive_link)
2. After downloading, place the file inside the `model/` directory.

Project Structure
deepfake-detection-system/
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
└── model/ deepfake_detector_final.keras


## Developed By

Aarya Thengne
Applied AI & Machine Learning Enthusiast

## License

This project is licensed under the MIT License.
You are free to use, modify, and distribute this project with attribution.

