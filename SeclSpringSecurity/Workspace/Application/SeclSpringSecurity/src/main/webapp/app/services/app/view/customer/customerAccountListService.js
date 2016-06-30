
'use strict';

define(['app'], function (app) {

	var customerAccountListService = function ($rootScope, $resource, $q, constantService, configurationService,
			localStorageService) {
		
		var customerAccountResource, delay, updateCustomerAccount, getCustomerAccountList,
		accountResource, updateAccountStatus;
		
		customerAccountResource = $resource(configurationService.accountList, {id: '@id'}, {
			updateCustomerAccountList: { method: 'POST' },
			getCustomerAccountList: { method: 'POST' }
	    });
		
		accountResource = $resource(configurationService.customeraccount, {id: '@id'}, {
			changeStatus: { method: 'POST' }
			
	    });
		
		updateAccountStatus = function (obj) {
	        delay = $q.defer();
	        accountResource.changeStatus(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
		
		updateCustomerAccount = function (obj) {
	        delay = $q.defer();
	        customerAccountResource.updateCustomerAccountList(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
		
	    getCustomerAccountList = function (obj) {
	    	
	        delay = $q.defer();
	        customerAccountResource.getCustomerAccountList(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    return {	     
	    	updateCustomerAccount:updateCustomerAccount, updateAccountStatus:updateAccountStatus,	       
	        getCustomerAccountList : getCustomerAccountList
	    };
	};
	
	 app.service('customerAccountListService', ['$rootScope', '$resource', '$q', 'constantService', 
        'configurationService', 'localStorageService', customerAccountListService]);
	
});
