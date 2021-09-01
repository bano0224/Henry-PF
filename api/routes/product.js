const { Router } = require('express')
const { getProducts } = require('../controllers/index.js')
const server = Router();

server.get('/', getProducts)
 


module.exports = server;
