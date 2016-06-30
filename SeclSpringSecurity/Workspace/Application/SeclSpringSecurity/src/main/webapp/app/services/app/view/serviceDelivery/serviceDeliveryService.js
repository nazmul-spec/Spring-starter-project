
'use strict';

define(['app'], function (app) {

	var serviceDeliveryService =  function ($rootScope, $resource, $q, constantService , messageService, configurationService) {
		
	var saveResource, updateResource, getResource, batchUpdateResource, delay, isValidForm,  get, save, update, updateBatch;
    
    
	saveResource = $resource(configurationService.serviceDeliverySave, {}, {
    	save : { method: 'POST' }
    });
	
	updateResource = $resource(configurationService.serviceDeliveryUpdate, {}, {
    	update : { method: 'POST' }
    });
	
	batchUpdateResource = $resource(configurationService.serviceDeliveryBatchUpdate, {}, {
		updateBatch : { method: 'POST' }
    });
	
	getResource = $resource(configurationService.serviceDeliveryGet, {}, {
    	get : { method: 'POST' }
    });
	
	isValidForm = function (obj) {
		 var regexForNumber = /^[0-9.]+$/;
    	if ($('#canendarName').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#canendarName').focus();
            return false;
        }
    	
    	if ($('#description').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#description').focus();
            return false;
        }
    	
    	if (obj.calendarYear == undefined || obj.calendarYear == null || obj.calendarYear.trim() == "") {
        	messageService.showMessage(constantService.Danger, 'RF1000');
            $('#s2id_yearDrop input').focus();
            return false;
        }
    	
        /*var fromDate = Date.parse($('#selectEffectiveFromDate').val().trim());
        var toDate = Date.parse($('#selectEffectiveToDate').val().trim());
        if(fromDate > toDate){
        	messageService.showMessage(constantService.Danger, 'DGT1000');
        	$('#selectEffectiveToDate').focus();
            return false;
        }*/
    	
    	
        
       /* if ($('#leastNumbers').val() != undefined && $('#leastNumbers').val() != null && $('#leastNumbers').val().trim() != "" && (!regexForNumber.test($('#leastNumbers').val()))) {
        	messageService.showMessage(constantService.Danger, 'EDP1000');
            $('#leastNumbers').focus();
            return false;
        }*/
        return true;
    };
    
    save = function (obj) {
        delay = $q.defer();
        saveResource.save(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    update = function (obj) {
        delay = $q.defer();
        updateResource.update(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    get = function (obj) {
        delay = $q.defer();
        getResource.get(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    updateBatch = function (obj) {
        delay = $q.defer();
        batchUpdateResource.updateBatch(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
   
    return {
    	isValidForm: isValidForm, get: get, save: save,
    	update: update, updateBatch: updateBatch
    };

	
	};
	
	 app.service('serviceDeliveryService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService', 'configurationService', serviceDeliveryService]);
	
});