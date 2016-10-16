import kivy
from DungeonEcology import Core
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label

kivy.require('1.9.1')


class MainScreen(BoxLayout):
    def __init__(self, **kwargs):
        super(MainScreen, self).__init__(**kwargs)
        self.dungeon = Core.Dungeon('Dongione')

    def create_room(self):
        self.dungeon.create_room(30, 40)
        self.ids.levels.add_widget(Label(text='Un piano'))


class DungeonEcologyApp(App):
    def build(self):
        return MainScreen()

if __name__ == '__main__':
    DungeonEcologyApp().run()
