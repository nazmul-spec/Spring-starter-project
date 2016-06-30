'use strict';

define(['app'], function (app) {

	var chargeModelDefService =  function ($rootScope, $resource, $q, constantService , messageService, configurationService) {
		
	
    var chargeModelDefGetResource, delay, chargeModelDefSaveResource, chargeModelDefUpdateResource;
    
    chargeModelDefGetResource = $resource(configurationService.chargeModelDefGet, {}, {
    	getChargeModelDefs : { method: 'POST' },
    	getChargeModelDef : { method: 'POST' },
    	getEffectivePeriodValidity : { method: 'POST' }
    });    
    
    chargeModelDefSaveResource = $resource(configurationService.chargeModelDefSave, {}, {
    	save : { method: 'POST' }
    });
    
    chargeModelDefUpdateResource = $resource(configurationService.chargeModelDefUpdate, {}, {
    	update : { method: 'POST' }
    });   
 
    
  this.getAllChargeModelDefs = function (obj) {	  
        delay = $q.defer();
        chargeModelDefGetResource.getChargeModelDefs(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    this.checkEffectivePeriodValidity = function (obj) {	  
        delay = $q.defer();
        chargeModelDefGetResource.getEffectivePeriodValidity(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    this.getChargeModelDef = function (obj) {	  
        delay = $q.defer();
        chargeModelDefGetResource.getChargeModelDef(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    this.save = function (obj) {    	  
        delay = $q.defer();
        chargeModelDefSaveResource.save(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    this.update = function (obj) {    	  
        delay = $q.defer();
        chargeModelDefUpdateResource.update(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    this.validate = function () {
    	if ($('#chargeModelDefName').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#chargeModelDefName').focus();
            return false;
        }
    	
    	if ($('#effectiveFrom').val() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#effectiveFrom').focus();
			return false;
		}
    	if ($('#effectiveTo').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#effectiveTo').focus();
            return false;
        }
    	if ($('#effectiveFrom').val().trim() != "" && $('#effectiveTo').val().trim() != "") {
    		var fromDate = new Date($('#effectiveFrom').val().trim());
	    	var toDate = new Date($('#effectiveTo').val().trim());
    		if (fromDate > toDate) {
    			messageService.showMessage(constantService.Danger, 'EFTD1000');			            
	            return;
			}
        }
		if ($('#selectStatus').val() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#s2id_selectStatus input').focus();
			return false;
		}
		
        return true;
    };   
  
    
  	
	};
	
	 app.service('chargeModelDefService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService', 
            'configurationService', chargeModelDefService]);
	
});