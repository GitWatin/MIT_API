var db		= require('../db.json')




module.exports = {
	getResults:	function(req, res){

						con.connect(function(err) {
							if (err) throw err;
							con.query("SELECT * FROM people", function (err, result, fields) {
							if (err) throw err;
							res.send(result);
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
