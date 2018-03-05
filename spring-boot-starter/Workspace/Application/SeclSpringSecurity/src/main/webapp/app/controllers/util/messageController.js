
'use strict';

define(['app'], function (app) {
    
	 var messageController = function ($rootScope, $scope, $timeout, constantService, configurationService) {
		 
		 $scope.alerts = [];
		 $scope.modalAlerts = [];
		 var messageTimeout = configurationService.messageTimeout;
		 var promise; 
		 
		 $scope.closeMessage = function() {
			 $scope.alerts.splice(0, 1);
			 if(promise != undefined){
				 $timeout.cancel(promise);
			 }
		 };
		 
		 $scope.$on(constantService.AlertMessage, function (event, messageObj) {
			 $scope.alerts = [];
			 $scope.alerts.push(messageObj);
	         promise = $timeout(function() {
	        	 $scope.closeMessage();
			 }, messageTimeout);
		 });
		 
		 $scope.closeModalMessage = function() {
			 $scope.modalAlerts.splice(0, 1);
			 if(promise != undefined){
				 $timeout.cancel(promise);
			 }
		 };
		 
		 $scope.$on(constantService.AlertModalMessage, function (event, messageObj) {
			 $scope.modalAlerts = [];
			 $scope.modalAlerts.push(messageObj);
	         promise = $timeout(function() {
	        	 $scope.closeModalMessage();
			 }, messageTimeout);
		 });

		 
		 var init = function () {
			 
		 };

		 init();
       
		 
    };

    app.controller('messageController', ['$rootScope', '$scope', '$timeout', 'constantService', 'configurationService', messageController]);
   
	
});


