$(function() {

    DungeonEcology.game.subscribe(function(state) {
      $('#money').text(state.money);
    });

/*    window.addEventListener('dungeco.rooms.changed', function(evt) {
        var list = $('#rooms');
        list.find('.room').remove();
        if (evt.detail.length) {
            evt.detail.forEach(function(room, idx) {
                $('<a class="room list-group-item" href="javascript:showRoom(' + idx + ');">' + room.name + '</a>').appendTo(list);
            });
        } else {
            $('<a class="list-group-item room disabled">No rooms yet :-(</a>').appendTo(list);
        }
        $('#modalNewRoom').modal('hide');
    }); */

    window.onerror = function(message, file, line, col, error) {
        if (typeof error === 'string') {
            var modal = $('#modalError');
            modal.find('p').text(error);
            modal.modal('show');
            return true;
        }
    };

/*    $('#modalNewRoom').on('change', '.form-control', function() {
        var room = new Room(
            $('#newroomt').val(),
            parseInt($('#newroomw').val()) || 0,
            parseInt($('#newroomh').val()) || 0
        );
        $('#buyRoomPreviewPrice').text(room.price());
    });

    $('#newroom').click(function() {
        run.createRoom(
            $('#newroomt').val(),
            parseInt($('#newroomw').val()) || 0,
            parseInt($('#newroomh').val()) || 0
        );
    }); */
});

/*function showRoom(idx) {
    var sr = $('#showRoom');
    sr.removeClass('hidden');
    var room = run.getRoom(idx);
    sr.find('.panel-title').text(room.name);
}*/
