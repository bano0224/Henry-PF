const { Router } = require('express');
const product = require('./product')
const category = require('./category')
const review = require('./review')
const user = require('./user')
const role = require('./role')
const checkout = require('./checkout')
const order = require('./order')
var bodyParser = require('body-parser');
const mercadopago = require('./mercadopago');

const router = Router();

router.use(bodyParser.json());

router.use('/product', product);
router.use('/category', category )
router.use('/checkout', checkout);
router.use('/review', review)
router.use('/role', role)
router.use('/user', user)
router.use('/order', order)
router.use('/mercadopago', mercadopago);



module.exports = router;