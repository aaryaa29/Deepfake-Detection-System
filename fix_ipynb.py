import json
import re

nb_path = r"c:\Users\asus\Downloads\DFDS.ipynb"

with open(nb_path, "r", encoding="utf-8") as f:
    d = json.load(f)

for cell in d.get("cells", []):
    if cell.get("cell_type") != "code":
        continue
    
    source = cell.get("source", [])
    if not source:
        continue
    
    # Check if this is the app.py file creation cell (Cell 57)
    if source[0].startswith("%%writefile deepfake-detection-system/app.py"):
        new_source = []
        for line in source:
            if "!pip install gradio" in line:
                continue
            if "print(train_data.class_indices)" in line:
                continue
            # Replace Colab model path with backend model path
            if "/content/drive/MyDrive/deepfake_detector_final.keras" in line or "/content/drive/MyDrive/deepfake_detector_final.h5" in line:
                line = line.replace("/content/drive/MyDrive/deepfake_detector_final.keras", "backend/deepfake_detector_final.keras")
                line = line.replace("/content/drive/MyDrive/deepfake_detector_final.h5", "backend/deepfake_detector_final.keras")
            new_source.append(line)
        cell["source"] = new_source
    else:
        # For other cells, just fix the colab paths to point to backend folder
        new_source = []
        for line in source:
            if "/content/drive/MyDrive/deepfake_detector_final.h5" in line:
                line = line.replace("/content/drive/MyDrive/deepfake_detector_final.h5", "backend/deepfake_detector_final.keras")
            if "/content/drive/MyDrive/deepfake_detector_final.keras" in line:
                line = line.replace("/content/drive/MyDrive/deepfake_detector_final.keras", "backend/deepfake_detector_final.keras")
            if "/content/drive/MyDrive/deepfake_best.h5" in line:
                line = line.replace("/content/drive/MyDrive/deepfake_best.h5", "backend/deepfake_best.h5")
            new_source.append(line)
        cell["source"] = new_source

with open(nb_path, "w", encoding="utf-8") as f:
    json.dump(d, f, indent=2)

print("Notebook updated.")
