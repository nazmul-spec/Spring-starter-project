'use strict';

define(['app'], function (app) {

	var chequeCollectionService = function ($rootScope, $resource, $q, constantService, messageService,
		configurationService) {		
		
		var chequeCollectionGetResource, getAllCheque, getCheque, delay;
		
		chequeCollectionGetResource = $resource(configurationService.chequeCollectionGet, {}, {
			getAllCheque:	{ method: 'POST' },
			getCheque: {method: 'POST'}
	    });
		
		getAllCheque = function (obj) {
	    	delay = $q.defer();
	    	chequeCollectionGetResource.getAllCheque(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getCheque = function (obj) {
	    	delay = $q.defer();
	    	chequeCollectionGetResource.getCheque(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    return {
	    	getAllCheque : getAllCheque, getCheque : getCheque
	    };
				
	};
	
	 app.service('chequeCollectionService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService',
         'configurationService', chequeCollectionService]);	
});

