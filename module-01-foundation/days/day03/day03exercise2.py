# Dictionary of grocery items and prices (ETB)
grocery = {
    "Coffee": 120,
    "Bread": 50,
    "Milk": 80,
    "Tomato": 40,
    "Sugar": 70
}

print("Price Report:")
for item, price in grocery.items():
    print(f"{item}: {price} ETB")
