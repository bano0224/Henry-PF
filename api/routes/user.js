const { Router } = require('express');
const { logIn, logUp, updateUser, getUsers,getUserById } = require('../controllers/index.js')


const server = Router();


server.post('/login', logIn)
server.post('/logup', logUp)
server.put('/update/:id', updateUser)
server.get('/', getUsers)
server.get('/:id', getUserById)


module.exports = server;
