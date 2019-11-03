const { expect } = require('chai');
const sinon = require('sinon');
const makeExpressAdapter = require('../../../src/adapters/expressAdapter');

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
    it('Calls next when middleware is done', async () => {
        const timeToWait = 3;
        async function middleware(request, response, next) {
            await delay(timeToWait);
        }
        const [adaptedMiddleware] = makeExpressAdapter(middleware);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);

        expect(fakeNext).to.have.ownProperty('called')
            .and.equal(false);
        await delay(timeToWait + 1);
        expect(fakeNext).to.have.ownProperty('called')
            .and.equal(true);
    });

    it('Correctly send json response', async () => {
        const json = {a: 1};
        async function middleware(request, response, next) {
            response.json(json);
        }
        const [adaptedMiddleware] = makeExpressAdapter(middleware);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);
        await delay(1);
        expect(fakeResponse.json).to.have.ownProperty('called')
            .and.equal(true);
        expect(fakeResponse.json.firstCall.args[0]).to.deep.equal(json);
    });

    it('Correctly sends non json response', async () => {
        const text = 'Some message';
        async function middleware(request, response, next) {
            response.text(text);
        }
        const [adaptedMiddleware] = makeExpressAdapter(middleware);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);
        await delay(1);
        expect(fakeResponse.send).to.have.ownProperty('called')
            .and.equal(true);
        expect(fakeResponse.send.firstCall.args[0]).to.equal(text);
    });

    it('Correctly sends response status', async () => {
        const status = 204;
        async function middleware(request, response, next) {
            response.status(status).json([]);
        }
        const [adaptedMiddleware] = makeExpressAdapter(middleware);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);
        await delay(1);
        expect(fakeResponse.status).to.have.ownProperty('called')
            .and.equal(true);
        expect(fakeResponse.status.firstCall.args[0]).to.equal(status);
    });


    it('Uses status 200 as default', async () => {
        async function middleware(request, response, next) {
            response.json([]);
        }
        const [adaptedMiddleware] = makeExpressAdapter(middleware);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);
        await delay(1);
        expect(fakeResponse.status).to.have.ownProperty('called')
            .and.equal(true);
        expect(fakeResponse.status.firstCall.args[0]).to.equal(200);
    });

    it('Creates adapters for array of middlewares', async () => {
        const middlewares = [
            (a) => a,
            (a) => a,
            (a) => a,
        ]
        const adaptedMiddlewares = makeExpressAdapter(middlewares);
        expect(adaptedMiddlewares).to.have.lengthOf(middlewares.length);
    });

    it('Calls next when no response is send', async () => {
        async function middleware(request, response, next) {
            next();
        }
        const [adaptedMiddleware] = makeExpressAdapter(middleware);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);
        await delay(1);
        expect(fakeNext).to.have.ownProperty('called')
            .and.equal(true);
    });

    it('Calls next when synchronous middleware ends without sending response', async () => {
        function middleware(request, response, next) {
            const a = 10 * 42;
            const b = 'Does some stuff';
        }
        const [adaptedMiddleware] = makeExpressAdapter(middleware);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);
        await delay(1);
        expect(fakeNext).to.have.ownProperty('called')
            .and.equal(true);
    });

    it('Sends error response when error is thrown', async () => {
        function middleware(request, response, next) {
            throw 'Oh no a error!';
        }
        const [adaptedMiddleware] = makeExpressAdapter(middleware);
        const fakeRequest = makeFakeRequest();
        const fakeResponse = makeFakeResponse();
        const fakeNext = makeFakeNext();
        adaptedMiddleware(fakeRequest, fakeResponse, fakeNext);
        await delay(1);
        expect(fakeResponse.status.firstCall.args[0]).to.equal(500);
    });
});