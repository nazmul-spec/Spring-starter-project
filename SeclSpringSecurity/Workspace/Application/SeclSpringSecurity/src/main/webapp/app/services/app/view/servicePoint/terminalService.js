
'use strict';

define(['app'], function (app) {

	var terminalService = function ($rootScope, $resource, $q, constantService, messageService, configurationService) {
		
var serviceTerminalSaveResource, serviceTerminalGetResource, serviceTerminalUpdateResource, getTerminalInfoByID, saveServiceTerminal,
    updateServiceTerminal, updateStatusByAdmin, getAllServiceTerminal,updateTerminalStatus, delay, isValidForm;		
		
		serviceTerminalSaveResource = $resource(configurationService.serviceTerminalSave, {}, {
			saveServiceTerminal :	{ method: 'POST' }
	    });
		
		serviceTerminalGetResource = $resource(configurationService.serviceTerminalGet, {}, {
			getAllServiceTerminal:	{ method: 'POST' },
			getTerminalInfoByID:	{ method: 'POST' }
	    });
		
		serviceTerminalUpdateResource = $resource(configurationService.serviceTerminalUpdate, {}, {
			updateServiceTerminal:	{ method: 'POST' },
			updateStatusByAdmin:	{ method: 'POST' },
			updateTerminalStatus:	{ method: 'POST' }
	    });
		
		
		saveServiceTerminal = function (obj) {
	        delay = $q.defer();
	        serviceTerminalSaveResource.saveServiceTerminal(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    updateServiceTerminal = function (obj) {
	    	delay = $q.defer();
	    	serviceTerminalUpdateResource.updateServiceTerminal(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    updateTerminalStatus = function (obj) {
	    	delay = $q.defer();
	    	serviceTerminalUpdateResource.updateTerminalStatus(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	   
	    updateStatusByAdmin = function (obj) {
	    	delay = $q.defer();
	    	serviceTerminalUpdateResource.updateStatusByAdmin(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getTerminalInfoByID = function (obj) {
	    	delay = $q.defer();
	    	serviceTerminalGetResource.getTerminalInfoByID(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    getAllServiceTerminal = function (obj) {
	    	delay = $q.defer();
	    	serviceTerminalGetResource.getAllServiceTerminal(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    isValidForm = function (servicePoint) {
	    	if ($('#ServicePointID').val() == undefined || $('#ServicePointID').val() == null || $('#ServicePointID').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_ServicePointID input').focus();
	            return false;
	        }
	        if ($('#inputServiceClientDeviceAddress').val() == undefined || $('#inputServiceClientDeviceAddress').val() == null || $('#inputServiceClientDeviceAddress').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#inputServiceClientDeviceAddress').focus();
	            return false;
	        }
	        
	        if ($('#inputBiometricDeviceAddress').val() == undefined || $('#inputBiometricDeviceAddress').val() == null || $('#inputBiometricDeviceAddress').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#inputBiometricDeviceAddress').focus();
	            return false;
	        }
	        
	        if ($('#inputPrinterDeviceAddress').val() == undefined || $('#inputPrinterDeviceAddress').val() == null || $('#inputPrinterDeviceAddress').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#inputPrinterDeviceAddress').focus();
	            return false;
	        }
	        
	        if ($('#inputCardDeviceAddress').val() == undefined || $('#inputCardDeviceAddress').val() == null || $('#inputCardDeviceAddress').val().trim() == "") {
	        	messageService.showMessage(constantService.Danger, 'RF1000');
	        	$('#inputCardDeviceAddress').focus();
	        	return false;
	        }
	        return true;
	    };
	    
	    
	    return {
	    	saveServiceTerminal   : saveServiceTerminal,
	    	updateServiceTerminal : updateServiceTerminal,
	    	getAllServiceTerminal : getAllServiceTerminal,
	    	getTerminalInfoByID   : getTerminalInfoByID,
	    	updateTerminalStatus  : updateTerminalStatus,
	    	updateStatusByAdmin   : updateStatusByAdmin,
	    	isValidForm : isValidForm
	       
	    };
	    
		
		
	};
	
	 app.service('terminalService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService','configurationService', 
	                                 terminalService]);
	
});


