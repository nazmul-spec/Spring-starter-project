
'use strict';

define(['app'], function (app) {
	
	var signinController = function ($rootScope, $scope, _, $log, $timeout, $http, $cookieStore,  signInService, navigationService, 
		localStorageService, configurationService, constantService, messageService, localize) {
		
		var userInfo, promis;
		$scope.user = { loginId : 'Admin', password : 'admin123' };
		
		 
		$scope.signIn = function (login) {
			console.log(login);
			if(login == null){
				return;
			}
			
			login.operationType = constantService.userlogin;
			promis = signInService.doSignIn(login);
			
			promis.then(function (data) {
				if (!data.success) {
					if(data.message == 'Password Not Valid!'){
						messageService.showMessage(constantService.Danger, 'Ivp1000');
					}
					else if(data.message == 'Login ID Not Valid!'){
						messageService.showMessage(constantService.Danger, 'Ivp1000');
					}
					else if(data.message == 'Login ID Not Active!'){
						messageService.showMessage(constantService.Danger, 'Ivl1001');
					}
					else if(data.message == 'An Agent!'){
						messageService.showMessage(constantService.Danger, 'Ivl1002');
					}
					else if(data.message == 'BLOCK_ID'){
						messageService.showMessage(constantService.Danger, 'BKID100');
					}
					else if(data.message == 'BLOCK_IP'){
						messageService.showMessage(constantService.Danger, 'BKIP100');
					}
					else if(data.message == 'INBR'){
						messageService.showMessage(constantService.Danger, 'BIA1000');
					}
					return;
				}
				
				data.selectedLanguage = constantService.English;
				localStorageService.setValue(configurationService.loginCookieStoreKey, data);
				
				userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
				
				/*if(userInfo.data.loginId != userInfo.data.changedBy && userInfo.data.resetRequired == "Y")
				{
					constantService.menuDisable = true;
					navigationService.menuNavigation('signinResetPassword' + '/' + constantService.resetPassword + '/' + userInfo.data.loginId);				
				}*/
			/*	else
				{
					constantService.menuDisable = false;
					navigationService.menuNavigation(data.data.roleBean.menuJSON[0].leftmenuids[0]);				
				}*/
				constantService.menuDisable = false;
				navigationService.menuNavigation(data.data.roleBean.menuJSON[0].leftmenuids[0]);
				
			});
		};
		
		
		var load = function () {
			delete $rootScope.user;
			delete $http.defaults.headers.common['X-Auth-Token'];
			
			$rootScope.history = [];
        	$rootScope.currPage = "";
    		$rootScope.originalPath = "";
        	localize.setLanguage('en-US');
    		$rootScope.showLanguage = constantService.Bangla;
            $rootScope.layout = constantService.getWebLayout();

			localStorageService.setValue(configurationService.loginCookieStoreKey, null);		
		}
		load();
	
 	};
 	
 	 	
    app.register.controller('signinController', ['$rootScope', '$scope', '_','$log', '$timeout', '$http', '$cookieStore',  
        'signInService', 'navigationService', 'localStorageService', 'configurationService','constantService', 
        'messageService', 'localize', signinController]);
   
	
});

