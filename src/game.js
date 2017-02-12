import {
    createStore
} from 'redux'
import combinedReducer from './reducers'
import Room from './entities/room'

export default class Game {

    constructor() {
        let persistedState = localStorage.getItem('DungeonEcologyState');
        this.store = createStore(
            combinedReducer,
            persistedState ? JSON.parse(persistedState) : {}
        );
        setInterval(() => this.saveGame(), 60000);
    }

    subscribe(callout) {
        let store = this.store;
        this.store.subscribe(function () {
            callout(store.getState());
        });
        callout(this.store.getState());
    }

    dispatch(type, value) {
        console.log("Dispatching " + type, value);
        this.store.dispatch({
            type: type,
            value: value
        });
    }

    saveGame() {
        console.log("Saving to localStorage");
        localStorage.setItem(
            'DungeonEcologyState',
            JSON.stringify(this.store.getState())
        );
    }

    gain(money) {
        this.dispatch('MONEY_GAIN', parseInt(money));
    }

    pay(money) {
        money = parseInt(money);
        if (money > this.currentMoney()) {
            throw "You don't have enough money!";
        }
        this.dispatch('MONEY_PAY', money);
    }

    getState(section) {
        return this.store.getState()[section];
    }

    currentMoney() {
        return this.getState('money');
    }

    createRoom(type, width, height) {
        let room = Room.load({
            type: type,
            width: width,
            height: height
        });
        this.pay(Room.price(room));
        this.dispatch('ROOM_ADD', room);
    }

    getRoom(index) {
        var data = this.getState('rooms');
        if (typeof data[index] !== 'undefined') {
            return data[index];
        }
        throw "Unexistent room: " + index;
    }
}
