
'use strict';

define(['app'], function (app) {

	var fingerOrderService =  function ($rootScope, $resource, $q, constantService , messageService, configurationService) {
		
	var fingerOrderResource, newAgentComboResource, delay, openFingerOrder, getFingerOrderList,
	validateFingerOrderForm, getAllFingerOrder, getFingerOrderByID;
    
    
	fingerOrderResource = $resource(configurationService.openFingerOrder, {}, {
    	openFingerOrder:	{ method: 'POST' },
    	getAllFingerOrder : { method: 'POST' },
    	getFingerOrderByID:	{ method: 'POST' }
    });
	
	newAgentComboResource = $resource(configurationService.combo, {}, {  
    	getFingerOrderList:	 { method: 'POST'}
    });
    
	validateFingerOrderForm = function (obj) {
    	if ($('#txtbaccountID').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#txtbaccountID').focus();
            return false;
        }
        if (obj.changeToFinger == '') {
        	messageService.showMessage(constantService.Danger, 'RF1000');
            $('#s2id_cmbchangeToFinger input').focus();
            return false;
        }
       
        if ($('#txtchangeReason').val() == "") {
        	messageService.showMessage(constantService.Danger, 'RF1000');
            $('#txtchangeReason').focus();
            return false;
        }
        if (obj.changeFromFinger == obj.changeToFinger) {
        	messageService.showMessage(constantService.Danger, 'Du1000');
            $('#s2id_cmbchangeToFinger input').focus();
            return false;
        }
    
        return true;
    };
    
    getFingerOrderList = function (obj) {
        delay = $q.defer();
        newAgentComboResource.getFingerOrderList(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    
    getAllFingerOrder = function (obj) {
        delay = $q.defer();
        fingerOrderResource.getAllFingerOrder(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    
    openFingerOrder = function (obj) {
        delay = $q.defer();
        fingerOrderResource.openFingerOrder(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    }; 
    
    getFingerOrderByID = function (obj) {
        var delay1 = $q.defer();
        fingerOrderResource.getFingerOrderByID(obj, function (data) {
            delay1.resolve(data);
        }, function () {
            delay1.reject('Unable to fetch..');
        });
        return delay1.promise;
    };
    
    return {
        openFingerOrder : openFingerOrder, getFingerOrderList: getFingerOrderList,
        validateFingerOrderForm:validateFingerOrderForm, getAllFingerOrder: getAllFingerOrder, getFingerOrderByID : getFingerOrderByID
    };

	
	};
	
	 app.service('fingerOrderService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService', 'configurationService', fingerOrderService]);
	
});