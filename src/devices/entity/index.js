const types = require('../../types');
const _ = require('lodash');

function makeDevice({
    uuid,
    ip,
    mac,
    name,
    lastSeen,
    createdAt = new Date(),
    updatedAt,
}) {
    if (!types.uuid.isValid(uuid)) {
        throw new Error('Device must have valid uuid');
    }

    if (!types.ip.isValid(ip)) {
        throw new Error('Device must have valid ip');
    }

    if (!types.mac.isValid(mac)) {
        throw new Error('Device must have valid mac');
    }

    if (!_.isString(name) || name.length === 0) {
        throw new Error('Device must have name');
    }

    if (!_.isDate(lastSeen)) {
        throw new Error('Device must have last seen');
    }

    if (!_.isDate(updatedAt)) {
        throw new Error('Device must have updated at');
    }

    return {
        getUuid: () => uuid,
        getIp: () => ip,
        getMac: () => mac,
        getName: () => name,
        getLastSeen: () => lastSeen,
        getCreatedAt: () => createdAt,
        getUpdatedAt: () => updatedAt,
    }
}

module.exports = makeDevice;