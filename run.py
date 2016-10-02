from DungeonEcologyCore import Entities
import sys

dungeon = Entities.Dungeon("Octo")
dungeon.addLifeForm(Entities.Herbivore('mucca'))
dungeon.addLifeForm(Entities.Carnivorous('lupo'))
dungeon.listLifeForms()