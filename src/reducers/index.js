import {
  combineReducers
} from 'redux';
import money from './money';
import rooms from './rooms';

export default combineReducers({
  money,
  rooms
});