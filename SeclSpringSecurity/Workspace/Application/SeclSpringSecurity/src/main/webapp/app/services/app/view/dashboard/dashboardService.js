
'use strict';

define(['app'], function (app) {

	var dashboardService = function ($rootScope, $resource, $q, $cookieStore, constantService, configurationService) {
		
		var delay, dashboardResource, systemResource, getDashboradData, getSystemData;	
		
		dashboardResource = $resource(configurationService.dashboardSummaryData, {}, {
			getDashboradData: { method: 'POST' },
	         
	    }); 
		
		systemResource = $resource(configurationService.dashboardSystemData, {}, {
			getSystemData: { method: 'POST' }		
	         
	    }); 
		
		getDashboradData = function (obj) {
	        delay = $q.defer();
	        dashboardResource.getDashboradData(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getSystemData = function (obj) {
	        delay = $q.defer();
	        systemResource.getSystemData(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	   
		
		
	  return {
		     getDashboradData : getDashboradData,
		     getSystemData : getSystemData
		     
	    };
	}
	
	 app.service('dashboardService', ['$rootScope', '$resource', '$q', '$cookieStore', 'constantService', 
	                   	           'configurationService', dashboardService]);
	
});

