const repository = require('../repository/');
const makeListDevices = require('./listDevices');

module.exports = {
    listDevices: makeListDevices({ repository }),
}