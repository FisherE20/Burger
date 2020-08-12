// Import MYSQL connection
const connection = require("./connection");


function printQuestionMarks (num) {
  let arr = [];

  for (let i =0; i< num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to covert object key/value pairs to sql syntax
function objToSql(ob) {
  let arr = [];
  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    let value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Jiffy Burger => 'Jiffy Burger')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {burger_name: 'Jiffy Burger'} => ["burger_name='Jiffy Burger'"]
      // e.g. {devoured: true} => ["devoured=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

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

  create: function(table, cols, vals,cb) {
    let queryString = "INSERT INTO" + table;

    queryString += "(";
    queryString += cols.toString();
    queryString += ")";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    querystring += ")";

    console.log(queryString);

    connection.query(queryString, vals, cols, function(err,result) {
      if (err) throw err;

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

  delete: function(table, condition,cb) {
    let queryString = "DELETE FFROM" + table;
    queryString += "WHERE";
    queryString += condition;
  
    connection.query(queryString, function(err,result) {
      if(err) throw err;
  
      cb(result);
    });
  }
};



// Export the orm object for the model
module.exports = orm;
