from DungeonEcology import Core

dungeon = Core.Dungeon("Deep Dungeon")

r = dungeon.create_room(23, 30)
r.add_carnivore('wolf')
r.add_herbivore('sheep')


dungeon.print()
