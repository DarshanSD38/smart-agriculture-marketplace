"""
AI-Powered Smart Agriculture Marketplace & Support System
Unified Prediction Engine (CLI and Library)
Loads:
- User-provided plant_disease_model.keras (Plant Disease CNN)
- User-provided crop_recommendation.pkl & label_encoder.pkl (Crop Recommendation Random Forest)
- Newly trained price_model.pkl (Price Regressor)
- Newly trained demand_model.pkl (Demand Regressor)
- Newly trained surplus_model.pkl (Surplus Risk Classifier)
"""

import sys
import os
import json
import argparse
import warnings

# Suppress sklearn/numpy/TF warnings
warnings.filterwarnings('ignore')
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['PYTHONWARNINGS'] = 'ignore'

import joblib
import numpy as np
import pandas as pd
from PIL import Image

# Suppress TF debug logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, 'models')

# -------------------------------------------------------------
# PLANT VILLAGE 39 DISEASE CLASSES & REMEDIES
# -------------------------------------------------------------
PLANT_DISEASE_CLASSES = [
    'Apple___Apple_scab',
    'Apple___Black_rot',
    'Apple___Cedar_apple_rust',
    'Apple___healthy',
    'Blueberry___healthy',
    'Cherry_(including_sour)___Powdery_mildew',
    'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight',
    'Corn_(maize)___healthy',
    'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)',
    'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)',
    'Peach___Bacterial_spot',
    'Peach___healthy',
    'Pepper,_bell___Bacterial_spot',
    'Pepper,_bell___healthy',
    'Potato___Early_blight',
    'Potato___Late_blight',
    'Potato___healthy',
    'Raspberry___healthy',
    'Soybean___healthy',
    'Squash___Powdery_mildew',
    'Strawberry___Leaf_scorch',
    'Strawberry___healthy',
    'Tomato___Bacterial_spot',
    'Tomato___Early_blight',
    'Tomato___Late_blight',
    'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot',
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy',
    'Background_without_leaves'
]

