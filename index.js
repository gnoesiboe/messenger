var dbConnection = require('mysql').createConnection({
    host:     'localhost',
    user:     'root',
    password: 'nopassword',
    database: 'messenger'
});

/*
 CREATE TABLE `message` (
 `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
 `account_id` int(10) unsigned NOT NULL DEFAULT '1',
 `type` enum('success','error','warning') NOT NULL DEFAULT 'success',
 `message` varchar(255) DEFAULT NULL,
 `created_at` datetime NOT NULL,
 `delivered_at` datetime DEFAULT NULL,
 PRIMARY KEY (`id`)
 ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
 */

var MessageRepository = require('./app/repository/messageRepository'),
    logger = require('./app/service/logger'),
    io = require('socket.io')(3000);

// make sure that firefox does not consider this to be a
// cross-domain policy violation
io.set('origins', 'http://localhost:*');

io.on('connection', function (socket) {
    var socketId = socket.id;

    logger.log('connection established', ['index', socketId]);

    // first wait for the identification message to be able
    // to only send the messages for that account

    socket.on('identify', function (data) {
        var accountId = data.account_id;

        logger.log('account_id: ' + accountId, ['index', socketId]);

        // send back the 'identified' event to let the client know
        // that it has been identified and can start receiving notifications

        socket.emit('identified');

        // start sending available messages for the account to client, every
        // x seconds

        var messageRepository = new MessageRepository(dbConnection);

        var messageInterval = setInterval(function () {
            messageRepository.getAllNotDeliveredForAccountId(accountId, function (messages) {
                logger.info(messages.length() + ' messages to send..', ['index', socketId]);

                messages.each(function (message) {
                    logger.debug('send message: ' + message.get('id'), ['index', socketId]);

                    socket.emit('notification', message.getData());
                });
            });
        }, 5000);

        // when the messages have been delivered, mark them as delivered to make
        // sure that they are not send again.

        socket.on('notification_delivered', function (data) {
            logger.log('received a \'notification_delivered\' event for message: ' + data.id, ['index', socketId]);

            messageRepository.getOneById(data.id, function (message) {
                message.setDelivered();

                messageRepository.update(message);
            });
        });

        // when the client disconnects, make sure we stop the interval
        // to send the messages.

        socket.on('disconnect', function () {
            clearInterval(messageInterval);

            logger.log('disconnected', ['index', socketId]);
        })
    });
});
