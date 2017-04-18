var express 	= require('express');
var router		= express.Router();
var mongoose	= require('mongoose');
var Usuarios	= mongoose.model('Usuarios');

ObjectId = mongoose.Types.ObjectId;

/* GET obtener todos los usuarios. */
router.get('/', function(req, res, next) {
	Usuarios.find( function( err, usuarios ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(usuarios);
	} );
});

/* GET obtener usuario por id. */
router.get('/:id', function(req, res, next) {
	Usuarios.findOne( { identificador: req.params.id }, function( err, usuario ){
		if(err) res.send(500, err.message);

		res.status(200).jsonp(usuario);
	} );
});

/* POST insertar un nuevo usuario. */
router.post('/:id', function(req, res, next) {
	var usuario = new Usuarios({
		identificador: 	req.body.identificador,
		contrasena: 	req.body.contrasena,
		tipo: 			req.body.tipo,
		imagenFondo: 	ObjectId(req.body.imagenFondo),
		imagenPerfil: 	ObjectId(req.body.imagenPerfil),
		datosUsuario: 	ObjectId(req.body.datosUsuario)
	});

	usuario.save(function(err, al) {
		if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(usuario._id);
	});

});

/* PUT actualiza un usuario que ya existe. */
router.put('/:id', function(req, res, next) {
	Usuarios.findOne( { identificador: req.params.id }, function(err, usuario){
		usuario.identificador 	= req.body.identificador;
		usuario.contrasena		= req.body.contrasena;
		usuario.tipo			= req.body.tipo;
		usuario.imagenFondo		= ObjectId(req.body.imagenFondo);
		usuario.imagenPerfil	= ObjectId(req.body.imagenPerfil);
		usuario.datosUsuario	= ObjectId(req.body.datosUsuario);

		usuario.save(function(err, usuario) {
			if(err) return res.status(500).send( err.message);
			res.status(200).jsonp(usuario);
		});
	} )
});

/* DELETE actualiza un usuario que ya existe. */
router.delete('/:id', function(req, res, next) {
	Usuarios.findOne( { identificador: req.params.id }, function(err, usuario){
		usuario.remove(function(err, usuario) {
			if(err) return res.status(500).send( err.message);
			res.status(200).send();
		});
	} )
});

module.exports = router;