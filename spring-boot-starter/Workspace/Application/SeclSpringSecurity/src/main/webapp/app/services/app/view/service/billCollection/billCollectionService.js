'use strict';

define(['app'], function (app) {

	var billCollectionService = function ($rootScope, $resource, $q, constantService, messageService,
		configurationService) {		
		
		var billCollectionGetResource, getAllBill, delay;
		
		billCollectionGetResource = $resource(configurationService.billCollectionGet, {}, {
			getAllBill:	{ method: 'POST' }
	    });
		
		getAllBill = function (obj) {
	    	delay = $q.defer();
	    	billCollectionGetResource.getAllBill(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    return {
	    	getAllBill : getAllBill
	    };
				
	};
	
	 app.service('billCollectionService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService',
         'configurationService', billCollectionService]);	
});

