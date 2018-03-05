
'use strict';

define(['app'], function (app) {
	
	var webFooterController = function ($rootScope, $scope, localize, languageService, constantService,
			configurationService, localStorageService, authorizationService) {
		
		
	    $scope.version = configurationService.version;
		
		var init = function(){
			
			
		};
		
		init();
			 
    };

    app.controller('webFooterController', ['$rootScope', '$scope', 'localize', 'languageService', 'constantService', 
    'configurationService', 'localStorageService', 'authorizationService', webFooterController]);
   
	
});














