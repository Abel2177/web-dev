class book:
    def __init__(self, author, title, page):
        self.auto = author
        self.tit = title
        self.pag = page
    def describe(self):
        print(f"{self.auto}: {self.tit}: {self.pag}")
abel = book("abela", "new-challange", 22)
abel.describe()