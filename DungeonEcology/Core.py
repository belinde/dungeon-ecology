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
        self.height = height  # type: int
        self.width = width  # type: int
        self.saprofites = []  # type: List[Saprofite]
        self.vegetables = []  # type: List[Vegetable]
        self.carnivores = []  # type: List[Carnivore]
        self.herbivores = []  # type: List[Herbivore]

    @staticmethod
    def __add_creature(list_var: List, class_name, race):
        creature = class_name(race)
        list_var.append(creature)
        return creature

    def add_saprofite(self, race: str) -> Saprofite:
        return self.__add_creature(self.saprofites, Saprofite, race)

    def add_vegetable(self, race: str) -> Vegetable:
        return self.__add_creature(self.vegetables, Vegetable, race)

    def add_carnivore(self, race: str) -> Carnivore:
        return self.__add_creature(self.carnivores, Carnivore, race)

    def add_herbivore(self, race: str) -> Herbivore:
        return self.__add_creature(self.herbivores, Herbivore, race)

    @staticmethod
    def __print(title, list_var: List[LifeForm]):
        print(' ', title)
        for creature in list_var:
            print('  *', creature.race)

    def print(self):
        self.__print('vegetali', self.vegetables)
        self.__print('erbivori', self.herbivores)
        self.__print('carnivori', self.carnivores)
        self.__print('saprofiti', self.saprofites)


class Dungeon:
    def __init__(self, name):
        self.name = name  # type: str
        self.rooms = []  # type: List[Room]

    def create_room(self, height: int, width: int) -> Room:
        room = Room(height, width)
        self.rooms.append(room)
        return room

    def print(self):
        for level, room in enumerate(self.rooms):
            print('Livello', level)
            room.print()
