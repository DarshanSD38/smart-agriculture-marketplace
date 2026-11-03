"""
AI-Powered Smart Agriculture Marketplace & Support System
AI Microservice Server (Flask)
Port: 5001
Keeps models loaded in RAM for instantaneous sub-50ms predictions.
"""

import os
import sys
import warnings

warnings.filterwarnings('ignore')
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['PYTHONWARNINGS'] = 'ignore'

from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

import predict

app = Flask(__name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Warm up / preload models
print("Pre-loading machine learning models into memory...")
try:
    predict.get_crop_model()
    predict.get_price_model()
    predict.get_demand_model()
    predict.get_surplus_model()
    predict.get_disease_model()
    print("All ML models preloaded successfully!")
except Exception as e:
    print(f"Warning during model preload: {e}")

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'online', 'service': 'AgriSmart ML Engine', 'version': '1.0.0'})

@app.route('/api/predict/crop-recommendation', methods=['POST'])
def api_crop_recommendation():
    try:
        data = request.get_json(force=True) or {}
        res = predict.predict_crop_recommendation(data)
        return jsonify(res)
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/api/predict/price', methods=['POST'])
def api_price():
    try:
        data = request.get_json(force=True) or {}
        res = predict.predict_price(data)
        return jsonify(res)
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/api/predict/demand', methods=['POST'])
def api_demand():
    try:
        data = request.get_json(force=True) or {}
        res = predict.predict_demand(data)
        return jsonify(res)
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/api/predict/surplus', methods=['POST'])
def api_surplus():
    try:
        data = request.get_json(force=True) or {}
        res = predict.predict_surplus(data)
        return jsonify(res)
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/api/predict/disease', methods=['POST'])
def api_disease():
    try:
        # Check if file upload or file path passed
        if 'image' in request.files:
            file = request.files['image']
            if file.filename == '':
                return jsonify({'status': 'error', 'message': 'No image file uploaded'}), 400
            filename = secure_filename(file.filename)
            save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(save_path)
            res = predict.predict_crop_disease(save_path)
            return jsonify(res)
        elif request.is_json:
            data = request.get_json() or {}
            img_path = data.get('image_path')
            if not img_path:
                return jsonify({'status': 'error', 'message': 'image_path required'}), 400
            res = predict.predict_crop_disease(img_path)
            return jsonify(res)
        else:
            return jsonify({'status': 'error', 'message': 'Expected image file upload or JSON with image_path'}), 400
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    print(f"AgriSmart ML Microservice running on http://127.0.0.1:{port}")
    app.run(host='127.0.0.1', port=port, debug=False)

