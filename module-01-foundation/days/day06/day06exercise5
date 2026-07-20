class NewsAgency:

    def __init__(self):
        self.subscribers = []

    def subscribe(self, subscriber):
        self.subscribers.append(subscriber)

    def notify(self, news):
        for subscriber in self.subscribers:
            subscriber.update(news)


class TVChannel:

    def update(self, news):
        print("TV:", news)


class RadioChannel:

    def update(self, news):
        print("Radio:", news)


agency = NewsAgency()

tv = TVChannel()
radio = RadioChannel()

agency.subscribe(tv)
agency.subscribe(radio)

agency.notify("Breaking News!")