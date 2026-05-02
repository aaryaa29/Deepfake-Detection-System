import json
import os

notebook_path = r"c:\Users\asus\Downloads\DFDS.ipynb"

cells = [
    {
        "cell_type": "markdown",
        "metadata": {},
        "source": ["# Deepfake Detection System Inference Notebook\n\nRun this notebook to evaluate the pre-trained model and start the Gradio UI."]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "!pip install tensorflow opencv-python gradio kagglehub mtcnn retina-face\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "import os\n",
            "import tensorflow as tf\n",
            "from tensorflow.keras.models import load_model\n",
            "import kagglehub\n",
            "import shutil\n",
            "import random\n",
            "import numpy as np\n",
            "import cv2\n",
            "import gradio as gr\n",
            "from tensorflow.keras.preprocessing.image import ImageDataGenerator\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "# Load the model from the backend folder\n",
            "model_path = r\"c:\\Users\\asus\\OneDrive\\Desktop\\dfds project\\backend\\deepfake_detector_final.keras\"\n",
            "model = load_model(model_path)\n",
            "print(\"Model loaded successfully!\")\n",
            "model.summary()\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "# 1. Download dataset\n",
            "print(\"Downloading dataset for evaluation...\")\n",
            "path = kagglehub.dataset_download(\"adham7elmy/deepfake-detection-dataset\")\n",
            "src = os.path.join(path, \"dataset\")\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "# 2. Prepare exact evaluation split logic to match 96% accuracy\n",
            "real_images = os.listdir(os.path.join(src, \"real\"))\n",
            "fake_images = os.listdir(os.path.join(src, \"fake\"))\n",
            "\n",
            "min_count = min(len(real_images), len(fake_images))\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "# Use fixed seed to recreate the same split\n",
            "random.seed(42)\n",
            "real_sample = random.sample(real_images, min_count)\n",
            "fake_sample = random.sample(fake_images, min_count)\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "split_dir = \"split_data\"\n",
            "os.makedirs(os.path.join(split_dir, \"test\", \"real\"), exist_ok=True)\n",
            "os.makedirs(os.path.join(split_dir, \"test\", \"fake\"), exist_ok=True)\n",
            "\n",
            "# 85% was used for train/val, 15% for test\n",
            "test_start = int(0.85 * min_count)\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "for img in real_sample[test_start:]:\n",
            "    shutil.copy(os.path.join(src, \"real\", img), os.path.join(split_dir, \"test\", \"real\", img))\n",
            "\n",
            "for img in fake_sample[test_start:]:\n",
            "    shutil.copy(os.path.join(src, \"fake\", img), os.path.join(split_dir, \"test\", \"fake\", img))\n",
            "\n",
            "print(\"Test dataset prepared.\")\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "# 3. Evaluate\n",
            "test_gen = ImageDataGenerator(rescale=1./255)\n",
            "test_data = test_gen.flow_from_directory(\n",
            "    os.path.join(split_dir, \"test\"),\n",
            "    target_size=(224,224),\n",
            "    batch_size=16,\n",
            "    class_mode='binary'\n",
            ")\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "loss, acc, auc = model.evaluate(test_data)\n",
            "print(f\"\\nFINAL TEST ACCURACY: {acc * 100:.2f}%\")\n",
            "print(f\"FINAL TEST AUC: {auc:.4f}\")\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "def predict_image(image):\n",
            "    image = np.array(image)\n",
            "    # Handle RGBA images\n",
            "    if image.shape[-1] == 4:\n",
            "        image = image[:, :, :3]\n",
            "    \n",
            "    image = cv2.resize(image, (224, 224))\n",
            "    image = image / 255.0\n",
            "    image = np.expand_dims(image, axis=0)\n",
            "    \n",
            "    prediction = model.predict(image, verbose=0)[0][0]\n",
            "    \n",
            "    if prediction >= 0.5:\n",
            "        return f\"REAL (Confidence: {prediction:.4f})\"\n",
            "    else:\n",
            "        return f\"FAKE (Confidence: {1 - prediction:.4f})\"\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "gr.close_all()\n",
            "interface = gr.Interface(\n",
            "    fn=predict_image,\n",
            "    inputs=gr.Image(type=\"pil\", label=\"Upload Image\"),\n",
            "    outputs=gr.Textbox(label=\"Prediction\"),\n",
            "    title=\"Deepfake Detection System\",\n",
            "    description=\"Upload an image to check whether it is REAL or FAKE.\"\n",
            ")\n"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": None,
        "metadata": {},
        "outputs": [],
        "source": [
            "print(\"\\nLaunching Gradio Interface...\")\n",
            "interface.launch(share=False)\n"
        ]
    }
]

notebook = {
    "cells": cells,
    "metadata": {
        "kernelspec": {
            "display_name": "Python 3",
            "language": "python",
            "name": "python3"
        },
        "language_info": {
            "name": "python",
            "version": "3.10"
        }
    },
    "nbformat": 4,
    "nbformat_minor": 4
}

with open(notebook_path, 'w', encoding='utf-8') as f:
    json.dump(notebook, f, indent=2)

print("Notebook generated successfully at", notebook_path)
