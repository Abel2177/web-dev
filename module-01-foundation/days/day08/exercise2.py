def binary_search(items, target):
    left = 0
    right = len(items) - 1

    while left <= right:
        mid = (left + right) // 2

        if items[mid] == target:
            return mid
        elif items[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

balances = [200, 450, 700, 1000, 1200, 1500, 1800]

target = 1200

result = binary_search(balances, target)

if result != -1:
    print(f"Balance {target} found at index {result}.")
else:
    print("Balance not found.")
    
