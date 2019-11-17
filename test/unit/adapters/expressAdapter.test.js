const { expect } = require('chai');
const sinon = require('sinon');
const makeExpressAdapter = require('../../../src/adapters/ioAdapters/expressAdapter');
const { CoreError, codes } = require('../../../src/CoreError');

function delay(timeToWait) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeToWait);
    });
}

function makeFakeRequest() {
    return {
        get: () => 'header-value',
    }
}

function makeFakeResponse() {
    const fakeResponse = {
        json: sinon.spy(),
        status: sinon.stub(),
        send: sinon.spy(),
    }
    fakeResponse.status.returns(fakeResponse);
    return fakeResponse
}

function makeFakeNext() {
    return sinon.spy();
}

describe('expressAdapter', () => {
    beforeEach(() => {
        sinon.stub(console, "error")
    });

    afterEach(() => {
        console.error.restore();
    })

    it('Calls middleware', async () => {
        const middleware = sinon.spy();
        const adaptedMiddleware = makeExpressAdapter(middleware);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);

        expect(middleware).to.have.ownProperty('called')
            .and.be.true;
    });

    it('Sets sends 204 when no data is undefined', async () => {
        const middleware = (input, output) => {
            output.setData(undefined);
        };
        const adaptedMiddleware = makeExpressAdapter(middleware);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);

        await delay(0);
        const [status] = fakeResponse.status.lastCall.args;
        expect(status).to.equal(204);
    });

    it('Sets sends 204 when data is null', async () => {
        const middleware = (input, output) => {
            output.setData(null);
        };
        const adaptedMiddleware = makeExpressAdapter(middleware);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);

        await delay(0)
        const [status] = fakeResponse.status.lastCall.args;
        expect(status).to.equal(204);
    });

    it('Sets sends 204 when no data is empty string', async () => {
        const middleware = (input, output) => {
            output.setData('');
        };
        const adaptedMiddleware = makeExpressAdapter(middleware);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);

        await delay(0)
        const [status] = fakeResponse.status.lastCall.args;
        expect(status).to.equal(204);
    });

    it('Sets sends 200 when data is a string', async () => {
        const middleware = (input, output) => {
            output.setData('String');
        };
        const adaptedMiddleware = makeExpressAdapter(middleware);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);

        await delay(0)
        const [status] = fakeResponse.status.lastCall.args;
        expect(status).to.equal(200);
    });

    it('Sets sends 200 json response when data is a object', async () => {
        const data = {a: 'a'};
        const middleware = (input, output) => {
            output.setData(data);
        };
        const adaptedMiddleware = makeExpressAdapter(middleware);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);

        await delay(0)
        const [jsonData] = fakeResponse.json.lastCall.args;
        expect(jsonData).to.deep.equal(data);
    });

    it('Sends response when last middleware is done', async () => {
        const middleware1 = (input, output) => {
            expect(fakeResponse).to.have.ownProperty('status')
                .and.have.ownProperty('lastCall')
                .and.be.null;
        };
        const middleware2 = (input, output) => {
            expect(fakeResponse).to.have.ownProperty('status')
                .and.have.ownProperty('lastCall')
                .and.be.null;
        };
        const adaptedMiddleware = makeExpressAdapter([middleware1, middleware2]);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);

        await delay(0)
        expect(fakeResponse).to.have.ownProperty('status')
                .and.have.ownProperty('lastCall')
                .and.not.be.null;
    });

    it('Sends error response when error is thrown', async () => {
        const middleware = (input, output) => {
            throw 'Throw anything with a stack trace makes the adapter log it';
        };
        await testStatus(500, middleware);
    });
    const errorMappingScenarios = [
        {
            error: new CoreError({ code: codes.validation }),
            httpStatus: 400,
        },
        {
            error: new CoreError({ code: codes.internal }),
            httpStatus: 500,
        },
    ]

    errorMappingScenarios.forEach((scenario) => {
        it(`maps errorCode ${scenario.error.code} to ${scenario.httpStatus}`, async () => {
            const middleware = (input, output) => {
                throw scenario.error;
            };
            await testStatus(scenario.httpStatus, middleware);
        });
    });
});

async function testStatus(expectedStatus, middleware) {
    const adaptedMiddleware = makeExpressAdapter(middleware);
    const fakeRequest = makeFakeRequest();
    const fakeResponse = makeFakeResponse();
    const fakeNext = makeFakeNext();
    adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);

    await delay(0)
    const [status] = fakeResponse.status.lastCall.args;
    expect(status).to.equal(expectedStatus);
};