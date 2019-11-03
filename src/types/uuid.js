const uuidV4 = require('uuid/v4');
const _ = require('lodash');
const isHex = require('./isHex');

/**
 * @returns {string}
 */
function make() {
    return uuidV4();
}

/**
 * @param {string} uuid
 * @returns {boolean}
 */
function isValid(uuid) {
    if (!_.isString(uuid)) {
        return false;
    }

    const [timeLow, timeMid, timeHi, clockSeq, node] = uuid.split('-');

    if (!validUuidSegment(8, timeLow)) {
        return false;
    }

    if (!validUuidSegment(4, timeMid)) {
        return false;
    }

    if (!validUuidSegment(4, timeHi)) {
        return false;
    }

    if (!validUuidSegment(4, clockSeq)) {
        return false;
    }

    if (!validUuidSegment(12, node)) {
        return false;
    }

    return true;
}

/**
 * @param {number} length
 * @param {string} segment
 * @returns {boolean}
 */
function validUuidSegment(length, segment) {
    if (segment.length !== length) {
        return false;
    }

    if (!isHex(segment)) {
        return false;
    }

    return true;
}

module.exports = {
    make,
    isValid,
}