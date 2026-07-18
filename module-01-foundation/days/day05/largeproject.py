class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"Deposited {amount} ETB. New balance: {self.balance} ETB")
        else:
            print("Deposit amount must be positive.")

    def withdraw(self, amount):
        if amount > 0 and amount <= self.balance:
            self.balance -= amount
            print(f"Withdrew {amount} ETB. Remaining balance: {self.balance} ETB")
        else:
            print("Insufficient funds or invalid amount.")

    def statement(self):
        print(f"Account ({self.account_number}) - Owner: {self.owner}, Balance: {self.balance} ETB")


class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0, rate=0.05):
        super().__init__(owner, account_number, balance)
        self.rate = rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)
        print(f"Interest of {interest} ETB added.")

    def statement(self):
        print(f"SavingsAccount ({self.account_number}) - Owner: {self.owner}, Balance: {self.balance} ETB")


class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0, overdraft=1000):
        super().__init__(owner, account_number, balance)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount > 0 and amount <= self.balance + self.overdraft:
            self.balance -= amount
            print(f"Withdrew {amount} ETB. Remaining balance: {self.balance} ETB")
        else:
            print("Overdraft limit exceeded or invalid amount.")

    def statement(self):
        print(f"CurrentAccount ({self.account_number}) - Owner: {self.owner}, Balance: {self.balance} ETB")



accounts = [
    SavingsAccount("Abela", "SA123", 2000, rate=0.1),
    CurrentAccount("Abela", "CA456", 500, overdraft=1500)
]

for acc in accounts:
    acc.statement()

accounts[0].add_interest()
accounts[1].withdraw(1800)

for acc in accounts:
    acc.statement()
