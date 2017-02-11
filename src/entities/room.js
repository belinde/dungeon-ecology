import { database as db, check } from '../database';

let Room = class Room {
    constructor(state) {
        this.type = check(state, 'type');
        this.height = parseInt(check(state, 'height'));
        this.width = parseInt(check(state, 'width'));

        let data = db('roomtypes', this.type);

        this.name = check(state, 'name', this.description());
        this.fertility = check(state, 'fertility', data.fertility * this.width * this.height );
        this.curFertility = check(state, 'curFertility', this.fertility );
        this.luminance = check(state, 'luminance', data.luminance );
        this.humidity = check(state, 'humidity', data.humidity );
        this.vegetables = check(state, 'vegetables', []);
    }

    description() {
        return this.type + ' ' + this.width + 'X' + this.height;
    }

    price() {
        return parseInt(this.width * this.height * this.priceModifier());
    }

    priceModifier() {
        return Math.round( this.fertility * this.luminance * this.humidity / 300);
    }

    rename(newName) {
        this.name = '' + newName;
    }
}

export { Room }