var express 	= require('express');
var router		= express.Router();
var mongoose	= require('mongoose');
var Alumnos		= mongoose.model('Alumnos');

ObjectId = mongoose.Types.ObjectId;

/* GET obtener todos los alumnos. */
router.get('/', function(req, res, next) {
	Alumnos.find( function( err, almnos ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(almnos);
	} );
});

/* GET obtener alumno por id. */
router.get('/:id', function(req, res, next) {
	Alumnos.findOne( { matricula: req.params.id }, function( err, almno ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(almno);
	} );
});

router.get('/datosAlumno',function(req, res, next){
	Alumnos.findOne({matricula:req.session.identificador}, function(err, almno){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(almno);
	});
});

/* POST insertar un nuevo alumno. */
router.post('/:id', function(req, res, next) {
	var almno = new Alumnos({
		matricula: 			req.body.matricula,
		nombreCompleto:
		{
			nombre: 	req.body.nombreCompleto.nombre,
			aPaterno: 	req.body.nombreCompleto.aPaterno,
			aMaterno: 	req.body.nombreCompleto.aMaterno
		},
		sexo: 				req.body.sexo,
		fechaNacimiento: 	new Date(req.body.fechaNacimiento),
		fechaIngreso: 		new Date(req.body.fechaIngreso),
		tutor: 				req.body.tutor,
		carrera: 			ObjectId(req.body.carrera)
	});

	almno.save(function(err, al) {
		if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(almno);
	});

});

/* PUT actualiza un alumno que ya existe. */
router.put('/:id', function(req, res, next) {
	Alumnos.findOne( { _id: ObjectId(req.body._id) }, function(err, almno){
		console.log(req.body.tutor);
		almno.matricula 		= req.body.matricula;
		almno.nombreCompleto = 
		{
			nombre: 	req.body.nombreCompleto.nombre,
			aPaterno: 	req.body.nombreCompleto.aPaterno,
			aMaterno: 	req.body.nombreCompleto.aMaterno
		};
		almno.sexo 				= req.body.sexo;
		almno.fechaNacimiento 	= new Date(req.body.fechaNacimiento);
		almno.fechaIngreso 		= new Date(req.body.fechaIngreso);
		almno.tutor 			= req.body.tutor;
		almno.carrera 			= ObjectId(req.body.carrera);

		almno.save(function(err, almno) {
			if(err){ return res.status(500).send( err.message);console.log(err)}
			res.status(200).jsonp(almno);
		});
	} )
});

/* DELETE actualiza un alumno que ya existe. */
router.delete('/:id', function(req, res, next) {
	Alumnos.findOne( { matricula: req.params.id }, function(err, almno){
		almno.remove(function(err, almno) {
			if(err) return res.status(500).send( err.message);
			res.status(200).send();
		});
	} )
});

module.exports = router;