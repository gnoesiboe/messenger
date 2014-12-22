var _ = require('underscore');

var Collection = function (data) {
    this._data = data;
};

_.extend(Collection.prototype, {

    /**
     * @param {Function} callback
     * @param {Object|Null} context
     */
    each: function (callback, context) {
        context = _.isObject(context) ? context : this;

        _.each(this._data, callback, context);
    },

    /**
     * @returns {Number}
     */
    length: function () {
        return this._data.length;
    }
});

module.exports = Collection;
