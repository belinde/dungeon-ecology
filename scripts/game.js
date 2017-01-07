class DeEvent {
    constructor(name, data) {
        name = 'dungeco.' + name;
        console.log("Firing: " + name);
        window.dispatchEvent(new CustomEvent(name, {
            'detail': data
        }));
        localStorage.setItem('DungeonEcologyRun', run.serialize());
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

function unserialize(jsonString) {
    this.parser = function parser(rough) {
        switch (true) {
            case (typeof rough._DeClass !== 'undefined'):
                var parsed = eval('new ' + rough._DeClass + '();');
                for (var property in rough) {
                    if (property !== '_DeClass' &&
                        rough.hasOwnProperty(property) &&
                        parsed.hasOwnProperty(property)) {
                        parsed[property] = this.parser(rough[property]);
                    }
                }
                return parsed;
            case (typeof rough._DeArray !== 'undefined'):
                parsed = [];
                rough._DeArray.forEach(function(value) {
                    parsed.push(this.parser(value));
                })
                return parsed;
        }
        return rough;
    };

    return this.parser(JSON.parse(jsonString));
}

class Serializable {
    serialize() {
        var obj = "{\"_DeClass\": " + JSON.stringify(this.constructor.name);
        for (var property in this) {
            if (this.hasOwnProperty(property)) {
                obj += ",\"" + property + "\": ";
                switch (true) {
                    case (this[property] instanceof Serializable):
                        obj += this[property].serialize();
                        break;
                    case (this[property] instanceof Array):
                        obj += "{\"_DeArray\": [";
                        var first = true;
                        this[property].forEach(function(value) {
                            if (first) {
                                first = false;
                            } else {
                                obj += ",";
                            }
                            if (value instanceof Serializable) {
                                obj += value.serialize();
                            } else {
                                obj += JSON.stringify(value);
                            }
                        });
                        obj += "]}";
                        break;
                    default:
                        obj += JSON.stringify(this[property]);
                        break;
                }
            }
        }
        obj += "}";
        return obj;
    }
}

class RoomType extends Serializable {
    constructor(type) {
        super();
        this.type = '' + type;
        this.data = database('roomtypes', this.type);
    }

    priceModifier() {
        return (this.data.fertility * this.data.luminance * this.data.humidity) / 300;
    }
}

class Room extends Serializable {
    constructor(type, width, height) {
        super();
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

class Game extends Serializable {
    constructor() {
        super();
        this._rooms = [];
        this._money = database('setup', 'startingMoney');
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
