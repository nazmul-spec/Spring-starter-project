
'use strict';

define(['app'], function (app) {

	var zoneService = function ($rootScope, $resource, $q, constantService, messageService, configurationService) {
		
var outletZoneSaveResource, outletZoneGetResource, outletZoneUpdateResource, getoutletZoneInfoByID, saveOutletZone,
updateOutletZone, updateOutletZoneByAdmin, getAllOutletZone, updateOutletZoneStatus, delay, isValidForm;		
		
		outletZoneSaveResource = $resource(configurationService.outletZoneSave, {}, {
			saveOutletZone :	{ method: 'POST' }
	    });
		
		outletZoneGetResource = $resource(configurationService.outletZoneGet, {}, {
			getAllOutletZone:	{ method: 'POST' },
			getOutletZoneInfoByID:	{ method: 'POST' }
	    });
		
		outletZoneUpdateResource = $resource(configurationService.outletZoneUpdate, {}, {
			updateOutletZone:	{ method: 'POST' },
			updateOutletZoneByAdmin:	{ method: 'POST' },
			updateOutletZoneStatus:	{ method: 'POST' }
	    });
		
		
		this.saveOutletZone = function (obj) {
	        delay = $q.defer();
	        outletZoneSaveResource.saveOutletZone(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    this.updateOutletZone = function (obj) {
	    	delay = $q.defer();
	    	outletZoneUpdateResource.updateOutletZone(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    this.updateOutletZoneStatus = function (obj) {
	    	delay = $q.defer();
	    	outletZoneUpdateResource.updateOutletZoneStatus(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	   
	    this.updateOutletZoneByAdmin = function (obj) {
	    	delay = $q.defer();
	    	outletZoneUpdateResource.updateOutletZoneByAdmin(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    this.getOutletZoneInfoByID = function (obj) {
	    	delay = $q.defer();
	    	outletZoneGetResource.getOutletZoneInfoByID(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    this.getAllOutletZone = function (obj) {
	    	delay = $q.defer();
	    	outletZoneGetResource.getAllOutletZone(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
	    this.isValidForm = function (servicePoint) {
	    	if ($('#Outlet_ZoneName').val() == undefined || $('#Outlet_ZoneName').val() == null || $('#Outlet_ZoneName').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#Outlet_ZoneName').focus();
	            return false;
	        }
	        
	        if ($('#Description').val() == undefined || $('#Description').val() == null || $('#Description').val().trim() == "") {
            	messageService.showMessage(constantService.Danger, 'RF1000');
	            $('#Description').focus();
	            return false;
	        }
	        
	       if ($('#OutletAreaName').val() == undefined || $('#OutletAreaName').val() == null || $('#OutletAreaName').val().trim() == "") {
	        	messageService.showMessage(constantService.Danger, 'RF1000');
	        	$('#OutletAreaName').focus();
	        	return false;
	        }
	        return true;
	    };	
		
	};
	
	 app.service('zoneService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService','configurationService', 
	                             zoneService]);
	
});


