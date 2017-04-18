/**
 * Created by Alvaro on 30/03/2017.
 */
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');

Usuarios = mongoose.model('Usuarios');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });
    
    passport.use(new LocalStrategy({
        passReqToCallback: true
    },function (req, ident, cont, done) {
        Usuarios.findOne( {
            identificador: ident
        }, function ( err, usuario )
        {
            if(err) throw err;

            if(usuario)
            {
                if(usuario.contrasena == cont)
                {
                    return done(null,{
                        tipo: usuario.tipo,
                        identificador: usuario.identificador
                    });
                }

                return done(null, false, req.flash('authmessage','contrasena'));
            }

            return done(null, false, req.flash('authmessage','username'));
        });

        return;
    }));
}