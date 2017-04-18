var express 	= require('express');
var router		= express.Router();
var mongoose	= require('mongoose');
var Campus		= mongoose.model('Campus');

ObjectId = mongoose.Types.ObjectId;

/* GET obtener todos los alumnos. */
router.get('/', function(req, res, next) {
	Campus.find( function( err, campuses ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(campuses);
	} );
});

/* GET obtener alumno por id. */
router.get('/:id', function(req, res, next) {
	Campus.findOne( { _id: req.params.id }, function( err, campus ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(campus);
	} );
});

/* POST insertar un nuevo alumno. */
router.post('/:id', function(req, res, next) {
	var campus = new Campus({
		_id: req.body._id,
		nombreCompleto: {
			nombre: req.body.nombreCompleto.nombre,
			aPaterno: req.body.nombreCompleto.aPaterno,
			aMaterno: req.body.nombreCompleto.aMaterno
		},
		sexo: req.body.sexo,
		fechaNacimiento: new Date(req.body.fechaNacimiento),
		fechaIngreso: new Date()
	});

	campus.save(function(err, al) {
		if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(campus._id);
	});

});

/* PUT actualiza un alumno que ya existe. */
router.put('/:id', function(req, res, next) {
	Campus.findOne( { _id: req.params.id }, function(err, campus){
		campus._id = req.body._id;
		campus.nombreCompleto = {
			nombre: req.body.nombreCompleto.nombre,
			aPaterno: req.body.nombreCompleto.aPaterno,
			aMaterno: req.body.nombreCompleto.aMaterno
		};
		campus.sexo = req.body.sexo;
		campus.fechaNacimiento = new Date(req.body.fechaNacimiento);
		campus.fechaIngreso = new Date(req.body.fechaIngreso);

		campus.save(function(err, campus) {
			if(err) return res.status(500).send( err.message);
			res.status(200).jsonp(campus);
		});
	} )
});

/* DELETE actualiza un alumno que ya existe. */
router.delete('/:id', function(req, res, next) {
	Campus.findOne( { _id: req.params.id }, function(err, campus){
		campus.remove(function(err, campus) {
			if(err) return res.status(500).send( err.message);
			res.status(200).send();
		});
	} )
});

module.exports = router;