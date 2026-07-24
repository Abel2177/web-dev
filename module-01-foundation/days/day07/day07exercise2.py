import time


account_list = []

for i in range(100000):
    account_list.append(f"ACC{i}")


account_dict = {}

for i in range(100000):
    account_dict[f"ACC{i}"] = f"Customer {i}"


target = "ACC99999"


start = time.perf_counter()

found = target in account_list

end = time.perf_counter()

print("List Search")
print("Found:", found)
print("Time:", end - start, "seconds")


start = time.perf_counter()

found = target in account_dict

end = time.perf_counter()

print("\nDictionary Search")
print("Found:", found)
print("Time:", end - start, "seconds")