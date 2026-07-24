class Vehicle:
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"Vehicle: {self.make} {self.model}")


class Car(Vehicle):
    def __init__(self, make, model, doors):
        super().__init__(make, model)
        self.doors = doors

    def describe(self):
        print(f"Car: {self.make} {self.model}, {self.doors} doors")


class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity  # capacity in tons

    def describe(self):
        print(f"Truck: {self.make} {self.model}, capacity {self.capacity} tons")



v = Vehicle("Generic", "ModelX")
c = Car("Honda", "Civic", 4)
t = Truck("Volvo", "FH16", 18)

v.describe()
c.describe()
t.describe()

