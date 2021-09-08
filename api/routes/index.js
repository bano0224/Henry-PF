const { Router } = require('express');
const product = require('./product')
const user = require('./user')
const category = require('./category')
const reviews = require('./reviews')
var bodyParser = require('body-parser');


const router = Router();

router.use(bodyParser.json());

router.use('/product', product);
router.use('/user', user)
router.use('/category', category )
router.use('/reviews', reviews)


module.exports = router;