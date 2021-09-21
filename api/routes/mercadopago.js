const router = require('express').Router();
const { mercadopagoController } = require('../controllers');

router.post('/', mercadopagoController);

module.exports = router;
