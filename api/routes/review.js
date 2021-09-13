const { Router } = require('express')
const { createReviews, getReviews } = require('../controllers/index')
const server = Router();

server.post('/create', createReviews)
server.get('/', getReviews)
server.get('/:id', getReviews)


module.exports = server;