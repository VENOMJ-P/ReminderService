const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig')

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({urlencoded:true}));

    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
    })
}

setupAndStartServer();