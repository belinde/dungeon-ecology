import db from '../database';

class RoomType {
    constructor(type) {
        this.name = '' + type;
        this.data = db('roomtypes', this.name);
    }

    fertility() {
        return this.data.fertility;
    }

    luminance() {
        return this.data.luminance;
    }

    humidity() {
        return this.data.humidity;
    }

    priceModifier() {
        return (this.fertility() * this.luminance() * this.humidity()) / 300;
    }
}

class Room {
    constructor(type, width, height) {
        this.setType(type);
        this.height = parseInt(height);
        this.width = parseInt(width);
        this.name = this.type.name + ' ' + this.width + 'X' + this.height;
        this.vegetables = []
    }

    setType( type ) {
        this.type = new RoomType(type);
        this.fertility = this.width * this.height * this.type.fertility();
    }

    price() {
        return parseInt(this.width * this.height * this.type.priceModifier());
    }

    rename(newName) {
        this.name = '' + newName;
    }
}

export default Room