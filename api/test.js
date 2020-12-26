var mysql = require('mysql');
var config = require('./config/db_connection.js');
var con = mysql.createConnection(config.databaseConnect);


con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM people", function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
    });
  });