const express = require('express');
const deviceRoutes = require('./devices/routes');
const makeExpressAdapter = require('./adapters/ioAdapters/expressAdapter');

const port = 3000;
const app = express();

const dbConnection = require('./dbConnection')();
const deviceController = require('./devices/controllers/');

app.get(`/tests`, makeExpressAdapter(deviceRoutes.test));
app.get('/devices', makeExpressAdapter(deviceController.get));
app.put('/devices', makeExpressAdapter(deviceController.put));


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});