
def total(nums):

    if len(nums) == 0:
        return 0

    return nums[0] + total(nums[1:])
def count_down(n):
  
    if n <= 0:
        return
    print(n)
    count_down(n - 1)

numbers = [2, 4, 6, 8, 10]

print("Total:", total(numbers))

print("Count Down:")
count_down(5)