
'use strict';

define(['app'], function (app) {

	var branchService = function ($rootScope, $resource, $q, constantService, configurationService) {
		
		var branchResource, bankBranchComboResource, delay, getAllBranch, updateBranchStatus, getAllBankComboList,
		getBranchComboList;
		
		branchResource = $resource(configurationService.branch, {}, {
			getAllBranch : { method: 'POST' },	
			updateBranchStatus : { method: 'POST' }
	    });
		
		bankBranchComboResource = $resource(configurationService.combo, {}, {
	    	getAllBankComboList: { method: 'POST' },
	    	getBranchComboList:	 { method: 'POST'}
	    	
	    });
		
		getAllBranch = function (obj) {
	        delay = $q.defer();
	        branchResource.getAllBranch(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };		    
	    
		updateBranchStatus = function (obj) {
	        delay = $q.defer();
	        branchResource.updateBranchStatus(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	  
	    //Added by mashud 20141127
	    getAllBankComboList = function (obj) {
	        delay = $q.defer();
	        bankBranchComboResource.getAllBankComboList(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
    
	    getBranchComboList = function (obj) {
	        delay = $q.defer();
	        bankBranchComboResource.getBranchComboList(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };

	    return {
	        updateBranchStatus : updateBranchStatus, 
	        getAllBranch : getAllBranch,
	        getAllBankComboList : getAllBankComboList, 
	        getBranchComboList : getBranchComboList
	    };
	    	
	}
	
	 app.service('branchService', ['$rootScope', '$resource', '$q', 'constantService', 
     'configurationService', branchService]);
	
});


