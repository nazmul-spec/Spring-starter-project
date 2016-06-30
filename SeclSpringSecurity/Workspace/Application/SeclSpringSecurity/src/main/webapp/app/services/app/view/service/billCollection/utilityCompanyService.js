'use strict';

define(['app'], function (app) {

	var utilityCompanyService = function ($rootScope, $resource, $q, constantService, messageService,
		configurationService) {		
		
		var delay;
		var utilityCompanyListResource, utilityCompanyDetailsResource, utilityCompanyStatusChangeResource;
		var getAllUtilityCompany, getMEUtilityCompany, getBRUtilityCompany, getBMUtilityCompany, 
			getUtilityCompanyInfo, makeUtilityCompany, approveUtilityCompany, rejectUtilityCompany, 
			makeEditableUtilityCompany, activeInactiveUtilityCompany, getAllUtilityCompanyForMaker;
		
		utilityCompanyListResource = $resource(configurationService.utilityCompanyList, {}, {
			getAllUtilityCompany:	{ method: 'POST' },
			getAllUtilityCompanyForMaker: 	{ method: 'POST' },
			getMEUtilityCompany:	{ method: 'POST' },
			getBRUtilityCompany:	{ method: 'POST' },
			getBMUtilityCompany:	{ method: 'POST' }
	    });
		
		utilityCompanyDetailsResource = $resource(configurationService.utilityCompanyDetails, {}, {
			getUtilityCompanyInfo:	{ method: 'POST' }
	    });
		
		utilityCompanyStatusChangeResource = $resource(configurationService.utilityCompanyStatusChange, {}, {
			makeUtilityCompany:	{ method: 'POST' },
			approveUtilityCompany:	{ method: 'POST' },
			rejectUtilityCompany:	{ method: 'POST' },
			makeEditableUtilityCompany:	{ method: 'POST' },
			activeInactiveUtilityCompany:	{ method: 'POST' }
	    });
		
		getAllUtilityCompany = function (obj) {
	    	delay = $q.defer();
	    	utilityCompanyListResource.getAllUtilityCompany(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAllUtilityCompanyForMaker = function (obj) {
	    	delay = $q.defer();
	    	utilityCompanyListResource.getAllUtilityCompanyForMaker(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getMEUtilityCompany = function (obj) {
	    	delay = $q.defer();
	    	utilityCompanyListResource.getMEUtilityCompany(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getBRUtilityCompany = function (obj) {
	    	delay = $q.defer();
	    	utilityCompanyListResource.getBRUtilityCompany(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getBMUtilityCompany = function (obj) {
	    	delay = $q.defer();
	    	utilityCompanyListResource.getBMUtilityCompany(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getUtilityCompanyInfo = function (obj) {
	    	delay = $q.defer();
	    	utilityCompanyDetailsResource.getUtilityCompanyInfo(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    makeUtilityCompany = function (obj) {
	    	delay = $q.defer();
	    	utilityCompanyStatusChangeResource.makeUtilityCompany(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    approveUtilityCompany = function (obj) {
	    	delay = $q.defer();
	    	utilityCompanyStatusChangeResource.approveUtilityCompany(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    rejectUtilityCompany = function (obj) {
	    	delay = $q.defer();
	    	utilityCompanyStatusChangeResource.rejectUtilityCompany(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    makeEditableUtilityCompany = function (obj) {
	    	delay = $q.defer();
	    	utilityCompanyStatusChangeResource.makeEditableUtilityCompany(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    activeInactiveUtilityCompany = function (obj) {
	    	delay = $q.defer();
	    	utilityCompanyStatusChangeResource.activeInactiveUtilityCompany(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    return {
	    	getAllUtilityCompany : getAllUtilityCompany,
	    	getMEUtilityCompany : getMEUtilityCompany, 
	    	getBRUtilityCompany : getBRUtilityCompany, 
	    	getBMUtilityCompany : getBMUtilityCompany, 
			getUtilityCompanyInfo : getUtilityCompanyInfo, 
			makeUtilityCompany : makeUtilityCompany, 
			approveUtilityCompany : approveUtilityCompany, 
			rejectUtilityCompany : rejectUtilityCompany, 
			makeEditableUtilityCompany : makeEditableUtilityCompany, 
			activeInactiveUtilityCompany : activeInactiveUtilityCompany,
			getAllUtilityCompanyForMaker : getAllUtilityCompanyForMaker
	    };
				
	};
	
	 app.service('utilityCompanyService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService',
         'configurationService', utilityCompanyService]);	
});

