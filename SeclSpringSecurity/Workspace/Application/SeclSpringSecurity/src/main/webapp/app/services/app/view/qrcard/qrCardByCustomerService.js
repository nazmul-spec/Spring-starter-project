

'use strict';

define(['app'], function (app) {
	
		var qrCardByCustomerService = function($rootScope, $resource, $q, $cookieStore, constantService, messageService, configurationService){     

			var getAllCustomerQr, generateQRCardByCustomer, qrCardResource, updateQrCardList,  delay, doValidateForm;
    
		    qrCardResource = $resource(configurationService.qrcard, {}, {
		    	getAllCustomerQr : { method: 'POST' },
		    	generateQRCardByCustomer : { method: 'POST' },
		    	updateQrCardList: { method: 'POST' }
		    });
		    
		    generateQRCardByCustomer = function(obj){
		    	
		        delay = $q.defer();
		        qrCardResource.generateQRCardByCustomer(obj, function (data) {
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
		    
		    updateQrCardList = function (obj) {
		        delay = $q.defer();
		        qrCardResource.updateQrCardList(obj, function (data) {
		            delay.resolve(data);
		        }, function () {
		            delay.reject('Unable to fetch..');
		        });
		        return delay.promise;
		    };
		    doValidateForm = function(obj) {

				if ($('#customerID').val() == "") {
					messageService.showMessage(constantService.Info,'RF1000');
					$("#customerID").focus();
					return false;
				}

				return true;
			};
			
		    return {
		    	getAllCustomerQr: getAllCustomerQr,
		    	generateQRCardByCustomer:generateQRCardByCustomer,
		    	qrCardResource:qrCardResource,
		    	updateQrCardList:updateQrCardList,
		    	doValidateForm:doValidateForm
		    };

		};

app.service('qrCardByCustomerService', ['$rootScope', '$resource', '$q', '$cookieStore', 'constantService', 'messageService','configurationService', qrCardByCustomerService]);	
});

