
'use strict';

define(['app'], function (app) {

	var csbUploadMisService =  function ($rootScope, $resource, $q, constantService , messageService, configurationService) {
		
	var saveResource, updateResource, getResource, delay, isValidForm,  get, save, update;
    
    
	saveResource = $resource(configurationService.uploadMisSave, {}, {
    	save : { method: 'POST' }
    });
	
	updateResource = $resource(configurationService.uploadMisUpdate, {}, {
    	update : { method: 'POST' }
    });
	
	getResource = $resource(configurationService.uploadMisGet, {}, {
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
    	
    	if (obj.calendarYear == undefined || obj.calendarYear == null || obj.calendarYear == "") {
        	messageService.showMessage(constantService.Danger, 'RF1000');
            $('#s2id_yearDrop input').focus();
            return false;
        }

    	for(var j = 0; j < obj.meta.weekends.length; j++){
    		var workDay = obj.meta.weekends[j];
    		if(isValidStartEndTime(workDay.startTime, workDay.endTime, workDay.enabled)){
    			messageService.showMessage(constantService.Danger, 'STGET10');
    			$('#startTime-' + workDay.shortName).focus(); 
    			return false;
    		}
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
    
    var isValidStartEndTime = function(startTime, endTime, isEnabled){
    	var flag = false;
    	var startTimeArray = startTime.split(":");
    	var endTimeArraay = endTime.split(":");
    	if(!isEnabled){
    		if(parseInt(startTimeArray[0]) > parseInt(endTimeArraay[0])){
    			flag = true;
    		}
    		else if(parseInt(startTimeArray[0]) == parseInt(endTimeArraay[0]) 
    				&& parseInt(startTimeArray[1]) > parseInt(endTimeArraay[1])){
    			flag = true;
    		}
    	}
    	return flag;
    }
    
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
    
   
    return {
    	isValidForm: isValidForm, get: get, save: save,
    	update: update
    };

	
	};
	
	 app.service('csbUploadMisService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService', 'configurationService', csbUploadMisService]);
	
});