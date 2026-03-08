const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: process.env.USER,
  database: 'myproject'
});

module.exports = pool;
