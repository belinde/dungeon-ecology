let data = {
    setup: {
        startingMoney: 20000
    },
    roomtypes: {
        cave: {
            fertility: 50,
            luminance: 5,
            humidity: 70
        },
        stone: {
            fertility: 10,
            luminance: 50,
            humidity: 20
        },
        wood: {
            fertility: 20,
            luminance: 50,
            humidity: 15
        }
    }
}

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

export { database, check };