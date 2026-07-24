customers = [
    ("Almaz", 1500),
    ("Dawit", 700),
    ("Tigist", 200),
    ("Hannah", 1200),
    ("Sami", 450)
]

sorted_customers = sorted(customers, key=lambda customer: customer[1], reverse=True)

print(sorted_customers)