const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const {sendBaiscEmail} = require('./service/email-service')
const jobs = require('./utils/jobs');
const TicketContoller = require('./contoller/ticket-contoller');

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.post('/api/v1/tickets',TicketContoller.create)
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
        jobs();

    })
}

setupAndStartServer();

// '"Support"<support@admin.com>'