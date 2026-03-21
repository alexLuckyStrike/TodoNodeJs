const express = require('express');
const {
  getTodos,
  createTodo,
  deleteTodo
} = require('./controllers/todoController');

const router = express.Router();

router.get('/todos', getTodos);
router.post('/todos', createTodo);
router.delete('/todos/:id', deleteTodo);

module.exports = router;