DISEASE_DETAILS = {
    'Apple___Apple_scab': {
        'disease': 'Apple Scab',
        'crop': 'Apple',
        'healthy': False,
        'severity': 'Moderate',
        'guidance': 'Prune affected branches to improve air circulation. Apply protective sulfur or copper fungicide during bud break.',
        'recommendedInputs': ['Copper Oxychloride 50% WP', 'Bio-Neem Spray']
    },
    'Apple___Black_rot': {
        'disease': 'Black Rot',
        'crop': 'Apple',
        'healthy': False,
        'severity': 'High',
        'guidance': 'Remove mummified fruits and dead wood. Spray Captan or Mancozeb fungicide following bloom period.',
        'recommendedInputs': ['Mancozeb 75% WP', 'Organic Neem Seed Extract']
    },
    'Apple___Cedar_apple_rust': {
        'disease': 'Cedar Apple Rust',
        'crop': 'Apple',
        'healthy': False,
        'severity': 'Moderate',
        'guidance': 'Remove nearby red cedar or juniper trees if possible. Apply myclobutanil fungicide at pink bud stage.',
        'recommendedInputs': ['Systemic Triazole Fungicide']
    },
    'Apple___healthy': {
        'disease': 'Healthy Foliage',
        'crop': 'Apple',
        'healthy': True,
        'severity': 'None',
        'guidance': 'Crop foliage is completely healthy! Continue balanced NPK fertilization and drip irrigation schedules.',
        'recommendedInputs': ['Organic Vermicompost', 'Potassium Mobilizing Bio-Fertilizer']
    },
    'Corn_(maize)___Common_rust_': {
        'disease': 'Common Rust',
        'crop': 'Corn / Maize',
        'healthy': False,
        'severity': 'Moderate',
        'guidance': 'Plant resistant maize hybrids. Spray Azoxystrobin or Mancozeb if pustules cover >10% of leaf area.',
        'recommendedInputs': ['Azoxystrobin 23% SC', 'Bio-Fungicide Trichoderma']
    },
    'Corn_(maize)___healthy': {
        'disease': 'Healthy Crop',
        'crop': 'Corn / Maize',
        'healthy': True,
        'severity': 'None',
        'guidance': 'Healthy crop canopy. Maintain adequate nitrogen top-dressing during tasseling stage.',
        'recommendedInputs': ['Urea / Neem-coated Nitrogen', 'Zinc Sulfate 21%']
    },
    'Grape___Black_rot': {
        'disease': 'Black Rot',
        'crop': 'Grape',
        'healthy': False,
        'severity': 'High',
        'guidance': 'Ensure good canopy sun exposure. Apply Mancozeb or Myclobutanil beginning when shoots are 3-5 inches.',
        'recommendedInputs': ['Mancozeb 75% WP', 'Sulphur 80% WDG']
    },
    'Grape___healthy': {
        'disease': 'Healthy Foliage',
        'crop': 'Grape',
        'healthy': True,
        'severity': 'None',
        'guidance': 'Foliage is vibrant and disease-free. Maintain balanced micronutrient spray during berry sizing.',
        'recommendedInputs': ['Chelated Micronutrient Spray', 'Potash Biofertilizer']
    },
    'Potato___Early_blight': {
        'disease': 'Early Blight (Alternaria solani)',
        'crop': 'Potato',
        'healthy': False,
        'severity': 'Medium',
        'guidance': 'Concentric brown rings on older leaves. Practice crop rotation. Apply Chlorothalonil or Mancozeb spray.',
        'recommendedInputs': ['Chlorothalonil 75% WP', 'Bio-Neem Organic Pest Repellent']
    },
    'Potato___Late_blight': {
        'disease': 'Late Blight (Phytophthora infestans)',
        'crop': 'Potato',
        'healthy': False,
        'severity': 'High',
        'guidance': 'Water-soaked lesions on leaf margins with white mold underside. Apply systemic Metalaxyl + Mancozeb immediately.',
        'recommendedInputs': ['Metalaxyl 8% + Mancozeb 64% WP', 'Copper Hydroxide 53.8% DF']
    },
    'Potato___healthy': {
        'disease': 'Healthy Crop',
        'crop': 'Potato',
        'healthy': True,
        'severity': 'None',
        'guidance': 'Foliage is dark green and healthy. Ensure earthing up is complete to prevent tuber greening.',
        'recommendedInputs': ['Potassium Schoenite', 'Seaweed Extract Tonic']
    },
    'Tomato___Early_blight': {
        'disease': 'Early Blight (Alternaria solani)',
        'crop': 'Tomato',
        'healthy': False,
        'severity': 'Moderate',
        'guidance': 'Target-like brown spots on lower leaves. Avoid overhead sprinkler irrigation. Apply Mancozeb or Azoxystrobin spray every 7-10 days.',
        'recommendedInputs': ['Bio-Neem Organic Pest Repellent', 'Mancozeb 75% WP', 'Copper Fungicide']
    },
    'Tomato___Late_blight': {
        'disease': 'Late Blight (Phytophthora infestans)',
        'crop': 'Tomato',
        'healthy': False,
        'severity': 'High',
        'guidance': 'Rapidly spreading dark greasy spots with pale borders. High risk in cool, moist weather. Apply Cymoxanil + Mancozeb or Dimethomorph.',
        'recommendedInputs': ['Cymoxanil 8% + Mancozeb 64% WP', 'Systemic Fungicide']
    },
    'Tomato___Bacterial_spot': {
        'disease': 'Bacterial Spot (Xanthomonas)',
        'crop': 'Tomato',
        'healthy': False,
        'severity': 'High',
        'guidance': 'Small, water-soaked circular leaf spots. Spray Copper Oxychloride combined with Streptocycline bactericide.',
        'recommendedInputs': ['Streptomycin Sulphate 90% + Tetracycline', 'Copper Oxychloride 50% WP']
    },
    'Tomato___Leaf_Mold': {
        'disease': 'Leaf Mold (Passalora fulva)',
        'crop': 'Tomato',
        'healthy': False,
        'severity': 'Moderate',
        'guidance': 'Pale green/yellow spots on leaf upper surface with olive-green mold underneath. Lower humidity and improve airflow.',
        'recommendedInputs': ['Bio-Fungicide Trichoderma viride', 'Copper Hydroxide']
    },
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus': {
        'disease': 'Yellow Leaf Curl Virus (TYLCV)',
        'crop': 'Tomato',
        'healthy': False,
        'severity': 'Critical',
        'guidance': 'Leaves curled upwards with yellow margins and stunted growth. Transmitted by Whiteflies. Control whitefly vector using Imidacloprid or yellow sticky traps.',
        'recommendedInputs': ['Yellow Sticky Traps (Pack of 20)', 'Bio-Pesticide Verticillium lecanii', 'Imidacloprid 17.8% SL']
    },
    'Tomato___healthy': {
        'disease': 'Healthy Tomato Plant',
        'crop': 'Tomato',
        'healthy': True,
        'severity': 'None',
        'guidance': 'Foliage shows vibrant color and healthy cellular structure. Continue balanced fertigation.',
        'recommendedInputs': ['NPK 19-19-19 Soluble Fertilizer', 'Calcium Nitrate + Boron']
    }
}

