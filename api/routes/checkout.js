const { Router } = require('express')
const { checkout } = require('../controllers/index.js')
const server = Router();

server.post('/create', checkout);

module.exports = server;