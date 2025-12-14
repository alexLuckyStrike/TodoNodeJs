const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = 3001;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: process.env.USER,
  database: 'myproject'
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/todos', async (req, res) => {
  const result = await pool.query('SELECT * FROM todos ORDER BY id DESC');
  res.json(result.rows);
});

app.post('/todos', async (req, res) => {
  const { title, due_date } = req.body;
  const result = await pool.query(
    'INSERT INTO todos (title, due_date) VALUES ($1, $2) RETURNING *',
    [title, due_date]
  );
  res.json(result.rows[0]);
});

app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});