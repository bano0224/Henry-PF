const { Router } = require('express');
const product = require('./product')


const router = Router();

router.use('/product', product);


module.exports = router;