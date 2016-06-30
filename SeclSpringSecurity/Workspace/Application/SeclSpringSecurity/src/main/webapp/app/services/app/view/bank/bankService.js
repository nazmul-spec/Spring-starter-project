
'use strict';

define(['app'], function (app) {

	var bankService = function ($rootScope, $resource, $q, constantService, configurationService, localStorageService) {
		
		var bankResource, getAllBank, delay, getColumnDefs, updateBankStatus, setCustomToolbar;
		
		bankResource = $resource(configurationService.bank, {}, {
			getAllBank : { method: 'POST' },			
			updateBankStatus : { method: 'POST' }
	    });
		
		getAllBank = function (obj) {
	        delay = $q.defer();
	        bankResource.getAllBank(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };	   
	    
	    updateBankStatus = function (obj) {
	        delay = $q.defer();
	        bankResource.updateBankStatus(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    return {
	    	updateBankStatus : updateBankStatus,
	    	getAllBank : getAllBank
	    };
	    
		
		
	}
	
	 app.service('bankService', ['$rootScope', '$resource', '$q', 'constantService', 'configurationService', 'localStorageService',
         bankService]);
	
});


