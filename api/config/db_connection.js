module.exports.databaseConnect = {
  
  host     : 'mit.watin.be',
  database : 'mit_api',
  user     : 'valentin',
  password : 'Test123*',
  port     : '3306'
};




/*var mysql = require('mysql');

var con = mysql.createConnection({
    host: "mit.watin.be",
    user: "valentin",
    password: "Test123*",
    database: "mit_api",
    insecuredAuth : true
  });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connect;*/