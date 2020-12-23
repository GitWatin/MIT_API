var express	= require('express');
var router	= express.Router();

var student	= require('./ws/student')


var app = express();
// GET(récuper)
// POST(modifier)
// PUT(creer/envoyer)
// DELETE(supprimer)

router.get(
				'/student/:student_id',
			  student.getDetails
);
router.post(
				'/student/:student_id',
			  student.setDetails
);
router.get(
				'/student/:student_id/results',
			  student.getResults
);
router.post(
				'/student/:student_id/results',
			  student.setResults
);
router.put(
				'/student',
			  student.create
);

router.get(
				'/',
			  function (req, res){
				  res.send(" ... list web service")
			  }
);

app.use(router);

app.listen(80);