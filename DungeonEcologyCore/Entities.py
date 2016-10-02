

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


class Dungeon:
    def __init__(self, name):
        self.name = name
        self.lifeForms = []

    def getName(self) -> str:
        return self.name

    def addLifeForm(self, subject: LifeForm):
        self.lifeForms.append(subject)

    def listLifeForms(self):
        for form in self.lifeForms:
            print(form.getName())
