const _ = require('lodash');

const errorCodes = {
    validation: 'Validation',
    internal: 'Internal',
    default: 'Internal',
}

const errorList = _.values(errorCodes);

/**
 * @param {string} code
 * @returns {string}
 */
function getErrorCode(code) {
    if (!errorList.includes(code)) {
        return errorCodes.INTERNAL;
    }
    return code;
}

class CoreError extends Error{
    constructor({ code, message }) {
        super(message);
        this.code = getErrorCode(code);
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else { 
            this.stack = (new Error(message)).stack; 
        }
    }
}

module.exports = {
    CoreError: CoreError,
    codes: errorCodes,
};