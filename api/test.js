var mysql = require('mysql');

var con = mysql.createConnection({
    host: "mit.watin.be",
    user: "valentin",
    password: "Test123*",
    database: "mit_api",
    insecuredAuth : true
  });

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM customers", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });