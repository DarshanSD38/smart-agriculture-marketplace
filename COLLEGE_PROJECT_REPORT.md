# AI-Powered Smart Agriculture Marketplace & Support System
## 5th Semester Minor Project Report & Viva Documentation

---

### 1. Executive Summary & Abstract
In traditional agricultural supply chains, smallholder farmers lose 30-40% of their crop value to multi-tier middlemen, lack timely access to local APMC mandi price discovery, suffer inventory loss from perishable harvest spoilage, and struggle to mobilize seasonal farm laborers. 

**AgriSmart** is an end-to-end digital ecosystem developed using **React.js, Node.js, Express.js, MongoDB, and Python Machine Learning**. The platform directly connects **Farmers**, **Retail Customers**, and **Agricultural Labourers**. It incorporates:
1. **AI Price Recommendation Regressor** (Scikit-Learn Random Forest, R² = 99.96%)
2. **AI Demand Prediction Regressor** (Scikit-Learn + Pandas, R² = 87.04%)
3. **Surplus Spoilage Risk Classifier & Dynamic Markdown Engine** (Scikit-Learn, Accuracy = 85.20%)
4. **Deep Learning Plant Disease Pathology Classifier** (Keras 3 / TensorFlow CNN covering 39 PlantVillage disease classes)
5. **Crop Suitability Recommendation Classifier** (Random Forest analyzing N, P, K, pH, rainfall, and climate)
6. **Direct Commerce, Smart Cart, Delivery Tracking Stepper & Labour Matching Marketplace**.

---

### 2. System Architecture & Tech Stack

```
[ CLIENT TIER ]
React.js (Vite, JavaScript, CSS3, React Router v6, Lucide Icons)
Port: 3000

        │  HTTP REST (JSON & Multipart Form-Data)
        ▼
[ APPLICATION TIER ]
Node.js + Express.js
Port: 5000
├── JWT Authentication & Role-Based Access Control (Farmer, Customer, Labour, Admin)
├── Multer File Upload Handling (server/uploads)
├── REST Controllers & Mongoose Query Layer
└── aiBridge.js (Dual HTTP / CLI Subprocess Invoker)

        │                                     │
        ▼                                     ▼
[ DATABASE TIER ]                      [ MACHINE LEARNING TIER ]
MongoDB Community 9.0                  Python (TensorFlow + Scikit-Learn + Pandas)
Port: 27017 / smart_agri_db            Port: 5001 / ml_service
├── users, products, orders            ├── plant_disease_model.keras (39-Class CNN)
├── labourjobs, applications           ├── crop_recommendation.pkl (Random Forest)
├── reviews, cropreports               ├── price_model.pkl (RF Regressor, R²=99.96%)
└── notifications, groupbuys           ├── demand_model.pkl (RF Regressor, R²=87.04%)
                                       └── surplus_model.pkl (RF Classifier, Acc=85.20%)
```

---

### 3. Machine Learning Algorithms & Training Metrics

| Model | Objective | Algorithm | Dataset | Performance Metric |
|---|---|---|---|---|
| **Price Predictor** | Predicts optimum farmgate selling price range | `RandomForestRegressor(n_estimators=100, max_depth=12)` | 5,000 Indian Mandi arrivals and seasonal pricing records | **R² = 99.96%**, **MAE = ₹0.36** |
| **Demand Forecaster** | Projects weekly purchase volume & 6-month seasonal curve | `RandomForestRegressor(n_estimators=100, max_depth=12)` | 5,000 retail consumption & festival trend records | **R² = 87.04%**, **MAE = 59.85 kg** |
| **Surplus Risk Engine** | Classifies perishability & recommends markdown discount | `RandomForestClassifier(n_estimators=100, max_depth=10)` | 5,000 stock vs demand vs shelf-life records | **Accuracy = 85.20%** |
| **Plant Pathology CNN** | Diagnoses leaf fungal, bacterial, and viral diseases | 7-Layer Deep Convolutional Neural Network (CNN) | PlantVillage dataset (39 disease & healthy classes) | Multi-class Softmax classification (224×224 RGB) |
| **Crop Recommendation** | Recommends optimal crop from soil & weather data | `RandomForestClassifier` + `LabelEncoder` | 2,200 records (`Crop_recommendation.csv`) | Multi-class prediction across 22 crops |

