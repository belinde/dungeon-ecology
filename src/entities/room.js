
class RoomType {
    constructor(type) {
        this.name = '' + type;
        this.data = database('roomtypes', this.name);
    }

    priceModifier() {
        return (this.data.fertility * this.data.luminance * this.data.humidity) / 300;
    }
}

class Room {
    constructor(type, width, height) {
        this.type = new RoomType(type);
        this.height = parseInt(height);
        this.width = parseInt(width);
        this.name = this.type.name + ' ' + this.width + 'X' + this.height;
        this.fertility = this.width * this.height * this.fertility();
        this.vegetables = []
    }

    setType( type ) {
        this.type = new RoomType(type);
    }

    fertility() {
        switch (this.type) {
            default:
            return 10;
        }
    }

    price() {
        return parseInt(this.width * this.height * this.RoomType.priceModifier());
    }

    rename(newName) {
        this.name = '' + newName;
    }
}

export default Room