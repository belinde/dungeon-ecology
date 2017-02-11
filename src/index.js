import { createStore } from 'redux'
import { DungeonEcologyApp as combinedReducer } from './reducers'
import { Room } from './entities/room'

const Game = class Game {

    constructor() {
        let persistedState = localStorage.getItem('DungeonEcologyState');
        this.store = createStore(
            combinedReducer,
            persistedState ? JSON.parse(persistedState) : {}
        );
        let game = this;
        setInterval(function() {
            game.saveGame()
        }, 60000);
    }

    subscribe(callout) {
        let store = this.store;
        this.store.subscribe(function() {
            callout(store.getState());
        });
        callout(this.store.getState());
    }

    saveGame() {
        console.log("Saving to localStorage");
        localStorage.setItem('DungeonEcologyState', JSON.stringify(this.store.getState()));
    }

    gain(money) {
        this.store.dispatch({
            type: 'MONEY_GAIN',
            value: parseInt(money)
        });
    }

    pay(money) {
        money = parseInt(money);
        if (money > this.currentMoney()) {
            throw "You don't have enough money!";
        }
        this.store.dispatch({
            type: 'MONEY_PAY',
            value: money
        });
    }

    getState(section) {
        return this.store.getState()[section];
    }

    currentMoney() {
        return this.getState('money');
    }

    createRoom( type, width, height ) {
        var room = new Room({type:type, width:width, height: height});
        this.pay( room.price() );
        this.store.dispatch({
            type: 'ROOM_ADD',
            value: room
        });
    }

    getRoom(index) {
        var data=this.getState('rooms');
        if ( typeof data[index] !== 'undefined') {
            return new Room(data[index]);
        }
        throw "Unexistent room: " + index;
    }
}

export { Game, Room };
