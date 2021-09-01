const { Router } = require('express')
const products = require('../data/products')

const server = Router();


server.get('/', async (req, res, next) => {

    // const { name } = req.query;

    
    res.status(200).json(products)
})


module.exports = server;
