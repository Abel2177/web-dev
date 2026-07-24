
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None



def height(node):

    if node is None:
        return 0

    left_height = height(node.left)
    right_height = height(node.right)

    return max(left_height, right_height) + 1



root = Node(700)
root.left = Node(450)
root.right = Node(1500)
root.left.left = Node(200)
root.right.left = Node(1200)
root.right.left.left = Node(1000)


print("Height of the tree:", height(root))