
'use strict';

define(['app'], function (app) {

	var newBankService = function ($rootScope, $resource, $q, constantService, 
		messageService, configurationService) {
		
	    var newBankResource,delay, saveOrUpdateBank, getBankInfoByID, isValidForm, getGenerateBankID;

	    newBankResource = $resource(configurationService.newBank, {}, {
	    	saveOrUpdateBank : { method: 'POST' },
	    	getBankInfoByID : { method: 'POST' },
	    	getGenerateBankID : { method: 'POST' }
	    });
	    
	    saveOrUpdateBank = function (obj) {
	        delay = $q.defer();
	        newBankResource.saveOrUpdateBank(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    isValidForm = function (bank) {
	        if ($('#InputBankId').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#InputBankId').focus();
	            return false;
	        }
	        if ($('#inputBankName').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#inputBankName').focus();
	            return false;
	        }
	        if ($('#selectBankStatus').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_selectBankStatus input').focus();
	            return false;
	        }
	        
        //for digit validation 
        
         var regexMin = /^[0-9]{3,}/;       
        if (($('#InputBankId').val() != "") && (!regexMin.test($('#InputBankId').val()))) {
        	messageService.showMessage(constantService.Info, 'BN101');
            $('#InputBankId').focus();
            return false;
        }
        
        if (($('#InputBankId').val().trim().length > 3)|| ($('#InputBankId').val().trim()<101)) {
            	messageService.showMessage(constantService.Info, 'BN101');
            $("#InputBankId").focus();
            
            return false;
        }
	    
	        return true;
	    };
	    
	    getBankInfoByID = function (obj) {
	        var delay1 = $q.defer();
	        newBankResource.getBankInfoByID(obj, function (data) {
	            delay1.resolve(data);
	        }, function () {
	            delay1.reject('Unable to fetch..');
	        });
	        return delay1.promise;
	    };

	    
	    getGenerateBankID = function (obj) {
	        var delay1 = $q.defer();
	        newBankResource.getGenerateBankID(obj, function (data) {
	            delay1.resolve(data);
	        }, function () {
	            delay1.reject('Unable to fetch..');
	        });
	        return delay1.promise;
	    };

	    
	    return {
	    	saveOrUpdateBank : saveOrUpdateBank, 
	    	getBankInfoByID : getBankInfoByID , 
	    	isValidForm : isValidForm, 
	    	getGenerateBankID:getGenerateBankID
	    };			
		
	}
	
	 app.service('newBankService', ['$rootScope', '$resource', '$q', 'constantService',
            'messageService' , 'configurationService', newBankService]);	
});

