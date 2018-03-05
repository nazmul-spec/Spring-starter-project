'use strict';

define(['app'], function (app) {

	var agentStaffService = function ($rootScope, $resource, $q, constantService, messageService,
		configurationService) {		
		
		var staffResource , saveAgentStaff, getAgentStaffInfoByID, getAllAgentStaff, updateAgentStaffStatus, updateAgentStaff, delay, isValidForm;		
		
			staffResource = $resource(configurationService.agentStaff, {}, {
	    	saveAgentStaff : { method: 'POST' },
	    	getAgentStaffInfoByID : { method: 'POST' },
	    	updateAgentStaff : { method: 'POST' },
	    	updateAgentStaffStatus : { method: 'POST' },
	    	getAllAgentStaff : { method: 'POST' }
	    });
    
		saveAgentStaff = function (obj) {
	        delay = $q.defer();
	        staffResource.saveAgentStaff(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    updateAgentStaff = function (obj) {
	        delay = $q.defer();
	        staffResource.updateAgentStaff(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAllAgentStaff = function (obj) {
	        delay = $q.defer();
	        staffResource.getAllAgentStaff(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
		
	    getAgentStaffInfoByID = function (obj) {
	        var delay1 = $q.defer();
	        staffResource.getAgentStaffInfoByID(obj, function (data) {
	            delay1.resolve(data);
	        }, function () {
	            delay1.reject('Unable to fetch..');
	        });
	        return delay1.promise;
	    };
	    
	    updateAgentStaffStatus = function (obj) {
	        delay = $q.defer();
	        staffResource.updateAgentStaffStatus(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
    
	    isValidForm = function (agentStaff, isShow) {
	    	if ($('#ServicePointID').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_ServicePointID input').focus();
	            return false;
	        }
	    	if ($('#agent').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_agent input').focus();
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
	        
	        if ($('#FatherName').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#FatherName').focus();
	            return false;
	        }
	        if ($('#MotherName').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#MotherName').focus();
	            return false;
	        }
	        if ($('#BirthDate').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#BirthDate').focus();
	            return false;
	        }
	        if ($('#MobileNo').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#MobileNo').focus();
	            return false;
	        }
	        if ($('#presentAddress').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#presentAddress').focus();
	            return false;
	        }
	        if ($('#permanentAddress').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#permanentAddress').focus();
	            return false;
	        }
	        if(agentStaff.kyc.gender == undefined || agentStaff.kyc.gender == null){
	        	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#Gender').focus();
	            return false;
	        }
	        if ($('#Role').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_Role input').focus();
	            return false;
	        }
	        if ($('#Nationality').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#Nationality').focus();
	            return false;
	        }
	        if (($('#NationalityIDNo').val().trim() == "") & ($('#PassportNo').val().trim() == "") & ($('#BirthRegNo').val().trim() == "") & ($('#tinNo').val().trim() == "")) {
            	messageService.showMessage(constantService.Danger, 'RF1002');
	            $('#NationalityIDNo').focus();
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
	    	saveAgentStaff : saveAgentStaff,
	    	getAllAgentStaff : getAllAgentStaff,
	    	updateAgentStaffStatus : updateAgentStaffStatus,
	    	updateAgentStaff : updateAgentStaff,
	    	getAgentStaffInfoByID : getAgentStaffInfoByID,
	    	isValidForm : isValidForm
	    };
				
	};
	
	 app.service('agentStaffService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService',
         'configurationService', agentStaffService]);	
});

