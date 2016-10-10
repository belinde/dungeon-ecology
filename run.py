from DungeonEcology import Core

dungeon = Core.Dungeon("Deep Dungeon")

r = dungeon.create_room(23, 30)
r.add_carnivore('wolf')
r.add_herbivore('sheep')

for level, room in enumerate(dungeon.rooms):
    print('Livello', level)
    print('erbivori')
    for creature in room.herbivores:
        print('*', creature.race)
    print('carnivori')
    for creature in room.carnivores:
        print('*', creature.race)
