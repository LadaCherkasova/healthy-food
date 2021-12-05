const Pool = require('pg').Pool;

const pool = new Pool({
  user: "postgres",
  password: "jao0803",
  database: "healthy_food_database",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
