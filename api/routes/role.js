const { Router } = require('express');
const { getRoles } = require('../controllers/index.js')

const server = Router();


server.get('/', getRoles)

module.exports = server;