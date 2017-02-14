import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Game from './game';
import DungeonEcologyApp from './components'

ReactDOM.render(
  <Provider store={Game.store}><DungeonEcologyApp /></Provider>,
  document.getElementById('DungeonEcologyRoot')
)