var db	= require('../db.json')
var mysql = require('mysql');
//var app = express();
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
				
				//results = results.map(v => Object.assign({}, v));
				console.log(results);
				res.send(JSON.stringify(results));
			});

	},
	setDetails:	function(req, res){
					},
	create:		function(req, res){
					
					console.log(req.body);
					const item = req.body;
					
					//console.log(item['nom']);
					const obj = JSON.parse(item);
					console.log(obj.nom);
					res.send('coucou');

					}
}
