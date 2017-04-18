var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose  = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

Schema    = mongoose.Schema;

mongoose.connect('mongodb://localhost/esy', function(err, res) {  
  if(err) 
  {
    console.log('ERROR: connecting to Database. ' + err);
  }
});

var alumnoSchema = new Schema({
  matricula: 
  { 
    type: Number, 
    index: { unique: true } 
  },
  nombreCompleto: { type: {
    nombre: { type: String },
    aPaterno: { type: String },
    aMaterno: { type: String }
  } },
  sexo: { type: String, enum: [ 'masculino', 'femenino' ] },
  fechaNacimiento: { type: Date },
  fechaIngreso: { type: Date },
  fechaEgreso: { type: Date },
  tutor: { type: Number },
  carrera: { type: Schema.ObjectId, ref: "Carreras" }
});

var calificacionSchema = new Schema({
  fechaHoraInscripcion: { type: Date },
  calificacionOrdinaria: { type: Number },
  calificacionExtraordinaria: { type: Number },
  alumno: { type: Number },
  curso: { type: Schema.ObjectId, ref: "Cursos" }
});

var areaSchema = new Schema({
  nombre: { type: String, },
  descripcion: { type: String }
});

var asignaturaSchema = new Schema({
  codigo: { 
    type: String, 
    index: { unique: true } },
  creditos: { type: Number },
  nombre: { type: String },
  nombreCorto: { type: String },
  horasTeoria: { type: Number },
  horasPractica: { type: Number },
  horasIndependiente: { type: Number },
  nivel: { type: String, enum: [ 'basico', 'formativo' ] },
  periodoMinimo: { type: Number },
  prerrequisito: { type: [{type: Schema.ObjectId}] },
  carrera: { type: Schema.ObjectId },
  area: { type: Schema.ObjectId }
});

var campusSchema = new Schema({
  nombre: { type: String },
  localizacion: { type: Array }
});

var carreraSchema = new Schema({
  nombre: { type: String },
  nivelEducativo: { type: String, enum: [ 'licenciatura', 'maestria', 'doctorado' ] },
  modalidad: { type: String, enum: [ 'presencial', 'online' ] },
  fechaInicio: { type: Date },
  fechaFinalizacion: { type: Date },
  creditosMinimos: { type: Number },
  creditosMaximos: { type: Number },
  horasMinimas: { type: Number },
  horasMaximas: { type: Number },
  tipoPlanEstudios: { type: String },
  tituloOtorgado: { type: String },
  certificadoOtorgado: { type: String },
  campus: { type: Schema.ObjectId, ref: "Campus" }
});

var cursoSchema = new Schema({
  nrc: { type: Number },
  cupo: { type: Number },
  profesor: { type: Number, ref: "Profesores" },
  periodo: { type: Schema.ObjectId, ref: "Periodos" },
  asignatura: { type: String, ref: "Asignaturas" }
});

var horarioSchema = new Schema({
  horaEntrada: { type: Date },
  horaSalida: { type: Date },
  dia: { type: String, enum: [ 'lu', 'ma', 'mi', 'ju', 'vi', 'sa', 'do' ] },
  salon: { type: Schema.ObjectId, ref: "Salones" },
  curso: { type: Schema.ObjectId, ref: "Cursos" }
});

var periodoSchema = new Schema({
  nombre: { type: String },
  abreviacion: { type: String },
  fechaInicio: { type: Date },
  fechaFinalizacion: { type: Date }
});

var profesorSchema = new Schema({
  dni: 
  { 
    type: Number, 
    index: { unique: true } 
  },
  nombreCompleto: { type: {
    nombre: { type: String },
    aPaterno: { type: String },
    aMaterno: { type: String }
  } },
  sexo: { type: String, enum: [ 'masculino', 'femenino' ] },
  fechaNacimiento: { type: Date }
});

var salonSchema = new Schema({
  ubicacion: { type: String },
  edificio: { type: String },
  piso: { type: Number },
  numero: { type: Number }
});

var usuarioSchema = new Schema({
  identificador: { type: Number, index: { unique: true } },
  contrasena: { type: String },
  tipo: { type: String, enum: [ 'alumno', 'tutor', 'profesor', 'administrador' ] },
  imagenFondo: { type: Schema.ObjectId },
  imagenPerfil: { type: Schema.ObjectId },
  datosUsuario: { type: Schema.ObjectId }
});

module.exports = mongoose.model('Alumnos', alumnoSchema);
module.exports = mongoose.model('Calificaciones', calificacionSchema);
module.exports = mongoose.model('Areas', areaSchema);
module.exports = mongoose.model('Asignaturas', asignaturaSchema);
module.exports = mongoose.model('Campus', campusSchema);
module.exports = mongoose.model('Carreras', carreraSchema);
module.exports = mongoose.model('Cursos', cursoSchema);
module.exports = mongoose.model('Horarios', horarioSchema);
module.exports = mongoose.model('Periodos', periodoSchema);
module.exports = mongoose.model('Profesores', profesorSchema);
module.exports = mongoose.model('Salones', salonSchema);
module.exports = mongoose.model('Usuarios', usuarioSchema);

var routes              = require('./routes/index');
//var iniciarSesion       = require('./routes/iniciarSesion');
var users               = require('./routes/users');
var administrador       = require('./routes/administrador');

var alumnosRest         = require('./routes/alumnosRest');
var calificacionesRest  = require('./routes/calificacionesRest');
var areasRest           = require('./routes/areasRest');
var asignaturasRest     = require('./routes/asignaturasRest');
var campusRest          = require('./routes/campusRest');
var carrerasRest        = require('./routes/carrerasRest');
var cursosRest          = require('./routes/cursosRest');
var horariosRest        = require('./routes/horariosRest');
var periodosRest        = require('./routes/periodosRest');
var profesoresRest      = require('./routes/profesoresRest');
var salonesRest         = require('./routes/salonesRest');
var usuariosRest        = require('./routes/usuariosRest');
var alumno        = require('./routes/alumno');

var insertarGrupos = require('./routes/insertarGrupos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

require('./passport/passport')(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(require('morgan')('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ 
  secret: 'keyboard cat', 
  resave: false, 
  saveUninitialized: false 
}));

app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
//app.use('/iniciarSesion', iniciarSesion);
app.use('/users', users);
app.use('/administrador', administrador);

app.use('/alumnosRest',         alumnosRest);
app.use('/calificacionesRest',  calificacionesRest);
app.use('/areasRest',           areasRest);
app.use('/asignaturasRest',     asignaturasRest);
app.use('/campusRest',          campusRest);
app.use('/carrerasRest',        carrerasRest);
app.use('/cursosRest',          cursosRest);
app.use('/horariosRest',        horariosRest);
app.use('/periodosRest',        periodosRest);
app.use('/profesoresRest',      profesoresRest);
app.use('/salonesRest',         salonesRest);
app.use('/usuariosRest',        usuariosRest);
app.use('/alumno',              alumno);

app.use('/insertarGrupos', insertarGrupos);

/* POST home page. */
app.post('/iniciarSesion', passport.authenticate('local',{
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
