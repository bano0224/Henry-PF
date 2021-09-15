const { Router } = require('express');
const product = require('./product')
const category = require('./category')
const review = require('./review')
const user = require('./user')
const role = require('./role')
var bodyParser = require('body-parser');
const checkout = require('./checkout')
const mercadopago = require('./mercadopago');

const router = Router();

router.use(bodyParser.json());

router.use('/product', product);
router.use('/category', category )
router.use('/checkout', checkout);
router.use('/review', review)
router.use('/role', role)
router.use('/user', user)
router.use('/mercadopago', mercadopago);



module.exports = router;