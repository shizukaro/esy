var express	= require('express');
var router = express.Router();
var passport = require('passport');
var AuthMiddleware = require('../middleware/auth');

/* POST home page. */
router.post('/', passport.authenticate('local',{
failureRedirect: '/?mensaje=Usuario no identificado',
failureFlash: true
}),function(req,res){
    if(!req.isAuthenticated())
    {
        next();
    }
    else
    {
        res.redirect('/' + req.user.tipo);
    }
});

module.exports = router;