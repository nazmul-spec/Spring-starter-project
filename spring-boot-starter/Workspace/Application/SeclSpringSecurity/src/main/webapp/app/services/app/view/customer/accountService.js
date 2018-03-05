'use strict';

define(['app'], function (app) {

	var accountService = function ($rootScope, $resource, $q, constantService, messageService,
		configurationService) {		
		
		var accountSaveResource , accountGetResource, accountUpdateResource, batchUpdateResource, saveAccount, updateAccount, updateBatch, getAllAccount, delay, isValidForm,getCustomerAccountList;		
		
		accountSaveResource = $resource(configurationService.accountSave, {}, {
	    	saveAccount:	{ method: 'POST' }
	    });
		
		accountGetResource = $resource(configurationService.accountGet, {}, {
			getAllAccount:	{ method: 'POST' },
			getCustomerAccountList: { method: 'POST' }
	    });
		
		accountUpdateResource = $resource(configurationService.accountUpdate, {}, {
	    	updateAccount:	{ method: 'POST' }
	    });
		
		batchUpdateResource = $resource(configurationService.accountBatchUpdate, {}, {
			updateBatch : { method: 'POST' }
	    });
    
		saveAccount = function (obj) {
	        delay = $q.defer();
	        accountSaveResource.saveAccount(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    updateAccount = function (obj) {
	    	delay = $q.defer();
	    	accountUpdateResource.updateAccount(obj, function (data) {
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
	    
	    getAllAccount = function (obj) {
	    	delay = $q.defer();
	    	accountGetResource.getAllAccount(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getCustomerAccountList = function (obj) {
	    	delay = $q.defer();
	    	accountGetResource.getCustomerAccountList(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    isValidForm = function (account) {
	        var regexForNumber = /^[0-9.]+$/;
	        
	        if ($('#ProductType').val() == undefined || $('#ProductType').val() == null || $('#ProductType').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_ProductType input').focus();
	            return false;
	        }
	        
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
	        
	        if ($('#AccountTitle').val() == undefined || $('#AccountTitle').val() == null || $('#AccountTitle').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#AccountTitle').focus();
	            return false;
	        }
	        
	        if ($('#ApplicationDate').val() == undefined || $('#ApplicationDate').val() == null || $('#ApplicationDate').val().trim() == "") {
	        	messageService.showMessage(constantService.Danger, 'RF1000');
	        	$('#ApplicationDate').focus();
	        	return false;
	        }
	        
	        
	        if ($('#AccountType').val() == undefined || $('#AccountType').val() == null || $('#AccountType').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
            	$('#s2id_AccountType input').focus();
	            return false;
	        }
	        
	        if (($('#InterestRate').val() != undefined) && ($('#InterestRate').val() != null) && ($('#InterestRate').val().trim() != "") && (!regexForNumber.test($('#InterestRate').val()))) {
            	messageService.showMessage(constantService.Danger, 'EDP1000');
	            $('#InterestRate').focus();
	            return false;
	        }
	        
	        if ($('#SchemeAmount').val() != undefined && $('#Email').val() != null && ($('#SchemeAmount').val() != "") && (!regexForNumber.test($('#SchemeAmount').val()))) {
            	messageService.showMessage(constantService.Danger, 'EDP1000');
	            $("#SchemeAmount").focus();
	            return false;
	        }
	        
	        if ($('#MaturityAmount').val() != undefined && $('#MaturityAmount').val() != null && $('#MaturityAmount').val().trim() != "" && (!regexForNumber.test($('#MaturityAmount').val()))) {
            	messageService.showMessage(constantService.Danger, 'EDP1000');
	            $('#MaturityAmount').focus();
	            return false;
	        }

	        if ($('#NoOfInstalment').val() != undefined && $('#NoOfInstalment').val() != null && $('#NoOfInstalment').val().trim() != "" && (!regexForNumber.test($('#NoOfInstalment').val()))) {
            	messageService.showMessage(constantService.Danger, 'EDP1000');
	            $('#NoOfInstalment').focus();
	            return false;
	        }
	        
	        /*if ($('#MandatoryBioAuthCustomerNo').val() == undefined || $('#MandatoryBioAuthCustomerNo').val() == null || ($('#MandatoryBioAuthCustomerNo').val().trim() == "")) {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#MandatoryBioAuthCustomerNo').focus();
	            return false;
	        }
	        
	        if ((!regexForNumber.test($('#MandatoryBioAuthCustomerNo').val()))) {
            	messageService.showMessage(constantService.Danger, 'EDP1000');
	            $('#MandatoryBioAuthCustomerNo').focus();
	            return false;
	        }
	        
	        if ($('#BioAuthCustomerNo').val() == undefined || $('#BioAuthCustomerNo').val() == null || ($('#BioAuthCustomerNo').val().trim() == "")) {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#BioAuthCustomerNo').focus();
	            return false;
	        }
	        
	        if ((!regexForNumber.test($('#BioAuthCustomerNo').val()))) {
            	messageService.showMessage(constantService.Danger, 'EDP1000');
	            $('#BioAuthCustomerNo').focus();
	            return false;
	        }*/
	        
	        if(account.allAuthCustomer == undefined || account.allAuthCustomer == null || account.allAuthCustomer.length < 1){
	        	messageService.showMessage(constantService.Danger, 'ADC1000');
	            return false;
	        }
	        
	        /*if($('#MandatoryBioAuthCustomerNo').val() != account.mandatoryBioAuthCustomer.length){
	        	messageService.showMessage(constantService.Danger, 'MBA1000');
	            $('#MandatoryBioAuthCustomerNo').focus();
	            return false;
	        }
	        
	        if($('#BioAuthCustomerNo').val() != account.allAuthCustomer.length){
	        	messageService.showMessage(constantService.Danger, 'BAN1000');
	            $('#BioAuthCustomerNo').focus();
	            return false;
	        }*/
	        
	        return true;
	    };
	  
	    return {
	    	saveAccount : saveAccount,
	    	updateAccount : updateAccount,
	    	getAllAccount : getAllAccount,
	    	updateBatch : updateBatch,
	    	isValidForm : isValidForm,
	    	getCustomerAccountList: getCustomerAccountList,
	    };
				
	};
	
	 app.service('accountService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService',
         'configurationService', accountService]);	
});

