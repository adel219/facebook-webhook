const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const xhub = require('express-x-hub');

app.set('port', (process.env.PORT || 6000));
app.listen(app.get('port'));

app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));
app.use(bodyParser.json());

const token = process.env.TOKEN || 'token';
const messagingController = require('./api/controllers/messages.controller');

app.post('/', messagingController.receiveMessage);

app.get(['/facebook'], function(req, res) {
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == token
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.listen();