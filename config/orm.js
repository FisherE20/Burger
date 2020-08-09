// Import MYSQL connection
const connection = require("./connection");

// Object for all our SQL statement functions.
let orm = {
  all: function (tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  update: function (table, objColVals, condition, cb) {
    let queryString = "UPDATE" + table;

    queryString += "SET";
    queryString += objToSql(objColVals);
    queryString += "WHERE";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) throw err;

      cb(result);
    });
  },
};

// Export the orm object for the model
module.exports = orm;
