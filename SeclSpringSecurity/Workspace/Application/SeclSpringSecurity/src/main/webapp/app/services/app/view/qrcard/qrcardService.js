

'use strict';

define(['app'], function (app) {
	
		var qrcardService = function($rootScope, $resource, $q, $cookieStore, constantService, configurationService, messageService){     

			var generateQRCardByDate, getAllCustomerQr, qrCardResource,  delay, doValidateForm;
    
			qrCardResource = $resource(configurationService.qrcard, {}, {
				generateQRCardByDate : 	{ method: 'POST' },
				getAllCustomerQr :  { method: 'POST' }
		    });
			
			generateQRCardByDate = function(obj){
			        delay = $q.defer();
			        qrCardResource.generateQRCardByDate(obj, function (data) {
			            delay.resolve(data);
			        }, function () {
			            delay.reject('Unable to fetch..');
			        });
			        return delay.promise;
			    };
		    
		    
		    getAllCustomerQr = function (obj) {
		    	
		        delay = $q.defer();
		        qrCardResource.getAllCustomerQr(obj, function (data) {
		            delay.resolve(data);
		        }, function () {
		            delay.reject('Unable to fetch..');
		        });
		        return delay.promise;
		    };
		    
		    doValidateForm = function(obj) {
		    	if ($('#selectBranchName').val() == undefined || $('#selectBranchName').val() == null || $('#selectBranchName').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
		            $('#s2id_selectBranchName input').focus();
		            return false;
		        }
		    	if ($('#inputAgentID').val() == "") {
					messageService.showMessage(constantService.Danger,'RF1000');
					$("#inputAgentID").focus();
					return false;
				}
				if ($('#toApplicationDate').val() == "") {
					messageService.showMessage(constantService.Danger,'RF1000');
					$("#toApplicationDate").focus();
					return false;
				}
				if ($('#fromApplicationDate').val() == "") {
					messageService.showMessage(constantService.Danger,'RF1000');
					$("#fromApplicationDate").focus();
					return false;
				}
				return true;
			};
		    
			
		
		    return {
		    	generateQRCardByDate:generateQRCardByDate,
		    	getAllCustomerQr: getAllCustomerQr,
		    	doValidateForm:doValidateForm
		    };

		};

app.service('qrcardService', ['$rootScope', '$resource', '$q', '$cookieStore', 'constantService', 'configurationService', 'messageService',
                              qrcardService]);	
});

