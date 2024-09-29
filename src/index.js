const express = require("express");
const bodyParser = require("body-parser");

const {
  PORT,
  REMINDER_BINDING_KEY,
  DB_SYNC,
} = require("./config/serverConfig");
const { sendBaiscEmail } = require("./service/email-service");
const jobs = require("./utils/jobs");
const TicketContoller = require("./contoller/ticket-contoller");
const { createChannel, subscribeMessage } = require("./utils/messageQueue");
const EmailService = require("./service/email-service");
const db = require("./models/index");
const TicketRepository = require("./repository/ticket-repository");

const setupAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const channel = await createChannel();
  subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

  app.post("/api/v1/tickets", TicketContoller.create);
  app.listen(PORT, async () => {
    console.log(`Server started at ${PORT}`);
    if (DB_SYNC == "true") {
      db.sequelize.sync({ alert: true });
    }
    this.ticketRepository = new TicketRepository();
    const repons = await this.ticketRepository.getAll();
    console.log(repons);

    jobs();
  });
};

setupAndStartServer();

// '"Support"<support@admin.com>'
