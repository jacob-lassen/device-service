/**
 * @param {string} value
 * @returns {boolean}
 */
function isHex(value) {
    const isHexadecimalReq = /^[0-9a-f]+$/g;
    return isHexadecimalReq.test(value);
}

module.exports = isHex;