---

### 4. Database Schema (Mongoose Models)

1. **User Schema**: `name`, `email`, `password` (bcrypt hashed), `role` (`farmer`, `customer`, `labour`, `admin`), `phone`, `location`, `avatar`, `verified`.
2. **Product Schema**: `name`, `category`, `price`, `unit`, `quantity`, `availableQuantity`, `harvestDate`, `location`, `farmer` (ref User), `isAgriInput`, `status`.
3. **Order Schema**: `customer` (ref User), `items` (array with product, qty, price, farmer), `subtotal`, `deliveryFee`, `total`, `orderStatus` (Placed, Confirmed, Preparing, Out for Delivery, Delivered), `trackingSteps`.
4. **LabourJob Schema**: `farmer` (ref User), `title`, `location`, `requiredSkill`, `workersNeeded`, `workersApplied`, `dailyPayment`, `duration`, `status` (Open, Closed).
5. **CropReport Schema**: `farmer` (ref User), `cropName`, `imageUrl`, `analysisResult` (`issue`, `confidence`, `severity`, `organicRemedy`, `chemicalRemedy`, `recommendedInputs`).

---

### 5. Viva Presentation Slide-by-Slide Guide (PPT Outline)

- **Slide 1: Title Slide**
  - Project Title: AI-Powered Smart Agriculture Marketplace & Support System
  - Domain: Full-Stack Web Development & Machine Learning
  - Presented by: [Your Name] (5th Sem Minor Project)
  - Guided by: [Guide Name]

- **Slide 2: Problem Statement**
  - Middleman exploitation reduces farmer realizations by 35%.
  - Perishable crop surplus rot due to lack of real-time demand insights.
  - Agricultural crop diseases go untreated without quick pathological diagnosis.
  - Seasonal labor shortages during harvest peaks.

- **Slide 3: Proposed Solution**
  - Integrated digital ecosystem with 4 distinct role portals (Farmer, Customer, Labour, Admin).
  - Machine learning engines for pricing, demand forecasting, and surplus mitigation.
  - Deep learning computer vision for leaf pathology.

- **Slide 4: System Architecture**
  - Presentation of the 3-Tier diagram (React &rarr; Node.js/Express &rarr; MongoDB & Python ML).

- **Slide 5: Machine Learning Models**
  - CNN model for 39 leaf disease categories.
  - Random Forest Regressors for Mandi price discovery (R² = 99.96%) and demand forecasting.
  - Surplus risk classifier with dynamic markdown percentages.

- **Slide 6: Farmer Features Demo**
  - Product management, real-time stock decrements.
  - AI Price Recommendation page (`/farmer/ai-price`).
  - Demand Prediction page (`/farmer/demand-prediction`).
  - Crop Recommendation page (`/farmer/crop-recommendation`).

- **Slide 7: Computer Vision Crop Health**
  - Upload foliage image &rarr; Preprocessed to 224×224 tensor &rarr; CNN inference &rarr; Severity, organic remedies, and chemical treatment recommendations.

- **Slide 8: Direct Fair Commerce & Customer Portal**
  - Marketplace browsing, filters, Smart Basket, and Order tracking with 5-stage timeline stepper.

- **Slide 9: Labour Mobilization Hub**
  - Daily wage postings, skill filters (Harvesting, Pruning, Tractor Driving), one-click job applications.

- **Slide 10: Security & Performance**
  - JWT authentication, bcryptjs hashing, role-based middleware, indexed MongoDB queries, 30ms ML response times.

- **Slide 11: Testing & Verification**
  - Postman API collection with 16 automated endpoints.
  - Production build bundle size: 486 KB, built in 2.3 seconds.

- **Slide 12: Conclusion & Future Scope**
  - Satellite remote sensing integration, multi-lingual audio assistant, payment gateway integration (UPI / Razorpay).

