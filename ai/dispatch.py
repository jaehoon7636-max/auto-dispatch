import sys
import json
from geopy.distance import geodesic

def assign_driver(order, drivers):
    order_loc = (order['lat'], order['lng'])
    best_driver = None
    min_distance = float('inf')

    for driver in drivers:
        if driver['status'] != 'available':
            continue
        driver_loc = (driver['lat'], driver['lng'])
        dist = geodesic(order_loc, driver_loc).km
        if dist < min_distance:
            min_distance = dist
            best_driver = driver

    return best_driver

if __name__ == '__main__':
    input_data = json.loads(sys.stdin.read())
    order = input_data['order']
    drivers = input_data['drivers']
    result = assign_driver(order, drivers)
    print(json.dumps(result))