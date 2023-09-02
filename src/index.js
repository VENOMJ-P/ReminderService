const express = require('express');
const bodyParser = require('body-parser');

const { PORT, REMINDER_BINDING_KEY } = require('./config/serverConfig');
const { sendBaiscEmail } = require('./service/email-service')
const jobs = require('./utils/jobs');
const TicketContoller = require('./contoller/ticket-contoller');
const { createChannel, subscribeMessage } = require('./utils/messageQueue')
const EmailService = require('./service/email-service')

const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const channel = await createChannel();
    subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY)

    app.post('/api/v1/tickets', TicketContoller.create)
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
        jobs();

    })
}

setupAndStartServer();

// '"Support"<support@admin.com>'