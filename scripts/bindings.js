var run;
$(function() {
    window.addEventListener('dungeco.money.changed', function(evt) {
        $('#money').text(evt.detail);
    });
    window.addEventListener('dungeco.rooms.changed', function(evt) {
        var list = $('#rooms');
        list.html('');
        evt.detail.forEach(function (room, idx) {
            $('<li data-idx="'+idx+'">'+room.label()+'</li>').appendTo(list);
        });
    });
    window.onerror = function(message, file, line, col, error) {
        if (error instanceof DeException) {
            alert("ERROR! " + error.message);
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
