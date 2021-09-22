const { Router } = require('express')
const server = Router();
const {createOrder, getOrderByUser, getOrders, getOrderById} = require('../controllers/order/index')

server.get('/', getOrders)
server.post('/create', createOrder)
server.get('/user/:id', getOrderByUser)
server.get('/detail/:id', getOrderById)


module.exports = server; 