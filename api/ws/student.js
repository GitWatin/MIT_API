var db		= require('../db.json')

var con = mysql.createConnection({
    host: "mit.watin.be",
    user: "valentin",
    password: "Test123*",
    database: "mit_api"
  });

module.exports = {
	getResults:	function(req, res){
                        con.connect(function(err) {
                            if (err) throw err;
                            con.query("SELECT * FROM customers", function (err, result, fields) {
                            if (err) throw err;
                            console.log(result);
                            });
                        res.send('blabla');
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
