const uuidV4 = require('uuid/v4');
const _ = require('lodash');

function make() {
    return uuidV4();
}

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

function validUuidSegment(length, segment) {
    if (segment.length !== length) {
        return false;
    }

    if (!isHex(segment)) {
        return false;
    }

    return true;
}

function isHex(value) {
    const isHexadecimalReq = /^[0-9a-f]+$/g;
    return isHexadecimalReq.test(value);
}

module.exports = {
    make,
    isValid,
}