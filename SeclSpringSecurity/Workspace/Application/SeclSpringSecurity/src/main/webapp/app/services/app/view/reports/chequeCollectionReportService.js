
'use strict';

define(['app'], function (app) {

	var chequeCollectionReportService = function ($rootScope, $q, $resource, configurationService) {
		
		var serverResource, delay, getReport;
		
		serverResource = $resource(configurationService.chequecollectiongridreport, {}, {
			postRequest: { method: 'POST' }
	    });
		
		getReport = function (obj) {
	        delay = $q.defer();
	        serverResource.postRequest(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };

	    return {
	    	getReport : getReport	    	
	       
	    };
		
	};
	
	 app.service('chequeCollectionReportService', ['$rootScope', '$q', '$resource', 'configurationService', chequeCollectionReportService]);
	
});

