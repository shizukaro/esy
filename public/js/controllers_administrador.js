/**
 * Created by Sandeep on 01/06/14.
 */
angular.module('alumnoApp.controllers',['angularUtils.directives.dirPagination']).controller('AlumnoListController',function($scope,$state,popupService,$window,Alumno){

    $scope.currentPage = 1;
    $scope.pageSize    = 7;
    $scope.alumnos     = Alumno.query();
    $scope.q           = {};

    $scope.deleteAlumno=function(alumno){
        if(popupService.showPopup('Really delete this?')){
            alumno.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('AlumnoViewController',function($scope,$stateParams,Alumno,Profesor,Carrera){

    Alumno.get({matricula:$stateParams.matricula},function(alumno)
    {
        $scope.alumno = alumno;
        $scope.alumno.tutor=Profesor.get({dni:$scope.alumno.tutor});
        $scope.alumno.carrera=Carrera.get({_id:$scope.alumno.carrera});
    });
}).controller('AlumnoCreateController',function($scope,$state,$stateParams,Alumno,Carrera,Profesor){

    $scope.alumno=new Alumno();
    $scope.carreras=Carrera.query();
    $scope.profesores=Profesor.query();

    $scope.addAlumno=function(){
        $scope.alumno.$save(function(){
            $state.go('alumnos');
        });
    }
    
}).controller('AlumnoEditController',function($scope,$state,$stateParams,Alumno,Carrera,Profesor){

    $scope.updateAlumno=function(){
        $scope.alumno.$update(function(){
            $state.go('alumnos');
        });
    };

    $scope.loadAlumno=function(){
        $scope.alumno=Alumno.get({matricula:$stateParams.matricula});
        $scope.carreras=Carrera.query();
        $scope.profesores=Profesor.query();
    };

    $scope.loadAlumno();
}).controller('ProfesorListController',function($scope,$state,popupService,$window,Profesor){ //profesor
    $scope.currentPage = 1;
    $scope.pageSize    = 7;
    $scope.profesores  = Profesor.query();
    $scope.q           = {};
    //$scope.profesores=Profesor.query();

    $scope.deleteProfesor=function(profesor){
        if(popupService.showPopup('Really delete this?')){
            profesor.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('ProfesorViewController',function($scope,$stateParams,Profesor){ //que datos poner
    
    $scope.profesor=Profesor.get({dni:$stateParams.dni});
    $scope.profesor.fechaNacimiento=Date($scope.profesor.fechaNacimiento);

}).controller('ProfesorCreateController',function($scope,$state,$stateParams,Profesor){

    $scope.profesor=new Profesor();

    $scope.addProfesor=function(){
        $scope.profesor.$save(function(){
            $state.go('profesores');
        });
    }

}).controller('ProfesorEditController',function($scope,$state,$stateParams,Profesor){

    $scope.updateProfesor=function(){
        $scope.profesor.$update(function(){
            $state.go('profesores');
        });
    };

    $scope.loadProfesor=function(){
        $scope.profesor=Profesor.get({dni:$stateParams.dni});
    };

    $scope.loadProfesor();
}).controller('AsignaturaListController',function($scope,$state,popupService,$window,Asignatura){ //asignatura
    $scope.currentPage = 1;
    $scope.pageSize    = 7;
    $scope.asignaturas = Asignatura.query();
    $scope.q           = {};
    //$scope.asignaturas=Asignatura.query();

    $scope.deleteAsignatura=function(asignatura){
        if(popupService.showPopup('Really delete this?')){
            asignatura.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('AsignaturaViewController',function($scope,$stateParams,Asignatura,Carrera,Area){ //que datos poner
    
    Asignatura.get({codigo:$stateParams.codigo},function(asignatura)
    {
        $scope.asignatura = asignatura;
        $scope.asignatura.carrera=Carrera.get({_id:$scope.asignatura.carrera});
        $scope.asignatura.area=Area.get({_id:$scope.asignatura.area});
    });
    //$scope.asignatura=Asignatura.get({codigo:$stateParams.codigo});

}).controller('AsignaturaCreateController',function($scope,$state,$stateParams,Asignatura,Carrera,Area){

    $scope.asignatura=new Asignatura();
    $scope.carreras=Carrera.query();
    $scope.areas=Area.query();

    $scope.addAsignatura=function(){
        $scope.asignatura.$save(function(){
            $state.go('asignaturas');
        });
    }

}).controller('AsignaturaEditController',function($scope,$state,$stateParams,Asignatura,Carrera,Area){

    $scope.updateAsignatura=function(){
        $scope.asignatura.$update(function(){
            $state.go('asignaturas');
        });
    };

    $scope.loadAsignatura=function(){
        $scope.asignatura=Asignatura.get({codigo:$stateParams.codigo});
        $scope.carreras=Carrera.query();
        $scope.areas=Area.query();
    };

    $scope.loadAsignatura();
}).controller('AreaListController',function($scope,$state,popupService,$window,Area){ //area
    $scope.currentPage = 1;
    $scope.pageSize    = 7;
    $scope.areas     = Area.query();
    $scope.q           = {};
    //$scope.area=Area.query();

    $scope.deleteArea=function(area){
        if(popupService.showPopup('Really delete this?')){
            area.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('AreaViewController',function($scope,$stateParams,Area){ //que datos poner
    
    $scope.area=Area.get({_id:$stateParams._id});

}).controller('AreaCreateController',function($scope,$state,$stateParams,Area){

    $scope.area=new Area();

    $scope.addArea=function(){
        $scope.area.$save(function(){
            $state.go('areas');
        });
    }

}).controller('AreaEditController',function($scope,$state,$stateParams,Area){

    $scope.updateArea=function(){
        $scope.area.$update(function(){
            $state.go('areas');
        });
    };

    $scope.loadArea=function(){
        $scope.area=Area.get({_id:$stateParams._id});
    };

    $scope.loadArea();
}).controller('CampusListController',function($scope,$state,popupService,$window,Campus){ //campus
    $scope.currentPage = 1;
    $scope.pageSize    = 7;
    $scope.campus     = Campus.query();
    $scope.q           = {};
    //$scope.campus=Campus.query();

    $scope.deleteCampus=function(campus){
        if(popupService.showPopup('Really delete this?')){
            campus.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('CampusViewController',function($scope,$stateParams,Campus){ //que datos poner
    
    $scope.campus=Campus.get({_id:$stateParams._id});

}).controller('CampusCreateController',function($scope,$state,$stateParams,Campus){

    $scope.campus=new Campus();

    $scope.addCampus=function(){
        $scope.campus.$save(function(){
            $state.go('campus');
        });
    }

}).controller('CampusEditController',function($scope,$state,$stateParams,Campus){

    $scope.updateCampus=function(){
        $scope.campus.$update(function(){
            $state.go('campus');
        });
    };

    $scope.loadCampus=function(){
        $scope.campus=Campus.get({_id:$stateParams._id});
    };

    $scope.loadCampus();
}).controller('CarreraListController',function($scope,$state,popupService,$window,Carrera){ //carrera

    $scope.currentPage = 1;
    $scope.pageSize    = 7;
    $scope.carreras     = Carrera.query();
    $scope.q           = {};
    //$scope.carrera=Carrera.query();

    $scope.deleteCarrera=function(carrera){
        if(popupService.showPopup('Really delete this?')){
            carrera.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('CarreraViewController',function($scope,$stateParams,Carrera){

    Carrera.get({_id:$stateParams._id},function(carrera)
    {
        $scope.carrera = carrera;
        $scope.carrera.campus=Campus.get({_id:$scope.carrera.campus});
    });
    
    /*$scope.carrera=Carrera.get({_id:$stateParams._id});
    $scope.carrera.fechaInicio=Date($scope.carrera.fechaInicio);
    $scope.carrera.fechaFin=Date($scope.carrera.fechaFin);*/

}).controller('CarreraCreateController',function($scope,$state,$stateParams,Carrera,Campus){

    $scope.carrera=new Carrera();
    $scope.campus=Campus.query();

    $scope.addCarrera=function(){
        $scope.carrera.$save(function(){
            $state.go('carreras');
        });
    }

}).controller('CarreraEditController',function($scope,$state,$stateParams,Carrera,Campus){

    $scope.updateCarrera=function(){
        $scope.carrera.$update(function(){
            $state.go('carreras');
        });
    };

    $scope.loadCarrera=function(){
        Carrera.get({_id:$stateParams._id},function(d){
            $scope.carrera=d;
            $scope.carrera.campus=Campus.get({_id:d.carrera});
        });
        $scope.campus=Campus.query();
    };

    $scope.loadCarrera();
}).controller('CursoListController',function($scope,$state,popupService,$window,Curso){ //curso

    $scope.currentPage = 1;
    $scope.pageSize    = 7;
    $scope.cursos     = Curso.query();
    $scope.q           = {};
    //$scope.curso=Curso.query();

    $scope.deleteCurso=function(curso){
        if(popupService.showPopup('Really delete this?')){
            curso.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('CursoViewController',function($scope,$stateParams,Curso,Profesor,Periodo,Asignatura){
    
    Curso.get({nrc:$stateParams.nrc},function(curso)
    {
        $scope.curso = curso;
        $scope.curso.profesor=Profesor.get({dni:$scope.curso.profesor});
        $scope.curso.periodo=Periodo.get({_id:$scope.curso.periodo});
        $scope.curso.asignatura=Asignatura.get({_id:$scope.curso.asignatura});
    });
    //$scope.curso=Curso.get({nrc:$stateParams.nrc});

}).controller('CursoCreateController',function($scope,$state,$stateParams,Curso,Profesor,Periodo,Asignatura){

    $scope.curso=new Curso();
    $scope.profesores=Profesor.query();
    $scope.periodos=Periodo.query();
    $scope.asignaturas=Asignatura.query();

    $scope.addCurso=function(){
        $scope.curso.$save(function(){
            $state.go('cursos');
        });
    }

}).controller('CursoEditController',function($scope,$state,$stateParams,Curso,Profesor,Periodo,Asignatura){

    $scope.updateCurso=function(){
        $scope.curso.$update(function(){
            $state.go('cursos');
        });
    };

    $scope.loadCurso=function(){
        $scope.curso=Curso.get({nrc:$stateParams.nrc});
        $scope.profesores=Profesor.query();
        $scope.periodos=Periodo.query();
        $scope.asignaturas=Asignatura.query();
    };

    $scope.loadCurso();
}).controller('HorarioListController',function($scope,$state,popupService,$window,Horario){ //horario

    $scope.currentPage = 1;
    $scope.pageSize    = 7;
    $scope.horarios    = Horario.query();
    $scope.q           = {};
    //$scope.horario=Horario.query();

    $scope.deleteHorario=function(horario){
        if(popupService.showPopup('Really delete this?')){
            horario.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('HorarioViewController',function($scope,$stateParams,Horario,Curso,Salon){
    
    Horario.get({curso:$stateParams.curso,salon:$stateParams.salon},function(horario)
    {
        $scope.horario.curso=Curso.get({nrc:$scope.horario.curso});
        $scope.horario.salon=Salon.get({_id:$scope.horario.salon});
    });
    //$scope.horario=Horario.get({curso:$stateParams.curso,salon:$stateParams.salon});

}).controller('HorarioCreateController',function($scope,$state,$stateParams,Horario,Curso,Salon){

    $scope.horario=new Horario();
    $scope.cursos=Curso.query();
    $scope.salones=Salon.query();

    $scope.addHorario=function(){
        $scope.horario.$save(function(){
            $state.go('horarios');
        });
    }

}).controller('HorarioEditController',function($scope,$state,$stateParams,Horario,Curso,Salon){

    $scope.updateHorario=function(){
        $scope.horario.$update(function(){
            $state.go('horarios');
        });
    };

    $scope.loadHorario=function(){
        //$scope.horario=Horario.get({curso:$stateParams.curso,salon:$stateParams.salon});
        $scope.cursos=Curso.query();
        $scope.Salon=Salon.query();
    };

    $scope.loadCurso();
}).controller('PeriodoListController',function($scope,$state,popupService,$window,Periodo){  //periodo

    $scope.currentPage = 1;
    $scope.pageSize    = 7;
    $scope.periodos    = Periodo.query();
    $scope.q           = {};
    //$scope.periodos=Periodo.query();

    $scope.deletePeriodo=function(periodo){
        if(popupService.showPopup('Really delete this?')){
            periodo.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('PeriodoViewController',function($scope,$stateParams,Periodo){

    $scope.periodo=Periodo.get({_id:$stateParams._id});
    $scope.periodo.fechaInicio=Date($scope.periodo.fechaInicio);
    $scope.periodo.fechaFin=Date($scope.periodo.fechaFin);

}).controller('PeriodoCreateController',function($scope,$state,$stateParams,Periodo){

    $scope.periodo=new Periodo();

    $scope.addPeriodo=function(){
        $scope.periodo.$save(function(){
            $state.go('periodos');
        });
    }

}).controller('PeriodoEditController',function($scope,$state,$stateParams,Periodo){

    $scope.updatePeriodo=function(){
        $scope.periodo.$update(function(){
            $state.go('periodos');
        });
    };

    $scope.loadPeriodo=function(){
        $scope.periodo=Periodo.get({_id:$stateParams._id});
    };

    $scope.loadPeriodo();
}).controller('PrerrequisitoListController',function($scope,$state,popupService,$window,Prerrequisito){  //prerrequisito

    $scope.currentPage      = 1;
    $scope.pageSize         = 7;
    $scope.prerrequisitos   = Prerrequisito.query();
    $scope.q                = {};
    //$scope.prerrequisitos=Prerrequisito.query();

    $scope.deletePrerrequisito=function(prerrequisito){
        if(popupService.showPopup('Really delete this?')){
            prerrequisito.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('PrerrequisitoViewController',function($scope,$stateParams,Prerrequisito,Asignatura){

    //$scope.prerrequisito=Prerrequisito.get({asignatura:$stateParams.asignatura,prerrequisito:$stateParams.prerrequisito});

}).controller('PrerrequisitoCreateController',function($scope,$state,$stateParams,Prerrequisito,Asignatura){

    $scope.prerrequisito=new Prerrequisito();
    $scope.asignaturas=Asignatura.query();

    $scope.addPrerrequisito=function(){
        $scope.prerrequisito.$save(function(){
            $state.go('prerrequisitos');
        });
    }

}).controller('PrerrequisitoEditController',function($scope,$state,$stateParams,Prerrequisito,Asignatura){

    $scope.updatePrerrequisito=function(){
        $scope.prerrequisito.$update(function(){
            $state.go('prerrequisitos');
        });
    };

    $scope.loadPrerrequisito=function(){
        $scope.asignaturas=Asignatura.query();
        //$scope.prerrequisito=Prerrequisito.get({asignatura:$stateParams.asignatura,prerrequisito:$stateParams.prerrequisito});
    };

    $scope.loadPrerrequisito();
}).controller('SalonListController',function($scope,$state,popupService,$window,Salon){  //salon

    $scope.currentPage = 1;
    $scope.pageSize    = 7;
    $scope.salones     = Salon.query();
    $scope.q           = {};
    //$scope.salon=Salon.query();

    $scope.deleteSalon=function(salon){
        if(popupService.showPopup('Really delete this?')){
            salon.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('SalonViewController',function($scope,$stateParams,Salon){

    $scope.salon=Salon.get({_id:$stateParams._id});

}).controller('SalonCreateController',function($scope,$state,$stateParams,Salon){

    $scope.salon=new Salon();

    $scope.addSalon=function(){
        $scope.salon.$save(function(){
            $state.go('salones');
        });
    }

}).controller('SalonEditController',function($scope,$state,$stateParams,Salon){

    $scope.updateSalon=function(){
        $scope.salon.$update(function(){
            $state.go('salones');
        });
    };

    $scope.loadSalon=function(){
        $scope.salon=Salon.get({_id:$stateParams._id});
    };

    $scope.loadSalon();
}).controller('UsuarioListController',function($scope,$state,popupService,$window,Usuario){  //usuario

    $scope.currentPage = 1;
    $scope.pageSize    = 7;
    $scope.usuarios    = Usuario.query();
    $scope.q           = {};
    //$scope.usuario=Usuario.query();

    $scope.deleteUsuario=function(usuario){
        if(popupService.showPopup('Really delete this?')){
            usuario.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('UsuarioViewController',function($scope,$stateParams,Usuario,Profesor,Alumno){

    Usuario.get({id:$stateParams.identificador},function(usuario)
    {
        $scope.usuario = usuario;
        switch(usuario.tipo)
        {
            case 'administrador':
            case 'profesor':
            case 'tutor':
                $scope.usuario.datosUsuario=Profesor.get({dni:$scope.usuario.identificador});
            break;
            case 'alumno':
                $scope.usuario.datosUsuario=Alumno.get({matricula:$scope.usuario.identificador});
            break;
        }
        
    });
    //$scope.usuario=Usuario.get({matricula:$stateParams.matricula});

}).controller('UsuarioCreateController',function($scope,$state,$stateParams,Usuario,Profesor,Alumno){

    $scope.usuario=new Usuario();
    $scope.alumnos=Alumno.query();
    $scope.profesores=Profesor.query();

    $scope.addUsuario=function(){
        $scope.usuario.$save(function(){
            $state.go('usuarios');
        });
    }

}).controller('UsuarioEditController',function($scope,$state,$stateParams,Usuario){

    $scope.updateUsuario=function(){
        $scope.usuario.$update(function(){
            $state.go('usuarios');
        });
    };

    $scope.loadUsuario=function(){
        $scope.usuario=Usuario.get({matricula:$stateParams.matricula});
    };

    $scope.loadUsuario();
}).controller('CalificacionListController',function($scope,$state,popupService,$window,Calificacion){  //usuario

    $scope.currentPage      = 1;
    $scope.pageSize         = 7;
    $scope.calificaciones   = Calificacion.query();
    $scope.q                = {};
    //$scope.usuario=Usuario.query();

    $scope.deleteUsuario=function(calificacion){
        if(popupService.showPopup('Really delete this?')){
            calificacion.$delete(function(){
                $window.location.href='';
            });
        }
    }

}).controller('CalificacionViewController',function($scope,$stateParams,Calificacion,Alumno,Curso){

    Calificacion.get({_id:$stateParams._id},function(calificion)
    {
        $scope.calificion = calificion;
        $scope.calificion.alumno=Alumno.get({matricula:$scope.calificion.alumno});
        $scope.calificion.curso=Curso.get({_id:$scope.calificion.curso});
    });
    //$scope.usuario=Usuario.get({matricula:$stateParams.matricula});

}).controller('CalificacionCreateController',function($scope,$state,$stateParams,Calificacion,Alumno,Curso){

    $scope.calificion=new Calificacion();
    $scope.alumnos=Alumno.query();
    $scope.cursos=Curso.query();

    $scope.addCalificacion=function(){
        $scope.calificion.$save(function(){
            $state.go('calificaciones');
        });
    }

}).controller('CalificacionEditController',function($scope,$state,$stateParams,Calificacion){

    $scope.updateCalificacion=function(){
        $scope.calificacion.$update(function(){
            $state.go('calificaciones');
        });
    };

    $scope.loadCalificacion=function(){
        $scope.calificacion=Calificacion.get({_id:$stateParams._id});
    };

    $scope.loadCalificacion();
});