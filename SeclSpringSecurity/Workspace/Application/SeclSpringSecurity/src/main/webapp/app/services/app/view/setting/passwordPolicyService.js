
'use strict';

define(['app'], function (app) {

	var passwordPolicyService =  function ($rootScope, $resource, $q, constantService , messageService, configurationService) {
		
	var saveResource, updateResource, getResource, delay, isValidForm,  get, save, update;
	
	var vt = null;
	
	var setViewType = function(viewType){
		vt = viewType;
	};
	
	var getViewType = function(){
		return vt;
	};
    
    
	saveResource = $resource(configurationService.passwordPolicySave, {}, {
    	save : { method: 'POST' }
    });
	
	updateResource = $resource(configurationService.passwordPolicyUpdate, {}, {
    	update : { method: 'POST' }
    });
	
	getResource = $resource(configurationService.passwordPolicyGet, {}, {
    	get : { method: 'POST' }
    });
	
	isValidForm = function (obj) {
		 var regexForNumber = /^[0-9]+$/;
    	if ($('#policyName').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#policyName').focus();
            return false;
        }
    	
    	/*if ($('#selectEffectiveFromDate').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#selectEffectiveFromDate').focus();
            return false;
        }
       
        if ($('#selectEffectiveToDate').val().trim() == "") {
        	messageService.showMessage(constantService.Danger, 'RF1000');
            $('#selectEffectiveToDate').focus();
            return false;
        }
        
        var fromDate = Date.parse($('#selectEffectiveFromDate').val().trim());
        var toDate = Date.parse($('#selectEffectiveToDate').val().trim());
        if(fromDate > toDate){
        	messageService.showMessage(constantService.Danger, 'DGT1000');
        	$('#selectEffectiveToDate').focus();
            return false;
        }*/

    	if ($('#passwordWillRemainValidFor').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#passwordWillRemainValidFor').focus();
            return false;
        } 
    	
    	if ((!regexForNumber.test($('#passwordWillRemainValidFor').val()))) {
        	messageService.showMessage(constantService.Danger, 'EDP1000');
            $("#passwordWillRemainValidFor").focus();
            return false;
        }
       
        if ($('#lastNoPasswordNotUsedAgain').val().trim() == "") {
        	messageService.showMessage(constantService.Danger, 'RF1000');
            $('#lastNoPasswordNotUsedAgain').focus();
            return false;
        } 
        
        if ((!regexForNumber.test($('#lastNoPasswordNotUsedAgain').val()))) {
        	messageService.showMessage(constantService.Danger, 'EDP1000');
            $("#lastNoPasswordNotUsedAgain").focus();
            return false;
        }

    	if ($('#leastCharacters').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#leastCharacters').focus();
            return false;
        } 
    	
    	if ((!regexForNumber.test($('#leastCharacters').val()))) {
        	messageService.showMessage(constantService.Danger, 'EDP1000');
            $("#leastCharacters").focus();
            return false;
        }
       
        if ($('#mostCharacters').val().trim() == "") {
        	messageService.showMessage(constantService.Danger, 'RF1000');
            $('#mostCharacters').focus();
            return false;
        }
        
        if ((!regexForNumber.test($('#mostCharacters').val()))) {
        	messageService.showMessage(constantService.Danger, 'EDP1000');
            $("#mostCharacters").focus();
            return false;
        }
        
        
        
        if ($('#leastNumbers').val() != undefined && $('#leastNumbers').val() != null && $('#leastNumbers').val().trim() != "" && (!regexForNumber.test($('#leastNumbers').val()))) {
        	messageService.showMessage(constantService.Danger, 'EDP1000');
            $('#leastNumbers').focus();
            return false;
        }
        
        if ($('#mostNumbers').val() != undefined && $('#mostNumbers').val() != null && $('#mostNumbers').val().trim() != "" && (!regexForNumber.test($('#mostNumbers').val()))) {
        	messageService.showMessage(constantService.Danger, 'EDP1000');
            $('#mostNumbers').focus();
            return false;
        }
        
        if ($('#leastSpecialCharacters').val() != undefined && $('#leastSpecialCharacters').val() != null && $('#leastSpecialCharacters').val().trim() != "" && (!regexForNumber.test($('#leastSpecialCharacters').val()))) {
        	messageService.showMessage(constantService.Danger, 'EDP1000');
            $('#leastSpecialCharacters').focus();
            return false;
        }
        
        if ($('#mostSpecialCharaccters').val() != undefined && $('#mostSpecialCharaccters').val() != null && $('#mostSpecialCharaccters').val().trim() != "" && (!regexForNumber.test($('#mostSpecialCharaccters').val()))) {
        	messageService.showMessage(constantService.Danger, 'EDP1000');
            $('#mostSpecialCharaccters').focus();
            return false;
        }
        
        if ($('#leaseUpperCaseletters').val() != undefined && $('#leaseUpperCaseletters').val() != null && $('#leaseUpperCaseletters').val().trim() != "" && (!regexForNumber.test($('#leaseUpperCaseletters').val()))) {
        	messageService.showMessage(constantService.Danger, 'EDP1000');
            $('#leaseUpperCaseletters').focus();
            return false;
        }
        
        if ($('#mostUpperCaseletters').val() != undefined && $('#mostUpperCaseletters').val() != null && $('#mostUpperCaseletters').val().trim() != "" && (!regexForNumber.test($('#mostUpperCaseletters').val()))) {
        	messageService.showMessage(constantService.Danger, 'EDP1000');
            $('#mostUpperCaseletters').focus();
            return false;
        }
        
        if ($('#leastLowerCaseLetter').val() != undefined && $('#leastLowerCaseLetter').val() != null && $('#leastLowerCaseLetter').val().trim() != "" && (!regexForNumber.test($('#leastLowerCaseLetter').val()))) {
        	messageService.showMessage(constantService.Danger, 'EDP1000');
            $('#leastLowerCaseLetter').focus();
            return false;
        }
        
        if ($('#mostLowerCaseLetter').val() != undefined && $('#mostLowerCaseLetter').val() != null && $('#mostLowerCaseLetter').val().trim() != "" && (!regexForNumber.test($('#mostLowerCaseLetter').val()))) {
        	messageService.showMessage(constantService.Danger, 'EDP1000');
            $('#mostLowerCaseLetter').focus();
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
    	isValidForm: isValidForm, get: get, save: save,
    	update: update,setViewType:setViewType,getViewType:getViewType
    };

	
	};
	
	 app.service('passwordPolicyService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService', 'configurationService', passwordPolicyService]);
	
});