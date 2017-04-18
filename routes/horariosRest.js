var express 	= require('express');
var router		= express.Router();
var mongoose	= require('mongoose');
var Horarios	= mongoose.model('Horarios');

ObjectId = mongoose.Types.ObjectId;

/* GET obtener todos los horarios. */
router.get('/', function(req, res, next) {
	Horarios.find( function( err, horarios ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(horarios);
	} );
});

/* GET obtener horario por id. */
router.get('/:id', function(req, res, next) {
	Horarios.findOne( { _id: ObjectId(req.params.id) }, function( err, horario ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(horario);
	} );
});

/* POST insertar un nuevo horario. */
router.post('/:id', function(req, res, next) {
	var horario = new Horarios({
		horaEntrada: 	req.body.horaEntrada,
		horaSalida: 	req.body.horaSalida,
		dia: 			req.body.dia,
		salon: 			ObjectId(req.body.salon),
		curso: 			ObjectId(req.body.curso)
	});

	horario.save(function(err, al) {
		if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(horario._id);
	});

});

/* PUT actualiza un horario que ya existe. */
router.put('/:id', function(req, res, next) {
	Horarios.findOne( { _id: ObjectId(req.params.id) }, function(err, horario){
		horario.horaEntrada = req.body.horaEntrada;
		horario.horaSalida 	= req.body.horaSalida;
		horario.dia			= req.body.dia;
		horario.salon		= ObjectId(req.body.salon);
		horario.curso		= ObjectId(req.body.curso);

		horario.save(function(err, horario) {
			if(err) return res.status(500).send( err.message);
			res.status(200).jsonp(horario);
		});
	} )
});

/* DELETE actualiza un horario que ya existe. */
router.delete('/:id', function(req, res, next) {
	Horarios.findOne( { _id: ObjectId(req.params.id) }, function(err, horario){
		horario.remove(function(err, horario) {
			if(err) return res.status(500).send( err.message);
			res.status(200).send();
		});
	} )
});

module.exports = router;