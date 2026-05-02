import sys
import tensorflow as tf

print(f"TF Version: {tf.__version__}")
import keras
print(f"Keras Version: {keras.__version__}")

# Apply shim
class ShimFunctional:
    pass

import keras.engine.functional
sys.modules['keras.src'] = keras
sys.modules['keras.src.models'] = keras.models
sys.modules['keras.src.models.functional'] = sys.modules['keras.engine.functional']
sys.modules['keras.src.saving'] = keras.saving

try:
    print("Loading model...")
    model = keras.models.load_model('deepfake_detector_final.keras')
    print("Model loaded successfully!")
    model.summary()
except Exception as e:
    import traceback
    traceback.print_exc()

