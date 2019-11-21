function makeGetDevices({ useCases }) {
    return async function putDevice(input, output) {
        const devices = await useCases.listDevices();
        output.setData(devices);
    }
}

module.exports = makeGetDevices;