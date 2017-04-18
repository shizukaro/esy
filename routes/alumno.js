var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	console.log(req.usuario.identificador);
	res.render('alumno',{

	});
});

module.exports = router;
