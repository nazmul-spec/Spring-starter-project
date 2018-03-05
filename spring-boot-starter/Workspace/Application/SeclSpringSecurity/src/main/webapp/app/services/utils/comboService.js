'use strict';

define(['app'], function (app) {

	var comboService = function ($rootScope, $resource, $q, configurationService) {		
		
		var comboResource, ddlResource;
		var delay;
		var getAllBankComboList, getAllBranchComboList, getAllSevicePointInfo, getAllAgentInfo, getAllParentAgent;
		var getAllDistrictComboList, getAgentTypes, getUserRoles, getBillTypeInfo, getAllCompanyZoneComboList, 
		getAllUtilityCompanyComboList, getAllProductComboList, getAccountTransactionProfileList;
		var getDDLValueJSONComboList;
		
	    comboResource = $resource(configurationService.combo, {}, {
	    	getAllBankComboList		:{ method: 'POST'},
	    	getAllBranchComboList	:{ method: 'POST'},
	    	getAllSevicePointInfo	:{ method: 'POST'},
	    	getAllAgentInfo			:{ method: 'POST'},
	    	getParentAgent			:{method:  'POST'},
	    	getUserRoles			:{method:	'POST'},
	    	getBillTypeInfo			:{method:	'POST'},
	    	getAllUtilityCompany 	:{ method: 'POST'},
	    	getAllCompanyZone 	:{ method: 'POST'},
	    	getAllProduct 			:{method: 'POST'},
	    	getAllAccTransProfile	:{method: 'POST'}
	    });
	    
	    ddlResource = $resource(configurationService.ddl, {}, {
	    	getAllDistrict : 	 { method: 'POST' },
	    	getAllAgentType: 	{method: 'POST'},
	    	getDDLValueJSON : 	 { method: 'POST' }
	    });
    
	    getAllBankComboList = function (obj) {
	        delay = $q.defer();
	        comboResource.getAllBankComboList(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
    
	    getAllBranchComboList = function (obj) {
	        delay = $q.defer();
	        comboResource.getAllBranchComboList(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAllSevicePointInfo = function (obj) {
	        delay = $q.defer();
	        comboResource.getAllSevicePointInfo(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAllAgentInfo = function (obj) {
	        delay = $q.defer();
	        comboResource.getAllAgentInfo(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAllParentAgent = function (obj) {
	        delay = $q.defer();
	        comboResource.getParentAgent(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getBillTypeInfo = function (obj) {
	        delay = $q.defer();
	        comboResource.getBillTypeInfo(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAllCompanyZoneComboList = function (obj) {
	        delay = $q.defer();
	        comboResource.getAllCompanyZone(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAllUtilityCompanyComboList = function (obj) {
	        delay = $q.defer();
	        comboResource.getAllUtilityCompany(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAllProductComboList = function (obj) {
	        delay = $q.defer();
	        comboResource.getAllProduct(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAccountTransactionProfileList = function (obj) {
	        delay = $q.defer();
	        comboResource.getAllAccTransProfile(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getDDLValueJSONComboList = function (obj) {
	        delay = $q.defer();
	        ddlResource.getDDLValueJSON(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	   getAgentTypes = function (obj) {
	        delay = $q.defer();
	        ddlResource.getAllAgentType(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getUserRoles = function (obj) {
	        delay = $q.defer();
	        comboResource.getUserRoles(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
    
	    return {
	        getAllBankComboList : getAllBankComboList, 
	        getAllBranchComboList : getAllBranchComboList,
	        getAllSevicePointInfo : getAllSevicePointInfo,
	        getAllAgentInfo : getAllAgentInfo,
	        getAllDistrictComboList : getAllDistrictComboList,
	        getAgentTypes: getAgentTypes,
	        getDDLValueJSONComboList : getDDLValueJSONComboList,
	        getAllParentAgent : getAllParentAgent,
	        getUserRoles : getUserRoles,
	        getBillTypeInfo : getBillTypeInfo,
	        getAllCompanyZoneComboList : getAllCompanyZoneComboList,
	        getAllUtilityCompanyComboList : getAllUtilityCompanyComboList,
	        getAllProductComboList : getAllProductComboList,
	        getAccountTransactionProfileList : getAccountTransactionProfileList
	    };
				
	};
	
	 app.service('comboService', ['$rootScope', '$resource', '$q', 'configurationService', 
              comboService]);	
});

