
'use strict';

define(['app'], function (app) {

	var reportsService = function ($rootScope, $q, $resource, configurationService) {
		
		var serverResource,serverAgentResource, serverAccountResource, delay, getReport, getAgent, getAccount, getAppAccountOpeningList, getDepositTransAccount, getWithdrawalTransAccount, getDepositWithdrawalTransAccount, 
		getAgentTerminals, getDepositTransBOAccount, getWithdrawalTransBOAccount, getDepositWithdrawalTransBOAccount, getInwardRemittanceBO,
		getTransactionData, getTransactionDataByType, customerResource, getCustomerDetails, usersResource, getUsers, remittanceResource, getAllRemittance, depositWithdrawResource,
		smsResource, getSMSLog ,fundResource, getFund, getDepositWithdrawal;
		
		serverResource = $resource(configurationService.gridreportall, {}, {
			postRequest: { method: 'POST' },
			getTransactionData: { method: 'POST' },			
			getTransactionDataByType: { method: 'POST' }
	    });
		
		serverAgentResource = $resource(configurationService.agentgridreportgenerator, {}, {
			getAgent: { method: 'POST' }			
	    });
		
		serverAccountResource = $resource(configurationService.accountgridreportgenerator, {}, {
			getAccount: { method: 'POST' },
			getAppAccountOpeningList: { method: 'POST' }			
	    });
		
		customerResource = $resource(configurationService.customergridreporturl, {}, {
			getCustomerDetails: { method: 'POST' }			
	    });
		usersResource = $resource(configurationService.usergridreporturl, {}, {
			getUsers: { method: 'POST' }			
	    });
		remittanceResource = $resource(configurationService.remittanceReportURL, {}, {
			getAllRemittance: { method: 'POST' },
			getInwardRemittanceBO: { method: 'POST' }
	    });
		
		fundResource = $resource(configurationService.fundGridReportGenerator, {}, {
			getFund: { method: 'POST' }			
	    });
		
		depositWithdrawResource = $resource(configurationService.depositWithdrawGridReportGenerator, {}, {
			getDepositWithdrawal: { method: 'POST' },
			getDepositTransAccount: { method: 'POST' },
			getDepositWithdrawalTransAccount: { method: 'POST' },
			getWithdrawalTransAccount: { method: 'POST' },
			getDepositTransBOAccount : { method: 'POST' },
			getWithdrawalTransBOAccount : { method: 'POST' },
			getDepositWithdrawalTransBOAccount: { method: 'POST' }
	    });
		
		smsResource = $resource(configurationService.smslog, {}, {
			getSMSLog: { method: 'POST' }			
	    });
		
		getReport = function (obj) {
	        delay = $q.defer();
	        serverResource.postRequest(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
		
	    getAgent = function (obj) {
	        delay = $q.defer();
	        serverAgentResource.getAgent(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAccount = function (obj) {
	        delay = $q.defer();
	        serverAccountResource.getAccount(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAppAccountOpeningList = function (obj) {
	        delay = $q.defer();
	        serverAccountResource.getAppAccountOpeningList(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getCustomerDetails = function (obj) {
	        delay = $q.defer();
	        customerResource.getCustomerDetails(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getUsers = function (obj) {
	        delay = $q.defer();
	        usersResource.getUsers(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAllRemittance = function (obj) {
	        delay = $q.defer();
	        remittanceResource.getAllRemittance(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getInwardRemittanceBO = function (obj) {
	        delay = $q.defer();
	        remittanceResource.getInwardRemittanceBO(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAgentTerminals = function (obj) {
	        delay = $q.defer();
	        serverAgentResource.getAgent(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    	    
	    getTransactionData = function (obj) {
	        delay = $q.defer();
	        serverResource.getTransactionData(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getTransactionDataByType = function (obj) {
	        delay = $q.defer();
	        serverResource.getTransactionDataByType(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getDepositWithdrawal = function (obj) {
	        delay = $q.defer();
	        depositWithdrawResource.getDepositWithdrawal(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };

	    
	    getDepositTransAccount = function (obj) {
	        delay = $q.defer();
	        depositWithdrawResource.getDepositTransAccount(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getWithdrawalTransAccount = function (obj) {
	        delay = $q.defer();
	        depositWithdrawResource.getWithdrawalTransAccount(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getDepositWithdrawalTransAccount = function (obj) {
	        delay = $q.defer();
	        depositWithdrawResource.getDepositWithdrawalTransAccount(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    
	    getDepositTransBOAccount = function (obj) {
	        delay = $q.defer();
	        depositWithdrawResource.getDepositTransBOAccount(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getWithdrawalTransBOAccount = function (obj) {
	        delay = $q.defer();
	        depositWithdrawResource.getWithdrawalTransBOAccount(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getDepositWithdrawalTransBOAccount = function (obj) {
	        delay = $q.defer();
	        depositWithdrawResource.getDepositWithdrawalTransBOAccount(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    
	    getSMSLog = function (obj) {
	        delay = $q.defer();
	        smsResource.getSMSLog(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getFund = function (obj) {
	        delay = $q.defer();
	        fundResource.getFund(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	   
	    return {
	    	getReport : getReport,
	    	
	        getAgent : getAgent,
	        
	        getAccount : getAccount,
	        
	        getAppAccountOpeningList : getAppAccountOpeningList,
	        
	        getCustomerDetails : getCustomerDetails,
	        
	        getAgentTerminals : getAgentTerminals,
	        
	        getTransactionData: getTransactionData,
	        
	        getTransactionDataByType: getTransactionDataByType,
	        
	        getDepositTransAccount: getDepositTransAccount,
	        
	        getWithdrawalTransAccount: getWithdrawalTransAccount,
	        
	        getDepositWithdrawalTransAccount: getDepositWithdrawalTransAccount,
	        
	        getDepositTransBOAccount: getDepositTransBOAccount,
	        
	        getWithdrawalTransBOAccount: getWithdrawalTransBOAccount,
	        
	        getDepositWithdrawalTransBOAccount: getDepositWithdrawalTransBOAccount,
	        
	        getUsers: getUsers,
	        
	        getAllRemittance : getAllRemittance ,
	        
	        getSMSLog : getSMSLog ,
	        
	        getFund : getFund,
	        
	        getInwardRemittanceBO : getInwardRemittanceBO,
	        
	        getDepositWithdrawal: getDepositWithdrawal
	    };
		
	};
	
	 app.service('reportsService', ['$rootScope', '$q', '$resource', 'configurationService', reportsService]);
	
});

