
'use strict';

define(['app'], function (app) {

	var areaService = function ($rootScope, $resource, $q, constantService, messageService, configurationService) {
		
var outletAreaSaveResource, outletAreaGetResource, outletAreaUpdateResource, getOutletAreaInfoByID, saveOutletArea,
updateOutletArea, updateOutletAreaByAdmin, getAllOutletArea, updateOutletAreaStatus, delay, isValidForm;		
		
		outletAreaSaveResource = $resource(configurationService.outletAreaSave, {}, {
			saveOutletArea :	{ method: 'POST' }
	    });
		
		outletAreaGetResource = $resource(configurationService.outletAreaGet, {}, {
			getAllOutletArea:	{ method: 'POST' },
			getOutletAreaInfoByID:	{ method: 'POST' }
	    });
		
		outletAreaUpdateResource = $resource(configurationService.outletAreaUpdate, {}, {
			updateOutletArea:	{ method: 'POST' },
			updateOutletAreaByAdmin:	{ method: 'POST' },
			updateOutletAreaStatus:	{ method: 'POST' }
	    });
		
		
		this.saveOutletArea = function (obj) {
	        delay = $q.defer();
	        outletAreaSaveResource.saveOutletArea(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    this.updateOutletArea = function (obj) {
	    	delay = $q.defer();
	    	outletAreaUpdateResource.updateOutletArea(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    this.updateOutletAreaStatus = function (obj) {
	    	delay = $q.defer();
	    	outletAreaUpdateResource.updateOutletAreaStatus(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	   
	    this.updateOutletAreaByAdmin = function (obj) {
	    	delay = $q.defer();
	    	outletAreaUpdateResource.updateOutletAreaByAdmin(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    this.getOutletAreaInfoByID = function (obj) {
	    	delay = $q.defer();
	    	outletAreaGetResource.getOutletAreaInfoByID(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    this.getAllOutletArea = function (obj) {
	    	delay = $q.defer();
	    	outletAreaGetResource.getAllOutletArea(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    this.isValidForm = function (servicePoint) {
	    	if ($('#OutletAreaName').val() == undefined || $('#OutletAreaName').val() == null || $('#OutletAreaName').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#OutletAreaName').focus();
	            return false;
	        }
	        
	        if ($('#Description').val() == undefined || $('#Description').val() == null || $('#Description').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#Description').focus();
	            return false;
	        }
	        
	       /* if ($('#Status').val() == undefined || $('#Status').val() == null || $('#Status').val().trim() == "") {
	        	messageService.showMessage(constantService.Danger, 'RF1000');
	        	$('#Status').focus();
	        	return false;
	        }*/
	        return true;
	    };	
		
	};
	
	 app.service('areaService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService','configurationService', 
	                                 areaService]);
	
});


