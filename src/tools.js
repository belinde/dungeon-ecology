import data from './database';

let database = function database(section, item) {
    if (typeof data[section][item] == 'undefined') {
        throw "Unexistent key '" + item + "' in container '" + section + "'";
    }
    return data[section][item];
}

let check = function check(state, key, def) {
    if (typeof state[key] == 'undefined') {
        if (typeof def == 'undefined') {
            throw "Missing parameter " + key;
        }
        return def;
    }
    return state[key];
}

let reducer = function reducer(calls, defaultStateValue) {
    return (state = [], action) => {
        if (typeof calls[action.type] === 'undefined') {
            return state;
        }
        if (typeof state === 'undefined') {
            state = defaultStateValue;
        }
        return calls[action.type](state, action.value);
    }
}

export {
    database,
    check,
    reducer
};