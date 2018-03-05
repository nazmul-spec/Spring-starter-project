
/*controlApp.factory('serviceMetaPropertyService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService', 'configurationService',
                                       function ($rootScope, $resource, $q, constantService , messageService, configurationService) {
*/

'use strict';

define(['app'], function (app) {

	var serviceMetaPropertyService =  function ($rootScope, $resource, $q, constantService , messageService, configurationService) {
		
	
    var serviceMetaPropertyResource, delay, saveOrUpdateMetaproperty, getMetapropertyInfoByID, validateForm, checkDuplicate;
    
    serviceMetaPropertyResource = $resource(configurationService.serviceMetaproperty, {}, {
    	saveOrUpdateMetaproperty : { method: 'POST' },
    	getMetapropertyInfoByID  : { method: 'POST' },
    	getAllFingerList  : { method: 'POST' },
    	updateAllFingerList  : { method: 'POST' }
    });
    
    validateForm = function (settings) {
    	var keepGoing = true;
		var msgCode = '';
		    	
    	if ($('#title').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#title').focus();
            return false;
        }
    	if ($('#description').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#description').focus();
            return false;
        }
    	for (var i = 0; i < settings.length; i++) {
			
			if ($("#name-input-" + i).val().trim() == '') {
				$("#name-input-" + i).focus();
				keepGoing = false;
				msgCode = 'RF1000';
				break;	
			}			
			
			if ($("#value-input-" + i).val().trim() == "") {
				$("#value-input-" + i).focus();
				keepGoing = false;
				msgCode = 'RF1000';
				break;						
			}
			if ($("#method-input-" + i).val().trim() == "") {						
				$("#s2id_method-input-" + i +" input").focus();
				keepGoing = false;
				msgCode = 'RF1000';
				break;						
			}
			if ($("#method-input-" + i).val().trim() == 'Percentage' && $("#value-input-" + i).val().trim() >100) {
				$("#value-input-" + i).focus();
				keepGoing = false;
				msgCode = 'PercentageHigh';
				break;						
			}
			if ($("#sortOrder-input-" + i).val().trim() == "") {
				$("#sortOrder-input-" + i).focus();
				keepGoing = false;
				msgCode = 'RF1000';
				break;
			}
			else if (($("#sortOrder-input-" + i).val().trim() != "") && (!constantService.regexForNumericField.test($("#sortOrder-input-" + i).val()))) {
					
					$("#sortOrder-input-" + i).focus();
					keepGoing = false;
					msgCode = 'EDP1106';
					break;	
				}
		}
		
		if (!keepGoing) {
			messageService.showMessage(constantService.Danger, msgCode);
			false;
		}else {			
			 return true;
		}		
		
    };
    
   checkDuplicate = function(settings){
    	var isDuplicate = false;
    	var msgCode = '';
    	for (var i = 0; i < settings.length; i++) {			
			for (var j = 0; j < settings.length; j++) {
				if (settings[j].name === settings[i].name && i != j) {
					$("#name-input-" + j).focus();
					isDuplicate = true;
					msgCode = 'name-input-dup';
					break;
				}
				else if (settings[j].sortOrder === settings[i].sortOrder && i != j) {
					$("#sortOrder-input-" + j).focus();
					isDuplicate = true;
					msgCode = 'sortOrder-input-dup';
					break;
				}
				else {
					continue;
				}
			}
			if (isDuplicate === true) {
				messageService.showMessage(constantService.Danger, msgCode);
				break;
			}
		}
    	return isDuplicate;
    };
    
    saveOrUpdateMetaproperty = function (obj) {
    	delay = $q.defer();
    	serviceMetaPropertyResource.saveOrUpdateMetaproperty(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    getMetapropertyInfoByID = function (obj) {
    	delay = $q.defer();
    	serviceMetaPropertyResource.getMetapropertyInfoByID(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
  var getAllFingerList = function (obj) {
    	
        delay = $q.defer();
        serviceMetaPropertyResource.getAllFingerList(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };  
    
    var updateAllFingerList = function (obj) {
    	
        delay = $q.defer();
        serviceMetaPropertyResource.updateAllFingerList(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    return {
    	saveOrUpdateMetaproperty : saveOrUpdateMetaproperty, getMetapropertyInfoByID : getMetapropertyInfoByID,
    	getAllFingerList : getAllFingerList,updateAllFingerList : updateAllFingerList,
    	validateForm : validateForm, checkDuplicate:checkDuplicate
    };

	
	};
	
	 app.service('serviceMetaPropertyService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService', 'configurationService', serviceMetaPropertyService]);
	
});