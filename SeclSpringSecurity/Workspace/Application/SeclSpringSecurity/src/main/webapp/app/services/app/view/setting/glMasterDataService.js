'use strict';

define(['app'], function (app) {

	var glMasterDataService =  function ($rootScope, $resource, $q, constantService , messageService, configurationService) {
		
	
    var glGetResource, delay;
    
    glGetResource = $resource(configurationService.glMasterDataGet, {}, {
    	get : { method: 'POST' }
    });    
    
    
  this.getAllGLs = function (obj) {	  
        delay = $q.defer();
        glGetResource.get(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
  	
	};
	
	 app.service('glMasterDataService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService', 
            'configurationService', glMasterDataService]);
	
});