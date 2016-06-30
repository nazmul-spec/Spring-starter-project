
'use strict';

define(['app'], function (app) {

	var tagDictionaryService = function ($rootScope, $resource, $q, constantService, configurationService, localStorageService, messageService) {
		
		var resource, getAllTagLibList, delay, getTagLibInfoByID, setCustomToolbar, saveOrUpdate, validate;
		
		resource = $resource(configurationService.taglib, {}, {
			getAllTagLib : { method: 'POST' },			
			getTagLibInfo : { method: 'POST' },
			saveOrUpdate : { method: 'POST' }
	    });
		
		getAllTagLibList = function (obj) {
	        delay = $q.defer();
	        resource.getAllTagLib(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };	   
	    
	    getTagLibInfoByID = function (obj) {
	        delay = $q.defer();
	        resource.getTagLibInfo(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    saveOrUpdate = function (obj) {
	        delay = $q.defer();
	        resource.saveOrUpdate(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    validate = function () {
	        if ($('#taglibName').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#taglibName').focus();
	            return false;
	        }
	        return true;
	    }
	    
	    return {
	    	getAllTagLibList : getAllTagLibList,
	    	getTagLibInfoByID : getTagLibInfoByID,	    	
	    	saveOrUpdate : saveOrUpdate,
	    	validate : validate
	    };
	    
		
		
	}
	
	 app.service('tagDictionaryService', ['$rootScope', '$resource', '$q', 'constantService', 'configurationService', 'localStorageService', 'messageService',
	                               tagDictionaryService]);
	
});


