import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load data
df = pd.read_csv('ai/dispatch_data.csv')

X = df[['order_lat', 'order_lng', 'driver_lat', 'driver_lng', 'driver_rating', 'driver_count']]
y = df['selected']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

joblib.dump(model, 'ai/dispatch_model.pkl')

print("Accuracy:", model.score(X_test, y_test))
