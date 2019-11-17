const _ = require('lodash');
const makeInput = require('./makeInput');
const makeOutput = require('./makeOutput');
const { CoreError, codes } = require('../../CoreError');

/**
 * @param {Array<function>} middlewares
 * @return {Array<function>}
 */
function makeExpressAdapter(middlewares) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    return async function loop(req, res) {
        const input = requestToInput(req);
        const output = makeOutput();
        try {
            await runtimeAdapter(middlewares, input, output);
        } catch (err) {
            sendError(res, err);
            return;
        }
        sendResponse(res, output);
    }
}

/**
 * @param {Array<Function>} middlewares 
 * @param {Object} input
 * @param {Object} output 
 */
async function runtimeAdapter(middlewares, input, output) {
    const [nextMiddleware, ...rest] = middlewares;
    if (nextMiddleware === undefined) {
        return;
    }
    await nextMiddleware(input, output);
    return runtimeAdapter(rest, input, output);
}

/**
 * @param {Object} res
 * @param {Object} response
 * @returns {undefined}
 */
function sendResponse(res, output) {
    const data = output.getData();
    if (data === '' || data === undefined || data === null) {
        res.status(204).send();
        return;
    }
    if (_.isString(data)) {
        res.status(200).send(data);
        return;
    };
    res.status(200).json(data);
}

/**
 * @param {Object} res
 * @param {Object} response
 * @returns {undefined}
 */
function sendError(res, err) {
    if (err.stack) {
        console.error(err.stack);
    }
    const coreError = new CoreError({
        code: _.has(err, 'code') ? err.code : codes.internal,
        message: _.has(err, 'code') ? err.message : codes.message,
    });
    res.status(getStatus(err.code)).json(coreError);
}

/**
 * @param {string} code
 * @returns {number}
 */
function getStatus(code) {
    if (code === codes.validation) {
        return 400;
    }
    return 500;
}


function requestToInput(req) {
    const options = {
        data: req.body,
        params: req.params,
        query: req.query,
    }
    return makeInput(options);
}


module.exports = makeExpressAdapter;