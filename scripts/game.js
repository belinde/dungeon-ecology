class DeEvent {
    constructor(name, data) {
        name = 'dungeco.' + name;
        console.log("Firing: " + name);
        window.dispatchEvent(new CustomEvent(name, {
            'detail': data
        }));
    }
}

class DeException {
    constructor(message) {
        this.message = message;
    }
}

function database(section, item) {
    if (typeof DungeonEcologyDatabase[section][item] == 'undefined') {
        new DeException("Unexistent key '" + item + "' in container '" + section + "'");
    }
    return DungeonEcologyDatabase[section][item];
}

class RoomType {
    constructor(type) {
        this.type = '' + type;
        this.data = database('roomtypes', this.type);
    }

    priceModifier() {
        return (this.data.fertility * this.data.luminance * this.data.humidity) / 300;
    }
}

class Room {
    constructor(type, width, height) {
        this.RoomType = new RoomType(type);
        this.height = parseInt(height);
        this.width = parseInt(width);
        this.name = type + ' ' + this.width + 'X' + this.height;
    }

    price() {
        return parseInt(this.width * this.height * this.RoomType.priceModifier());
    }

    rename(newName) {
        this.name = '' + newName;
    }
}

class Game {
    constructor() {
        this._rooms = [];
        this._money = 0;
    }

    load() {
        this._rooms = [];
        this.gain(10000);
    }

    gain(money) {
        this._money += parseInt(money);
        new DeEvent('money.changed', this._money);
    }

    pay(money) {
        money = parseInt(money);
        if (money <= this._money) {
            this._money -= money;
            new DeEvent('money.changed', this._money);
        } else {
            throw new DeException("You don't have enough money!");
        }
    }

    getRoom(idx) {
        if (typeof this._rooms[idx] === 'undefined') {
            throw new DeException("That room doesn't exists!");
        }
        return this._rooms[idx];
    }

    createRoom(type, width, height) {
        var room = new Room(type, width, height);
        this.pay(room.price());
        this._rooms.push(room);
        new DeEvent('rooms.changed', this._rooms);
    }
}
