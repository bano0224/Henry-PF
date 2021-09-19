const { Router } = require('express')
const server = Router();
const {createOrder} = require('../controllers/order/index')

server.post('/create', createOrder)


module.exports = server; 