
'use strict';

define(['app'], function (app) {

	var newBranchService = function ($rootScope, $resource, $q, constantService , 
		messageService, configurationService) {
		
		var newBranchResource, delay, saveOrUpdateBranch, getBranchInfoByID, isValidForm;

	    newBranchResource = $resource(configurationService.newBranch, {}, {
	    	saveOrUpdateBranch : { method: 'POST' },
	    	getBranchInfoByID : { method: 'POST' }
	    });
	    
	    saveOrUpdateBranch = function (obj) {
	        delay = $q.defer();
	        newBranchResource.saveOrUpdateBranch(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    isValidForm = function (branch) {
	    	
	    	var regexMin = /^[0-9]{4,}/;
	        var regex = /^[0-9]+$/;
	        
	    	if ($('#selectBankId').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_selectBankId input').focus();
	            return false;
	        }
	    	if ($('#InputBranchId').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#InputBranchId').focus();
	            return false;
	        }	    	 
	       
	        if (($('#InputBranchId').val() != "") && (!regex.test($('#InputBranchId').val()))) {
            	messageService.showMessage(constantService.Info, 'EDP1000');
	            $("#InputBranchId").focus();
	            return false;
	        }
	       	        
	        if (($('#InputBranchId').val() != "") && (!regexMin.test($('#InputBranchId').val()))) {
            	messageService.showMessage(constantService.Info, 'EMN1000');
	            $('#InputBranchId').focus();
	            return false;
	        }
	        
	        if (($('#InputBranchId').val().trim().length > 4)) {
	            	messageService.showMessage(constantService.Info, 'EMN1000');
                $("#InputBranchId").focus();
                
                return false;
            }
	        
	        if ($('#inputBranchName').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#inputBranchName').focus();
	            return false;
	        }
	        
	        if ($('#Address').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#Address').focus();
	            return false;
	        }
	        
	        if ($('#geoLocationLat').val().trim() == "" && $('#geoLocationLong').val().trim() != "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#geoLocationLat').focus();
	            return false;
	        }
	        
	        if ($('#geoLocationLat').val().trim() != "" && $('#geoLocationLong').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#geoLocationLong').focus();
	            return false;
	        }
	        
	        if ($('#geoLocationLat').val().trim() !=='' && $('#geoLocationLong').val().trim() !=='' && $('#geoLocationLat').val().trim() === $('#geoLocationLong').val().trim()) {
	        	messageService.showMessage(constantService.Danger, 'GeoLocationSame');	        	
	            $('#geoLocationLat').focus();
	            return false;
	        }  
	        
	        if ($('#inputTelephoneNo').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#inputTelephoneNo').focus();
	            return false;
	        }
	        
	        if ($('#accountNoForChargeModel').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#accountNoForChargeModel').focus();
	            return false;
	        }
	        
	        if ($('#accountNoForChargeModel').val().trim().length <15 ) {
            	messageService.showMessage(constantService.Danger, 'EDP1100');
	            $('#accountNoForChargeModel').focus();
	            return false;
	        }
	       
	        if ($('#selectBranchStatus').val() != undefined && $('#selectBranchStatus').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_selectBranchStatus input').focus();
	            return false;
	        }
	    
	        return true;
	    };
	    
	    getBranchInfoByID = function (obj) {
	        var delay1 = $q.defer();
	        newBranchResource.getBranchInfoByID(obj, function (data) {
	            delay1.resolve(data);
	        }, function () {
	            delay1.reject('Unable to fetch..');
	        });
	        return delay1.promise;
	    };
	    
	    return {
	    	saveOrUpdateBranch : saveOrUpdateBranch, 
	    	getBranchInfoByID : getBranchInfoByID , 
	    	isValidForm : isValidForm
	    };			
		
	}
	
	 app.service('newBranchService', ['$rootScope', '$resource', '$q', 'constantService',
            'messageService' , 'configurationService', newBranchService]);	
});

