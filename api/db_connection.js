var mysql = require('mysql');

var con = mysql.createConnection({
    host: "mit.watin.be",
    user: "valentin",
    password: "Test123*",
    database: "mit_api"
  });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});