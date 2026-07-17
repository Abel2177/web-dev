customers = [ ("almaz", 1500), ("dawit", 700), ("tigist", 200),
("hannah", 1200), ("sami", 450)]
def check(balance):
    if balance >= 1000:
        return "premiume"
    elif balance >= 500:
        return "standard"
    else:
        return "basic"
premium_count = 0
standard_count = 0
basic_count = 0

for name, balance in customers:
   customer_tier = check(balance)
   print(f"{name} {customer_tier} ({balance} ETB)")
   if customer_tier == "premiume":
        premium_count += 1
   elif customer_tier == "standard":
        standard_count += 1
   else:
        basic_count += 1
print(f"Premium: {premium_count}")
print(f"Standard: {standard_count}")
print(f"Basic: {basic_count}")



