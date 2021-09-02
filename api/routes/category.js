const { Router } = require('express')
const { getCategory, createCategory } = require('../controllers/index.js')
const server = Router();

server.get('/', getCategory)
server.post('/create', createCategory)

module.exports = server;