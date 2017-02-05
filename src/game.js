import {
    createStore
} from 'redux'
import combinedReducer from './reducers'

const GameClass = class Game {

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
}

export default GameClass
