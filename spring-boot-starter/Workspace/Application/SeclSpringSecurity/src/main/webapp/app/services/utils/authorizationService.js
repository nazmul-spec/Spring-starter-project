
'use strict';

define(['app', 'services/utils/configurationService', 'services/utils/navigationService',
        'services/utils/languageService', 'services/utils/localStorageService'], function (app) {

	var authorizationService = function ($location, $rootScope, $route, $window, $http, $cookieStore, $resource, $q,
			configurationService, navigationService, languageService, localStorageService,constantJSON, constantService, localize) {

		var signOutResource, delay;

		signOutResource = $resource(configurationService.logout, {}, {
			signout: { method: 'POST' }
		});

		this.setLoginInfo = function (data) {
			$rootScope.loginInfo = data;
		};

		this.getLoginInfo = function () {
			return $rootScope.loginInfo;
		};

		$rootScope.isLoggedIn = function () {
			return ($rootScope.loginInfo != null);
		};

		this.signOut = function (obj) {

			delete $rootScope.user;
			delete $http.defaults.headers.common['X-Auth-Token'];
			
			$rootScope.history = [];
        	$rootScope.currPage = "";
    		$rootScope.originalPath = "";
        	localize.setLanguage('en-US');
    		$rootScope.showLanguage = constantService.Bangla;
            $rootScope.layout = constantService.getWebLayout();

			localStorageService.setValue(configurationService.loginCookieStoreKey, null);
			$location.path('/');

			delay = $q.defer();
			signOutResource.signout(obj, function (data) {
				delay.resolve(data);

			}, function () {
				delay.reject('Unable to fetch..');
			}); 	   

			return delay.promise;    	   

		};

		this.authorizeLeftMenu = function (leftMenuId) {

			var adlMenu = null;
			var userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			
			if(userInfo == undefined || userInfo == null || userInfo == '')
				return false;
			
			var userRole = userInfo.data.roleBean;
			var menuJson = userRole.menuJSON;
			for (var topMenuIndex = 0; topMenuIndex < menuJson.length; topMenuIndex++) {
				var leftMenuList = menuJson[topMenuIndex].leftmenuids;
				for (var leftMenuIndex = 0; leftMenuIndex < leftMenuList.length; leftMenuIndex++) {
					if (leftMenuId == leftMenuList[leftMenuIndex]) {
						return true;
					}
				}
			}    

			if (userRole.roleID === 'SA') {
				adlMenu = constantJSON.saAdlMenu;
			}
			else  if (userRole.roleID === 'Admin') {
				adlMenu = constantJSON.adAdlMenu;
			}
			else  if (userRole.roleID === 'Admin.Maker') {
            	adlMenu = constantJSON.adminMakerAdAdlMenu;
			}
            else  if (userRole.roleID === 'Admin.Approver') {
            	adlMenu = constantJSON.adminApproverAdAdlMenu;
			}
			else  if (userRole.roleID === 'Branch.Manager') {
				adlMenu = constantJSON.branchManagerAdlMenu;
			}
			else  if (userRole.roleID === 'Branch.Officer') {
				adlMenu = constantJSON.branchOfficerAdlMenu;
			}
			else  if (userRole.roleID === 'Branch.OfficerMaker') {
				adlMenu = constantJSON.branchOfficerMakerAdlMenu;
			}
			else  if (userRole.roleID === 'Branch.OfficerChecker') {
				adlMenu = constantJSON.branchOfficerCheckerAdlMenu;
			}
			else  if (userRole.roleID === 'Branch.OfficerApprover') {
				adlMenu = constantJSON.branchOfficerApproverAdlMenu;
			}
			else  if (userRole.roleID === 'ABD.SYS.Maker') {
				adlMenu = constantJSON.adbSysMakerAdlMenu;
			}
			else  if (userRole.roleID === 'ABD.SYS.Checker') {
				adlMenu = constantJSON.adbSysApproverAdlMenu;
			}
			else  if (userRole.roleID === 'ABD.Maker') {
				adlMenu = constantJSON.adbMakerAdlMenu;
			}
			else  if (userRole.roleID === 'ABD.Checker') {
				adlMenu = constantJSON.adbCheckerAdlMenu;
			}
			else  {
				adlMenu = constantJSON.agentManagerAdlMenu;
			}

			for (var topMenuIndex = 0; topMenuIndex < adlMenu.length; topMenuIndex++) {
				var adlLeftMenu = adlMenu[topMenuIndex].leftmenuids;
				for (var adlleftMenuIndex = 0; adlleftMenuIndex < adlLeftMenu.length; adlleftMenuIndex++) {
					if (leftMenuId == adlLeftMenu[adlleftMenuIndex]) {
						return true;
					}
				}
			}
			return false;
		};

		this.signIn = function (data) {
			this.setLoginInfo(data);
		};

		this.setAccessPageInfo = function (data) {
			$rootScope.accessPageInfo = data;
		};

		this.getAccessPageInfo = function () {
			return $rootScope.accessPageInfo;
		};

	};

	app.service('authorizationService', ['$location', '$rootScope', '$route', '$window', '$http', '$cookieStore', '$resource', '$q', 
	                                     'configurationService', 'navigationService', 'languageService', 'localStorageService','constantJSON',
	                                     'constantService', 'localize', authorizationService]);

});
