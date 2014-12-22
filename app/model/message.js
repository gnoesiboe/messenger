var _ = require('underscore'),
    model = require('./../model');

/**
 * @param {Object} data
 *
 * @constructor
 */
var Message = function (data) {

    /**
     * @type {Object}
     * @private
     */
    this._data = data;
};

_.extend(Message.prototype, model, {

    /**
     * @returns {Object}
     */
    getData: function () {
        return _.extend({}, this._data);
    },

    /**
     * @returns {Message}
     */
    setDelivered: function () {
        var date = new Date();

        this._data.delivered_at = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();

        return this;
    }
});

module.exports = Message;
