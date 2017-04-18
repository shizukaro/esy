module.exports = {
	esAdmin: function(req, res, next)
	{
		if(req.isAuthenticated() && req.user.tipo == 'administrador')
		{
			next();
		}
		else
		{
			res.redirect('/');
		}
	},
    esAlumno: function(req, res, next)
    {
        if(req.isAuthenticated() && req.user.tipo == 'alumno')
        {
            next();
        }
        else
        {
            res.redirect('/');
        }
    },
    esTutor: function(req, res, next)
    {
        if(req.isAuthenticated() && req.user.tipo == 'tutor')
        {
            next();
        }
        else
        {
            res.redirect('/');
        }
    },
    esProfesor: function(req, res, next)
    {
        if(req.isAuthenticated() && req.user.tipo == 'profesor')
        {
            next();
        }
        else
        {
            res.redirect('/');
        }
    },
    noEstaLogueado: function(req, res, next)
    {
        if(!req.isAuthenticated())
        {
            next();
        }
        else
        {
            res.redirect('/' + req.user.tipo);
        }
    }
}