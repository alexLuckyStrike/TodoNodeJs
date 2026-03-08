const pool = require('../db');

async function getAllTodos() {
  const result = await pool.query('SELECT * FROM todos ORDER BY id DESC');
  return result.rows;
}

async function insertTodo(title, dueDate) {
  const result = await pool.query(
    'INSERT INTO todos (title, due_date) VALUES ($1, $2) RETURNING *',
    [title, dueDate]
  );
  return result.rows[0];
}

async function deleteTodoById(id) {
  const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
  return result;
}

module.exports = {
  getAllTodos,
  insertTodo,
  deleteTodoById
};
