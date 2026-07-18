def load_stock():
    stock = {}

    try:
        with open("stock.txt", "r") as file:
            for line in file:
                item, quantity = line.strip().split(",")
                stock[item] = int(quantity)

    except FileNotFoundError:
        print("Error: stock.txt file not found.")

    return stock


def update_quantity(stock, item, amount):
    """
    Increase or decrease an item's quantity.
    Positive amount = add stock
    Negative amount = remove stock
    """

    if item in stock:
        stock[item] += amount
    else:
        stock[item] = amount


def show_low_stock(stock):
    print("\nLow Stock Items (below 10):")

    for item, quantity in stock.items():
        if quantity < 10:
            print(f"{item}: {quantity}")


def save_stock(stock):
    with open("stock.txt", "w") as file:
        for item, quantity in stock.items():
            file.write(f"{item},{quantity}\n")




pharmacy_stock = load_stock()

print("Current Stock:")
for item, quantity in pharmacy_stock.items():
    print(f"{item}: {quantity}")



update_quantity(pharmacy_stock, "Paracetamol", -5)   # Sold 5
update_quantity(pharmacy_stock, "Amoxicillin", 10)   # New supply added
update_quantity(pharmacy_stock, "Insulin", -2)       # Sold 2


show_low_stock(pharmacy_stock)


save_stock(pharmacy_stock)

print("\nStock updated successfully!")