# Default fallback disease info
DEFAULT_DISEASE_INFO = {
    'disease': 'Leaf Disease / Spot',
    'crop': 'Farm Produce',
    'healthy': False,
    'severity': 'Moderate',
    'guidance': 'Inspect leaf undersides for fungal growth or mites. Maintain proper plant spacing and spray organic neem oil (5ml/L).',
    'recommendedInputs': ['Bio-Neem Organic Pest Repellent', 'Trichoderma Viride Bio-Fungicide']
}

# -------------------------------------------------------------
# LAZY MODEL LOADERS
# -------------------------------------------------------------
_models_cache = {}

def get_crop_model():
    if 'crop_rf' not in _models_cache:
        model_path = os.path.join(MODELS_DIR, 'crop_recommendation.pkl')
        _models_cache['crop_rf'] = joblib.load(model_path)
    return _models_cache['crop_rf']

def get_price_model():
    if 'price_rf' not in _models_cache:
        _models_cache['price_rf'] = joblib.load(os.path.join(MODELS_DIR, 'price_model.pkl'))
        _models_cache['le_prod'] = joblib.load(os.path.join(MODELS_DIR, 'le_product.pkl'))
        _models_cache['le_loc'] = joblib.load(os.path.join(MODELS_DIR, 'le_location.pkl'))
    return _models_cache['price_rf'], _models_cache['le_prod'], _models_cache['le_loc']

def get_demand_model():
    if 'demand_rf' not in _models_cache:
        _models_cache['demand_rf'] = joblib.load(os.path.join(MODELS_DIR, 'demand_model.pkl'))
        _models_cache['le_prod'] = joblib.load(os.path.join(MODELS_DIR, 'le_product.pkl'))
        _models_cache['le_loc'] = joblib.load(os.path.join(MODELS_DIR, 'le_location.pkl'))
    return _models_cache['demand_rf'], _models_cache['le_prod'], _models_cache['le_loc']

def get_surplus_model():
    if 'surplus_rf' not in _models_cache:
        _models_cache['surplus_rf'] = joblib.load(os.path.join(MODELS_DIR, 'surplus_model.pkl'))
        _models_cache['le_risk'] = joblib.load(os.path.join(MODELS_DIR, 'le_risk.pkl'))
        _models_cache['le_prod'] = joblib.load(os.path.join(MODELS_DIR, 'le_product.pkl'))
    return _models_cache['surplus_rf'], _models_cache['le_risk'], _models_cache['le_prod']

def get_disease_model():
    if 'disease_keras' not in _models_cache:
        import keras
        model_path = os.path.join(MODELS_DIR, 'plant_disease_model.keras')
        _models_cache['disease_keras'] = keras.saving.load_model(model_path)
    return _models_cache['disease_keras']

