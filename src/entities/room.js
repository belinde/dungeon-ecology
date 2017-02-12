import {
    database,
    check
} from '../tools';

class Room {
    load(state) {
        let type = check(state, 'type');
        let data = database('roomtypes', type);
        let height = parseInt(check(state, 'height'));
        let width = parseInt(check(state, 'width'));
        let fert = data.fertility * width * height;

        return {
            type: type,
            height: height,
            width: width,
            name: check(state, 'name', type + ' ' + width + 'X' + height),
            fertility: check(state, 'fertility', fert),
            curFertility: check(state, 'curFertility', fert),
            luminance: check(state, 'luminance', data.luminance),
            humidity: check(state, 'humidity', data.humidity),
            vegetables: check(state, 'vegetables', [])
        }
    }

    price(room) {
        return Math.round(room.width * room.height * room.fertility * room.luminance * room.humidity * database('setup', 'roomPriceModifier'));
    }

    rename(room, newName) {
        room.name = '' + newName;
        return room;
    }
}

export default new Room();