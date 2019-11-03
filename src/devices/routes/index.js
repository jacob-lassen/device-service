function delay(timeToWait) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timeToWait);
    });
}

async function test1(request) {
    console.log('Waiting for delay');
    await delay(10);
    console.log('The wait is over');
}

async function test2(request, response) {
    return response.status(200).json({a: 1});
}

module.exports = {
    test: [test1, test2],
}