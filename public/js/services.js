/**
 * Created by Sandeep on 01/06/14.
 */

angular.module('movieApp.services',[]).factory('Movie',function($resource){
    return $resource('http://localhost/spva-rest-prueba/index.php/api/example/movies/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        },
        delete: {
        	method: 'DELETE',
        	params:{id:'@id'}
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});