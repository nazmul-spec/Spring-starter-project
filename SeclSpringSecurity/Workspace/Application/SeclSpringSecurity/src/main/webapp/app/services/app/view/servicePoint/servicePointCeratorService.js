'use strict';

define(['app'], function (app) {

	var servicePointCeratorService = function ($rootScope, $resource, $q, constantService, messageService,
		configurationService) {		
		
		var servicePointResource , servicePointGetResource, servicePointUpdateResource, saveServicePoint, 
		updateServicePoint, getAllServicePoint, delay, isValidForm;		
		
		servicePointResource = $resource(configurationService.servicePointSave, {}, {
	    	saveServicePoint:	{ method: 'POST' }
	    });
		
		servicePointGetResource = $resource(configurationService.servicePointGet, {}, {
			getAllServicePoint:	{ method: 'POST' }
	    });
		
		servicePointUpdateResource = $resource(configurationService.servicePointUpdate, {}, {
	    	updateServicePoint:	{ method: 'POST' }
	    });
    
		saveServicePoint = function (obj) {
	        delay = $q.defer();
	        servicePointResource.saveServicePoint(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    updateServicePoint = function (obj) {
	    	delay = $q.defer();
	    	servicePointUpdateResource.updateServicePoint(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	   /* updateStatus = function (obj) {
			delay = $q.defer();
			servicePointGetResource.updateAgentStatus(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};*/
		
	    getAllServicePoint = function (obj) {
	    	delay = $q.defer();
	    	servicePointGetResource.getAllServicePoint(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    isValidForm = function (servicePoint) {
	        var regexForNumber = /^[0-9.]+$/;
	        var regex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/; // give 99.00%
	    		        
	        if ($('#Bank').val() == undefined || $('#Bank').val() == null || $('#Bank').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_Bank input').focus();
	            return false;
	        }
	        if  (servicePoint.branchID == undefined || servicePoint.branchID == null || servicePoint.branchID == '') {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_Branch input').focus();
	            return false;
	        }
	        if ($('#Agent').val() == undefined || $('#Agent').val() == null || $('#Agent').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_Agent input').focus();
	            return false;
	        }
	        if ($('#bankAccountNo').val() == undefined || $('#bankAccountNo').val() == null || $('#bankAccountNo').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_bankAccountNo input').focus();
	            return false;
	        }
	        if ($('#outletzone').val() == undefined || $('#outletzone').val() == null || $('#outletzone').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_outletzone input').focus();
	            return false;
	        }	       
	        if (servicePoint.outletTpID == undefined || servicePoint.outletTpID == null || servicePoint.outletTpID == '') {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_Transaction_Profile input').focus();
	            return false;
	        }
	        if ($('#ServicepointName').val() == undefined || $('#ServicepointName').val() == null || $('#ServicepointName').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	        	//messageService.showMessageText(constantService.Danger, 'Test messages fff');
	            $('#ServicepointName').focus();
	            return false;
	        }
	        
	        if ($('#AddressLine1').val() == undefined || $('#AddressLine1').val() == null || $('#AddressLine1').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#AddressLine1').focus();
	            return false;
	        }
	        
	        if ($('#Division').val() == undefined || $('#Division').val() == null || $('#Division').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
            	$('#s2id_Division input').focus();
	            return false;
	        }
	        
	        if ($('#District').val() == undefined || $('#District').val() == null || $('#District').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
            	$('#s2id_District input').focus();
	            return false;
	        }
	        
	        if ($('#Thana').val() == undefined || $('#Thana').val() == null || $('#Thana').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#s2id_Thana input').focus();
	            return false;
	        }
	        
	        if ($('#Telephone1').val() == undefined || $('#Telephone1').val() == null || ($('#Telephone1').val().trim() == "")) {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#Telephone1').focus();
	            return false;
	        }
	        
	        if ((!regexForNumber.test($('#Telephone1').val()))) {
            	messageService.showMessage(constantService.Danger, 'EDP1004');
	            $('#Telephone1').focus();
	            return false;
	        }
	        /*
	        if ($('#Telephone2').val() == undefined || $('#Telephone2').val() == null || ($('#Telephone2').val().trim() == "") || (!regexForNumber.test($('#Telephone2').val()))) {
            	messageService.showMessage(constantService.Danger, 'EDP1000');
            	$("#Telephone2").focus();
            	return false;
	        }*/
	        
	        if ($('#Email').val() != undefined && $('#Email').val() != null && ($('#Email').val() != "") && (!regex.test($('#Email').val()))) {
            	messageService.showMessage(constantService.Danger, 'EVE1000');
	            $("#Email").focus();
	            return false;
	        }
	        
	        if ($('#ApplyDate').val() == undefined || $('#ApplyDate').val() == null || $('#ApplyDate').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#ApplyDate').focus();
	            return false;
	        }
	        
	        return true;
	    };
	    
	    return {
	    	saveServicePoint : saveServicePoint,
	    	updateServicePoint : updateServicePoint,
	    	getAllServicePoint : getAllServicePoint,
	    	isValidForm : isValidForm
	    };
				
	};
	
	 app.service('servicePointCeratorService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService',
         'configurationService', servicePointCeratorService]);	
});

