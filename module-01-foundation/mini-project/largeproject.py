from collections import deque

# Singleton Bank Configuration

class BankConfig:

    _instance = None

    def __new__(cls):

        if cls._instance is None:
            cls._instance = super().__new__(cls)

            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000

        return cls._instance




# Observer Pattern

class Observer:

    def update(self, message):
        pass

class SMSAlert(Observer):

    def update(self, message):
        print("SMS:", message)

class AuditLog(Observer):

    def update(self, message):
        print("AUDIT:", message)


# Account Class

class Account:

    def __init__(self, owner, account_number, balance=0):

        self.owner = owner

        self.account_number = account_number

        self.__balance = balance

        self.history = []      # stack

        self.observers = []

    # read only property

    @property
    def balance(self):

        return self.__balance

    def subscribe(self, observer):

        self.observers.append(observer)
    def _notify(self, message):

        for observer in self.observers:

            observer.update(message)

    def deposit(self, amount):

        if amount <= 0:

            raise ValueError("Invalid deposit")

        self.__balance += amount

        self.history.append(
            ("deposit", amount)
        )
        self._notify(
            f"{amount} ETB deposited"
        )
    def withdraw(self, amount):

        if amount <= 0:

            raise ValueError("Invalid withdrawal")

        if amount > self.__balance:

            raise ValueError("Insufficient balance")

        self.__balance -= amount

        self.history.append(
            ("withdraw", amount)
        )

        self._notify(
            f"{amount} ETB withdrawn"
        )

    def undo_last(self):

        if len(self.history) == 0:

            return

        action, amount = self.history.pop()

        if action == "deposit":

            self.__balance -= amount

        elif action == "withdraw":

            self.__balance += amount

    def statement(self):

        print(
            f"Owner: {self.owner}\n"
            f"Account Number: {self.account_number}\n"
            f"Balance: {self.balance} ETB"
        )

# Savings Account


class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0):

        super().__init__(
            owner,
            number,
            balance
        )

        self.rate = BankConfig().interest_rate
    def add_interest(self):

        interest = self.balance * self.rate

        self.deposit(interest)
    def statement(self):

        print("Savings Account")

        super().statement()

# Current Account
class CurrentAccount(Account):

    def __init__(self, owner, number, balance=0):

        super().__init__(
            owner,
            number,
            balance
        )

        self.limit = BankConfig().overdraft_limit
    def withdraw(self, amount):

        if amount <= 0:

            raise ValueError("Invalid amount")


        if self.balance - amount < -self.limit:

            raise ValueError("Overdraft exceeded")


        super().withdraw(amount)

    def statement(self):

        print("Current Account")

        super().statement()

# Factory


class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):

        if kind.lower() == "savings":

            return SavingsAccount(
                owner,
                number,
                balance
            )
        elif kind.lower() == "current":

            return CurrentAccount(
                owner,
                number,
                balance
            )
        else:

            raise ValueError("Unknown type")

# Branch Tree

class Branch:
    def __init__(self, name):

        self.name = name

        self.children = []

        self.accounts = []
    def add_child(self, branch):

        self.children.append(branch)
    def add_account(self, account):

        self.accounts.append(account)


def total_balance(branch):

    total = 0
    for account in branch.accounts:

        total += account.balance

    for child in branch.children:

        total += total_balance(child)
    return total

# Bank Management


class Bank:
    def __init__(self):

        self.accounts = {}

        self.account_list = []

        self.branches = []

        self.transfers = {}

    # O(1)

    def add(self, account):

        self.accounts[
            account.account_number
        ] = account


        self.account_list.append(account)

    def find(self, number):

        return self.accounts.get(number)

    def list_all(self):

        return self.account_list
    # Sorting

    def top_by_balance(self, n):

        return sorted(
            self.account_list,
            key=lambda a:a.balance,
            reverse=True
        )[:n]

    # Binary Search

    def binary_search(self, numbers, target):

        left = 0
        right = len(numbers)-1
        while left <= right:

            mid = (left+right)//2

            if numbers[mid] == target:

                return mid


            elif numbers[mid] < target:

                left = mid+1

            else:

                right = mid-1
        return -1


    def find_by_number(self, number):

        numbers = sorted(
            self.accounts.keys()
        )

        index = self.binary_search(
            numbers,
            number
        )

        if index != -1:

            return self.accounts[
                numbers[index]
            ]


        return None

   

    def total_transactions(self, number):

        account = self.find(number)
        def total(history):

            if len(history)==0:

                return 0
            return history[0][1] + total(history[1:])
        return total(account.history)

    # Branch

    def add_branch(self, branch):

        self.branches.append(branch)

    # Transfer graph

    def add_transfer(self, sender, receiver):

        if sender not in self.transfers:

            self.transfers[sender] = []


        self.transfers[sender].append(receiver)

    # BFS

    def bfs(self, start):

        visited = set()

        queue = deque([start])

        while queue:
            current = queue.popleft()
            if current not in visited:
                visited.add(current)
                for receiver in self.transfers.get(current, []):

                    queue.append(receiver)
        return visited


# TEST SYSTEM

bank = Bank()

a1 = AccountFactory.create(
    "savings",
    "Abel",
    "1001",
    5000
)

a2 = AccountFactory.create(
    "current",
    "Dawit",
    "1002",
    3000
)

a3 = AccountFactory.create(
    "savings",
    "Hana",
    "1003",
    2000
)

a4 = AccountFactory.create(
    "current",
    "Sara",
    "1004",
    1500
)

bank.add(a1)

bank.add(a2)

bank.add(a3)

bank.add(a4)

# Observer

a1.subscribe(SMSAlert())

a1.subscribe(AuditLog())

a1.deposit(1000)

a1.withdraw(500)


a1.add_interest()

a1.statement()

# Branch Example

head = Branch("Head Office")

addis = Branch("Addis Branch")

bole = Branch("Bole Sub Branch")

head.add_child(addis)

addis.add_child(bole)

head.add_account(a1)

addis.add_account(a2)

bole.add_account(a3)

bole.add_account(a4)

print(
    "Branch Balance:",
    total_balance(head)
)

# Transfer Graph

bank.add_transfer("1001","1002")

bank.add_transfer("1001","1003")

bank.add_transfer("1002","1004")

print(
    "Reachable:",
    bank.bfs("1001")
)

print(
    "Top:",
    [a.owner for a in bank.top_by_balance(2)]
)

print(
    "Transactions:",
    bank.total_transactions("1001")
)