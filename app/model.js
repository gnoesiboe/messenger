var _ = require('underscore');

module.exports = {

    /**
     * @param {String} key
     *
     * @returns {*}
     */
    get: function (key) {
        return this.has(key) ? this._data[key] : null;
    },

    /**
     * @param {String} key
     * @returns {Boolean}
     */
    has: function (key) {
        return this._data.hasOwnProperty(key);
    },

    /**
     * @param {String} key
     * @param {*} value
     *
     * @returns {Object}
     */
    set: function (key, value) {
        this._data[key] = value;

        return this;
    }
};
