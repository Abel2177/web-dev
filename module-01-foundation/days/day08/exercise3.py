import random


def merge(left, right):
    result = []
    i = 0
    j = 0

    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result

def merge_sort(items):
    if len(items) <= 1:
        return items
    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])

    return merge(left, right)


random_list = [random.randint(1, 100) for _ in range(10)]

print("Original List:", random_list)

merge_sorted = merge_sort(random_list)

python_sorted = sorted(random_list)

print("Merge Sort Result:", merge_sorted)
print("Python sorted():", python_sorted)
