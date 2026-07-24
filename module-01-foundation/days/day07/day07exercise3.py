class Stack:
    def __init__(self):
        self.items = []

  
    def push(self, item):
        self.items.append(item)

   
    def pop(self):
        if len(self.items) == 0:
            return "Stack is empty"
        return self.items.pop()

    def peek(self):
        if len(self.items) == 0:
            return "Stack is empty"
        return self.items[-1]



names = ["Abel", "John", "Sara", "Helen", "David"]


stack = Stack()

# Push all names onto the stack
for name in names:
    stack.push(name)

# Peek at the top item
print("Top item:", stack.peek())

# Reverse the list using the stack
reversed_names = []

while len(stack.items) > 0:
    reversed_names.append(stack.pop())

print("Original List:", names)
print("Reversed List:", reversed_names)