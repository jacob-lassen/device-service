const _ = require('lodash');

/**
 * @param {string} ip
 * @returns {boolean}
 */
function isValid(ip) {
    if (!_.isString(ip)) {
        return false;
    }

    const segments = ip.split('.');

    if (segments.length !== 4) {
        return false;
    }

    if(!segments.every(isValidSegment)) {
        return false;
    }

    return true;
}

function isValidSegment(segment) {
    if (segment.length < 1 || segment.length > 3) {
        return false;
    }
    return parseInt(segment).toString() === segment;
}

module.exports = {
    isValid,
};