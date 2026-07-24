from collections import deque

bank_queue = deque()


bank_queue.append("Abel")
bank_queue.append("John")
bank_queue.append("Sara")
bank_queue.append("Helen")
bank_queue.append("David")

print("Customers in line:")
print(bank_queue)

print("\nServing customers:")


while len(bank_queue) > 0:
    customer = bank_queue.popleft()
    print(customer, "has been served.")