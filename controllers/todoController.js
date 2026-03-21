const {
  listTodos,
  createTodo: createTodoService,
  removeTodoById,
  ServiceError
} = require('../services/todoService');

function handleControllerError(res, err, logMessage, fallbackMessage) {
  if (err instanceof ServiceError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(logMessage, err.message);
  return res.status(500).json({ error: fallbackMessage });
}

async function getTodos(req, res) {
  try {
    const todos = await listTodos();
    res.json(todos);
  } catch (err) {
    return handleControllerError(res, err, 'Failed to fetch todos:', 'Failed to fetch todos');
  }
}

async function createTodo(req, res) {
  try {
    const todo = await createTodoService(req.body?.title, req.body?.due_date);
    res.json(todo);
  } catch (err) {
    return handleControllerError(res, err, 'Failed to create todo:', 'Failed to create todo');
  }
}

async function deleteTodo(req, res) {
  try {
    const deletedTodo = await removeTodoById(req.params.id);
    res.json(deletedTodo);
  } catch (err) {
    return handleControllerError(res, err, 'Failed to delete todo:', 'Failed to delete');
  }
}

module.exports = {
  getTodos,
  createTodo,
  deleteTodo
};