# -------------------------------------------------------------
# PREDICTION HANDLERS
# -------------------------------------------------------------
def predict_crop_recommendation(data):
    """
    Takes N, P, K, temperature, humidity, ph, rainfall
    Returns top recommended crop and probability ranking
    """
    rf = get_crop_model()
    features = pd.DataFrame([[
        float(data.get('N', 90)),
        float(data.get('P', 42)),
        float(data.get('K', 43)),
        float(data.get('temperature', 22.0)),
        float(data.get('humidity', 80.0)),
        float(data.get('ph', 6.5)),
        float(data.get('rainfall', 200.0))
    ]], columns=['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'])

    predicted_crop = rf.predict(features)[0]
    probs = rf.predict_proba(features)[0]

    # Get top 3
    classes = rf.classes_
    top_indices = np.argsort(probs)[::-1][:3]
    top_recommendations = [
        {
            'crop': str(classes[idx]).capitalize(),
            'confidence': round(float(probs[idx]) * 100, 1)
        }
        for idx in top_indices if probs[idx] > 0.05
    ]

    best_confidence = round(float(probs[top_indices[0]]) * 100, 1)

    return {
        'status': 'success',
        'recommendedCrop': str(predicted_crop).capitalize(),
        'confidence': best_confidence,
        'topAlternatives': top_recommendations,
        'inputParameters': {
            'N': float(data.get('N', 90)),
            'P': float(data.get('P', 42)),
            'K': float(data.get('K', 43)),
            'temperature': float(data.get('temperature', 22.0)),
            'humidity': float(data.get('humidity', 80.0)),
            'ph': float(data.get('ph', 6.5)),
            'rainfall': float(data.get('rainfall', 200.0))
        },
        'guidance': f"Soil and climatic suitability indicates {str(predicted_crop).capitalize()} will deliver optimal germination and commercial harvest yield."
    }

def predict_price(data):
    """
    Takes product, quantity, location, current_price
    Returns AI recommended price range, market demand, price trend, explanation
    """
    rf, le_prod, le_loc = get_price_model()

    product_name = str(data.get('product', 'Tomato')).strip().capitalize()
    location_name = str(data.get('location', 'Nashik')).strip().capitalize()
    quantity = float(data.get('quantity', 100))
    current_price = float(data.get('current_price', 30.0))
    month = int(data.get('month', 11))

    # Match product in encoder or fallback
    if product_name in le_prod.classes_:
        prod_enc = le_prod.transform([product_name])[0]
    else:
        # Fuzzy match or default
        prod_enc = 0

    if location_name in le_loc.classes_:
        loc_enc = le_loc.transform([location_name])[0]
    else:
        loc_enc = 0

    # Benchmark proxy based on current price
    mandi_benchmark = current_price * 0.94
    arrival_tonnes = 180.0

    features = pd.DataFrame([[
        prod_enc, loc_enc, month, quantity, current_price, mandi_benchmark, arrival_tonnes
    ]], columns=['product_enc', 'location_enc', 'month', 'quantity', 'current_price', 'mandi_benchmark', 'arrival_tonnes'])

    pred_price = float(rf.predict(features)[0])
    pred_min = max(5.0, round(pred_price * 0.94, 1))
    pred_max = round(pred_price * 1.06, 1)

    diff_pct = round(((pred_price - current_price) / max(1.0, current_price)) * 100, 1)
    if diff_pct > 3:
        trend = f"Rising (+{diff_pct}%)"
        demand_level = "High"
        explanation = f"Daily arrivals in {location_name} are tighter this week. Demand is strong; you can price between ₹{pred_min} - ₹{pred_max}/kg for optimal profits."
    elif diff_pct < -3:
        trend = f"Falling ({diff_pct}%)"
        demand_level = "Low"
        explanation = f"Higher arrivals from regional farm clusters have softened wholesale bids. Recommended competitive range: ₹{pred_min} - ₹{pred_max}/kg."
    else:
        trend = "Stable (±2%)"
        demand_level = "Medium"
        explanation = f"Wholesale mandi rates and direct consumer purchase volumes are well balanced in {location_name}. Recommended fair price: ₹{pred_min} - ₹{pred_max}/kg."

    return {
        'status': 'success',
        'product': product_name,
        'location': location_name,
        'currentPrice': current_price,
        'recommendedPrice': round(pred_price, 1),
        'recommendedRange': f"₹{pred_min} - ₹{pred_max} / kg",
        'minPrice': pred_min,
        'maxPrice': pred_max,
        'demandLevel': demand_level,
        'priceTrend': trend,
        'explanation': explanation,
        'benchmarkMandiRate': round(mandi_benchmark, 1)
    }

