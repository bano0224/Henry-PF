const { Router } = require('express');
const product = require('./product')
const category = require('./category')
const reviews = require('./reviews')
const user = require('./user')
var bodyParser = require('body-parser');
const checkout = require('./checkout')

const router = Router();

router.use(bodyParser.json());

router.use('/product', product);
router.use('/category', category )
router.use('/reviews', reviews)
router.use('/checkout', checkout);
router.use('/user', user)



module.exports = router;