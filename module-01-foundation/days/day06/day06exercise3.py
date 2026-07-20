class AppSetting():
    _instance = None
    def __new__(cls):
      if cls._instance is None:
         cls._instance = super().__new__(cls)
         cls._instance.currency = "ETB"
      return cls._instance
    
settings1 = AppSetting()
settings2 = AppSetting()

print(settings1.currency)
print(settings2.currency)

'print(settings1 is settings2)'