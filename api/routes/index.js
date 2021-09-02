const { Router } = require('express');
const product = require('./product')
const user = require('./user')
var bodyParser = require('body-parser');


const router = Router();
router.use(bodyParser.json());
router.use('/product', product);
router.use('/user', user)


module.exports = router;