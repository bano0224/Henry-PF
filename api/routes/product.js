const server = require('express').Router()
const products = require('../data/products')


server.get('/', async (req, res, next) => {
    res.status(200).json(products)
})


module.exports = server;