var express 	= require('express');
var router		= express.Router();
var mongoose	= require('mongoose');
var Profesores	= mongoose.model('Profesores');

/* GET obtener todos los Profesores. */
router.get('/', function(req, res, next) {
	Profesores.find( function( err, profs ){
		if(err) res.send(500, err.message);

		//console.log(profs);
		res.status(200).jsonp(profs);
	} );
});

/* GET obtener alumno por id. */
router.get('/:id', function(req, res, next) {
	Profesores.findOne( { dni: req.params.id }, function( err, prof ){
		if(err) res.send(500, err.message);

		console.log(prof);
		res.status(200).jsonp(prof);
	} );
});

/* POST insertar un nuevo alumno. */
router.post('/:id', function(req, res, next) {
	var prof = new Profesores({
		dni: req.body.dni,
		nombreCompleto: {
			nombre:		req.body.nombreCompleto.nombre,
			aPaterno:	req.body.nombreCompleto.aPaterno,
			aMaterno:	req.body.nombreCompleto.aMaterno
		},
		sexo: req.body.sexo,
		fechaNacimiento: new Date(req.body.fechaNacimiento)
	});
	//res.status(200).jsonp(prof);
	prof.save(function(err, al) {
		if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(prof);
	});
	/*console.log('-----------POST----------');
	console.log(req.body);*/
});

/* PUT actualiza un alumno que ya existe. */
router.put('/:id', function(req, res, next) {
	Profesores.findOne( { dni: req.params.id }, function(err, prof){
		prof.dni = req.body.dni;
		prof.nombreCompleto = req.body.nombreCompleto;
		prof.sexo = req.body.sexo;
		prof.fechaNacimiento = new Date(req.body.fechaNacimiento);

		prof.save(function(err, prof) {
			if(err) return res.status(500).send( err.message);
			res.status(200).jsonp(prof);
		});
	} )
});

/* DELETE actualiza un alumno que ya existe. */
router.delete('/:id', function(req, res, next) {
	Profesores.findOne( { dni: req.params.id }, function(err, prof){
		prof.remove(function(err, prof) {
			if(err) return res.status(500).send( err.message);
			res.status(200).send();
		});
	} )
});

module.exports = router;