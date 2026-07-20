class Circle:
    def draw(self):
        print("Drawing a Circle")


class Square:
    def draw(self):
        print("Drawing a Square")


class Triangle:
    def draw(self):
        print("Drawing a Triangle")

class ShapeFactory:

    @staticmethod
    def create(kind):

        if kind == "circle":
            return Circle()

        elif kind == "square":
            return Square()

        elif kind == "triangle":
            return Triangle()

        else:
            return None
        
shape1 = ShapeFactory.create("circle")
shape2 = ShapeFactory.create("square")
shape3 = ShapeFactory.create("triangle")

shape1.draw()
shape2.draw()
shape3.draw()