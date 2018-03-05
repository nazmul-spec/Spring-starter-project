
'use strict';

define(['app'], function (app) {

	var auditLogService = function ($rootScope, $resource, $q, $cookieStore, constantService, configurationService) {
		
		var getAllAuditlogInfo, getAuditlogInfoByID, auditLogResource, delay;
		
		auditLogResource = $resource(configurationService.auditLogData, {}, {
			getAllAuditlogInfo : 	{ method: 'POST' },
			getAuditlogInfoByID : 	{ method: 'POST' }
		});
		
		this.getAuditlogInfoByID = function(obj) {
			delay = $q.defer();
			auditLogResource.getAuditlogInfoByID(obj,
					function(data) {
						delay.resolve(data);
					}, function() {
						delay.reject('Unable to fetch..');
					});
			return delay.promise;
		};
		
		this.getAllAuditlogInfo = function(obj) {
			delay = $q.defer();
			auditLogResource.getAllAuditlogInfo(obj,
					function(data) {
						delay.resolve(data);
					}, function() {
						delay.reject('Unable to fetch..');
					});
			return delay.promise;
		};
				
		
	};
	
	 app.service('auditLogService', ['$rootScope', '$resource', '$q', '$cookieStore', 'constantService', 'configurationService', auditLogService]);
	
});
