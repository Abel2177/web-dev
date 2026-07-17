temperature = float(input("Enter the temperature in °C: "))

if temperature < 15:
    print("Cold")
elif temperature <= 28:
    print("Warm")
else:
    print("Hot")