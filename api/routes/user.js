const { Router } = require('express');
const { logIn, logUp, updateUser, } = require('../controllers/index.js')


const server = Router();


server.post('/login', logIn)
server.post('/logup', logUp)
server.put('/update', updateUser)


module.exports = server;
