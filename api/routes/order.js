const { Router } = require('express')
const server = Router();
const {createOrder, getOrderByUser} = require('../controllers/order/index')

server.post('/create', createOrder)
server.post('/create/:id', createOrder)
server.get('/user/:id', getOrderByUser)


module.exports = server; 