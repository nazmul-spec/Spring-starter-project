
'use strict';

define(['app'], function (app) {

	var transactionService = function ($rootScope, $q, $resource, configurationService) {
		
		var serverResource, delay, getTransactionDetail, getTransactionByID, reverseTransaction,getTransactionDetailByStatus, approveReverseTransaction;
		
		serverResource = $resource(configurationService.transaction, {}, {			
			getTransactionDetail: { method: 'POST' },
			getTransactionByID : { method: 'POST' },
			reverseTransaction : { method: 'POST' },
			getTransactionDetailByStatus: { method: 'POST' },
			approveReverseTransaction : { method: 'POST' }
			
	    });
		
	    getTransactionDetail = function (obj) {
	        delay = $q.defer();
	        serverResource.getTransactionDetail(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getTransactionByID = function (obj) {
	        delay = $q.defer();
	        serverResource.getTransactionByID(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    reverseTransaction = function (obj) {
	        delay = $q.defer();
	        serverResource.reverseTransaction(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getTransactionDetailByStatus = function (obj) {
	        delay = $q.defer();
	        serverResource.getTransactionDetailByStatus(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    approveReverseTransaction = function (obj) {
	        delay = $q.defer();
	        serverResource.approveReverseTransaction(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };

	    return {
	    	getTransactionDetail: getTransactionDetail,
	    	
	    	getTransactionByID : getTransactionByID,
	    	reverseTransaction : reverseTransaction,
	    	getTransactionDetailByStatus : getTransactionDetailByStatus,
	    	approveReverseTransaction : approveReverseTransaction
	    };
		
	};
	
	 app.service('transactionService', ['$rootScope', '$q', '$resource', 'configurationService', transactionService]);
	
});

