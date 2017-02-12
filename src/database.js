export default {
    setup: {
        startingMoney: 20000,
        roomPriceModifier: .0013
    },
    roomtypes: {
        cave: {
            fertility: 50,
            luminance: 5,
            humidity: 70
        },
        stone: {
            fertility: 10,
            luminance: 50,
            humidity: 20
        },
        wood: {
            fertility: 20,
            luminance: 50,
            humidity: 15
        }
    }
};