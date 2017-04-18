var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'localhost',
	username: 'root',
	password: '',
	database: 'esy'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
	connection.connect(function(err){
	if(!err) {
	    console.log("Database is connected ... nn");    
	} else {
	    console.log(err);    
	}
	});

	connection.query('SELECT * FROM alumno', function(err, rows, fields) {
		if (!err)
			res.status(200).jsonp(rows);
		else
			console.log('Error while performing Query.');
	});

	connection.end();
});

module.exports = router;