var express 	= require('express');
var router		= express.Router();
var mongoose	= require('mongoose');
var Alumnos		= mongoose.model('Alumnos');

/* GET obtener todos los alumnos. */
router.get('/', function(req, res, next) {
	res.render('insertar');
});

module.exports = router;