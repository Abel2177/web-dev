with open("names.txt", "w") as file:
    file.write("Alice\n")
    file.write("Bob\n")
    file.write("Charlie\n")


with open("names.txt", "r") as file:
    for line in file:
        print(line.strip())
