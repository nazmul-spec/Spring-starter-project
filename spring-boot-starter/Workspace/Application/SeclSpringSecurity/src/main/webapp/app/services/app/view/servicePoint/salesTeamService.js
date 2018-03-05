'use strict';

define(['app'], function (app) {

	var salesTeamService = function ($rootScope, $resource, $q, constantService, messageService,
		configurationService) {		
		
		var staffResource , saveSalesTeam, getSalesTeamInfoByID, getAllSalesTeam, updateSalesTeamStatus, updateSalesTeam, delay, isValidForm;		
		
			staffResource = $resource(configurationService.salesTeam, {}, {
			saveSalesTeam : { method: 'POST' },
			getSalesTeamInfoByID : { method: 'POST' },
			updateSalesTeam : { method: 'POST' },
	    	updateSalesTeamStatus : { method: 'POST' },
	    	getAllSalesTeam : { method: 'POST' }
	    });
    
			saveSalesTeam = function (obj) {
	        delay = $q.defer();
	        staffResource.saveSalesTeam(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    updateSalesTeam = function (obj) {
	        delay = $q.defer();
	        staffResource.updateSalesTeam(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAllSalesTeam = function (obj) {
	        delay = $q.defer();
	        staffResource.getAllSalesTeam(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
		
	    getSalesTeamInfoByID = function (obj) {
	        var delay1 = $q.defer();
	        staffResource.getSalesTeamInfoByID(obj, function (data) {
	            delay1.resolve(data);
	        }, function () {
	            delay1.reject('Unable to fetch..');
	        });
	        return delay1.promise;
	    };
	    
	    updateSalesTeamStatus = function (obj) {
	        delay = $q.defer();
	        staffResource.updateSalesTeamStatus(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
    
	    isValidForm = function (salesTeam, isShow) {
	    	if (salesTeam.servicePointIDs.length < 1 ) {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_ServicePointID input').focus();
	            return false;
	        }    	
	        if ($('#LoginID_RM_No').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#LoginID_RM_No').focus();
	            return false;
	        }
	        if (($('#LoginID_RM_No').val().trim().length < 8)) {
            	messageService.showMessage(constantService.Danger, 'RM1000');
	            $("#LoginID_RM_No").focus();
	            return false;
	        }
	        
			if (isShow.password != false) {
				if ($('#Password').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
		            $('#Password').focus();
		            return false;
		        }
		        
		        if ($('#retypePassword').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
		            $('#retypePassword').focus();
		            return false;
		        }
		        
		        
		        if ($('#Password').val().trim() !== $('#retypePassword').val().trim()) {
	            	messageService.showMessage(constantService.Danger, 'PasswordCnfPasswordNM');
		            $('#retypePassword').focus();
		            return false;
		        }
			}
	        
	        if ($('#Name').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#Name').focus();
	            return false;
	        }
	     
	        if ($('#MobileNo').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#MobileNo').focus();
	            return false;
	        }
	      
	        if(salesTeam.gender == undefined || salesTeam.gender == null){
	        	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#Gender').focus();
	            return false;
	        }
	        if ($('#Role').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_Role input').focus();
	            return false;
	        }
	       
	        var regexForNumber = /^[0-9+]+$/;
	        var regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/; // give 99.00%
	        if (($('#Email').val() != "") && (!regex.test($('#Email').val()))) {
            	messageService.showMessage(constantService.Danger, 'EVE1000');
	            $("#Email").focus();
	            return false;
	        }
	        
	        if (($('#MobileNo').val().trim() != "") && (!regexForNumber.test($('#MobileNo').val()))) {
            	messageService.showMessage(constantService.Danger, 'EDP1000');
            	$("#MobileNo").focus();
            	return false;
	        }
	        if (($('#MobileNo').val().trim().length < 11)) {
            	messageService.showMessage(constantService.Danger, 'EDP1001');
	            $("#MobileNo").focus();
	            return false;
	        }
	        
	        return true;
	    };
	    
	    return {
	    	saveSalesTeam : saveSalesTeam,
	    	getAllSalesTeam : getAllSalesTeam,
	    	updateSalesTeamStatus : updateSalesTeamStatus,
	    	updateSalesTeam : updateSalesTeam,
	    	getSalesTeamInfoByID : getSalesTeamInfoByID,
	    	isValidForm : isValidForm
	    };
				
	};
	
	 app.service('salesTeamService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService',
         'configurationService', salesTeamService]);	
});

