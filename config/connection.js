// Set up MySQL connection.
const mysql = require("mysql");

let connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "F1shB0wl2020!",
    database: "burgers_db",
  });
};

// Make connection.
connection.connect();

// Export connection for our ORM to use.
module.exports = connection;
