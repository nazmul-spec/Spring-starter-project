
'use strict';

define(['app'], function (app) {

	   var fingerConfigureService =  function ($rootScope, $resource, $q, constantService , messageService, configurationService) {
		
		var fingerResource, delay, getAllFingerList,updateAllFingerList;
	    
	    fingerResource = $resource(configurationService.fingerConfigure, {}, {
	    	getAllFingerList: { method: 'POST' },
	        updateAllFingerList: { method: 'POST' }
	    });
	 
	    getAllFingerList = function (obj) {
	    	
	        delay = $q.defer();
	        fingerResource.getAllFingerList(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };  
	    
	    updateAllFingerList = function (obj) {
	    	
	        delay = $q.defer();
	        fingerResource.updateAllFingerList(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };  
	   
	    
	    return {
	    	
	    	getAllFingerList : getAllFingerList, updateAllFingerList:updateAllFingerList
	    	
	    	
	    };
	 };
	
	 app.service('fingerConfigureService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService', 'configurationService', fingerConfigureService]);
	
});