const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user:'root',
  database:'node_project',
  password:'Giyuu-Tomioka1'
});

module.exports = pool.promise(); 