class Shape():
    def area(self):
        pass
class square(Shape):
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side * self.side

class circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.24 * self.radius * self.radius

class Rectangle(Shape):
    def __init__(self, length, width):
        self.length = length
        self.width = width
    def are(self):
        return self.length * self.width


Shapes = [
    square(4),
    circle(3),
    Rectangle(5, 2)
]

for shape in Shapes:
    print("Area:", shape.area())