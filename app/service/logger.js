var _ = require('underscore'),
    clc = require('cli-color'),
    util = require('util');

/**
 * @type {Object}
 */
var colorFormatter = {
    debug: clc.white,
    error: clc.red,
    info:  clc.yellow,
    log:   clc.blue
};

var supportedTypes = ['debug', 'error', 'info', 'log'];

/**
 * @param {String} type
 * @param {String} message
 * @param {Array} tags
 */
var log = function (type, message, tags) {
    if (typeof console === 'undefined') {
        return;
    }

    validateType(type);

    if (typeof console[type] === 'undefined') {
        return;
    }

    message = prepareMessage(message);
    validateTags(tags);

    console[type](generateMessageWithTags(message, tags, type));
};

/**
 * @param {String} type
 *
 * @throws {Error}
 */
var validateType = function (type) {
    if (_.isString(type) === false) {
        throw new Error('Type should be of type string');
    }

    if (supportedTypes.indexOf(type) === -1) {
        throw new Error('Type: \'' + type + '\' not supported');
    }
};

/**
 * @param {String} message
 *
 * @throws {Error}
 */
var prepareMessage = function (message) {
    if (_.isString(message) === true) {
        return message;
    }

    if (_.isObject(message) === true) {
        return util.inspect(message, true, null);
    }

    return message.toString();
};

/**
 * @param {Array} tags
 *
 * @throws {Error}
 */
var validateTags = function (tags) {
    if (_.isArray(tags) === false) {
        throw new Error('Tags should be an array');
    }
};

/**
 * @param {String} message
 * @param {Array} tags
 * @param {String} type
 *
 * @returns {string}
 */
var generateMessageWithTags = function (message, tags, type) {
    var prefix = '';

    for (var i = 0, l = tags.length; i < l; i++) {
        prefix += '[' + tags[i] + '] ';
    }

    return colorFormatter[type](prefix) + ':: ' + message;
};

module.exports = {

    /**
     * @param {String} message
     * @param {Array} tags
     *
     * @return {Object}
     */
    log: function (message, tags) {
        log('log', message, tags);

        return this;
    },

    /**
     * @param {String} message
     * @param {Array} tags
     *
     * @return {Object}
     */
    info: function (message, tags) {
        log('info', message, tags);

        return this;
    },

    /**
     * @param {String} message
     * @param {Array} tags
     *
     * @return {Object}
     */
    error: function (message, tags) {
        log('error', message, tags);

        return this;
    },

    /**
     * @param {String} message
     * @param {Array} tags
     *
     * @return {Object}
     */
    debug: function (message, tags) {
        log('debug', message, tags);

        return this;
    }
};
