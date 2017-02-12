var Game;

$(function () {
    Game = new DungeonEcology.Game();

    Game.subscribe(function (state) {
        $('#money').text(state.money);
    });

    Game.subscribe(function (state) {
        var list = $('#rooms');
        list.find('.room').remove();
        if (state.rooms.length) {
            state.rooms.forEach(function (room, idx) {
                $('<a class="room list-group-item" href="javascript:showRoom(' + idx + ');">' + room.name + '</a>').appendTo(list);
            });
        } else {
            $('<a class="list-group-item room disabled">No rooms yet :-(</a>').appendTo(list);
        }
        $('#modalNewRoom').modal('hide');
    });

    window.onerror = function (message, file, line, col, error) {
        if (typeof error === 'string') {
            var modal = $('#modalError');
            modal.find('p').text(error);
            modal.modal('show');
            return true;
        }
    };

    $('#modalNewRoom').on('change', '.form-control', function () {
        var room = DungeonEcology.Room.load({
            type: $('#newroomt').val(),
            width: parseInt($('#newroomw').val()) || 0,
            height: parseInt($('#newroomh').val()) || 0
        });
        $('#buyRoomPreviewPrice').text(DungeonEcology.Room.price(room));
    });

    $('#newroom').click(function () {
        Game.createRoom(
            $('#newroomt').val(),
            parseInt($('#newroomw').val()) || 0,
            parseInt($('#newroomh').val()) || 0
        );
    });
});

function showRoom(idx) {
    var sr = $('#showRoom');
    sr.removeClass('hidden');
    var room = Game.getRoom(idx);
    sr.find('.panel-title').text(room.name);
}