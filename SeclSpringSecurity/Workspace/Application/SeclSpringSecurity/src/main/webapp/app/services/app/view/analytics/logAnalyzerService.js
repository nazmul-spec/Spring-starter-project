
'use strict';

define(['app'], function (app) {

	var logAnalyzerService = function ($rootScope, $resource, $q, $cookieStore, constantService, configurationService) {
		
		var getDirInfo, logDirResource, getLogs, logResource, viewLog, logDetailsResource, delay;
		
		logDirResource = $resource(configurationService.getDirInfos, {}, {
			getDirInfo : 	{ method: 'POST' }
		});
		
		logResource = $resource(configurationService.getLogs, {}, {
			getLogs : 	{ method: 'POST' }
		});
		
		logDetailsResource = $resource(configurationService.viewLog, {}, {
			viewLog : 	{ method: 'POST' }
		});
		
		this.getDirInfo = function(obj) {
			delay = $q.defer();
			logDirResource.getDirInfo(obj,
					function(data) {
						delay.resolve(data);
					}, function() {
						delay.reject('Unable to fetch..');
					});
			return delay.promise;
		};
		
		this.getLogs = function(obj) {
			delay = $q.defer();
			logResource.getLogs(obj,
					function(data) {
						delay.resolve(data);
					}, function() {
						delay.reject('Unable to fetch..');
					});
			return delay.promise;
		};
		
		this.viewLog = function(obj) {
			delay = $q.defer();
			logDetailsResource.viewLog(obj,
					function(data) {
						delay.resolve(data);
					}, function() {
						delay.reject('Unable to fetch..');
					});
			return delay.promise;
		};
		
	};
	
	 app.service('logAnalyzerService', ['$rootScope', '$resource', '$q', '$cookieStore', 'constantService', 'configurationService', logAnalyzerService]);
	
});