def predict_demand(data):
    """
    Takes product, month, location, quantity
    Returns expected sales demand, demand level, forecast
    """
    rf, le_prod, le_loc = get_demand_model()

    product_name = str(data.get('product', 'Tomato')).strip().capitalize()
    location_name = str(data.get('location', 'Nashik')).strip().capitalize()
    quantity = float(data.get('quantity', 100))
    current_price = float(data.get('current_price', 30.0))
    month = int(data.get('month', 11))

    prod_enc = le_prod.transform([product_name])[0] if product_name in le_prod.classes_ else 0
    loc_enc = le_loc.transform([location_name])[0] if location_name in le_loc.classes_ else 0
    mandi_benchmark = current_price * 0.94

    features = pd.DataFrame([[
        prod_enc, loc_enc, month, quantity, current_price, mandi_benchmark
    ]], columns=['product_enc', 'location_enc', 'month', 'quantity', 'current_price', 'mandi_benchmark'])

    expected_demand = max(10.0, float(rf.predict(features)[0]))
    demand_ratio = expected_demand / max(1.0, quantity)

    if demand_ratio > 1.2:
        level = "Very High"
        growth = "+28%"
    elif demand_ratio > 0.9:
        level = "High"
        growth = "+14%"
    elif demand_ratio > 0.6:
        level = "Medium"
        growth = "+3%"
    else:
        level = "Low"
        growth = "-8%"

    # 6-month projected curve
    months_labels = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']
    curve_multipliers = [0.85, 0.92, 1.05, 1.10, 1.25, 1.18]
    forecast_chart = [
        {'month': m, 'demand': round(expected_demand * mult, 0)}
        for m, mult in zip(months_labels, curve_multipliers)
    ]

    return {
        'status': 'success',
        'product': product_name,
        'expectedDemandKg': round(expected_demand, 1),
        'demandLevel': level,
        'growthRate': growth,
        'forecastChart': forecast_chart,
        'summary': f"AI models project strong customer purchasing interest ({level}) for {product_name} in {location_name}."
    }

def predict_surplus(data):
    """
    Takes product, current_stock, expected_sales, shelf_life_days, days_since_harvest
    Returns surplus risk, suggested discount, action plan
    """
    rf, le_risk, le_prod = get_surplus_model()

    product_name = str(data.get('product', 'Tomato')).strip().capitalize()
    current_stock = float(data.get('current_stock', 100))
    expected_sales = float(data.get('expected_sales', 60))
    shelf_life = float(data.get('shelf_life_days', 6))
    days_harvest = float(data.get('days_since_harvest', 2))
    perishability = 4 if shelf_life <= 7 else (2 if shelf_life <= 30 else 1)

    prod_enc = le_prod.transform([product_name])[0] if product_name in le_prod.classes_ else 0

    features = pd.DataFrame([[
        prod_enc, current_stock, expected_sales, shelf_life, days_harvest, perishability
    ]], columns=['product_enc', 'current_stock_kg', 'expected_demand_kg', 'shelf_life_days', 'days_since_harvest', 'perishability'])

    pred_idx = rf.predict(features)[0]
    risk_name = le_risk.inverse_transform([pred_idx])[0]

    surplus_kg = max(0.0, current_stock - expected_sales)
    remaining_days = max(1.0, shelf_life - days_harvest)

    # Dynamic discount recommendation based on surplus risk
    if risk_name == 'High':
        discount = 20
        action = f"High spoilage risk! {surplus_kg} kg estimated unsold with only {int(remaining_days)} days shelf life. Activate a 20% Flash Deal or Group Buying pool to clear immediately."
    elif risk_name == 'Medium':
        discount = 10
        action = f"Medium risk: {surplus_kg} kg surplus likely. Apply a 10% discount on orders above 5kg to accelerate stock turnover."
    elif risk_name == 'Low':
        discount = 5
        action = f"Low risk: Modest surplus of {surplus_kg} kg. Bundle with complementary vegetables or offer a 5% weekend special."
    else:
        discount = 0
        action = "Zero surplus risk! Current consumer demand easily covers stock before harvest expiration."

    return {
        'status': 'success',
        'product': product_name,
        'currentStockKg': current_stock,
        'expectedSalesKg': expected_sales,
        'surplusKg': round(surplus_kg, 1),
        'surplusRisk': risk_name,
        'suggestedDiscount': f"{discount}%",
        'discountPercentage': discount,
        'remainingShelfLifeDays': int(remaining_days),
        'actionPlan': action
    }

