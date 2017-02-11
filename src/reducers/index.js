import { combineReducers } from 'redux';
import {money} from './money';
import {rooms} from './rooms';

const DungeonEcologyApp = combineReducers({
  money, rooms
})

export { DungeonEcologyApp };