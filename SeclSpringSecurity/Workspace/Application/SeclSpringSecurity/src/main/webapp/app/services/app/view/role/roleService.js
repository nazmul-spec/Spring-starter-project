
'use strict';

define(['app'], function (app) {

	var roleService = function ($rootScope, $resource, $q, constantService, messageService, configurationService) {
		
var serviceRoleSaveResource, serviceRoleGetResource, serviceRoleUpdateResource, getRoleInfoByID, saveRoleService,
updateRoleService, updateStatusByAdmin, getAllRole, getAllTopMenu , updateTerminalStatus, delay, isValidForm;		
		
		serviceRoleSaveResource = $resource(configurationService.serviceRoleSave, {}, {
			saveRoleService :	{ method: 'POST' }
	    });
		
		serviceRoleGetResource = $resource(configurationService.roleGet, {}, {
			getAllRole:				{ method: 'POST' },
			getAllTopMenu:			{ method: 'POST' },
			getRoleInfoByID:		{ method: 'POST' }
	    });
		
		serviceRoleUpdateResource = $resource(configurationService.serviceRoleUpdate, {}, {
			updateRoleService:		{ method: 'POST' },
			updateStatusByAdmin:	{ method: 'POST' },
			updateTerminalStatus:	{ method: 'POST' }
	    });
		
		
		saveRoleService = function (obj) {
	        delay = $q.defer();
	        serviceRoleSaveResource.saveRoleService(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    updateRoleService = function (obj) {
	    	delay = $q.defer();
	    	serviceRoleUpdateResource.updateRoleService(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    updateTerminalStatus = function (obj) {
	    	delay = $q.defer();
	    	serviceRoleUpdateResource.updateTerminalStatus(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	   
	    updateStatusByAdmin = function (obj) {
	    	delay = $q.defer();
	    	serviceRoleUpdateResource.updateStatusByAdmin(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getRoleInfoByID = function (obj) {
	    	delay = $q.defer();
	    	serviceRoleGetResource.getRoleInfoByID(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    getAllRole = function (obj) {
	    	delay = $q.defer();
	    	serviceRoleGetResource.getAllRole(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAllTopMenu = function (obj) {
	    	delay = $q.defer();
	    	serviceRoleGetResource.getAllTopMenu(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    isValidForm = function (role) {
	    	
	    	if ($('#roleID').val() == undefined || $('#roleID').val() == null || $('#roleID').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#roleID').focus();
	            return false;
	        }
	        
	    	  if ($('#roleDescription').val() == undefined || $('#roleDescription').val() == null || $('#roleDescription').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
		            $('#roleDescription').focus();
		            return false;
		        }
	        return true;
	    };
	    
	    
	    return {
	    	saveRoleService   : saveRoleService,
	    	updateRoleService : updateRoleService,
	    	getAllRole : getAllRole,
	    	getAllTopMenu  : getAllTopMenu ,
	    	getRoleInfoByID   : getRoleInfoByID,
	    	updateTerminalStatus  : updateTerminalStatus,
	    	updateStatusByAdmin   : updateStatusByAdmin,
	    	isValidForm : isValidForm
	       
	    };
	    
		
		
	};
	
	 app.service('roleService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService','configurationService', 
	                             roleService]);
	
});


