const { expect } = require('chai');
const types = require('../../../src/types/');

describe('types.mac', () => {
    describe('isValid', () => {
        const scenarios = [
            {
                mac: '01:9d:43:ec:70',
                isValid: false,
                description: 'Missing segment',
            },
            {
                mac: '95:a9:ac:fc:62:ce:3a',
                isValid: false,
                description: 'To many segments',
            },
            {
                mac: 'f8:af:2c:52:3f2:40',
                isValid: false,
                description: 'Segment to long',
            },
            {
                mac: 'xx:ba:25:e3:c9:24',
                isValid: false,
                description: 'Segment contains invalid character',
            },
            {
                mac: '98:67:a3:8d:7e:c7',
                isValid: true,
                description: 'Valid',
            },
            {
                mac: '50:eb:db:ea:97:98',
                isValid: true,
                description: 'Valid',
            },
            {
                mac: 'be:e5:4f:c3:c2:4a',
                isValid: true,
                description: 'Valid',
            },
        ]

        scenarios.forEach((scenario) => {
            const validity = scenario.isValid ? 'a valid' : 'an invalid';
            it(`${scenario.mac} is ${validity} mac`, () => {
                const isValid = types.mac.isValid(scenario.mac);
                expect(isValid).to.equal(scenario.isValid);
            });
        });
    });
});