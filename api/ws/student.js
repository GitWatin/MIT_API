var db		= require('../db.json')
var mysql = require('mysql');
var config = require('../config/db_connection.js');
var con = mysql.createConnection(config.databaseConnect);



module.exports = {
	getResults:	function(req, res){
							
							

                    },

	getDetails:	function(req, res){
				con.query("SELECT * FROM people WHERE id="+req.params.student_id, function (err, result, fields) {
				//console.log(result);
				if(result==0)
				{
					res.send("Etudiant inexistant");
				}
				else
				{
					res.send(result);
				}
				
				});
					},
	setResults:	function(req, res){


					},
	
	getStudent: function(req, res){
		con.query("SELECT * FROM people", function (err, results, fields) 
			{
				console.log(results);
				results = results.map(v => Object.assign({}, v));
				res.send(results);
			});

	},
	setDetails:	function(req, res){
					},
	create:		function(req, res){

					

					}
}
