var run;
$(function() {
    window.addEventListener('dungeco.money.changed', function(evt) {
        $('#money').text(evt.detail);
    });
    window.addEventListener('dungeco.rooms.changed', function(evt) {
        var list = $('#rooms');
        list.find('.room').remove();
        evt.detail.forEach(function(room, idx) {
            $('<a class="room list-group-item" href="javascript:showRoom(' + idx + ');">' + room.name + '</a>').appendTo(list);
        });
        $('#modalNewRoom').modal('hide');
    });
    window.onerror = function(message, file, line, col, error) {
        if (error instanceof DeException) {
            var modal = $('#modalError');
            modal.find('p').text(error.message);
            modal.modal('show');
            return true;
        }
    };

    $('#modalNewRoom').on('change', '.form-control', function() {
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
    });

    run = unserialize(localStorage.getItem('DungeonEcologyRun'));
    if (run instanceof Game) {
    } else {
        run = new Game();
    }
    new DeEvent('money.changed', run._money);
    new DeEvent('rooms.changed', run._rooms);
});

function showRoom(idx) {
    var sr = $('#showRoom');
    sr.removeClass('hidden');
    var room = run.getRoom(idx);
    sr.find('.panel-title').text(room.name);
}
