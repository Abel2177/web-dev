class Account:
    def __init__(self, owner, account_number, balance=0):
        self.owner = owner                    
        self.account_number = account_number  
        self.__balance = balance              

    @property
    def balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"{amount} ETB deposited successfully.")
        else:
            print("Deposit amount must be greater than 0.")

    def withdraw(self, amount):
        if amount <= 0:
            print("Withdrawal amount must be greater than 0.")
        elif amount > self.__balance:
            print("Insufficient balance.")
        else:
            self.__balance -= amount
            print(f"{amount} ETB withdrawn successfully.")

    def statement(self):
        print("----- Account Statement -----")
        print(f"Owner: {self.owner}")
        print(f"Account Number: {self.account_number}")
        print(f"Balance: {self.balance} ETB")

account1 = Account("Abel Alemayehu", "100200300")

account1.deposit(5000)
account1.withdraw(1200)

account1.statement()