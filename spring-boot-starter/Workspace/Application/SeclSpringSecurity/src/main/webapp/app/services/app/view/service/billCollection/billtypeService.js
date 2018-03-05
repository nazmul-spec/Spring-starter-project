'use strict';

define(['app'], function (app) {

	var billtypeService = function ($rootScope, $resource, $q, constantService, messageService,
		configurationService) {		
		
		var createResource, updateResource, getResource, getAllBilltype, saveBilltype, updateBilltype, getAllBilltypeByID, delay, isValidForm;
		
		createResource = $resource(configurationService.billtypeCreate, {}, {
			saveBilltype:	{ method: 'POST' }
	    });
		updateResource = $resource(configurationService.billtypeUpdate, {}, {
			updateBilltype:	{ method: 'POST' }
	    });
		getResource = $resource(configurationService.billtypeGet, {}, {
			getAllBilltype:	{ method: 'POST' }
	    });
		
		getAllBilltype = function (obj) {
	    	delay = $q.defer();
	    	getResource.getAllBilltype(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAllBilltypeByID = function (obj) {
	    	delay = $q.defer();
	    	getResource.getAllBilltype(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
		
		saveBilltype = function (obj) {
	    	delay = $q.defer();
	    	createResource.saveBilltype(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    updateBilltype = function (obj) {
	    	delay = $q.defer();
	    	updateResource.updateBilltype(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    isValidForm = function (billtype) {
	        var regexForNumber = /^[0-9.]+$/;
	        var regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/; // give 99.00%
	        
	        if ($('#billtypeID').val() == undefined || $('#billtypeID').val() == null || $('#billtypeID').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#billtypeID').focus();
	            return false;
	        }
	        
	        if ($('#billtypeName').val() == undefined || $('#billtypeName').val() == null || $('#billtypeName').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#billtypeName').focus();
	            return false;
	        }
	        
	        if ($('#billtypeDescription').val() == undefined || $('#billtypeDescription').val() == null || $('#billtypeDescription').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#billtypeDescription').focus();
	            return false;
	        }
	        
	        return true;
	    };
	    
	    return {
	    	saveBilltype : saveBilltype,
	    	updateBilltype: updateBilltype,
	    	getAllBilltype: getAllBilltype,
	    	getAllBilltypeByID: getAllBilltypeByID,
	    	isValidForm : isValidForm
	    };
				
	};
	
	 app.service('billtypeService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService',
         'configurationService', billtypeService]);	
});

