const { Router } = require('express')
const { createReviews } = require('../controllers/index')
const server = Router();

server.post('/create', createReviews)


module.exports = server;