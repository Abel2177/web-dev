
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None



def insert(root, value):
    if root is None:
        return Node(value)
    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)

    return root

def inorder(root):
    if root is not None:
        inorder(root.left)
        print(root.value)
        inorder(root.right)

balances = [700, 1500, 450, 1200, 200, 1000]
root = None
for balance in balances:
    root = insert(root, balance)

print("Balances in sorted order:")
inorder(root)