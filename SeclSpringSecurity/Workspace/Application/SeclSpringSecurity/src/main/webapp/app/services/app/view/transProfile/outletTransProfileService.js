
'use strict';

define(['app'], function (app) {

	var outletTransProfileService =  function ($rootScope, $resource, $q, constantService , messageService, configurationService) {
		
	var saveResource, updateResource, getResource, delay, validate,  get, save, update;
    
    
	saveResource = $resource(configurationService.outletTransProfileSave, {}, {
    	save : { method: 'POST' }
    });
	
	updateResource = $resource(configurationService.outletTransProfileUpdate, {}, {
    	update : { method: 'POST' }
    });
	
	getResource = $resource(configurationService.outletTransProfileGet, {}, {
    	get : { method: 'POST' }
    });
	
	validate = function (obj) {
    	if ($('#txtProfileName').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#txtProfileName').focus();
            return false;
        }
    	if ($('#SelecttpType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelecttpType input').focus();
            return false;
        }
    	
    	if (obj.enabledMaxDpPerTrn == true && $('#maxDpPerTrn').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#maxDpPerTrn').focus();
            return false;
        }
    	if (obj.enabledMaxDpPerDay == true && $('#maxDpPerDay').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#maxDpPerDay').focus();
            return false;
        }
    	 	
    	if (obj.enabledMaxDpPerWeek == true && $('#maxDpPerWeek').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#maxDpPerWeek').focus();
            return false;
        }		
    	if (obj.enabledMaxDpPerMonth == true && $('#SelectTpgType').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#s2id_SelectTpgType input').focus();
            return false;
        }				
    	if (obj.enabledMaxWdPerTrn == true && $('#maxDpPerMonth').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#maxDpPerMonth').focus();
            return false;
        }    	
    	if (obj.enabledMinBalance == true && $('#minBalance').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#minBalance').focus();
            return false;
        }			
    	if (obj.enabledMaxBalance == true && $('#maxBalance').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#maxBalance').focus();
            return false;
        }  
    	
    	if (obj.enabledMaxWdPerDay == true && $('#maxWdPerTrn').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#maxWdPerTrn').focus();
            return false;
        }				
    	if (obj.enabledMaxWdPerWeek == true && $('#maxWdPerDay').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#maxWdPerDay').focus();
            return false;
        }				
    	if (obj.enabledMaxWdPerMonth == true && $('#maxWdPerMonth').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#maxWdPerMonth').focus();
            return false;
        }	
    			
    	if (obj.enabledMaxFdPerTrn == true && $('#maxFdPerTrn').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#maxFdPerTrn').focus();
            return false;
        }				
    	if (obj.enabledMaxFdPerDay == true && $('#maxFdPerDay').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#maxFdPerDay').focus();
            return false;
        }				
    	if (obj.enabledMaxFdPerWeek == true && $('#maxFdPerWeek').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#maxFdPerWeek').focus();
            return false;
        }
    	if (obj.enabledMaxFdPerMonth == true && $('#maxFdPerMonth').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#maxFdPerMonth').focus();
            return false;
        }
    	
    	if (obj.enabledMaxNoFdPerDay == true && $('#maxNoFdPerDay').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('maxNoFdPerDay').focus();
            return false;
        }    			
    	if (obj.enabledMaxNoFdPerWeek == true && $('#maxNoFdPerWeek').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#maxNoFdPerWeek').focus();
            return false;
        }		
    	if (obj.enabledMaxNoFdPerMonth == true && $('#maxNoFdPerMonth').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
    		$('#maxNoFdPerMonth').focus();
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
	
	 app.service('outletTransProfileService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService', 'configurationService', outletTransProfileService]);
	
});