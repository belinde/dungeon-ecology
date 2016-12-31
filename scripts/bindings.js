var run;
$(function() {
    window.addEventListener('dungeco.money.changed', function(evt) {
        $('#money').text(evt.detail);
    });
    window.addEventListener('dungeco.rooms.changed', function(evt) {
        var list = $('#rooms');
        list.find('.room').remove();
        evt.detail.forEach(function(room, idx) {
            $('<a class="room list-group-item" href="javascript:showRoom(' + idx + ');">' + room.label() + '</a>').appendTo(list);
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

    $('#newroom').click(function() {
        run.createRoom(
            parseInt($('#newroomw').val()),
            parseInt($('#newroomh').val())
        );
    });

    run = new Game();
    run.load();
});

function showRoom(idx) {
  var sr = $('#showRoom');
  sr.removeClass('hidden');
  var room = run.getRoom(idx);
  sr.find('.panel-title').text(room.label());
}