var express 	= require('express');
var router		= express.Router();
var mongoose	= require('mongoose');
var Salones		= mongoose.model('Salones');

ObjectId = mongoose.Types.ObjectId;

/* GET obtener todos los salones. */
router.get('/', function(req, res, next) {
	Salones.find( function( err, salons ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(salons);
	} );
});

/* GET obtener salon por id. */
router.get('/:id', function(req, res, next) {
	Salones.findOne( {_id: ObjectId(req.params.id) }, function( err, salon ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(salon);
	} );
});

/* POST insertar un nuevo salon. */
router.post('/', function(req, res, next) {
	var salon = new Salones({
		ubicacion: 	req.body.ubicacion,
		edificio: 	req.body.edificio,
		piso: 		req.body.piso,
		numero: 	req.body.numero
	});

	salon.save(function(err, al) {
		if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(salon);
	});

});

/* PUT actualiza un salon que ya existe. */
router.put('/:id', function(req, res, next) {
	Salones.findOne( { _id: ObjectId(req.params.id) }, function(err, salon){
		salon.ubicacion	= req.body.ubicacion,
		salon.edificio	= req.body.edificio,
		salon.piso		= req.body.piso,
		salon.numero	= req.body.numero;

		salon.save(function(err, salon) {
			if(err) return res.status(500).send( err.message);
			res.status(200).jsonp(salon);
		});
	} )
});

/* DELETE actualiza un salon que ya existe. */
router.delete('/:id', function(req, res, next) {
	Salones.findOne( { _id: ObjectId(req.params.id) }, function(err, salon){
		salon.remove(function(err, salon) {
			if(err) return res.status(500).send( err.message);
			res.status(200).send();
		});
	} )
});

module.exports = router;