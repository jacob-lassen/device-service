const useCases = require('../useCases/');
const makeGet = require('./get');
const makePut = require('./put');

module.exports = Object.freeze({
    put: makePut({ useCases }),
    get: makeGet({ useCases }),
});
