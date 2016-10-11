# from DungeonEcology import Core
#
# dungeon = Core.Dungeon("Deep Dungeon")
#
# r = dungeon.create_room(23, 30)
# r.add_carnivore('wolf')
# r.add_herbivore('sheep')
#
#
# dungeon.print()

import kivy

from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label

kivy.require('1.9.1')


class MainScreen(BoxLayout):
    def __init__(self, **kwargs):
        super(MainScreen, self).__init__(**kwargs)
        self.col_sx = BoxLayout(orientation='vertical')
        self.add_widget(self.col_sx)
        self.col_cent = BoxLayout(orientation='vertical')
        self.add_widget(self.col_cent)
        self.col_dx = BoxLayout(orientation='vertical')
        self.add_widget(self.col_dx)

        self.col_sx.add_widget(Label(text='Livelli'))
        self.col_cent.add_widget(Label(text='Creature'))
        self.col_dx.add_widget(Label(text='Azioni'))


class DungeonEcologyApp(App):
    def build(self):
        return MainScreen()


if __name__ == '__main__':
    DungeonEcologyApp().run()
