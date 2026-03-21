const { getAllTodos, insertTodo, deleteTodoById } = require('../models/todoModel');

class ServiceError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'ServiceError';
    this.statusCode = statusCode;
  }
}

function validateTitle(titleInput) {
  const title = typeof titleInput === 'string' ? titleInput.trim() : '';
  if (!title) {
    throw new ServiceError('Title is required', 400);
  }
  return title;
}

function validateDueDate(dueDateInput) {
  if (dueDateInput === '' || dueDateInput == null) {
    return null;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dueDateInput)) {
    throw new ServiceError('Invalid due_date format. Use YYYY-MM-DD', 400);
  }

  return dueDateInput;
}

function validateId(idInput) {
  const id = Number(idInput);
  if (!Number.isInteger(id)) {
    throw new ServiceError('Invalid id', 400);
  }
  return id;
}

async function listTodos() {
  return getAllTodos();
}

async function createTodo(titleInput, dueDateInput) {
  const title = validateTitle(titleInput);
  const dueDate = validateDueDate(dueDateInput);
  return insertTodo(title, dueDate);
}

async function removeTodoById(idInput) {
  const id = validateId(idInput);
  const result = await deleteTodoById(id);

  if (result.rowCount === 0) {
    throw new ServiceError('Todo not found', 404);
  }

  return result.rows[0];
}

module.exports = {
  listTodos,
  createTodo,
  removeTodoById,
  ServiceError
};
