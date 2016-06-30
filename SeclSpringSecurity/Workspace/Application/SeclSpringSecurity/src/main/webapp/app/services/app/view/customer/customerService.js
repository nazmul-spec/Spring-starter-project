
'use strict';

define(['app'], function (app) {

	var customerService = function ($rootScope, $resource, $q, constantService, messageService, 
		configurationService) {
		
		var delay;
		var customerListResource, customerInfoResource, customerStatusResource, customerSearchResource;
		var getASCustomerList, getBRCustomerList, getBMCustomerList, getBCCustomerList, getAllCustomerList, getCustomerBySearchText;
		var getCustomerInfoByCustomerID;
		var makeCustomerInfo, checkCustomerInfo, approveCustomerInfo, rejectCustomerInfo, closeCustomerInfo, activeInactive;
		var isValidForm;
		
		customerListResource = $resource(configurationService.customerList, {}, {
			getASCustomers: { method: 'POST' },
			getBRCustomers: { method: 'POST' },
			getBMCustomers: { method: 'POST' },
			getBCCustomers: { method: 'POST' },
			getAllCustomers: { method: 'POST' }
	    });
		
		customerInfoResource = $resource(configurationService.customerInfo, {}, {
			getCustomerByCustomerID: { method: 'POST' }
	    });
		
		customerStatusResource = $resource(configurationService.changeCustomerStatus, {}, {
			makeCustomer: { method: 'POST' },
			checkCustomer: { method: 'POST' },
			approveCustomer: { method: 'POST' },
			rejectCustomer: { method: 'POST' },
			closeCustomer: { method: 'POST' },
			activeInactive: { method: 'POST' }
	    });
		
		customerSearchResource = $resource(configurationService.searchCustomer, {}, {
			getCustomerBySearchText: { method: 'POST' }
	    });
	    
	    getCustomerBySearchText = function (obj) {
	        delay = $q.defer();
	        customerSearchResource.getCustomerBySearchText(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
		
		getASCustomerList = function (obj) {
	        delay = $q.defer();
	        customerListResource.getASCustomers(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getBRCustomerList = function (obj) {
	        delay = $q.defer();
	        customerListResource.getBRCustomers(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getBMCustomerList = function (obj) {
	        delay = $q.defer();
	        customerListResource.getBMCustomers(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getBCCustomerList = function (obj) {
	        delay = $q.defer();
	        customerListResource.getBCCustomers(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getAllCustomerList = function (obj) {
	        delay = $q.defer();
	        customerListResource.getAllCustomers(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    getCustomerInfoByCustomerID = function (obj) {
	        delay = $q.defer();
	        customerInfoResource.getCustomerByCustomerID(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    makeCustomerInfo = function (obj) {
	        delay = $q.defer();
	        customerStatusResource.makeCustomer(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    checkCustomerInfo = function (obj) {
	        delay = $q.defer();
	        customerStatusResource.checkCustomer(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    approveCustomerInfo = function (obj) {
	        delay = $q.defer();
	        customerStatusResource.approveCustomer(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    rejectCustomerInfo = function (obj) {
	        delay = $q.defer();
	        customerStatusResource.rejectCustomer(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    closeCustomerInfo = function (obj) {
	        delay = $q.defer();
	        customerStatusResource.closeCustomer(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    activeInactive = function (obj) {
	        delay = $q.defer();
	        customerStatusResource.activeInactive(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    isValidForm = function (customerInfo, customerTypeComboList) {
	    	
	    	if(customerInfo.customerType == customerTypeComboList[0].ID)
    		{
	    		//****************** Input Mandatory Data *******************//
	    		if ($('#inputFirstName').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputPersonalInformation').collapse('show');
		            $('#inputFirstName').focus();
		            return false;
		        }
		        if ($('#inputLastName').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputPersonalInformation').collapse('show');
		            $('#inputLastName').focus();
		            return false;
		        }
		        if ($('#inputMotherName').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputPersonalInformation').collapse('show');
		            $('#inputMotherName').focus();
		            return false;
		        }
		        if ($('#inputFatherName').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputPersonalInformation').collapse('show');
		            $('#inputFatherName').focus();
		            return false;
		        }
		        if(customerInfo.individualPrivateCustomer.individualCustFullInfo.individualCustMandatoryInfo.genderType == undefined 
	        		|| customerInfo.individualPrivateCustomer.individualCustFullInfo.individualCustMandatoryInfo.genderType == null){
		        	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputPersonalInformation').collapse('show');
		            $('#genderRadioMale').focus();
		            return false;
		        }
		        if ($('#selectBirthDate').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputPersonalInformation').collapse('show');
		            $('#selectBirthDate').focus();
		            return false;
		        }
		        /*if ($('#insertBirthPlace').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputPersonalInformation').collapse('show');
		            $('#insertBirthPlace').focus();
		            return false;
		        }*/
		        if ($('#inputNationality').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputPersonalInformation').collapse('show');
	            	$('#s2id_inputNationality input').focus();
		            return false;
		        }
		        if ($('#inputOccupation').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputPersonalInformation').collapse('show');
	            	$('#s2id_inputOccupation input').focus();
		            return false;
		        }
		        /*if ($('#inputSourceOfFundDesc').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputPersonalInformation').collapse('show');
		            $('#inputSourceOfFundDesc').focus();
		            return false;
		        }*/
		        if ($('#natureOfBusiness').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputPersonalInformation').collapse('show');
		            $('#natureOfBusiness').focus();
		            return false;
		        }
		        if ($('#inputNationalIdNo').val().trim() == "" &&
	        		$('#inputBirthRegNo').val().trim() == "" &&
	        		$('#inputPassportNo').val().trim() == "" &&
	        		$('#inputTinNo').val().trim() == "") {
		        	
	            	messageService.showMessage(constantService.Danger, 'RF1002');
	            	$('#collapse_panelIPC_InputUniqueInformation').collapse('show');
		            $('#inputNationalIdNo').focus();
		            return false;
		        }
		        if ($('#inputPresentAddressAdd1').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $('#inputPresentAddressAdd1').focus();
		            return false;
		        }
		        if ($('#inputPresentAddressAdd2').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $('#inputPresentAddressAdd2').focus();
		            return false;
		        }
		        if ($('#inputPresentAddressCity').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $('#s2id_inputPresentAddressCity').focus();
		            return false;
		        }
		        if ($('#inputPresentAddressZipCode').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $('#inputPresentAddressZipCode').focus();
		            return false;
		        }
		        if ($('#inputPresentAddressDist').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
	            	$('#s2id_inputPresentAddressDist input').focus();
		            return false;
		        }
		        if ($('#inputPresentAddressThana').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
	            	$('#s2id_inputPresentAddressThana input').focus();
		            return false;
		        }
		        if ($('#inputPresentAddressCountry').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
	            	$('#s2id_inputPresentAddressCountry input').focus();
		            return false;
		        }
		        if ($('#inputPermanentAddressAdd1').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $('#inputPermanentAddressAdd1').focus();
		            return false;
		        }
		        if ($('#inputPermanentAddressAdd2').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $('#inputPermanentAddressAdd2').focus();
		            return false;
		        }
		        if ($('#inputPermanentAddressCity').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $('#s2id_inputPermanentAddressCity').focus();
		            return false;
		        }
		        if ($('#inputPermanentAddressZipCode').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $('#inputPermanentAddressZipCode').focus();
		            return false;
		        }
		        if ($('#inputPermanentAddressDist').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $('#s2id_inputPermanentAddressDist input').focus();
		            return false;
		        }
		        if ($('#inputPermanentAddressThana').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $('#s2id_inputPermanentAddressThana input').focus();
		            return false;
		        }
		        if ($('#inputPermanentAddressCountry').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
	            	$('#s2id_inputPermanentAddressCountry input').focus();
		            return false;
		        }
		        if ($('#inputMobileNo').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $('#inputMobileNo').focus();
		            return false;
		        }
		        //****************** Phone Number *******************//
		        //*********(1) Number Format
		        if (($('#inputMobileNo').val().trim() != "") && (!constantService.regexForMobileNo.test($('#inputMobileNo').val()))) {
	            	messageService.showMessage(constantService.Info, 'EDP1002');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
	            	$("#inputMobileNo").focus();
	            	return false;
		        }
		        if (($('#inputPhoneNoRes').val().trim() != "") && (!constantService.regexForPhoneNo.test($('#inputPhoneNoRes').val()))) {
	            	messageService.showMessage(constantService.Info, 'EDP1004');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
	            	$("#inputPhoneNoRes").focus();
	            	return false;
		        }
		        if (($('#inputPhoneNoOffice').val().trim() != "") && (!constantService.regexForPhoneNo.test($('#inputPhoneNoOffice').val()))) {
	            	messageService.showMessage(constantService.Info, 'EDP1004');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
	            	$("#inputPhoneNoOffice").focus();
	            	return false;
		        }
		        //*********(2) Minimum Limit 
		        if (($('#inputMobileNo').val().trim().length < 11)) {
	            	messageService.showMessage(constantService.Info, 'EDP1001');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $("#inputMobileNo").focus();
		            return false;
		        }
		        if (($('#inputPhoneNoRes').val().trim() != "") && ($('#inputPhoneNoRes').val().trim().length < 6)) {
	            	messageService.showMessage(constantService.Info, 'EDP1003');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $("#inputPhoneNoRes").focus();
		            return false;
		        }
		        if (($('#inputPhoneNoOffice').val().trim() != "") && ($('#inputPhoneNoOffice').val().trim().length < 6)) {
	            	messageService.showMessage(constantService.Info, 'EDP1003');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $("#inputPhoneNoOffice").focus();
		            return false;
		        }
		        //****************** Email format *******************//
		        if (($('#inputEmail').val() != "") && (!constantService.regexForEmail.test($('#inputEmail').val()))) {
	            	messageService.showMessage(constantService.Info, 'EVE1000');
	            	$('#collapse_panelIPC_InputContactInformation').collapse('show');
		            $("#inputEmail").focus();
		            return false;
		        }
    		}
	    	else if(customerInfo.customerType == customerTypeComboList[1].ID 
	    			|| customerInfo.customerType == customerTypeComboList[2].ID 
	    			|| customerInfo.customerType == customerTypeComboList[3].ID)
    		{
	    		//****************** Input Mandatory Data *******************//
	    		if ($('#inputCustomerName').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputPersonalInformation').collapse('show');
		            $('#inputCustomerName').focus();
		            return false;
		        }
	    		if ($('#inputCustomerConcentration').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputPersonalInformation').collapse('show');
	            	$('#s2id_inputCustomerConcentration input').focus();
		            return false;
		        }
	    		if ($('#selectEstablishmentDate').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputPersonalInformation').collapse('show');
		            $('#selectEstablishmentDate').focus();
		            return false;
		        }
	    		if ($('#inputSector').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputPersonalInformation').collapse('show');
	            	$('#s2id_inputSector input').focus();
		            return false;
		        }
	    		if ($('#inputSectorType').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputPersonalInformation').collapse('show');
	            	$('#s2id_inputSectorType input').focus();
		            return false;
		        }
	    		if ($('#inputNatureOfOwnership').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputPersonalInformation').collapse('show');
	            	$('#s2id_inputNatureOfOwnership input').focus();
		            return false;
		        }
	    		if ($('#inputLegalFormNatureOfOwnershipCIB').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputPersonalInformation').collapse('show');
	            	$('#s2id_inputLegalFormNatureOfOwnershipCIB input').focus();
		            return false;
		        }
	    		if ($('#inputOrgTinNo').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputUniqueInformation').collapse('show');
		            $('#inputOrgTinNo').focus();
		            return false;
		        }
	    		if ($('#inputRegistrationDate').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputUniqueInformation').collapse('show');
		            $('#inputRegistrationDate').focus();
		            return false;
		        }
	    		if ($('#inputVatRegistrationNo').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputUniqueInformation').collapse('show');
		            $('#inputVatRegistrationNo').focus();
		            return false;
		        }
	    		if ($('#inputPtradeLicenseNo').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputUniqueInformation').collapse('show');
		            $('#inputPtradeLicenseNo').focus();
		            return false;
		        }
	    		if ($('#inputPtradeLicenseIssueDate').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputUniqueInformation').collapse('show');
		            $('#inputPtradeLicenseIssueDate').focus();
		            return false;
		        }
	    		if ($('#inputPtradeLicenseExpireDate').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputUniqueInformation').collapse('show');
		            $('#inputPtradeLicenseExpireDate').focus();
		            return false;
		        }
	    		if ($('#inputOrgAddressAdd1').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputContactInformation').collapse('show');
		            $('#inputOrgAddressAdd1').focus();
		            return false;
		        }
	    		if ($('#inputOrgAddressAdd2').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputContactInformation').collapse('show');
		            $('#inputOrgAddressAdd2').focus();
		            return false;
		        }
	    		if ($('#inputOrgAddressCity').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputContactInformation').collapse('show');
		            $('#s2id_inputOrgAddressCity').focus();
		            return false;
		        }
	    		if ($('#inputOrgAddressZipCode').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputContactInformation').collapse('show');
		            $('#inputOrgAddressZipCode').focus();
		            return false;
		        }
	    		if ($('#inputOrgAddressDist').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputContactInformation').collapse('show');
		            $('#s2id_inputOrgAddressDist input').focus();
		            return false;
		        }
	    		if ($('#inputOrgAddressThana').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputContactInformation').collapse('show');
		            $('#s2id_inputOrgAddressThana input').focus();
		            return false;
		        }
	    		if ($('#inputOrgAddressCountry').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputContactInformation').collapse('show');
	            	$('#s2id_inputOrgAddressCountry input').focus();
		            return false;
		        }
	    		if ($('#inputOrgPhone').val().trim() == "") {
	            	messageService.showMessage(constantService.Danger, 'RF1000');
	            	$('#collapse_panelOPSC_InputContactInformation').collapse('show');
		            $('#inputOrgPhone').focus();
		            return false;
		        }
	    		//****************** Phone Number *******************//
		        //*********(1) Number format
	    		if (($('#inputOrgPhone').val().trim() != "") && (!constantService.regexForPhoneNo.test($('#inputOrgPhone').val()))) {
	            	messageService.showMessage(constantService.Info, 'EDP1004');
	            	$('#collapse_panelOPSC_InputContactInformation').collapse('show');
	            	$("#inputOrgPhone").focus();
	            	return false;
		        }
	    		//*********(2) Minimum Limit (11 for now)
		        if (($('#inputOrgPhone').val().trim().length < 6)) {
	            	messageService.showMessage(constantService.Info, 'EDP1003');
	            	$('#collapse_panelOPSC_InputContactInformation').collapse('show');
		            $("#inputOrgPhone").focus();
		            return false;
		        }
    		}
	        return true;
	    };
	    
	    return {
	    	getASCustomerList : getASCustomerList,
	    	getBRCustomerList : getBRCustomerList,
	    	getBMCustomerList : getBMCustomerList,
	    	getBCCustomerList : getBCCustomerList,
	    	getAllCustomerList : getAllCustomerList,
	    	getCustomerBySearchText: getCustomerBySearchText,
	    	getCustomerInfoByCustomerID : getCustomerInfoByCustomerID,
	    	makeCustomerInfo : makeCustomerInfo,
	    	checkCustomerInfo : checkCustomerInfo,
	    	approveCustomerInfo : approveCustomerInfo,
	    	rejectCustomerInfo : rejectCustomerInfo,
	    	closeCustomerInfo : closeCustomerInfo,
	    	activeInactive : activeInactive,
	    	isValidForm : isValidForm
	    };   
	};
	
	 app.service('customerService', ['$rootScope', '$resource', '$q', 'constantService', 
         'messageService', 'configurationService', customerService]);
	
});

