'use strict';

define(['app'], function (app) {

	var companyZoneService = function ($rootScope, $resource, $q, constantService, messageService,
		configurationService) {		
		
		var companyZoneResource , companyZoneGetResource, companyZoneUpdateResource, saveCompanyZone, 
		updateCompanyZone, getAllCompanyZone, validAgeinId, delay, isValidForm;		
		
		companyZoneResource = $resource(configurationService.companyZoneSave, {}, {
	    	saveCompanyZone:	{ method: 'POST' }
	    });
		
		companyZoneGetResource = $resource(configurationService.companyZoneGet, {}, {
			getAllCompanyZone:	{ method: 'POST' },
			validAgeinId:	{ method: 'POST' }
	    });
		
		companyZoneUpdateResource = $resource(configurationService.companyZoneUpdate, {}, {
	    	updateCompanyZone:	{ method: 'POST' }
	    });
    
		saveCompanyZone = function (obj) {
	        delay = $q.defer();
	        companyZoneResource.saveCompanyZone(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    updateCompanyZone = function (obj) {
	    	delay = $q.defer();
	    	companyZoneUpdateResource.updateCompanyZone(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAllCompanyZone = function (obj) {
	    	delay = $q.defer();
	    	companyZoneGetResource.getAllCompanyZone(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    validAgeinId = function (obj) {
	    	delay = $q.defer();
	    	companyZoneGetResource.validAgeinId(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    }
	    
	    isValidForm = function (servicePoint) {
	        
	        if ($('#CompanyID').val() == undefined || $('#CompanyID').val() == null || $('#CompanyID').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_CompanyID input').focus();
	            return false;
	        }
	        
	        if ($('#Branch').val() == undefined || $('#Branch').val() == null || $('#Branch').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_Branch input').focus();
	            return false;
	        }
	        
	        if ($('#ZoneName').val() == undefined || $('#ZoneName').val() == null || $('#ZoneName').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	        	//messageService.showMessageText(constantService.Danger, 'Test messages fff');
	            $('#ZoneName').focus();
	            return false;
	        }
	        
	        if ($('#Location').val() == undefined || $('#Location').val() == null || $('#Location').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#Location').focus();
	            return false;
	        }
	        
	       /* if ($('#CreditAccount').val() == undefined || $('#CreditAccount').val() == null || ($('#CreditAccount').val().trim() == "")) {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#CreditAccount').focus();
	            return false;
	        }*/
	        
	        if (($('#contactNumber').val().trim() != "") && (!constantService.regexForPhoneNo.test($('#contactNumber').val()))) {
            	messageService.showMessage(constantService.Info, 'EDP1004');
            	$("#contactNumber").focus();
            	return false;
	        }
	        
	        if (($('#contactNumber').val().trim() != "") && ($('#contactNumber').val().trim().length < 6)) {
            	messageService.showMessage(constantService.Info, 'EDP1003');
	            $("#contactNumber").focus();
	            return false;
	        }
	        
	        if (($('#CreditAccount').val().trim() != "") && (!constantService.regexForBankAccNo.test($('#CreditAccount').val()))) {
            	messageService.showMessage(constantService.Info, 'EDP1100');
            	$("#CreditAccount").focus();
            	return false;
	        }
	        
	        if (($('#vatAccount').val().trim() != "") && (!constantService.regexForBankAccNo.test($('#vatAccount').val()))) {
            	messageService.showMessage(constantService.Info, 'EDP1100');
            	$("#vatAccount").focus();
            	return false;
	        }
	        
	        /*if ($('#DebitAccount').val() == undefined || $('#DebitAccount').val() == null || ($('#DebitAccount').val().trim() == "")) {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#DebitAccount').focus();
	            return false;
	        }*/
	        
	        return true;
	    };
	    
	    return {
	    	saveCompanyZone : saveCompanyZone,
	    	updateCompanyZone : updateCompanyZone,
	    	getAllCompanyZone : getAllCompanyZone,
	    	validAgeinId : validAgeinId,
	    	isValidForm : isValidForm
	    };
				
	};
	
	 app.service('companyZoneService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService',
         'configurationService', companyZoneService]);	
});

