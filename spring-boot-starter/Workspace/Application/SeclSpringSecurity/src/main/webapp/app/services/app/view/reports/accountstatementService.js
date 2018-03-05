
'use strict';

define(['app'], function (app) {

	var accountstatementService = function ($rootScope, $resource, $q, constantService, configurationService,messageService) {
		
		 var delay,	 validateAccountStatementForm, isValidDate,accountstatementResource, getAccountStatement;
		 
		 accountstatementResource = $resource(configurationService.statement, {}, {
			 getAccountStatement: { method: 'POST' }
		         
		 });
		 
		
		 getAccountStatement = function (obj) {
		        delay = $q.defer();
		        accountstatementResource.getAccountStatement(obj, function (data) {
		            delay.resolve(data);
		        }, function () {
		            delay.reject('Unable to fetch..');
		        });
		        return delay.promise;
		 };
		 
		 
		 /*getAllAccountComboList = function (obj) {
		        delay = $q.defer();
		        accountstatementResource.getAllAccountComboList(obj, function (data) {
		            delay.resolve(data);
		        }, function () {
		            delay.reject('Unable to fetch..');
		        });
		        return delay.promise;
		    };*/
	    
		/*var getAccountStatement = function(){
			delay = $q.defer();
			
			var data = {					
					data : [
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432},
						{'transID' : 23123, 'referenceId' :23213,	'transdate' : '24-12-2014','debitAmount' :324324,'creditAmount' :324,'subledgerBalance' :32432}
                     
					],
					success : true
			};
			

			delay.resolve(data); 
	        
	        return delay.promise;
			
			
		};*/
		 
	    
		validateAccountStatementForm = function (agentInfo) {
	        if ($('#accountStatementIDInput').val() == "") {
	        	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#accountStatementIDInput').focus();
	            return false;
	        }
	        
	        if ($('#accountStatementFromDateInput').val() == "") {
	        	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#accountStatementFromDateInput').focus();
	            return false;
	        }
	        
	        if ($('#accountStatementToDateInput').val() == "") {
	        	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#accountStatementToDateInput').focus();
	            return false;
	        }
	    
	        return true;
	    };
	    
	    isValidDate = function () {
	          //  var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
	          var regex = /^[0-9]{4}-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|[1-2][0-9]|3[0-1])$/;       
	          if (($('#accountStatementFromDateInput').val() != "") && (!regex.test($('#accountStatementFromDateInput').val()))) {
	        	  messageService.showMessage(constantService.Danger, 'RF1000');
	              $("#accountStatementFromDateInput").focus();
	              return false;
	          }
	          if (($('#accountStatementToDateInput').val() != "") && (!regex.test($('#accountStatementToDateInput').val()))) {
	        	  messageService.showMessage(constantService.Danger, 'RF1000');
	                $("#accountStatementToDateInput").focus();
	                return false;
	          }
	          
	          if (Date.parse($('#accountStatementToDateInput').val()) < Date.parse($('#accountStatementFromDateInput').val())) {
	        	  messageService.showMessage(constantService.Danger, 'DGT1000');
	        	  $("#accountStatementFromDateInput").focus();
	              return false;
        	  }
	          return true;
	      };
	      
	      
	      return {
	      	 isValidDate: isValidDate, validateAccountStatementForm: validateAccountStatementForm,getAccountStatement: getAccountStatement
	      };
	};
	
	 app.service('accountstatementService', ['$rootScope', '$resource', '$q', 'constantService', 'configurationService','messageService', accountstatementService]);
	
});

