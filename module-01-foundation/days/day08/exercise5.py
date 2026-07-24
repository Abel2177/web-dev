def has_pair(nums, target):
    left = 0
    right = len(nums) - 1

    while left < right:
        current_sum = nums[left] + nums[right]

        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1     
        else:
            right -= 1    
    return False

numbers = [2, 4, 5, 7, 9, 11, 15]

print(has_pair(numbers, 16))  
print(has_pair(numbers, 20))  
print(has_pair(numbers, 8))   