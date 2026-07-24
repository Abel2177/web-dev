# ==============================
# Singleton Pattern
# ==============================

class BankConfig:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000
        return cls._instance


# ==============================
# Observer Pattern
# ==============================

class SMSAlert:
    def update(self, message):
        print(f"SMS: {message}")


class AuditLog:
    def update(self, message):
        print(f"AUDIT: {message}")


# ==============================
# Base Account Class (SRP)
# ==============================

class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner
        self.account_number = account_number
        self.balance = balance
        self.observers = []

    # Subscribe an observer
    def subscribe(self, observer):
        self.observers.append(observer)

    # Notify all observers
    def _notify(self, message):
        for observer in self.observers:
            observer.update(message)

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            self._notify(
                f"{self.owner} deposited {amount} ETB. Balance = {self.balance}"
            )
        else:
            print("Invalid deposit amount.")

    def withdraw(self, amount):
        if amount > 0 and amount <= self.balance:
            self.balance -= amount
            self._notify(
                f"{self.owner} withdrew {amount} ETB. Balance = {self.balance}"
            )
        else:
            print("Insufficient funds.")

    def statement(self):
        print(
            f"{self.owner} | {self.account_number} | Balance: {self.balance} ETB"
        )


# ==============================
# Savings Account
# ==============================

class SavingsAccount(Account):

    def __init__(self, owner, account_number, balance=0):
        super().__init__(owner, account_number, balance)
        self.rate = BankConfig().interest_rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.deposit(interest)

    def statement(self):
        print(
            f"SavingsAccount | {self.owner} | Balance: {self.balance} ETB"
        )


# ==============================
# Current Account
# ==============================

class CurrentAccount(Account):

    def __init__(self, owner, account_number, balance=0):
        super().__init__(owner, account_number, balance)
        self.overdraft = BankConfig().overdraft_limit

    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft:
            self.balance -= amount
            self._notify(
                f"{self.owner} withdrew {amount} ETB. Balance = {self.balance}"
            )
        else:
            print("Overdraft limit exceeded.")

    def statement(self):
        print(
            f"CurrentAccount | {self.owner} | Balance: {self.balance} ETB"
        )


# ==============================
# Factory Pattern
# ==============================

class AccountFactory:

    @staticmethod
    def create(kind, owner, number, balance=0):

        if kind.lower() == "savings":
            return SavingsAccount(owner, number, balance)

        elif kind.lower() == "current":
            return CurrentAccount(owner, number, balance)

        else:
            raise ValueError("Invalid account type")


# ==============================
# Main Program
# ==============================

sms = SMSAlert()
audit = AuditLog()

acc1 = AccountFactory.create(
    "savings",
    "Abela",
    "SA123",
    2000
)

acc2 = AccountFactory.create(
    "current",
    "Abela",
    "CA456",
    500
)

# Subscribe observers
acc1.subscribe(sms)
acc1.subscribe(audit)

acc2.subscribe(sms)
acc2.subscribe(audit)

acc1.statement()
acc2.statement()

acc1.add_interest()
acc2.withdraw(1200)

acc1.statement()
acc2.statement()