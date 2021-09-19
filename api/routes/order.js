const { Router } = require('express')
const server = Router();
const {createOrder, getOrderByUser, getOrders} = require('../controllers/order/index')

server.get('/', getOrders)
server.post('/create', createOrder)
server.get('/user/:id', getOrderByUser)


module.exports = server; 