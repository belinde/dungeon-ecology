class Creature extends Serializable {
  constructor(reign, type) {
    super();
    console.log(reign, type);
  }
}

class Vegetable extends Creature {
    constructor(type) {
      super('vegetable', type);
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
        this.fertility = this.width * this.height * this.RoomType.data.fertility;
        this.vegetables = []
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
        if (width > 0 && height > 0) {
            var room = new Room(type, width, height);
            this.pay(room.price());
            this._rooms.push(room);
            new DeEvent('rooms.changed', this._rooms);
        } else {
            throw new DeException("Invalid width or height! Both must be greater than zero.");
        }
    }
}
