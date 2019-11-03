const { expect } = require('chai');
const types = require('../../../src/types/');

describe('types.uuid', () => {
    describe('isValid', () => {
        const scenarios = [
            {
                uuid: 4321,
                isValid: false,
            },
            {
                uuid: '46db4697a7082b43b1cb1e6d05f25531b023',
                isValid: false,
                description: 'No segments',
            },
            {
                uuid: 'e5af1d0-32dd3-4da-af731-a2a23b82129e',
                isValid: false,
                description: 'Incorrect length',
            },
            {
                uuid: '1a3ffb33-8045-4362-bcb3-acee686c75d812',
                isValid: false,
                description: 'Incorrect segment length',
            },
            {
                uuid: '5e6f26fg-.5d1-_271-a?d3-945523e34DFC',
                isValid: false,
                description: 'Contains non hex characters',
            },
            {
                uuid: '46db4697-7082-43b1-b1e6-05f25531b023',
                isValid: true,
                description: 'Valid',
            },
            {
                uuid: '30c97719-591f-41da-ae7b-1f77b2a745c8',
                isValid: true,
                description: 'Valid',
            },
            {
                uuid: 'd29ccb34-66b0-4488-85f4-0417b19b6c66',
                isValid: true,
                description: 'Valid',
            },
        ]

        scenarios.forEach((scenario) => {
            const validity = scenario.isValid ? 'valid' : 'invalid';
            it(`${scenario.uuid} is ${validity} uuid`, () => {
                const isValid = types.uuid.isValid(scenario.uuid);
                expect(isValid).to.equal(scenario.isValid);
            });
        });
    });

    describe('make', () => {
        it('Makes valid uuid', () => {
            for (i = 0; i < 1000; i++) {
                const uuid = types.uuid.make();
                const isValid = types.uuid.isValid(uuid);
                expect(isValid).to.be.true;
            }
        });
    });
});