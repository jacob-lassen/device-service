const makeDevice = require('../entity');

function makeDeviceRepository({ dbConnection }) {
    return Object.freeze({
        findAll,
        findByUuid,
        create,
        remove,
        update,
    })

    async function findAll() {
        const rows = await dbConnection('devices')
            .select()
        return rows.map(makeDevice);
    }

    async function findByUuid(uuid) {
        const [row] = await dbConnection('devices')
        .where({ uuid: uuid });
        return makeDevice(row);
    }

    async function create(device) {
        const insert = {
            uuid: device.getUuid(),
            ip: device.getIp(),
            mac: device.getMac(),
            name: device.getName(),
            lastSeen: device.getLastSeen(),
            createdAt: device.getCreatedAt(),
            updatedAt: device.getUpdatedAt(),
        }
        await dbConnection('devices').insert(insert);
        return null;
    }

    async function remove(uuid) {
        await dbConnection('devices')
            .where({ uuid: uuid })
            .del()
    }

    async function update(device) {
        const updates = {
            name: device.getName(),
            ip: device.getIp(),
            mac: device.getMac(),
            lastSeen: device.getLastSeen(),
            updatedAt: device.getUpdatedAt(),
        };
        await dbConnection('devices')
            .where({ uuid: device.getUuid() })
            .update(updates);
        return null;
    }
}

module.exports = makeDeviceRepository;