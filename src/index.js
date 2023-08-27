const express = require('express');
const bodyParser = require('body-parser');

const {PORT} = require('./config/serverConfig');
const {sendBaiscEmail} = require('./service/email-service')

const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);

        sendBaiscEmail(
            'support@admin.com',
            'reminderservice7@gmail.com',
            'This is a testing email',
            'Hey, how are you, I hope you like the support'
        );
    })
}

setupAndStartServer();

// '"Support"<support@admin.com>'