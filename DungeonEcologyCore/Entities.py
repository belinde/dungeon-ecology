class Dungeon:
    def __init__(self, name):
        self.name = name
    def getName(self):
        return self.name

class LifeForm:
    def __init__(self, type):
        self.type = type
    def getName(self):
        return self.type

class Saprofite(LifeForm):
    pass

class Vegetable(LifeForm):
    pass

class Animal(LifeForm):
    pass

class Carnivorous(Animal):
    pass

class Herbivore(Animal):
    pass

class Omnivorous(Carnivorous,Herbivore):
    pass