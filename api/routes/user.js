const { Router } = require('express');
const { logIn, logUp, getUser, updateUser, getUserById } = require('../controllers/index.js')


const server = Router();

server.get('/', getUsers)
server.post('/login', logIn)
server.post('/logup', logUp)
server.get('/', getUser)
server.get('/:id', getUserById)
server.put('/update', updateUser)


module.exports = server;
