var express 	= require('express');
var router		= express.Router();
var mongoose	= require('mongoose');
var Cursos		= mongoose.model('Cursos');

ObjectId = mongoose.Types.ObjectId;
/*var periodos = [
	ObjectId("58ae5ad720fff81ff43b0628"),
	ObjectId("58ae5ad720fff81ff43b0629"),
	ObjectId("58ae5ad720fff81ff43b062a"),
	ObjectId("58ae5ad720fff81ff43b062b"),
	ObjectId("58ae5ad720fff81ff43b062c"),
	ObjectId("58ae5ad720fff81ff43b062d"),
	ObjectId("58ae5ad720fff81ff43b062e"),
	ObjectId("58ae5ad720fff81ff43b062f"),
	ObjectId("58ae5ad720fff81ff43b0630"),
	ObjectId("58ae5ad820fff81ff43b0631"),
	ObjectId("58ae5ad820fff81ff43b0632"),
	ObjectId("58ae5ad820fff81ff43b0633"),
	ObjectId("58ae5ad820fff81ff43b0634"),
	ObjectId("58ae5ad820fff81ff43b0635"),
	ObjectId("58ae5ad820fff81ff43b0636"),
	ObjectId("58ae5ad720fff81ff43b0627")];*/

/* GET obtener todos los cursos. */
router.get('/', function(req, res, next) {
	Cursos.find( function( err, cursos ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(cursos);
	} );
});

/* GET obtener curso por id. */
router.get('/:id', function(req, res, next) {
	Cursos.findOne( { nrc: req.params.id }, function( err, curso ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(curso);
	} );
});

/* POST insertar un nuevo curso. */
router.post('/:id', function(req, res, next) {
	console.log(req.body);
	var curso = new Cursos({
		nrc: 		req.body.nrc,
		cupo: 		req.body.cupo,
		profesor: 	req.body.profesor,
		periodo: 	ObjectId(req.body.periodo),
		asignatura: req.body.asignatura
	});
	console.log(req.body);
	curso.save(function(err, al) {
		if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(curso);
	});

});

/* PUT actualiza un curso que ya existe. */
router.put('/:id', function(req, res, next) {
	Cursos.findOne( { nrc: req.params.id }, function(err, curso){
		curso.nrc 			= req.body.nrc;
		curso.cupo			= req.body.cupo;
		curso.profesor		= req.body.profesor;
		curso.periodo		= ObjectId(req.body.periodo);
		curso.asignatura 	= req.body.asignatura;

		curso.save(function(err, curso) {
			if(err) return res.status(500).send( err.message);
			res.status(200).jsonp(curso);
		});
	} )
});

/* DELETE elimina un curso que ya existe. */
router.delete('/:id', function(req, res, next) {
	Cursos.findOne( { nrc: req.params.id }, function(err, curso){
		curso.remove(function(err, curso) {
			if(err) return res.status(500).send( err.message);
			res.status(200).send();
		});
	} )
});

module.exports = router;