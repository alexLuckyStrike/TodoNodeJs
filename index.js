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
  try {
    const result = await pool.query('SELECT * FROM todos ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Failed to fetch todos:', err.message);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

app.post('/todos', async (req, res) => {
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

    const result = await pool.query(
      'INSERT INTO todos (title, due_date) VALUES ($1, $2) RETURNING *',
      [title, dueDate]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Failed to create todo:', err.message);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});


app.delete("/todos/:elem", async (req, res) => {
  try {
    console.log("req.id:", req.params.elem);
    const result = await pool.query(`DELETE FROM todos where id = ${req.params.elem}`)
    res.json(result.rows);
  } catch (err) {
    console.log("error");
    res.status(500).json({ error: 'Failed to delete' })
  }
});


app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});
