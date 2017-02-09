import db from '../database';

const money = (state, action) => {
    if (typeof state === 'undefined') {
        state = db('setup', 'startingMoney');
    }
    switch (action.type) {
        case 'MONEY_GAIN':
            return state + action.value
        case 'MONEY_PAY':
            let value = state - action.value
            return (value < 0) ? state : value;
    }
    return state
}

export default money
