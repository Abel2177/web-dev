# Dictionary of grocery items and prices (ETB)
grocery = {
    "Coffee": 220,
    "Bread": 50,
    "Milk": 80,
    "Tomato": 40,
    "Sugar": 70
}

print("Price Report:")
for item, price in grocery.items():
    if price <= 200:
     print(f"{item}: {price} ETB")
