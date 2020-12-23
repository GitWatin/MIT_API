var db		= require('../db.json')

module.exports = {
	getResults:	function(req, res){
                       console.log("Han ouais");
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
