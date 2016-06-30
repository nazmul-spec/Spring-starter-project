
'use strict';

define(['app'], function (app) {

	var transProfileService =  function ($rootScope, $resource, $q, constantService , messageService, configurationService) {
		
	var saveResource, updateResource, getResource, delay, validate,  get, save, update;
    
    
	saveResource = $resource(configurationService.transprofileSave, {}, {
    	save : { method: 'POST' }
    });
	
	updateResource = $resource(configurationService.transprofileUpdate, {}, {
    	update : { method: 'POST' }
    });
	
	getResource = $resource(configurationService.transprofileGet, {}, {
    	get : { method: 'POST' }
    });
	
	validate = function (obj) {
    	if ($('#txtProfileName').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#txtProfileName').focus();
            return false;
        }
    	if ($('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }
    	if (obj.enabledMaxDpPerDay == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }
    	if (obj.enabledMaxDpPerDay == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }    	
    	if (obj.enabledMaxDpPerWeek == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }		
    	if (obj.enabledMaxDpPerMonth == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }				
    	if (obj.enabledMaxWdPerTrn == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }			
    	if (obj.enabledMaxWdPerDay == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }				
    	if (obj.enabledMaxWdPerWeek == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }				
    	if (obj.enabledMaxWdPerMonth == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }				
    	if (obj.enabledMaxFdPerTrn == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }			
    	if (obj.enabledMaxFdPerDay == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }				
    	if (obj.enabledMaxFdPerWeek == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }				
    	if (obj.enabledMaxFdPerMonth == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }				
    	if (obj.enabledMaxNoFdPerDay == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }			
    	if (obj.enabledMaxNoFdPerWeek == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }			
    	if (obj.enabledMaxNoFdPerMonth == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }		
    	if (obj.enabledMinBalance == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }			
    	if (obj.enabledMaxBalance == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }        
    
        return true;
    };
    
    save = function (obj) {
        delay = $q.defer();
        saveResource.save(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    update = function (obj) {
        delay = $q.defer();
        updateResource.update(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    get = function (obj) {
        delay = $q.defer();
        getResource.get(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
   
    return {
    	validate: validate, get: get, save: save,
    	update: update
    };

	
	};
	
	 app.service('transProfileService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService', 'configurationService', transProfileService]);
	
});