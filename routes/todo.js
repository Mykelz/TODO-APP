const express = require('express');


const router = express.Router();

const todoController = require('../controllers/todo');



router.get('/todos', todoController.getAllTodo);

router.post('/todo', todoController.postTodo);

router.get('/todo/:id', todoController.getTodo);

router.put('/todo/:id/status', todoController.updateTodoStatus);

router.delete('/todo/:id', todoController.deleteTodo);


module.exports = router;