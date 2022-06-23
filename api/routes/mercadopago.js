const router = require('express').Router();
const { mercadopagoController, responseMp } = require('../controllers');

router.post('/', mercadopagoController);
router.get('/feedback', responseMp);

module.exports = router;
