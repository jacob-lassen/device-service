const { expect } = require('chai');
const makeDevice = require('../../../src/devices/entity/');

function makeFakeDevice() {
    return {
        uuid: '7b501bb5-82d3-423a-99a0-dd6dd7cba6c3',
        name: 'Chrome cast',
        ip: '192.168.100.1',
        mac: '5d:65:45:1a:b3:86',
        lastSeen: new Date('2019-11-02 12:20:00'),
        createdAt: new Date('2019-11-02 12:20:00'),
        updatedAt: new Date('2019-11-02 12:20:00'),
    }
}

describe('device.entity', () => {
    it('Has uuid', () => {
        const fakeDevice = makeFakeDevice();
        fakeDevice.uuid = '53fe64eb-0ee9-4e90-b9ad-5465b409de51';
        const device = makeDevice(fakeDevice);
        expect(device.getUuid()).to.equal(fakeDevice.uuid);
    });

    it('Throws error when uuid is invalid', () => {
        const fakeDevice = makeFakeDevice();
        fakeDevice.uuid = '53fe64eb0ee94e90b9ad5465b409de51';
        const callWrapper = () => {
            makeDevice(fakeDevice);
        }
        expect(callWrapper).to.throw();
    });

    it('Has name', () => {
        const fakeDevice = makeFakeDevice();
        fakeDevice.name = 'sumsang tv';
        const device = makeDevice(fakeDevice);
        expect(device.getName()).to.equal(fakeDevice.name);
    });

    it('Throws error when name is missing', () => {
        const fakeDevice = makeFakeDevice();
        delete fakeDevice.name;
        const callWrapper = () => {
            makeDevice(fakeDevice);
        }
        expect(callWrapper).to.throw();
    });

    it('Throws error when name is empty', () => {
        const fakeDevice = makeFakeDevice();
        fakeDevice.name = '';
        const callWrapper = () => {
            makeDevice(fakeDevice);
        }
        expect(callWrapper).to.throw();
    });

    it('Has ip', () => {
        const fakeDevice = makeFakeDevice();
        fakeDevice.ip = '192.168.10.54';
        const device = makeDevice(fakeDevice);
        expect(device.getIp()).to.equal(fakeDevice.ip);
    });

    it('Throws error when ip is not an ip address', () => {
        const fakeDevice = makeFakeDevice();
        fakeDevice.ip = '192.168.54';
        const callWrapper = () => {
            makeDevice(fakeDevice);
        }
        expect(callWrapper).to.throw();
    });

    it('Has mac', () => {
        const fakeDevice = makeFakeDevice();
        fakeDevice.mac = 'df:4e:f4:91:57:4a';
        const device = makeDevice(fakeDevice);
        expect(device.getMac()).to.equal(fakeDevice.mac);
    });

    it('Throws error when mac is not a mac address', () => {
        const fakeDevice = makeFakeDevice();
        fakeDevice.mac = 'XX:4e:f4:91:57:4a';
        const callWrapper = () => {
            makeDevice(fakeDevice);
        }
        expect(callWrapper).to.throw();
    });

    it('Has last seen', () => {
        const fakeDevice = makeFakeDevice();
        fakeDevice.lastSeen = new Date('2019-11-05 10:30:00');
        const device = makeDevice(fakeDevice);
        expect(device.getLastSeen()).to.equal(fakeDevice.lastSeen);
    });

    it('Throws error when last seen is not a date', () => {
        const fakeDevice = makeFakeDevice();
        fakeDevice.lastSeen = '2019-10-02 10:00:00';
        const callWrapper = () => {
            makeDevice(fakeDevice);
        }
        expect(callWrapper).to.throw();
    });

    it('Has created at', () => {
        const fakeDevice = makeFakeDevice();
        fakeDevice.createdAt = new Date('2019-11-01 13:30:00');
        const device = makeDevice(fakeDevice);
        expect(device.getCreatedAt()).to.equal(fakeDevice.createdAt);
    });

    it('Throws error when created at is not a date', () => {
        const fakeDevice = makeFakeDevice();
        fakeDevice.createdAt = '2019-10-02 10:00:00';
        const callWrapper = () => {
            makeDevice(fakeDevice);
        }
        expect(callWrapper).to.throw();
    });

    it('Has updated at', () => {
        const fakeDevice = makeFakeDevice();
        fakeDevice.updatedAt = new Date('2019-11-05 11:45:00');
        const device = makeDevice(fakeDevice);
        expect(device.getUpdatedAt()).to.equal(fakeDevice.updatedAt);
    });

    it('Throws error when updated at is not a date', () => {
        const fakeDevice = makeFakeDevice();
        fakeDevice.updatedAt = '2019-10-02 10:00:00';
        const callWrapper = () => {
            makeDevice(fakeDevice);
        }
        expect(callWrapper).to.throw();
    });

    it('Sets default create state when uuid is not set', () => {
        const fakeDevice = makeFakeDevice();
        delete fakeDevice.uuid;
        delete fakeDevice.lastSeen;
        delete fakeDevice.createdAt;
        delete fakeDevice.updateAt;
        const now = new Date();
        const device = makeDevice(fakeDevice);
        expect(device.getUuid()).to.be.a('string');
        expect(device.getLastSeen().getTime()).to.be.gte(now.getTime());
        expect(device.getCreatedAt().getTime()).to.be.gte(now.getTime());
        expect(device.getUpdatedAt().getTime()).to.be.gte(now.getTime());
    });
});