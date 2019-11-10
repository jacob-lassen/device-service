const types = require('../../types');
const _ = require('lodash');

function makeDevice({
    uuid,
    ip,
    mac,
    name,
    lastSeen,
    createdAt,
    updatedAt,
}) {
    if (uuid === undefined) {
        uuid = types.uuid.make();
        createdAt = createdAt ? createdAt : new Date();
        lastSeen = createdAt;
        updatedAt = createdAt;
    }
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

    if (!_.isDate(createdAt)) {
        throw new Error('Device must have updated at');
    }

    if (!_.isDate(updatedAt)) {
        throw new Error('Device must have updated at');
    }

    return {
        getUuid: () => uuid,
        getIp: () => ip,
        getMac: () => mac,
        getName: () => name,
        getLastSeen: () => {
            return lastSeen;
        },
        getCreatedAt: () => createdAt,
        getUpdatedAt: () => updatedAt,
    }
}

module.exports = makeDevice;