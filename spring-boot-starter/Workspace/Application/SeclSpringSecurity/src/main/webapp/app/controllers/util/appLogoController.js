
'use strict';

define(['app'], function (app) {
	
	var appLogoController = function ($rootScope, $scope, constantService, configurationService, localStorageService, 
		navigationService, authorizationService) {
		
		var userInfo, homePage;
		
		$scope.goToHomePage = function () {
			if(constantService.menuDisable)
				return;
			navigationService.menuNavigation(homePage);
		};
		
		var init = function () {
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo == undefined || userInfo.data == undefined || userInfo.data == null){
				authorizationService.signOut();
				return;
			}
			homePage = userInfo.data.roleBean.menuJSON[0].leftmenuids[0];
	    }; 
	    
	    init();			 
    };

    app.controller('appLogoController', ['$rootScope', '$scope', 'constantService', 'configurationService', 'localStorageService', 
         'navigationService', 'authorizationService' , appLogoController]);
   
	
});














