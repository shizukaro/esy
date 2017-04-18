var express 	= require('express');
var router		= express.Router();
var mongoose	= require('mongoose');
var Periodos		= mongoose.model('Periodos');

ObjectId = mongoose.Types.ObjectId;

/* GET obtener todos los periodos. */
router.get('/', function(req, res, next) {
	Periodos.find( function( err, periods ){
		if(err) res.send(500, err.message);
		
		res.status(200).jsonp(periods);
	} );
});

/* GET obtener periodo por id. */
router.get('/:id', function(req, res, next) {
	Periodos.findOne( { _id: ObjectId(req.params.id) }, function( err, period ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(period);
	} );
});

/* POST insertar un nuevo periodo. */
router.post('/:id', function(req, res, next) {
	var period = new Periodos({
		nombre: 			req.body.nombre,
		abreviacion: 		req.body.abreviacion,
		fechaInicio: 		new Date(req.body.fechaInicio),
		fechaFinalizacion: 	new Date(req.body.fechaFinalizacion)
	});

	period.save(function(err, al) {
		if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(period._id);
	});

});

/* PUT actualiza un periodo que ya existe. */
router.put('/:id', function(req, res, next) {
	Periodos.findOne( { _id: ObjectId(req.params.id) }, function(err, period){
		period.nombre				= req.body.nombre;
		period.abreviacion			= req.body.abreviacion;
		period.fechaInicio			= new Date(req.body.fechaInicio);
		period.fechaFinalizacion	= new Date(req.body.fechaFinalizacion);

		period.save(function(err, period) {
			if(err) return res.status(500).send( err.message);
			res.status(200).jsonp(period);
		});
	} )
});

/* DELETE actualiza un periodo que ya existe. */
router.delete('/:id', function(req, res, next) {
	Periodos.findOne( { _id: ObjectId(req.params.id) }, function(err, period){
		period.remove(function(err, period) {
			if(err) return res.status(500).send( err.message);
			res.status(200).send();
		});
	} )
});

module.exports = router;