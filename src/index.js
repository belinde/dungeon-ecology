import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Game from './game';
import Money from './components/money'
import {database} from './tools'

console.log( database('setup', 'startingMoney'));
const game = new Game();

ReactDOM.render(
  <Provider store={game.store}><Money /></Provider>,
  document.getElementById('root')
)

export default game;