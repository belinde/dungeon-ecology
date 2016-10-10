from typing import List


class LifeForm:
    def __init__(self, race: str):
        self.race = race


class Saprofite(LifeForm):
    pass


class Vegetable(LifeForm):
    pass


class Animal(LifeForm):
    pass


class Carnivore(Animal):
    pass


class Herbivore(Animal):
    pass


class Room:
    def __init__(self, height: int, width: int):
        self.height = height
        self.width = width
        self.saprofites = []  # type: List[Saprofite]
        self.vegetables = []  # type: List[Vegetable]
        self.carnivores = []  # type: List[Carnivore]
        self.herbivores = []  # type: List[Herbivore]

    def add_saprofite(self, race: str):
        self.saprofites.append(Saprofite(race))

    def add_vegetable(self, race: str):
        self.vegetables.append(Vegetable(race))

    def add_carnivore(self, race: str):
        self.carnivores.append(Carnivore(race))

    def add_herbivore(self, race: str):
        self.herbivores.append(Herbivore(race))


class Dungeon:
    def __init__(self, name):
        self.name = name
        self.rooms = []

    def create_room(self, height: int, width: int) -> Room:
        room = Room(height, width)
        self.rooms.append(room)
        return room
