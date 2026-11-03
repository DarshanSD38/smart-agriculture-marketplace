"""
AI-Powered Smart Agriculture Marketplace & Support System
Machine Learning Model Training Pipeline
Trains:
1. Price Recommendation Regressor (price_model.pkl)
2. Demand Prediction Regressor (demand_model.pkl)
3. Surplus Risk Classifier & Discount Recommender (surplus_model.pkl)
"""

import os
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score, accuracy_score

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
MODELS_DIR = os.path.join(BASE_DIR, 'models')
os.makedirs(MODELS_DIR, exist_ok=True)
os.makedirs(DATA_DIR, exist_ok=True)

# -------------------------------------------------------------
# 1. GENERATE REALISTIC INDIAN AGRICULTURAL MARKET DATASET
# -------------------------------------------------------------
def generate_market_dataset():
    print("Generating comprehensive Indian agricultural market dataset...")
    np.random.seed(42)

    commodities = [
        # name, base_wholesale_price, shelf_life_days, perishability (1=low, 4=very high)
        ('Tomato', 28.0, 6, 4),
        ('Potato', 22.0, 45, 2),
        ('Onion', 32.0, 35, 2),
        ('Spinach', 20.0, 3, 4),
        ('Bell Pepper', 45.0, 8, 3),
        ('Cabbage', 18.0, 14, 3),
        ('Cauliflower', 26.0, 10, 3),
        ('Apple', 120.0, 30, 2),
        ('Banana', 35.0, 7, 3),
        ('Mango', 95.0, 8, 3),
        ('Pomegranate', 140.0, 20, 2),
        ('Grapes', 75.0, 10, 3),
        ('Papaya', 30.0, 6, 4),
        ('Orange', 55.0, 15, 2),
        ('Wheat', 34.0, 180, 1),
        ('Rice', 48.0, 180, 1),
        ('Maize', 24.0, 120, 1),
        ('Black Gram', 85.0, 180, 1),
        ('Chickpea', 72.0, 180, 1),
        ('Organic Milk', 62.0, 2, 4)
    ]

    locations = ['Nashik', 'Pune', 'Bangalore', 'Delhi', 'Mumbai', 'Nagpur', 'Indore', 'Jaipur', 'Hyderabad']

    records = []
    n_samples_per_commodity = 250

    for name, base_price, shelf_life, perishability in commodities:
        for _ in range(n_samples_per_commodity):
            month = np.random.randint(1, 13)
            location = np.random.choice(locations)

            # Seasonal price multiplier (monsoon/summer/winter variations)
            season_mult = 1.0
            if month in [6, 7, 8]: # Monsoon often raises vegetable prices
                season_mult = 1.18 if perishability >= 3 else 1.04
            elif month in [10, 11]: # Festive season Diwali/Navratri boosts demand
                season_mult = 1.15
            elif month in [1, 2, 3]: # Peak harvest / winter glut
                season_mult = 0.88 if perishability >= 3 else 0.96

            # Mandi daily arrivals (tonnes): high arrivals -> price drops
            arrival_tonnes = np.random.uniform(20.0, 450.0)
            arrival_impact = 1.0 - (arrival_tonnes - 200.0) / 1200.0

            mandi_benchmark = round(base_price * season_mult * arrival_impact + np.random.normal(0, 1.5), 2)
            mandi_benchmark = max(5.0, mandi_benchmark)

            # Farmer asking price usually deviates +/- 15% from benchmark
            current_price = round(mandi_benchmark * np.random.uniform(0.90, 1.15), 2)
            quantity = np.random.choice([25, 50, 100, 150, 250, 500, 1000])

            # Demand score based on seasonality, arrival and pricing
            price_ratio = current_price / mandi_benchmark
            demand_score = (1.5 - 0.5 * price_ratio) * (1.2 if month in [10, 11] else 1.0)
            demand_level = 'High' if demand_score > 1.15 else ('Medium' if demand_score > 0.9 else 'Low')

            # Fair recommended price: slightly above wholesale modal price giving farmer direct-to-buyer margin
            recommended_price = round(mandi_benchmark * 1.08 + (2.0 if demand_level == 'High' else -1.5), 2)

            # Expected sales volume in kg
            expected_demand_kg = round(np.random.uniform(0.6, 1.4) * quantity * (1.3 if demand_level == 'High' else 0.8), 1)

            # Surplus simulation
            current_stock_kg = quantity
            days_since_harvest = np.random.randint(0, min(10, shelf_life))
            remaining_shelf_life = max(1, shelf_life - days_since_harvest)

            surplus_kg = max(0.0, current_stock_kg - expected_demand_kg)
            surplus_ratio = surplus_kg / max(1.0, current_stock_kg)

            # Surplus Risk logic
            if surplus_ratio > 0.4 and remaining_shelf_life <= 3:
                surplus_risk = 'High'
                suggested_discount = 20
            elif surplus_ratio > 0.25 or (surplus_ratio > 0.15 and remaining_shelf_life <= 4):
                surplus_risk = 'Medium'
                suggested_discount = 10
            elif surplus_ratio > 0.05:
                surplus_risk = 'Low'
                suggested_discount = 5
            else:
                surplus_risk = 'None'
                suggested_discount = 0

            records.append({
                'product': name,
                'location': location,
                'month': month,
                'quantity': quantity,
                'current_price': current_price,
                'mandi_benchmark': mandi_benchmark,
                'arrival_tonnes': round(arrival_tonnes, 1),
                'recommended_price': recommended_price,
                'demand_level': demand_level,
                'expected_demand_kg': expected_demand_kg,
                'shelf_life_days': shelf_life,
                'days_since_harvest': days_since_harvest,
                'perishability': perishability,
                'current_stock_kg': current_stock_kg,
                'surplus_risk': surplus_risk,
                'suggested_discount': suggested_discount
            })

    df = pd.DataFrame(records)
    csv_path = os.path.join(DATA_DIR, 'indian_agri_market_data.csv')
    df.to_csv(csv_path, index=False)
    print(f"Generated {len(df)} market records saved to {csv_path}")
    return df

