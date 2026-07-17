def apply_discount(price, percent=10):
    discount_amount = price * (percent / 100)
    return price - discount_amount

print(apply_discount(100))        

