var express 		= require('express');
var router			= express.Router();
var mongoose		= require('mongoose');
var Prerrequisitos	= mongoose.model('Prerrequisitos');

ObjectId = mongoose.Types.ObjectId;

/* GET obtener todos los prerrequisitos. */
router.get('/', function(req, res, next) {
	Prerrequisitos.find( function( err, prerreqs ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(prerreqs);
	} );
});

/* GET obtener prerrequisito por id. */
router.get('/:id', function(req, res, next) {
	Prerrequisitos.findOne( { _id: ObjectId(req.params.id) }, function( err, prerreq ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(prerreq);
	} );
});

/* POST insertar un nuevo prerrequisito. */
router.post('/:id', function(req, res, next) {
	var prerreq = new Prerrequisitos({
		asignatura: 	ObjectId(req.body.asignatura),
		prerrequisito: 	ObjectId(req.body.prerrequisito)
	});

	prerreq.save(function(err, al) {
		if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(prerreq._id);
	});

});

/* PUT actualiza un prerrequisito que ya existe. */
router.put('/:id', function(req, res, next) {
	Prerrequisitos.findOne( { _id: ObjectId(req.params.id) }, function(err, prerreq){
		prerreq.asignatura	= ObjectId(req.body.asignatura);
		prerreq.prerrequisito	= ObjectId(req.body.prerrequisito);

		prerreq.save(function(err, prerreq) {
			if(err) return res.status(500).send( err.message);
			res.status(200).jsonp(prerreq);
		});
	} )
});

/* DELETE actualiza un prerrequisito que ya existe. */
router.delete('/:id', function(req, res, next) {
	Prerrequisitos.findOne( { _id: ObjectId(req.params.id) }, function(err, prerreq){
		prerreq.remove(function(err, prerreq) {
			if(err) return res.status(500).send( err.message);
			res.status(200).send();
		});
	} )
});

module.exports = router;