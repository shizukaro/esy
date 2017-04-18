var express 	= require('express');
var router		= express.Router();
var mongoose	= require('mongoose');
var Areas		= mongoose.model('Areas');

ObjectId = mongoose.Types.ObjectId;

/* GET obtener todos los areas. */
router.get('/', function(req, res, next) {
	Areas.find( function( err, areas ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(areas);
	} );
});

/* GET obtener area por id. */
router.get('/:id', function(req, res, next) {
	Areas.findOne( { _id: ObjectId(req.params.id) }, function( err, area ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(area);
	} );
});

/* POST insertar un nuevo area. */
router.post('/', function(req, res, next) {
	console.log(req.body);
	var area = new Areas({
		nombre: req.body.nombre,
		descripcion: req.body.descripcion
	});

	area.save(function(err, al) {
		if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(area._id);
	});

});

/* PUT actualiza un area que ya existe. */
router.put('/:id', function(req, res, next) {
	Areas.findOne( { _id: ObjectId(req.params.id) }, function(err, area){
		area.nombre = req.body.nombre;
		area.descripcion = req.body.descripcion;

		area.save(function(err, area) {
			if(err) return res.status(500).send( err.message);
			res.status(200).jsonp(area);
		});
	} )
});

/* DELETE elimina un area que ya existe. */
router.delete('/:id', function(req, res, next) {
	Areas.findOne( { _id: ObjectId(req.params.id) }, function(err, area){
		area.remove(function(err, area) {
			if(err) return res.status(500).send( err.message);
			res.status(200).send();
		});
	} )
});

module.exports = router;