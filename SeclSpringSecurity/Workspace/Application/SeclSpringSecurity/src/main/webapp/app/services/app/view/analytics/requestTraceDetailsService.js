
'use strict';

define(['app'], function (app) {

	var requestTraceDetailsService = function ($rootScope, $resource, $q, $cookieStore, constantService, configurationService) {
		var getRequestTraceDetails, perserISOMessage,traceResource,  delay;
		
		traceResource = $resource(configurationService.requestTraceDetails, {}, {
			getRequestTraceDetails : 	{ method: 'POST' },
			perserISOMessage : 	{ method: 'POST' }
		});
		
		getRequestTraceDetails = function(obj){
		        delay = $q.defer();
		        traceResource.getRequestTraceDetails(obj, function (data) {
		            delay.resolve(data);
		        }, function () {
		            delay.reject('Unable to fetch..');
		        });
		        return delay.promise;
		    };
		    perserISOMessage = function(obj){
		        delay = $q.defer();
		        traceResource.perserISOMessage(obj, function (data) {
		            delay.resolve(data);
		        }, function () {
		            delay.reject('Unable to fetch..');
		        });
		        return delay.promise;
		    };  
		    return {
		    	getRequestTraceDetails:getRequestTraceDetails,
		    	perserISOMessage:perserISOMessage,
		    };

   
	
	};
	 app.service('requestTraceDetailsService', ['$rootScope', '$resource', '$q', '$cookieStore', 'constantService', 'configurationService', requestTraceDetailsService]);
	
});