# -------------------------------------------------------------
# 2. TRAIN MODELS
# -------------------------------------------------------------
def train_all_models():
    df = generate_market_dataset()

    # Fit Encoders
    le_product = LabelEncoder()
    le_location = LabelEncoder()
    df['product_enc'] = le_product.fit_transform(df['product'])
    df['location_enc'] = le_location.fit_transform(df['location'])

    # Save Encoders
    joblib.dump(le_product, os.path.join(MODELS_DIR, 'le_product.pkl'))
    joblib.dump(le_location, os.path.join(MODELS_DIR, 'le_location.pkl'))
    print("Saved Label Encoders.")

    # ---------------------------------------------------------
    # A. Price Recommendation Regressor
    # ---------------------------------------------------------
    price_features = ['product_enc', 'location_enc', 'month', 'quantity', 'current_price', 'mandi_benchmark', 'arrival_tonnes']
    X_price = df[price_features]
    y_price = df['recommended_price']

    X_train_p, X_test_p, y_train_p, y_test_p = train_test_split(X_price, y_price, test_size=0.2, random_state=42)
    price_model = RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42)
    price_model.fit(X_train_p, y_train_p)

    p_pred = price_model.predict(X_test_p)
    mae_p = mean_absolute_error(y_test_p, p_pred)
    r2_p = r2_score(y_test_p, p_pred)
    print(f"[Price Model] MAE: {mae_p:.2f} INR, R2 Score: {r2_p * 100:.2f}%")

    joblib.dump(price_model, os.path.join(MODELS_DIR, 'price_model.pkl'))
    print("Saved price_model.pkl")

    # ---------------------------------------------------------
    # B. Demand Prediction Regressor
    # ---------------------------------------------------------
    demand_features = ['product_enc', 'location_enc', 'month', 'quantity', 'current_price', 'mandi_benchmark']
    X_demand = df[demand_features]
    y_demand = df['expected_demand_kg']

    X_train_d, X_test_d, y_train_d, y_test_d = train_test_split(X_demand, y_demand, test_size=0.2, random_state=42)
    demand_model = RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42)
    demand_model.fit(X_train_d, y_train_d)

    d_pred = demand_model.predict(X_test_d)
    mae_d = mean_absolute_error(y_test_d, d_pred)
    r2_d = r2_score(y_test_d, d_pred)
    print(f"[Demand Model] MAE: {mae_d:.2f} kg, R2 Score: {r2_d * 100:.2f}%")

    joblib.dump(demand_model, os.path.join(MODELS_DIR, 'demand_model.pkl'))
    print("Saved demand_model.pkl")

    # ---------------------------------------------------------
    # C. Surplus Risk Classifier & Discount Recommender
    # ---------------------------------------------------------
    surplus_features = ['product_enc', 'current_stock_kg', 'expected_demand_kg', 'shelf_life_days', 'days_since_harvest', 'perishability']
    X_surplus = df[surplus_features]
    y_surplus = df['surplus_risk']

    le_risk = LabelEncoder()
    y_surplus_enc = le_risk.fit_transform(y_surplus)
    joblib.dump(le_risk, os.path.join(MODELS_DIR, 'le_risk.pkl'))

    X_train_s, X_test_s, y_train_s, y_test_s = train_test_split(X_surplus, y_surplus_enc, test_size=0.2, random_state=42)
    surplus_model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    surplus_model.fit(X_train_s, y_train_s)

    s_pred = surplus_model.predict(X_test_s)
    acc_s = accuracy_score(y_test_s, s_pred)
    print(f"[Surplus Model] Accuracy: {acc_s * 100:.2f}%")

    joblib.dump(surplus_model, os.path.join(MODELS_DIR, 'surplus_model.pkl'))
    print("Saved surplus_model.pkl")
    print("\nAll 3 models trained and saved successfully in ml_service/models/!")

if __name__ == '__main__':
    train_all_models()

