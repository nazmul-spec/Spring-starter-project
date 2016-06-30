'use strict';

define(['app'], function (app) {

	var remittanceService = function ($rootScope, $resource, $q, constantService, messageService,
		configurationService) {		
		
		var remittanceResource , remittanceGetResource, remittanceUpdateResource, saveRemittance, 
		updateRemittance, getAllRemittance, delay, isValidForm;		
		
		remittanceResource = $resource(configurationService.remittanceSave, {}, {
			saveRemittance:	{ method: 'POST' }
	    });
		
		remittanceGetResource = $resource(configurationService.remittanceGet, {}, {
			getAllRemittance:	{ method: 'POST' }
	    });
		
		remittanceUpdateResource = $resource(configurationService.remittanceUpdate, {}, {
	    	updateRemittance:	{ method: 'POST' }
	    });
    
		saveRemittance = function (obj) {
	        delay = $q.defer();
	        remittanceResource.saveRemittance(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    updateRemittance = function (obj) {
	    	delay = $q.defer();
	    	remittanceUpdateResource.updateRemittance(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	  
		
	    getAllRemittance = function (obj) {
	    	delay = $q.defer();
	    	remittanceGetResource.getAllRemittance(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    isValidForm = function (remittance) {
	        var regexForNumber = /^[0-9.]+$/;
	        var regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/; // give 99.00%
	    	
	        if ($('#Bank').val() == undefined || $('#Bank').val() == null || $('#Bank').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_Bank input').focus();
	            return false;
	        }
	        
	        if ($('#Branch').val() == undefined || $('#Branch').val() == null || $('#Branch').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_Branch input').focus();
	            return false;
	        }
	        
	        if ($('#pin').val() == undefined || $('#pin').val() == null || $('#pin').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#pin').focus();
	            return false;
	        }
	        
	        if ($('#senderName').val() == undefined || $('#senderName').val() == null || $('#senderName').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#senderName').focus();
	            return false;
	        }
	        
	        if ($('#senderCountry').val() == undefined || $('#senderCountry').val() == null || $('#senderCountry').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
            	$('#senderCountry').focus();
	            return false;
	        }
	        
	        if ($('#exchangeRate').val() == undefined || $('#exchangeRate').val() == null || $('#exchangeRate').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
            	$('#exchangeRate').focus();
	            return false;
	        }
	        
	        if ($('#actualAmount').val() == undefined || $('#actualAmount').val() == null || $('#actualAmount').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#actualAmount').focus();
	            return false;
	        }
	        
	        /*if ($('#Telephone1').val() == undefined || $('#Telephone1').val() == null || ($('#Telephone1').val().trim() == "")) {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#Telephone1').focus();
	            return false;
	        }
	        
	        if ((!regexForNumber.test($('#Telephone1').val()))) {
            	messageService.showMessage(constantService.Danger, 'EDP1004');
	            $('#Telephone1').focus();
	            return false;
	        }
	        
	        if ($('#Telephone2').val() == undefined || $('#Telephone2').val() == null || ($('#Telephone2').val().trim() == "") || (!regexForNumber.test($('#Telephone2').val()))) {
            	messageService.showMessage(constantService.Danger, 'EDP1000');
            	$("#Telephone2").focus();
            	return false;
	        }
	        
	        if ($('#Email').val() != undefined && $('#Email').val() != null && ($('#Email').val() != "") && (!regex.test($('#Email').val()))) {
            	messageService.showMessage(constantService.Danger, 'EVE1000');
	            $("#Email").focus();
	            return false;
	        }
	        */
	        if ($('#actualAmountInBDT').val() == undefined || $('#actualAmountInBDT').val() == null || $('#actualAmountInBDT').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#actualAmountInBDT').focus();
	            return false;
	        }
	        return true;
	    };
	    
	    return {
	    	saveRemittance : saveRemittance,
	    	updateRemittance : updateRemittance,
	    	getAllRemittance : getAllRemittance,
	    	isValidForm : isValidForm
	    };
				
	};
	
	 app.service('remittanceService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService',
         'configurationService', remittanceService]);	
});

