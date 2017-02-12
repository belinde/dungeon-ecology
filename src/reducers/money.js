import {
    database,
    reducer
} from '../tools';

export default reducer({
    MONEY_GAIN: (state, value) => state + value,
    MONEY_PAY: (state, value) => (state >= value) ? state - value : state
}, database('setup', 'startingMoney'));