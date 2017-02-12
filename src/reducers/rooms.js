import {
    reducer
} from '../tools';

export default reducer({
    ROOM_ADD: (state, room) => [...state, room]
}, []);