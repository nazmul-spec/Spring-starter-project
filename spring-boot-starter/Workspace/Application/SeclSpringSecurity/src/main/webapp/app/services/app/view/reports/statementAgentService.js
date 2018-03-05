
'use strict';

define(['app'], function (app) {

	var statementAgentService = function ($rootScope, $resource, $q, constantService, configurationService,messageService) {
		
		 var delay,	 validateAgentStatementForm, isValidDate,statementAgentResource, getAgentStatement;
		 
		 statementAgentResource = $resource(configurationService.statement, {}, {
			 getAgentStatement: { method: 'POST' }
		 });
		 
		
		 getAgentStatement = function (obj) {
		        delay = $q.defer();
		        statementAgentResource.getAgentStatement(obj, function (data) {
		            delay.resolve(data);
		        }, function () {
		            delay.reject('Unable to fetch..');
		        });
		        return delay.promise;
		    };
	    
		 
	    
	    validateAgentStatementForm = function (agentInfo) {
	        if ($('#statementAgentID').val() == "") {
	        	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#statementAgentID').focus();
	            return false;
	        }
	        
	        if ($('#statementFromDate').val() == "") {
	        	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#statementFromDate').focus();
	            return false;
	        }
	        
	        if ($('#statementToDate').val() == "") {
	        	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#statementToDate').focus();
	            return false;
	        }
	    
	        return true;
	    };
	    
	    isValidDate = function () {
	        
	          var regex = /^[0-9]{4}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[1-2][0-9]|3[0-1])$/;       
	          if (($('#statementFromDate').val() != "") && (!regex.test($('#statementFromDate').val()))) {
	        	  messageService.showMessage(constantService.Danger, 'RF1000');
	              $("#statementFromDate").focus();
	              return false;
	          }
	          if (($('#statementToDate').val() != "") && (!regex.test($('#statementToDate').val()))) {
	        	  messageService.showMessage(constantService.Danger, 'RF1000');
	        	  $("#statementToDate").focus();
	        	  return false;
	          }
	          
	          if (Date.parse($('#statementToDate').val()) < Date.parse($('#statementFromDate').val())) {
	        	  messageService.showMessage(constantService.Danger, 'DGT1000');
	        	  $("#statementFromDate").focus();
	              return false;
        	  }
	          
	          return true;
	      };
	      
	      
	      return {
	      	 isValidDate: isValidDate, validateAgentStatementForm: validateAgentStatementForm,getAgentStatement: getAgentStatement
	      };
	};
	
	 app.service('statementAgentService', ['$rootScope', '$resource', '$q', 'constantService', 'configurationService','messageService', statementAgentService]);
	
});

