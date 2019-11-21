function makePutDevice({ useCases }) {
    return async function putDevice(input, output) {
        output.setData('It works');
    }
}

module.exports = makePutDevice;