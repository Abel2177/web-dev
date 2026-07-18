class product:
    def __init__(self, name, price, quantity):
        self.nam = name
        self.pri = price
        self.__quantity = quantity

    @property
    def quantity(self):
      return self.__quantity
   
    @quantity.setter
    def quantity(self, value):
        if value >= 0:
            self.__quantity = value
        else:
            print("Quantity cannot be negative.")
            
    def restock(self, n):
        self.quantity += n
        print(f"{n} items sold.")
        print(f"current quantity:", self.quantity)

    def sell(self, n):
        if n <= self.quantity:
            self.quantity -= n
            print(f"{n} items sold")
            print(f"current quantity:", self.quantity)
        else:
            print("none")

    def full(self):
      print(f"Product Name: {self.nam}\n"
          f"Product Price: {self.pri} ETB\n"
          f"Quantity on Hand: {self.quantity}")
product1 = product("Paracetamol", 50, 20)
product1.full()
product1.sell(3)