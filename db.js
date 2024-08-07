const mysql = require('mysql2/promise');

const initDbConnection = async () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'myapi'
  });
};

module.exports = initDbConnection;
