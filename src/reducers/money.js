const money = (state = 10000, action) => {
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
