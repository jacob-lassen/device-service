const makeRequest = require('./makeRequest');
const makeResponse = require('./makeResponse');

/**
 * @param {Array<function>} middlewares
 * @return {Array<function>}
 */
function makeExpressAdapter(middlewares) {
    middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];
    return middlewares.map(adapt);
}

/**
 * @param {Object} res
 * @param {Object} response
 * @returns {undefined}
 */
function sendResponse(res, response) {
    res.status(response.getStatus());
    if (response.isJson()) {
        res.json(response.getBody());
    } else {
        res.send(response.getBody());
    }
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
    res.status(500).send(err.message);
}

/**
 * @param {function} middleware
 * @returns {function}
 */
function adapt(middleware) {
    return async (req, res, next) =>  {
        const request = makeRequest(req);
        const response = makeResponse(res);
        try {
            await middleware(request, response, next);
            if (response.isDone()) {
                sendResponse(res, response);
            } else {
                next();
            }
        } catch (err) {
            sendError(res, err);
        }
    }
}

module.exports = makeExpressAdapter;