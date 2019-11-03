function makeResponse() {
    const state = {
        body: null,
        isJson: false,
        status: 200,
    };

    const response = Object.freeze({
        json: (data) => { 
            state.isJson = true;
            state.body = data;
            return response;
        },
        text: (data) => {
            state.body = data.toString();
            return response;
        },
        getBody: () => state.body,
        status: (newStatus) => {
            state.status = newStatus;
            return response;
        },
        getStatus: () => state.status,
        isJson: () => state.isJson,
        isDone: () => state.body !== null,
    });
    return response;
}

module.exports = makeResponse;