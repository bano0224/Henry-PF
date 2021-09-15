const router = require('express').Router();
const mercadopagoController = require('../controllers/mercadopago');

router.post('/', mercadopagoController);

module.exports = router;
