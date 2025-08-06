# generate_shelter_data.py

import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
import joblib

# Load dataset
df = pd.read_csv('Shelter_Resources_Prediction.csv')

# Split features and targets
X = df[['current_occupancy', 'capacity', 'disaster_type']]
y = df[['food_needed', 'water_required', 'medical_kits', 'volunteers_required']]

# One-hot encode disaster_type
encoder = OneHotEncoder()
X_encoded = encoder.fit_transform(X[['disaster_type']]).toarray()
encoded_cols = encoder.get_feature_names_out(['disaster_type'])

# Merge with numerical features
X_final = pd.concat([
    pd.DataFrame(X_encoded, columns=encoded_cols),
    X[['current_occupancy', 'capacity']].reset_index(drop=True)
], axis=1)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X_final, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model and encoder
joblib.dump(model, 'shelter_resource_model.pkl')
joblib.dump(encoder, 'disaster_type_encoder.pkl')

print("✅ Model and encoder saved.")
