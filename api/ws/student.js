var db		= require('../db.json')
var mysql = require('mysql');
var config = require('../config/db_connection.js');
var con = mysql.createConnection(config.databaseConnect);



module.exports = {
	getResults:	function(req, res){
						res.send('blabla');
						con.connect(function(err) {
							if (err) throw err;
							con.query("SELECT * FROM people", function (err, result, fields) {
							if (err) throw err;
							
							//console.log(result);
							});
						});
                    },

	getDetails:	function(req, res){
						res.json(db);
					},
	setResults:	function(req, res){
					},
	setDetails:	function(req, res){
					},
	create:		function(req, res){
					}
}
