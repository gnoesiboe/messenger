require.config({
    paths: {
        jquery : '../bower_components/jquery/dist/jquery.min',
        toastr : '../bower_components/toastr/toastr',
        socketIO : '../bower_components/socket.io-client/socket.io'
    }
});

require(['jquery', 'toastr', 'socketIO'], function ($, toastr, socketIO) {
    var socket = socketIO('http://localhost:3000');

    // first identify ourselfs to make sure we only receive our own
    // notifications
    // @todo replace with authentication handshake

    socket.emit('identify', {
        account_id: 1
    });

    // wait for confirmation..

    socket.on('identified', function () {

        // when we are identified, allow receiving of
        // notifications

        socket.on('notification', function (message) {
            toastr[message.type](message.message);

            // send reception confirmation message back

            socket.emit('notification_delivered', {
                id: message.id
            });
        });
    });
});