def predict_crop_disease(image_path):
    """
    Takes an image file path
    Preprocesses to 224x224 RGB, runs through user Keras CNN,
    Maps to disease details and treatments
    """
    if not os.path.exists(image_path):
        return {'status': 'error', 'message': f"Image file not found: {image_path}"}

    model = get_disease_model()

    # Preprocess image
    img = Image.open(image_path).convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img, dtype=np.float32) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    preds = model.predict(img_array, verbose=0)[0]
    top_idx = int(np.argmax(preds))
    confidence = round(float(preds[top_idx]) * 100, 1)

    raw_label = PLANT_DISEASE_CLASSES[top_idx] if top_idx < len(PLANT_DISEASE_CLASSES) else 'Tomato___Early_blight'
    info = DISEASE_DETAILS.get(raw_label, DEFAULT_DISEASE_INFO)

    return {
        'status': 'success',
        'rawLabel': raw_label,
        'possibleIssue': info['disease'],
        'crop': info['crop'],
        'confidence': confidence,
        'isHealthy': info['healthy'],
        'severity': info['severity'],
        'generalGuidance': info['guidance'],
        'recommendedInputs': info['recommendedInputs'],
        'disclaimer': 'AI analysis provides advisory guidance based on deep learning visual patterns. For epidemic disease outbreaks, consult your local Krishi Vigyan Kendra (KVK).'
    }

# -------------------------------------------------------------
# MAIN CLI ENTRYPOINT
# -------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(description='Smart Agri AI Prediction Engine')
    parser.add_argument('--task', required=True, choices=['crop_recommendation', 'price', 'demand', 'surplus', 'disease'], help='AI Task to run')
    parser.add_argument('--data', required=False, help='JSON string with input payload')
    parser.add_argument('--image', required=False, help='Image path for disease detection')
    parser.add_argument('--stdin', action='store_true', help='Read payload from standard input')

    args = parser.parse_args()

    payload = {}
    if args.stdin or args.data == '-':
        try:
            raw = sys.stdin.read().strip()
            if raw:
                payload = json.loads(raw)
        except Exception as e:
            print(json.dumps({'status': 'error', 'message': f'Invalid stdin JSON payload: {str(e)}'}))
            sys.exit(1)
    elif args.data:
        try:
            # Handle potential single-quote or escaping in CLI
            clean_data = args.data.strip()
            if clean_data.startswith("'") and clean_data.endswith("'"):
                clean_data = clean_data[1:-1]
            payload = json.loads(clean_data)
        except Exception as e:
            # Try raw or fallback
            try:
                import ast
                payload = ast.literal_eval(args.data)
            except Exception:
                print(json.dumps({'status': 'error', 'message': f'Invalid JSON payload: {str(e)}'}))
                sys.exit(1)

    try:
        if args.task == 'crop_recommendation':
            result = predict_crop_recommendation(payload)
        elif args.task == 'price':
            result = predict_price(payload)
        elif args.task == 'demand':
            result = predict_demand(payload)
        elif args.task == 'surplus':
            result = predict_surplus(payload)
        elif args.task == 'disease':
            img_path = args.image or payload.get('image_path')
            if not img_path:
                result = {'status': 'error', 'message': 'Missing image path'}
            else:
                result = predict_crop_disease(img_path)
        else:
            result = {'status': 'error', 'message': f'Unknown task: {args.task}'}

        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({'status': 'error', 'message': str(e)}))
        sys.exit(1)

if __name__ == '__main__':
    main()
