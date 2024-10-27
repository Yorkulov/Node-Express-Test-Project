const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'nodeapp'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};

pool.connect()
    .then(client => {
        console.log('Database connected successfully!');
        client.release();
    })
    .catch(err => {
        console.error('Database connection error:', err.stack);
    });