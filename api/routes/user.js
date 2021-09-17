const { Router } = require('express');
const { logIn, logUp, updateUser, getUsers,getUserById, removeUser, resetPassword } = require('../controllers/index.js')


const server = Router();


server.post('/login', logIn)
server.post('/logup', logUp)
server.put('/update/:id', updateUser)
server.get('/', getUsers)
server.get('/:id', getUserById)
server.delete('/delete/:id', removeUser)
server.post('/resetPassword', resetPassword)

module.exports = server;
