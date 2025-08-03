import csv
import random

def random_coord(base, variance=0.01):
    return base + random.uniform(-variance, variance)

with open('ai/dispatch_data.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['order_lat', 'order_lng', 'driver_lat', 'driver_lng', 'driver_rating', 'driver_count', 'selected'])

    for _ in range(500):
        order_lat = random_coord(37.56)
        order_lng = random_coord(126.97)

        for i in range(3):
            driver_lat = random_coord(order_lat)
            driver_lng = random_coord(order_lng)
            rating = round(random.uniform(4.0, 5.0), 2)
            count = random.randint(0, 200)
            selected = 1 if i == 0 else 0
            writer.writerow([order_lat, order_lng, driver_lat, driver_lng, rating, count, selected])
