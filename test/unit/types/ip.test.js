const { expect } = require('chai');
const types = require('../../../src/types/');

describe('types.ip', () => {
    describe.only('isValid', () => {
        const scenarios = [
            {
                ip: 192168001,
                isValid: false,
                description: 'No a string',
            },
            {
                ip: '56.118.228',
                isValid: false,
                description: 'Missing segment',
            },
            {
                ip: '251.204.50.169.22',
                isValid: false,
                description: 'To many segments',
            },
            {
                ip: '152.173.4932.132',
                isValid: false,
                description: 'Segment to long',
            },
            {
                ip: '152.173.32A.132',
                isValid: false,
                description: 'Contains non numeric character',
            },
            {
                ip: '192.168.0.1',
                isValid: true,
                description: 'Valid',
            },
            {
                ip: '229.33.2.59',
                isValid: true,
                description: 'Valid',
            },
            {
                ip: '87.62.240.26',
                isValid: true,
                description: 'Valid',
            },
        ]

        scenarios.forEach((scenario) => {
            const validity = scenario.isValid ? 'a valid' : 'an invalid';
            it(`${scenario.ip} is ${validity} ip`, () => {
                const isValid = types.ip.isValid(scenario.ip);
                expect(isValid).to.equal(scenario.isValid);
            });
        });
    });
});