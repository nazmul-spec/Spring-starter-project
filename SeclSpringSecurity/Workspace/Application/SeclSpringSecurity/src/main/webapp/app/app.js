
'use strict';

define(['services/utils/routeResolver'], function () {

	var app = angular.module('csbBankingApp', ['localization', 'ngRoute', 'ngAnimate', 'ngResource', 'ngCookies', 'angularjs-dropdown-multiselect', 'hljs', 'ui.calendar', 
	'ui.bootstrap', 'ui', "ui.checkbox", 'highcharts-ng', 'ngTable', 'routeResolverServices', 'underscore', 'ngProgress', 'ngPrettyJson']);

	app.run(['$rootScope', '$route', '$http', '$location', '$timeout', '$document', '$cookieStore', 'localize', 'constantService', 'configurationService',
         'localStorageService', 'authorizationService', 'navigationService',
         function ($rootScope, $route, $http, $location, $timeout, $document, $cookieStore, localize, constantService, configurationService,
		 localStorageService, authorizationService, navigationService) {
	
		  /*START AUTO SIGNOUT AFTER CERTAIN TIME  */
		  var min=1000*60;
	      var TimeOutTimerValue =min*10;
	      var TimeOut_Thread = $timeout(function(){ LogoutByTimer() } , TimeOutTimerValue);
	      var bodyElement = angular.element($document);

	      angular.forEach(['keydown', 'keyup', 'click', 'mousemove', 'DOMMouseScroll', 'mousewheel', 'mousedown', 'touchstart', 'touchmove', 'scroll', 'focus'], 
	      function(EventName) {
	           bodyElement.bind(EventName, function (e) { TimeOut_Resetter(e) });  
	      });
	      function LogoutByTimer(){		        
	             $location.path('/');
	      }
	      function TimeOut_Resetter(e){
	          $timeout.cancel(TimeOut_Thread);
	          TimeOut_Thread = $timeout(function(){ LogoutByTimer() } , TimeOutTimerValue);
	      }
	     /*END AUTO SIGNOUT AFTER CERTAIN TIME  */  
		
		var userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
		$rootScope.isMobile = false;
		$rootScope.messagePageLocation = 'app/partials/message.html';
		$rootScope.modalMessagePageLocation = 'app/partials/modalMessage.html';
		$rootScope.bankLogoPath = configurationService.logoName;
		
		//******* Language *********//
		localize.setLanguage('en-US');
		$rootScope.showLanguage = constantService.Bangla;
		
		$rootScope.history = [];
		$rootScope.currPage = "";
		$rootScope.originalPath = "";
		
		$rootScope.$on("$routeChangeStart", function (oldPath, newPath) {
			
	        if (newPath.$$route == undefined || newPath.$$route.isWeb) {
	        	$rootScope.history = [];
	        	$rootScope.currPage = "";
	    		$rootScope.originalPath = "";
	        	localize.setLanguage('en-US');
	    		$rootScope.showLanguage = constantService.Bangla;
	            $rootScope.layout = constantService.getWebLayout();
	            return;
	        }
	        else{
	        	userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
	        	if(userInfo === undefined){
		        	authorizationService.signOut();
		        	return;
		        }
	        	$rootScope.layout = constantService.getAppLayout();
	        	$rootScope.currLeftMenuId = newPath.$$route.leftMenuId;
	        	$rootScope.currTopMenuId = newPath.$$route.menuId;
	        	
	        	$rootScope.history.push($location.$$path);
	        	if($rootScope.history.length < 2)
        		{
	        		$rootScope.currPage = $rootScope.history[$rootScope.history.length-1].substring(1, $rootScope.history[$rootScope.history.length-1].length);
	    	        $rootScope.originalPath = $rootScope.history[$rootScope.history.length-1].substring(1, $rootScope.history[$rootScope.history.length-1].length);			
        		}
	        	else
	        	{
	        		$rootScope.currPage = $rootScope.history[$rootScope.history.length-2].substring(1, $rootScope.history[$rootScope.history.length-2].length);
	    	        $rootScope.originalPath = $rootScope.history[$rootScope.history.length-1].substring(1, $rootScope.history[$rootScope.history.length-1].length);			
	        	}
	        }
	        userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
	        if(userInfo === undefined){
	        	authorizationService.signOut();
	        	return;
	        }
	        if(!authorizationService.authorizeLeftMenu(newPath.$$route.leftMenuId)){

        		if($rootScope.history.length < 2)
    			{
        			authorizationService.signOut();        			    			
    			}
        		else
    			{
        			$rootScope.history.pop();
        			$rootScope.history.pop(); 
        			navigationService.menuNavigation($rootScope.currPage);
    			}
        			
	        	return;
	        }
	        
	        /* Try getting valid user from cookie or go to login page */
	        $rootScope.originalPath = $rootScope.history[$rootScope.history.length-1].substring(1, $rootScope.history[$rootScope.history.length-1].length);
			if (userInfo !== undefined && userInfo !== null) {
				$rootScope.user = userInfo;
				$http.defaults.headers.common['X-Auth-Token'] = userInfo.token;				
				navigationService.menuNavigation($rootScope.originalPath);
				
				if (userInfo.selectedLanguage == constantService.English) {
		        	localize.setLanguage('en-US');
		            $rootScope.showLanguage = constantService.Bangla;
		        }
		        else 
		        {
		            localize.setLanguage('bn-BD');
		            $rootScope.showLanguage = constantService.English;
		        }
			}
	    });
		
		$rootScope.hasRole = function(role) {
			if (userInfo === undefined) {
				return false;
			}
			
			if (userInfo.roles[role] === undefined) {
				return false;
			}
			
			return userInfo.roles[role];
		};
		
		$rootScope.hasAnyRole = function(roleArray) {
			if (userInfo === undefined) {
				return false;
			}
			
			for (var role in roleArray) { 
				if (userInfo.roles[roleArray[role]] !== undefined) {
					return true;
				}
			}
			
			return false;
		};
		 
    
	}]); 

	app.config(['$routeProvider','routeResolverProvider','$controllerProvider', '$compileProvider',
            '$filterProvider', '$provide', '$locationProvider', '$httpProvider', 
	         function ($routeProvider,routeResolverProvider, $controllerProvider, $compileProvider,
	        	$filterProvider, $provide, $locationProvider, $httpProvider){
    
		app.register =
	    {
	        controller: $controllerProvider.register,
	        //directive: $compileProvider.directive,
	        filter: $filterProvider.register,
	        //factory: $provide.factory,
	        //service: $provide.service
	    };
		
		// Provider-based service.
        app.service = function( name, constructor ) {
            $provide.service( name, constructor );
            return( this );
        };
        
        // Provider-based factory.
        app.factory = function( name, factory ) {
            $provide.factory( name, factory );
            return( this );
        };
        
        // Provider-based directive.
        app.directive = function( name, factory ) {
            $compileProvider.directive( name, factory );
            return( this );
        };
     
		var route = routeResolverProvider.route;
		var rel = routeResolverProvider.route.resolve;
		$routeProvider
																										//page and controller name prefix,	 dir path, 								menuId, 					leftMenuId, 									title, 													isWeb
		.when	('/', 																	route.resolve	('signin', 							'security/',							'NAN',						'NAN',											'Signin', 												true))
		.when	('/signinResetPassword/:actiontype/:oid', 								route.resolve	('signinResetPassword', 			'security/', 							'NAN', 						'NAN', 											'Reset Password', 										false))
		.when	('/Profile', 															route.resolve	('profile', 						'security/', 							'Profile', 					'Profile', 										'Profile', 												false))

		.when	('/Dashboard_DashboardAdmin', 											route.resolve	('dashboardAdmin', 					'app/dashboard/', 						'Dashboard_TopMenu', 		'Dashboard_DashboardAdmin', 					'Admin Dashboard', 										false))
		.when	('/Dashboard_DashboardSA', 												route.resolve	('dashboardSA', 					'app/dashboard/', 						'Dashboard_TopMenu', 		'Dashboard_DashboardSA', 						'SA Dashboard', 										false))
		.when	('/User_admin', 														route.resolve	('userAdmin', 					    'app/dashboard/', 						'Admin_TopMenu', 		    'User_admin', 									'User', 										        false))

		
        .otherwise({ redirectTo: '/' });
		
		var interceptor = function ($rootScope, $q, $location, $injector, $cookieStore, $window, localStorageService, configurationService) {
	        function success(response) {
	            return response;
	        }
	
	        function error(response) {
	            var status = response.status;
	            var config = response.config;
	            var method = config.method;
	            var url = config.url;
	
	            if (status == 401 || status == 403) {
	            	delete $rootScope.user;
	        		delete $injector.get('$http').defaults.headers.common['X-Auth-Token'];
	        		//$cookieStore.remove('user');
	                // localStorageService.setValue(configurationService.loginCookieStoreKey, null);
	                localStorageService.removeValue(configurationService.loginCookieStoreKey);
	            	$location.path( "/" );
	            	
	            	$window.location.reload();
	            } else {
	            	$rootScope.error = method + " on " + url + " failed with status " + status;
	            }
	            
	            return $q.reject(response);
	        }
	
	        return function (promise) {
	            return promise.then(success, error);
	        };
	    };
	    $httpProvider.responseInterceptors.push(interceptor);
	    
	}]);

	return app;

});



    
    
    
    
    