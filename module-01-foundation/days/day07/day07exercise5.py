class Node:
    def __init__(self, data):
        self.data = data      
        self.next = None      

class LinkedList:
    def __init__(self):
        self.head = None      

    def push_front(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node


    def print_all(self):
        current = self.head

        while current is not None:
            print(current.data)
            current = current.next



my_list = LinkedList()

# Add nodes to the front
my_list.push_front("Abel")
my_list.push_front("John")
my_list.push_front("Sara")
my_list.push_front("Helen")


print("Linked List:")
my_list.print_all()