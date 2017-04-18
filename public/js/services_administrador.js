/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('alumnoApp.services',[]).factory('Alumno',function($resource){
    return $resource('./alumnosRest/:matricula',{matricula:'@matricula'},{
        update: {
            method: 'PUT',
            params:{id:'@_id'}
        },
        delete: {
        	method: 'DELETE',
        	params:{id:'@matricula'}
        }
    });
}).factory('Profesor',function($resource){
    return $resource('./profesoresRest/:dni',{dni:'@dni'},{
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE',
            params:{id:'@dni'}
        }
    });
}).factory('Asignatura',function($resource){
    return $resource('./asignaturasRest/:codigo',{codigo:'@codigo'},{
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE',
            params:{id:'@codigo'}
        }
    });
}).factory('Area',function($resource){
    return $resource('./areasRest/:_id',{_id:'@_id'},{
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE',
            params:{id:'@_id'}
        }
    });
}).factory('Campus',function($resource){
    return $resource('./campusRest/:_id',{_id:'@_id'},{
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE',
            params:{id:'@_id'}
        }
    });
}).factory('Carrera',function($resource){
    return $resource('./carrerasRest/:_id',{_id:'@_id'},{
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE',
            params:{id:'@_id'}
        }
    });
}).factory('Curso',function($resource){
    return $resource('./cursosRest/:nrc',{nrc:'@nrc'},{
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE',
            params:{id:'@nrc'}
        }
    });
}).factory('Horario',function($resource){
    return $resource('./horariosRest/:nrc',{nrc:'@nrc'},{ // je ne sais pas
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE',
            params:{id:'@nrc'}  //je ne sais rien
        }
    });
}).factory('Periodo',function($resource){
    return $resource('./periodosRest/:_id',{_id:'@_id'},{
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE',
            params:{id:'@_id'}
        }
    });
}).factory('Prerrequisito',function($resource){
    return $resource('./prerrequisitosRest/:asignatura',{asignatura:'@asignatura'},{
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE',
            params:{id:'@asignatura'}
        }
    });
}).factory('Salon',function($resource){
    return $resource('./salonesRest/:_id',{_id:'@_id'},{
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE',
            params:{id:'@_id'}
        }
    });
}).factory('Usuario',function($resource){
    return $resource('./usuariosRest/:id',{id:'@identificador'},{
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE',
            params:{id:'@identificador'}
        }
    });
}).factory('Calificacion',function($resource){
    return $resource('./calificacionesRest/_id',{_id:'@_id'},{
        update: {
            method: 'PUT'
        },
        delete: {
            method: 'DELETE',
            params:{id:'@_id'}
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});