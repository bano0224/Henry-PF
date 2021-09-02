const { Router } = require('express')
const { getProducts, createProduct, getProductsById, removeProduct } = require('../controllers/index.js')
const server = Router();

server.get('/', getProducts)
server.post('/create', createProduct)
server.post('/:id', getProductsById)
server.delete('/delete/:id', removeProduct)


module.exports = server;
