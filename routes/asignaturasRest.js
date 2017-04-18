var express 	= require('express');
var router		= express.Router();
var mongoose	= require('mongoose');
var Asignaturas	= mongoose.model('Asignaturas');

ObjectId = mongoose.Types.ObjectId;
/*var areas = [
	ObjectId("58ae5ad720fff81ff43b0620"),
	ObjectId("58ae5ad720fff81ff43b0621"),
	ObjectId("58ae5ad720fff81ff43b0622"),
	ObjectId("58ae5ad720fff81ff43b0623"),
	ObjectId("58ae5ad720fff81ff43b0624"),
	ObjectId("58ae5ad720fff81ff43b0625"),
	ObjectId("58ae5ad720fff81ff43b0626")];*/

/* GET obtener todos los asignaturas. */
router.get('/', function(req, res, next) {
	Asignaturas.find(function( err, asigs ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(asigs);
	});
});

/* GET obtener asignatura por id. */
router.get('/:id', function(req, res, next) {
	Asignaturas.findOne( { codigo: req.params.id }, function( err, asig ){
		if(err) res.status(500).send(err.message);

		res.status(200).jsonp(asig);
	} );
});

/* POST insertar un nuevo asignatura. */
router.post('/:id', function(req, res, next) {
	//c = ObjectId("58bb35fcf78d8a1ee8562c58");
	//a = areas[Math.round(req.body.area)];

	var asig = new Asignaturas({
		codigo: 			req.body.codigo,
		creditos: 			req.body.creditos,
		nombre: 			req.body.nombre,
		nombreCorto: 		req.body.nombreCorto,
		horasTeoria: 		req.body.horasTeoria,
		horasPractica: 		req.body.horasPractica,
		horasIndependiente: req.body.horasIndependiente,
		nivel: 				req.body.nivel,
		periodoMinimo: 		req.body.periodoMinimo,
		carrera: 			ObjectId(req.body.carrera),
		area: 				ObjectId(req.body.area)
	});
	//console.log(asig);
	asig.save(function(err, al) {
		if(err) return res.status(500).send( err.message);

		Asignaturas.findOne( { _id: asig._id }, function( err, asig ){
			if(err) res.status(500).send(err.message);

			res.status(200).jsonp(asig);
		});
	});

});

/* PUT actualiza un asignatura que ya existe. */
router.put('/:id', function(req, res, next) {
	Asignaturas.findOne( { codigo: req.params.id }, function(err, asig){
		/*arr = req.body.prerrequisito.split(",");
		for (var i = 0; i < arr.length; i++) {
			arr[i] = ObjectId(arr[i]);
		}*/
		asig.codigo 				= req.body.codigo;
		asig.creditos 				= req.body.creditos;
		asig.nombre 				= req.body.nombre;
		asig.horasTeoria 			= req.body.horasTeoria;
		asig.horasPractica 			= req.body.horasPractica;
		asig.horasIndependiente 	= req.body.horasIndependiente;
		asig.nivel 					= req.body.nivel;
		asig.periodoMinimo 			= req.body.periodoMinimo;
		asig.carrera 				= ObjectId(req.body.carrera);
		asig.area 					= ObjectId(req.body.area);
		//asig.prerrequisito			= arr;
		
		asig.save(function(err, asig) {
			if(err) return res.status(500).send( err.message);

			res.status(200).jsonp(asig);
		});
	} )
});

/* DELETE eliminar un asignatura que ya existe. */
router.delete('/:id', function(req, res, next) {
	Asignaturas.findOne( { codigo: req.params.id }, function(err, asig){
		asig.remove(function(err, asig) {
			if(err) return res.status(500).send( err.message);
			res.status(200).send();
		});
	} )
});

module.exports = router;