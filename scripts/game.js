class Room {
    constructor(width, height) {
        this.height = parseInt(height);
        this.width = parseInt(width);
    }

    price() {
        return this.width * this.height;
    }

    label() {
        return 'stanza ' + this.width + 'X' + this.height;
    }
}

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
        throw this;
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
            new DeException("You don't have enough money!");
        }
    }

    getRoom(idx) {
      if ( typeof this._rooms[idx] === 'undefined') {
          new DeException("That room doesn't exists!");
      }
      return this._rooms[idx];
    }

    createRoom(width, height) {
        var room = new Room(width, height);
        this.pay(room.price());
        this._rooms.push(room);
        new DeEvent('rooms.changed', this._rooms);
    }
}
