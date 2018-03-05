'use strict';

define(['app'], function (app) {

	var chargeModelService =  function ($rootScope, $resource, $q, constantService , messageService,
			configurationService) {
		
	
    var serviceMetaPropertyResource, delay, saveOrUpdateMetaproperty, getMetapropertyInfoByID, 
    validateValueJSON, validateUtilityForm, checkDuplicate,getDDLList,chargeModelResource, chargeModelItemListGetResource,
    chargeModelItemGetResource, chargeModelItemSaveResource, chargeModelItemUpdateResource;
    
    serviceMetaPropertyResource = $resource(configurationService.serviceMetaproperty, {}, {
    	saveOrUpdateMetaproperty : { method: 'POST' },
    	getMetapropertyInfoByID  : { method: 'POST' },
    	getAllFingerList  : { method: 'POST' },
    	updateAllFingerList  : { method: 'POST' }
    });
    
    chargeModelResource = $resource(configurationService.chargemodelSegmentList, {}, {
    	getDDLList : { method: 'POST' }
    });    
    chargeModelItemListGetResource = $resource(configurationService.chargeModelItemListGet, {}, {
    	get : { method: 'POST' }
    });
    chargeModelItemGetResource = $resource(configurationService.chargemodelitemget, {}, {
    	get : { method: 'POST' }
    });
    chargeModelItemSaveResource = $resource(configurationService.chargemodelitemsave, {}, {
    	save : { method: 'POST' }
    });
    chargeModelItemUpdateResource = $resource(configurationService.chargeModelItemUpdate, {}, {
    	update : { method: 'POST' }
    });
    
    validateValueJSON = function () {
    	if ($('#chargeName').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#chargeName').focus();
            return false;
        }
    	if ($('#DebitorAccountType').val() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#s2id_DebitorAccountType input').focus();
			return false;
		}
    	
    	if ($('#DebitorAccountType').val() == "Bank" && $('#DebitorGlcode').val() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#s2id_DebitorGlcode input').focus();
			return false;
		}
    	if ($('#CreditorAaccountType').val() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#s2id_CreditorAaccountType input').focus();
			return false;
		}
    	if ($('#CreditorGlcode').val() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#s2id_CreditorGlcode input').focus();
			return false;
		}
    	if ($('#VATGlcode').val() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#s2id_VATGlcode input').focus();
			return false;
		}    	
 
        return true;
    };
    
   var validateSlab = function () {
    	if ($('#fromAmount').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#fromAmount').focus();
            return false;
        }    	
    	
		if ($("#toAmount").val().trim() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$("#toAmount").focus();
			return false;			
		}
		else if (($("#toAmount").val().trim() != "") && ($("#toAmount").val().trim() != "Unlimited") && (!constantService.regexForAmountField.test($("#toAmount").val()))) {
			messageService.showMessage(constantService.Danger, 'EDP1105');
			$("#toAmount").focus();			
			return false;					
		
		}		
		if (parseFloat($('#fromAmount').val().trim()) >= parseFloat($('#toAmount').val().trim())) {
    		messageService.showMessage(constantService.Danger, 'toAmountLow');
            $('#fromAmount').focus();
            return false;
        }
		
		if ($("#chargeAmount").val().trim() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$("#chargeAmount").focus();
			return false;			
		}
		else if (($("#chargeAmount").val().trim() != "") && (!constantService.regexForAmountField.test($("#chargeAmount").val()))) {
			messageService.showMessage(constantService.Danger, 'EDP1105');
			$("#chargeAmount").focus();			
			return false;					
		
		}
		/*else if (($("#chargeAmount").val().trim() != "") && (!constantService.regexForAmountField.test($("#chargeAmount").val()))) {
			messageService.showMessage(constantService.Danger, 'EDP1105');
			$("#chargeAmount").focus();			
			return false;	
		}*/
		if ($('#method-input').val() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#s2id_method-input input').focus();
			return false;
		}
		if ($("#method-input").val().trim() == 'Percentage' && $("#chargeAmount").val().trim() >100) {
			messageService.showMessage(constantService.Danger, 'PercentageHigh');
			$("#chargeAmount").focus();
			return false;
			
		}		
		/*if ($("#method-input").val().trim() == 'Absolute')  {
			
			if ($("#minChargeAmount").val().trim() > $("#chargeAmount").val().trim()) {
				messageService.showMessage(constantService.Danger, 'chargeLowerOfMinCharge');
				$("#chargeAmount").focus();
				return false;				
			}
		}	*/	
		
        return true;
    };
    
    validateUtilityForm = function () {
    	if ($('#ChargeName').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#ChargeName').focus();
            return false;
        }
    	if ($('#description').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#description').focus();
            return false;
        }    	   	
    	if ($('#bankAccountNo').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#bankAccountNo').focus();
            return false;
        }
    	else if ((!constantService.regexForBankAccNo.test($('#bankAccountNo').val())) && ($('#bankAccountNo').val().trim() != "0")) {
			messageService.showMessage(constantService.Danger, 'EDP1100');
            $('#bankAccountNo').focus();
            return false;					
		}

    	if ($("#minChargeAmount").val().trim() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$("#minChargeAmount").focus();
			return false;
			
		}
		else if ((!constantService.regexForAmountField.test($("#minChargeAmount").val())) && ($("#minChargeAmount").val().trim() != "0")) {
			messageService.showMessage(constantService.Danger, 'EDP1105');
			$("#minChargeAmount").focus();			
			return false;	
		}
    	
		if ($("#chargeAmount").val().trim() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$("#chargeAmount").focus();
			return false;			
		}
		else if ((!constantService.regexForAmountField.test($("#chargeAmount").val())) && ($("#chargeAmount").val().trim() != 0)) {
			messageService.showMessage(constantService.Danger, 'EDP1105');
			$("#chargeAmount").focus();			
			return false;	
		}
		
		if ($("#method-input").val().trim() == 'Absolute')  {
			
			if ($("#minChargeAmount").val().trim() > $("#chargeAmount").val().trim()) {
				messageService.showMessage(constantService.Danger, 'chargeLowerOfMinCharge');
				$("#chargeAmount").focus();
				return false;				
			}
		}
		if ($('#method-input').val() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#s2id_method-input input').focus();
			return false;
		}
		if ($("#method-input").val().trim() == 'Percentage' && $("#chargeAmount").val().trim() >100) {
			messageService.showMessage(constantService.Danger, 'PercentageHigh');
			$("#chargeAmount").focus();
			return false;
			
		}
        return true;
    };
    
    checkDuplicate = function(charges){
    	var isDuplicate = false;
    	var msgCode = '';
    	for (var i = 0; i < charges.length; i++) {			
			for (var j = 0; j < charges.length; j++) {
				if (charges[j].sortOrder === charges[i].sortOrder && i != j) {
					$("#sortOrder-input-" + j).focus();
					isDuplicate = true;
					msgCode = 'sortOrder-input-dup';
					break;
				}
				else {
					continue;
				}
			}
			if (isDuplicate === true) {
				messageService.showMessage(constantService.Danger, msgCode);
				break;
			}
		}
    	return isDuplicate;
    };
    
    saveOrUpdateMetaproperty = function (obj) {
    	delay = $q.defer();
    	serviceMetaPropertyResource.saveOrUpdateMetaproperty(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    getMetapropertyInfoByID = function (obj) {
    	delay = $q.defer();
    	serviceMetaPropertyResource.getMetapropertyInfoByID(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
  var getAllFingerList = function (obj) {
    	
        delay = $q.defer();
        serviceMetaPropertyResource.getAllFingerList(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };  
    
	var updateAllFingerList = function (obj) {
		
	    delay = $q.defer();
	    serviceMetaPropertyResource.updateAllFingerList(obj, function (data) {
	        delay.resolve(data);
	    }, function () {
	        delay.reject('Unable to fetch..');
	    });
	    return delay.promise;
	};
    
  var getDDLList = function (obj) {
	  
        delay = $q.defer();
        chargeModelResource.getDDLList(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    var getExistingChargeModelItemList = function (obj) {
  	  
        delay = $q.defer();
        chargeModelItemListGetResource.get(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    var getChargeModel = function (obj) {
  	  
        delay = $q.defer();
        chargeModelItemGetResource.get(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    var saveOrUpdate = function (obj) {    	  
        delay = $q.defer();
        chargeModelItemSaveResource.save(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    var update = function (obj) {    	  
        delay = $q.defer();
        chargeModelItemUpdateResource.update(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    return {
    	saveOrUpdateMetaproperty : saveOrUpdateMetaproperty, getMetapropertyInfoByID : getMetapropertyInfoByID,
    	getAllFingerList : getAllFingerList, updateAllFingerList : updateAllFingerList,
    	checkDuplicate:checkDuplicate, validateUtilityForm : validateUtilityForm,
    	getDDLList: getDDLList, loadExistingData: getExistingChargeModelItemList, getChargeModelByID: getChargeModel,
    	saveOrUpdate: saveOrUpdate, updateValueJSON: update,validateSlab: validateSlab, validateValueJSON: validateValueJSON
    };

	
	};
	
	 app.service('chargeModelService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService', 
            'configurationService', chargeModelService]);
	
});