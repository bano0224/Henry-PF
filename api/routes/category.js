const { Router } = require('express')
const { getCategory, createCategory, deleteCategory, updateCategory } = require('../controllers/index.js')
const server = Router();

server.get('/', getCategory)
server.post('/create', createCategory)
server.delete('/delete/:id', deleteCategory)
server.put('/update', updateCategory)

module.exports = server; 