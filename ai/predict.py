import joblib
import pandas as pd

model = joblib.load('ai/dispatch_model.pkl')

candidates = pd.DataFrame([
    {
        'order_lat': 37.56,
        'order_lng': 126.97,
        'driver_lat': 37.55,
        'driver_lng': 126.96,
        'driver_rating': 4.8,
        'driver_count': 120
    },
    {
        'order_lat': 37.56,
        'order_lng': 126.97,
        'driver_lat': 37.54,
        'driver_lng': 126.93,
        'driver_rating': 4.6,
        'driver_count': 50
    }
])

predictions = model.predict(candidates)
print("기사 선택 여부:", predictions)
