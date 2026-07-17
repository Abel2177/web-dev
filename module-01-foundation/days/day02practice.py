
temperature = float(input("Enter the temperature in °C: "))

if temperature < 15:
    print("Cold")
elif temperature <= 28:
    print("Warm")
else:
    print("Hot")

for i in range(1, 10):
 print(f"Recipet #N {i}")

for i in range(1, 20):
 if i % 2 == 0:
  print(i)
  