# DeepFake Detection System

Only work with the run file, do not run the training file.

Download the pre-trained model - https://drive.google.com/file/d/1bQglitUbQDXK9cvjD_yaRpAMTczBWWni/view?usp=drive_link

A deep learning–based system to detect whether an image is REAL or FAKE.

## Features
- CNN-based deepfake detection
- Binary classification (Real vs Fake)
- Confidence score
- Gradio UI

## Tech Stack
- Python
- TensorFlow / Keras
- OpenCV
- FastAPI (Backend)
- React (Frontend Extension)

## How to Run

### 1. Set up the Backend
1. Download the pre-trained `.h5` model from the Google Drive link above.
2. Place the `deepfake_detector_final.h5` file directly inside the `backend/` folder.
3. Install the required Python packages:
   ```bash
   pip install -r backend/requirements.txt
   ```
4. Start the backend server (using uvicorn):
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

### 2. Set up the Frontend (Web Application)
If you prefer to run the frontend as a normal webpage instead of an extension:
1. Navigate to the main project folder.
2. Start a local server using either Node or Python:
   
   **Option A: using Node/npx**
   ```bash
   npx serve .
   ```
   **Option B: using Python**
   ```bash
   python -m http.server 3000
   ```
3. Open your browser and navigate to:
   - **Frontend:** http://localhost:3000
   - **API:** http://localhost:8000

*(Note: You can also simply double-click the `index.html` file to open it directly in your browser).*

### 3. Set up the Frontend (Chrome Extension)
- Open Google Chrome and go to `chrome://extensions/`
- Turn on **Developer mode** (top right corner).
- Click **Load unpacked** and select this entire project folder.
- *(Note: You do not need to run `npm install` unless you plan to modify the `app.jsx` React code. If you edit the React code, run `npm install` and then `npm run build` to compile your changes).*

## Model
The trained model is not included in this repository due to GitHub size limits. Please use the Google Drive link above.
