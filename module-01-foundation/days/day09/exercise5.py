import heapq

priority_queue = []

heapq.heappush(priority_queue, (3, "Write report"))
heapq.heappush(priority_queue, (1, "Fix bug"))
heapq.heappush(priority_queue, (5, "Attend meeting"))
heapq.heappush(priority_queue, (2, "Send email"))
heapq.heappush(priority_queue, (4, "Update database"))

print("Tasks in priority order:")

while priority_queue:
    priority, task = heapq.heappop(priority_queue)
    print(priority, "-", task)