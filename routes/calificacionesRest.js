var express 	= require('express');
var router		= express.Router();
var mongoose	= require('mongoose');
var Calificaciones		= mongoose.model('Calificaciones');

ObjectId = mongoose.Types.ObjectId;

/* GET obtener todos los alumnos. */
router.get('/', function(req, res, next) {
	Calificaciones.find( function( err, califs ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(califs);
	} );
});

/* GET obtener alumno por id. */
router.get('/:id', function(req, res, next) {
	Calificaciones.findOne( { _id: ObjectId(req.params.id) }, function( err, calif ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(calif);
	} );
});

/* POST insertar un nuevo alumno. */
router.post('/:id', function(req, res, next) {
	var calif = new Calificaciones({
		fechaHoraInscripcion: 		new Date(req.body.fechaHoraInscripcion),
		calificacionOrdinaria: 		req.body.calificacionOrdinaria,
		calificacionExtraordinaria: req.body.calificacionExtraordinaria,
		alumno: 					req.body.alumno,
		curso: 						ObjectId(req.body.curso)
	});

	calif.save(function(err, al) {
		if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(calif._id);
	});

});

/* PUT actualiza un alumno que ya existe. */
router.put('/:id', function(req, res, next) {
	Calificaciones.findOne( { _id: ObjectId(req.params.id) }, function(err, calif)
	{
		calif.fechaHoraInscripcion 			= new Date(req.body.fechaHoraInscripcion);
		calif.calificacionOrdinaria 		= req.body.calificacionOrdinaria;
		calif.calificacionExtraordinaria 	= req.body.calificacionExtraordinaria;
		calif.alumno 						= req.body.alumno;
		calif.curso 						= ObjectId(req.body.curso);

		calif.save(function(err, calif) 
		{
			if(err) return res.status(500).send( err.message);
			res.status(200).jsonp(calif);
		});
	} )
});

/* DELETE actualiza un alumno que ya existe. */
router.delete('/:id', function(req, res, next) 
{
	Calificaciones.findOne( { _id: ObjectId(req.params.id) }, function(err, calif)
	{
		calif.remove(function(err, calif) 
		{
			if(err) return res.status(500).send( err.message);
			res.status(200).send();
		});
	} )
});

module.exports = router;