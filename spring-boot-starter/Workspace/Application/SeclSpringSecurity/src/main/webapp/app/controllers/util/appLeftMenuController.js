
'use strict';

define(['app'], function (app) {
	var appLeftMenuController = function ($rootScope, $scope, $log,$location, $route, navigationService, configurationService, 
		localStorageService, constantService, authorizationService) {
		
		var userInfo, userRole;
		
		$scope.isBlockShow={};
		
		$scope.clickTopMenu = function(topmenu){
			
			if(constantService.menuDisable)
				return;
			
			var isActive = $("#"+topmenu.topmenuid).hasClass('active');
			if(topmenu.leftmenuids.length > 1)
			{
				if (isActive) 
			    {
					$("#"+topmenu.topmenuid).removeClass('active');
			        $("#"+topmenu.topmenuid).children('a').children("i.fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
			        $("#"+topmenu.topmenuid).children('ul.treeview-menu').slideUp("slow","swing");
		        } 
			    else 
			    {
			    	angular.forEach($scope.appTopMenus, function(itm, index) {
			    		//var isActive = $("#"+itm.topmenuid).hasClass('active');
						if($("#"+itm.topmenuid).hasClass('active')){
							$("#"+itm.topmenuid).removeClass('active');
							 $("#"+itm.topmenuid).children('a').children("i.fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
				            $("#"+itm.topmenuid).children('ul.treeview-menu').slideUp("slow","swing");
						}
		            });
	                
			    	
			    	$("#"+topmenu.topmenuid).addClass('active');
			        $("#"+topmenu.topmenuid).children('a').children("i.fa-angle-left").first().removeClass("fa-angle-left").addClass("fa-angle-down");
			        $("#"+topmenu.topmenuid).children('ul.treeview-menu').slideDown("slow","swing");
		        }
			}
			else 
			{
				angular.forEach($scope.appTopMenus, function(itm, index) {
		    		//var isActive = $("#"+itm.topmenuid).hasClass('active');
					if($("#"+itm.topmenuid).hasClass('active')){
						$("#"+itm.topmenuid).removeClass('active');
						 $("#"+itm.topmenuid).children('a').children("i.fa-angle-down").first().removeClass("fa-angle-down").addClass("fa-angle-left");
			            $("#"+itm.topmenuid).children('ul.treeview-menu').slideUp("slow","swing");
					}
	            });
				
				angular.forEach($rootScope.appTopMenus, function(itm, index) {
					/*if(itm.leftmenuids.length == 0){
						$("#"+itm.topmenuid).removeClass('active');
					}*/
					
					if(itm.leftmenuids.length == 1){
						$("#"+itm.topmenuid).removeClass('active');
					}
				});
				$("#"+topmenu.topmenuid).addClass('active');
				//navigationService.topMenuNavigation(topmenu.topmenuid);
				navigationService.topMenuNavigation(topmenu.leftmenuids[0]);
			}
			
		};
		
		$scope.clickLeftMenu = function(menuId) {
			
			if(constantService.menuDisable)
				return;
			
			$("#"+menuId).parent().find('li').each(function () {
		       $(this).removeClass('active');
		   });
		   $("#"+menuId).removeClass('active').addClass('active');
		   navigationService.menuNavigation(menuId);
		};
		
		
	    $scope.isActive = function (viewLocation) { 
	        return viewLocation === $location.path();
	    };
		
	 // on login role show hide left panel bank name and logo block
	    var onRoleSelect = function (){
	    	if($scope.userInfo.data.roleBean.roleID == "SA")
    		{
    		   $scope.isBlockShow.saUser = true;
    		}
    	    else
    		{
    		    $scope.isBlockShow.adminUser = true;
    		}
	    };
	    
	    var setMenuIcon = function () {
	    	
	    	for(var i=0; i<$scope.appTopMenus.length; i++)
			{
				if($scope.appTopMenus[i].topmenuid == 'Dashboard_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-dashboard';
				}
				else if($scope.appTopMenus[i].topmenuid == 'Bank_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-bold';
				}
				else if($scope.appTopMenus[i].topmenuid == 'Customer_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-user';
				}
				
				else if($scope.appTopMenus[i].topmenuid == 'Account_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-usd';
				}
				else if($scope.appTopMenus[i].topmenuid == 'ServicePoint_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-home';
				}
				else if($scope.appTopMenus[i].topmenuid == 'Agent_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-phone';
				}
				else if($scope.appTopMenus[i].topmenuid == 'ServiceTerminal_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-credit-card';
				}
				else if($scope.appTopMenus[i].topmenuid == 'AgentServiceStaff_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-plus';
				}
				else if($scope.appTopMenus[i].topmenuid == 'DstSalesTeam_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-th-large';
				}
				else if($scope.appTopMenus[i].topmenuid == 'Reports_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-list-alt';
				}
				else if($scope.appTopMenus[i].topmenuid == 'Transaction_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-transfer';
				}
				else if($scope.appTopMenus[i].topmenuid == 'Analytics_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-info-sign';
				}
				else if($scope.appTopMenus[i].topmenuid == 'Setting_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-wrench';
				}
				else if($scope.appTopMenus[i].topmenuid == 'Security_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-lock';
				}
				else if($scope.appTopMenus[i].topmenuid == 'Qrcard_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-qrcode';
				}
				else if($scope.appTopMenus[i].topmenuid == 'Role_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-registration-mark';
				}
				else if($scope.appTopMenus[i].topmenuid == 'Service_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-cloud';
				}
				else if($scope.appTopMenus[i].topmenuid == 'Bill_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-barcode';
				}
				else if($scope.appTopMenus[i].topmenuid == 'AreaZone_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-screenshot';
				}
				else if($scope.appTopMenus[i].topmenuid == 'SD_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-dashboard';
				}
				else if($scope.appTopMenus[i].topmenuid == 'Admin_TopMenu')
				{
					$scope.appTopMenus[i].cssClass = 'glyphicon glyphicon-briefcase';
				}
			}
			
	    };
	    
		var init = function () {			
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			
			if(userInfo == undefined || userInfo.data == undefined || userInfo.data == null){
				authorizationService.signOut();
				return;
			}
			$scope.logobankName = {bankName : userInfo.data.bankName}
			$scope.userInfo = userInfo;		
			
			$scope.appTopMenus = userInfo.data.roleBean.menuJSON;
			console.log($scope.appTopMenus);
			
			setMenuIcon();
			onRoleSelect();
	    }; 
	    
	    init();
		 
	 };    
	 
	 app.controller('appLeftMenuController', ['$rootScope', '$scope', '$log','$location', '$route', 'navigationService', 
         'configurationService', 'localStorageService','constantService', 'authorizationService', appLeftMenuController]);
	
});

