
'use strict';

define(['app'], function (app) {
	
	var appHeaderController = function ($rootScope, $scope, localize, languageService, constantService, configurationService, 
		localStorageService, authorizationService, navigationService, newBranchService) {
		
		var userInfo, userRole; 
		
		$scope.userBranch = {};
		$scope.showBranch = false;
		
		var loadBranchInformation = function () {
			$scope.userBranch.branchID = userInfo.data.branchID;
			$scope.userBranch.operationType = constantService.Branch;
	    	var promisBranchInfo = newBranchService.getBranchInfoByID($scope.userBranch);
	    	promisBranchInfo.then(function(data) {
	        	if (!data.success) {
	        		messageService.showMessage(constantService.Danger, data.message);
	                return;
	            }
	        	$scope.userBranch = data.data;
	        	$scope.showBranch = true;
	        });
	    };

        $scope.collapseAppLeftMenu = function () {
        	$rootScope.layout.leftPanel.isVisible = !$rootScope.layout.leftPanel.isVisible;
        	$rootScope.isMobile = !$rootScope.isMobile;
        };

		$scope.signOut = function () {			
			if($rootScope.user !== undefined && $rootScope.user !== null)
				authorizationService.signOut($rootScope.user.trailID);
		};		
		
		$scope.chooseLanguage = function () {
			
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			
			if (userInfo.selectedLanguage == constantService.English) 
			{
				localize.setLanguage('bn-BD');
				$rootScope.showLanguage = constantService.English;
				userInfo.selectedLanguage = constantService.Bangla;
			}
			else 
			{
				localize.setLanguage('en-US');
				$rootScope.showLanguage = constantService.Bangla;
				userInfo.selectedLanguage = constantService.English;
			}
			localStorageService.setValue(configurationService.loginCookieStoreKey, userInfo);
			languageService.languageChange();
		};
		
		$scope.goProfile = function () {
			if(constantService.menuDisable)
				return;
			navigationService.menuNavigation('Profile');
		};
		
		var init = function(){
			
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo == undefined || userInfo.data == undefined || userInfo.data == null){
				authorizationService.signOut();
				return;
			}
			userRole = userInfo.data.roleBean.roleDescription;
			$scope.userLoginId = userInfo.data.loginId;
			$scope.role = userRole.replace(" Role","");
			
			if (userInfo.selectedLanguage == constantService.English) 
			{				
				localize.setLanguage('en-US');
				$rootScope.showLanguage = constantService.Bangla;
			}
			else
			{
				localize.setLanguage('bn-BD');
				$rootScope.showLanguage = constantService.English;
			}
			
			if(userInfo.data.branchID != undefined && userInfo.data.branchID != null && userInfo.data.branchID != ""){
				loadBranchInformation();
			}			
		};
		
		init();
			 
    };

    app.controller('appHeaderController', ['$rootScope', '$scope', 'localize', 'languageService', 'constantService', 
    'configurationService', 'localStorageService', 'authorizationService', 'navigationService', 'newBranchService', appHeaderController]);
   
	
});














