# generate_shelter_data.py

import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib
import os

# Load dataset
df = pd.read_csv('Shelter_Resources_Prediction.csv')

# Keep only the needed features
X = df[['current_occupancy', 'capacity']]
y = df[['food_needed', 'water_required', 'medical_kits', 'volunteers_required']]

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
pkl = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(pkl, 'shelter_resource_model.pkl')
joblib.dump(model, model_path)

print("✅ Model trained and saved without using disaster_type.")
