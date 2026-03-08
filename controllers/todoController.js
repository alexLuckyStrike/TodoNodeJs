const { getAllTodos, insertTodo, deleteTodoById } = require('../models/todoModel');

async function getTodos(req, res) {
  try {
    const todos = await getAllTodos();
    res.json(todos);
  } catch (err) {
    console.error('Failed to fetch todos:', err.message);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
}

async function createTodo(req, res) {
  try {
    const title = typeof req.body?.title === 'string' ? req.body.title.trim() : '';
    const dueDateInput = req.body?.due_date;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const dueDate = dueDateInput === '' || dueDateInput == null ? null : dueDateInput;
    if (dueDate !== null && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      return res.status(400).json({ error: 'Invalid due_date format. Use YYYY-MM-DD' });
    }

    const todo = await insertTodo(title, dueDate);
    res.json(todo);
  } catch (err) {
    console.error('Failed to create todo:', err.message);
    res.status(500).json({ error: 'Failed to create todo' });
  }
}

async function deleteTodo(req, res) {
  try {
    const id = Number(req.params.elem);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    const result = await deleteTodoById(id);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Failed to delete todo:', err.message);
    res.status(500).json({ error: 'Failed to delete' });
  }
}

module.exports = {
  getTodos,
  createTodo,
  deleteTodo
};
