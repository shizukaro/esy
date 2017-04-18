var express 	= require('express');
var router		= express.Router();
var mongoose	= require('mongoose');
var Carreras	= mongoose.model('Carreras');

ObjectId = mongoose.Types.ObjectId;

/* GET obtener todos los carreras. */
router.get('/', function(req, res, next) {
	Carreras.find( function( err, carreras ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(carreras);
	} );
});

/* GET obtener carrera por id. */
router.get('/:id', function(req, res, next) {
	Carreras.findOne( { _id: ObjectId(req.params.id) }, function( err, carrera ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(carrera);
	} );
});

/* POST insertar un nuevo carrera. */
router.post('/', function(req, res, next) {
	var carrera = new Carreras({
		nombre: 				req.body.nombre,
		nivelEducativo: 		req.body.nivelEducativo,
		modalidad: 				req.body.modalidad,
		fechaInicio: 			req.body.fechaInicio,
		fechaFinalizacion: 		req.body.fechaFinalizacion,
		creditosMinimos: 		req.body.creditosMinimos,
		creditosMaximos: 		req.body.creditosMaximos,
		horasMinimas: 			req.body.horasMinimas,
		horasMaximas: 			req.body.horasMaximas,
		tipoPlanEstudios: 		req.body.tipoPlanEstudios,
		tituloOtorgado: 		req.body.tituloOtorgado,
		certificadoOtorgado: 	req.body.certificadoOtorgado,
		campus: 				ObjectId(req.body.campus)
	});
	carrera.save(function(err, al) {
		if(err) {
			console.log(err.message);
			return res.status(500).send( err.message);}
		res.status(200).jsonp(carrera._id);
	});

});

/* PUT actualiza un carrera que ya existe. */
router.put('/:id', function(req, res, next) {
	console.log(req.body);
	Carreras.findOne( { _id: ObjectId(req.params.id) }, function(err, carrera){
		carrera.nombre 				= req.body.nombre;
		carrera.nivelEducativo 		= req.body.nivelEducativo;
		carrera.modalidad 			= req.body.modalidad;
		carrera.fechaInicio 		= req.body.fechaInicio;
		carrera.fechaFinalizacion 	= req.body.fechaFinalizacion;
		carrera.creditosMinimos 	= req.body.creditosMinimos;
		carrera.creditosMaximos 	= req.body.creditosMaximos;
		carrera.horasMinimas 		= req.body.horasMinimas;
		carrera.horasMaximas 		= req.body.horasMaximas;
		carrera.tipoPlanEstudios 	= req.body.tipoPlanEstudios;
		carrera.tituloOtorgado 		= req.body.tituloOtorgado;
		carrera.certificadoOtorgado = req.body.certificadoOtorgado;
		carrera.campus				= ObjectId(req.body.campus);
console.log(req.body);
		carrera.save(function(err, carrera) {
			if(err) return res.status(500).send( err.message);
			res.status(200).jsonp(carrera);
		});
	} )
});

/* DELETE actualiza un carrera que ya existe. */
router.delete('/:id', function(req, res, next) {
	Carreras.findOne( { _id: ObjectId(req.params.id) }, function(err, carrera){
		carrera.remove(function(err, carrera) {
			if(err) return res.status(500).send( err.message);
			res.status(200).send();
		});
	} )
});

module.exports = router;