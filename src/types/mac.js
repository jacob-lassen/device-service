const _ = require('lodash');
const isHex = require('./isHex');

/**
 * @param {string} mac
 * @returns {boolean}
 */
function isValid(mac) {
    if (!_.isString(mac)) {
        return false;
    }

    const segments = mac.split(':');

    if (segments.length !== 6) {
        return false;
    }

    if(!segments.every(isValidSegment)) {
        return false;
    }

    return true;
}

function isValidSegment(segment) {
    if (segment.length < 1 || segment.length > 2) {
        return false;
    }
    return isHex(segment);
}

module.exports = {
    isValid,
};