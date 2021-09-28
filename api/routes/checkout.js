const { Router } = require('express')
const { checkout, sendMail } = require('../controllers/index.js')
const server = Router();

server.post('/create', checkout);
server.post('/sendMail', sendMail);

module.exports = server;