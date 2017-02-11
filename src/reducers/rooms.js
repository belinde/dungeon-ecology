import { Room } from '../entities/room'

var calls = {
    ROOM_ADD: function roomAdd( state, room ) {
        state.push( new Room(room) );
        return state;
    }
}

const rooms = (state = [], action) => {
    if ( typeof calls[ action.type ] === 'undefined' ) {
        return state;
    }
    return calls[ action.type ](state, action.value);
}

export { rooms };