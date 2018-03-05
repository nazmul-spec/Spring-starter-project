
'use strict';

define(['app'], function (app) {

    var duplicateValidationService = function ($rootScope, $resource, $q, constantService, messageService, 
    		configurationService) {
    	
    	var duplicateValidationResource, duplicateValidation, delay;
    	 
   	 	duplicateValidationResource = $resource(configurationService.duplicteValidation, {}, {
   	 		duplicateValidation: { method: 'POST' }
   	 	});
       
   	 	duplicateValidation = function (obj) {
           delay = $q.defer();
           duplicateValidationResource.duplicateValidation(obj, function (data) {
               delay.resolve(data);
           }, function () {
               delay.reject('Unable to fetch..');
           });
           return delay.promise;
       };
       
       return {
       	duplicateValidation: duplicateValidation
       };
    	
    	
    };
    
    app.service('duplicateValidationService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService',
       'configurationService', duplicateValidationService]);

});

