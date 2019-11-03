const express = require('express');
const deviceRoutes = require('./devices/routes');
const makeExpressAdapter = require('./adapters/expressAdapter');


const port = 3000;
const app = express();

app.get(`/tests`, makeExpressAdapter(deviceRoutes.test))

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});