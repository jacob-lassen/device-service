function makeOutput() {
    const state = {
        data: null,
    };
    const context = new Map();

    const response = Object.freeze({
        getData: () => state.data,
        setData: (data) => state.data = data,
        setContext: (key, value) => context.set(key, value),
        getContext: (key) => context.get(key),
        deleteContext: (key) => context.delete(key),
    });
    return response;
}

module.exports = makeOutput;