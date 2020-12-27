var db		= require('../db.json')
var mysql = require('mysql');
var config = require('../config/db_connection.js');
var con = mysql.createConnection(config.databaseConnect);



module.exports = {
	getResults:	function(req, res){
						
							if (err) throw err;
							con.query("SELECT nom FROM people WHERE id="+req.params.student_id, function (err, result, fields) {
							if (err) throw err;
							console.log(result);
							res.send(result);
							
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
