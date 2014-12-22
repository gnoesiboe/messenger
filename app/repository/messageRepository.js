var Collection = require('./../collection'),
    Message = require('./../model/message'),
    _ = require('underscore');

/**
 * @param {Object} connection
 *
 * @constructor
 */
var MessageRepository = function (connection) {

    /**
     * @type {Object}
     * @private
     */
    this._connection = connection;
};

_.extend(MessageRepository.prototype, {

    /**
     * @param {Number} accountId
     * @param {Function} callback
     */
    getAllNotDeliveredForAccountId: function (accountId, callback) {
        var query = 'SELECT * FROM message WHERE delivered_at IS NULL AND account_id = ?';

        this._connection.query(query, [accountId], function (err, rows) {
            if (err) {
                throw err;
            }

            var data = [];

            for (var i = 0, l = rows.length; i < l; i++) {
                data.push(new Message(rows[i]));
            }

            callback(new Collection(data));
        });
    },

    /**
     * @param {Number} id
     * @param {Function} callback
     */
    getOneById: function (id, callback) {
        var query = 'SELECT * FROM message WHERE id = ' + id;

        this._connection.query(query, [id], function (err, data) {
            if (err) {
                throw err;
            }

            callback(data.length > 0 ? new Message(data[0]) : null);
        });
    },

    /**
     * @param {Object} message
     * @param {Function} [callback]
     */
    update: function (message, callback) {
        var query = 'UPDATE message SET type = ?, message = ?, delivered_at = ? WHERE id = ?',
            values = [
                message.get('type'),
                message.get('message'),
                message.get('delivered_at'),
                message.get('id')
            ];

        this._connection.query(query, values, function (err) {
            if (err) {
                throw err;
            }

            if (_.isFunction(callback) === true) {
                callback();
            }
        });
    }
});

module.exports = MessageRepository;
