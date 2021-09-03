const { Router } = require('express');
const { getUsers } = require('../controllers/index.js')
const server = Router();

server.get('/', getUsers)

module.exports = server;