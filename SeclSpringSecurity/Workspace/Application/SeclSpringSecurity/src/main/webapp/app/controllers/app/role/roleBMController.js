
'use strict';

define(['app'], function (app) {

	var roleBMController = function ($rootScope, $scope, $routeParams, $timeout,  comboService , localStorageService, 
			loadService, navigationService, configurationService, constantService, roleService, modalService, messageService,  ngProgress) {

		var userInfo, promis, terminal;
		$scope.role = {};
		$scope.btn_save_up = "btn_Make";
		$scope.title = {value: "Role_BM"};
		$scope.isShow = { resetButton: true};
		$scope.isCancle = { cancleButton: false};
		$scope.terminal = {};
		$scope.newJson  = [];
		$scope.action = "";
		$scope.cancelReasonTF = false;
		$scope.isFieldDisabled = true;

		$scope.saveOrUpdate = function(role, menuConvert){
			if (!roleService.isValidForm(role)) {
				return; 
			}

			 var strMenuJson = JSON.stringify(menuConvert); 
			 
			 var newMenuJson = new Array(menuConvert.length);
			 for(var i = 0; i < menuConvert.length; ++i){
	    		var tempLeftmenuids = [];
		    	for(var j = 0; j < menuConvert[i].leftmenuids.length; ++j){
		    		var tempLeftmenu = menuConvert[i].leftmenuids[j].leftmenuID;
		    		var tempvalue = menuConvert[i].leftmenuids[j].value;
		    		if(tempvalue){
		    			tempLeftmenuids.push(tempLeftmenu);
		    		}
		    	}
		    	if(tempLeftmenuids.length > 0){
					newMenuJson[i] = {"topmenuid" : menuConvert[i].topmenuid};
		    		newMenuJson[i]["leftmenuids"] = tempLeftmenuids;
		    	}
			 }
			 var spliceKey = 0;
			 for(var k = 0; k < menuConvert.length; ++k){
				 if(newMenuJson[k] == null){
					 newMenuJson.splice((k-spliceKey), 1);
					 spliceKey += 1;
				 }
			 }
			var strMenuJson = JSON.stringify(newMenuJson); 
			
			loadService.showDialog();
			role.status = constantService.BANK_ACTIVE_S;
			role.strMenuJSON = strMenuJson;
			role.rejectionCause = "";
			role.makerID = userInfo.data.loginId;
			role.changedBy = userInfo.data.loginId;

			// check is update or save
			if($scope.action == constantService.Update){
				role.operationType = constantService.UPDATE;
				role.rejectionCause = ""; //rejection Cause when created by Maker
				ngProgress.start();
				promis = roleService.updateRoleService(role);
			}else{
				role.operationType = constantService.ADD;
				ngProgress.start();
				 
				promis = roleService.saveRoleService(role);
			}

			promis.then(function(data) {
				if (!data.success) {
					ngProgress.complete();
					loadService.hideDialog();
					messageService.showMessage(constantService.Danger, data.message);							
					return;
				};
				ngProgress.complete();
				loadService.hideDialog();
				navigationService.goToTop();
				messageService.showMessage(constantService.Success, data.message);	
				if($routeParams.actiontype == constantService.Add)
				{
					$scope.reset();
				}
				else if($routeParams.actiontype == constantService.Update)
				{
					$timeout( function(){ 
						$scope.goBack();  
					}, 3000);
				}
			});
		};

		// set Role, and operationType for update get Role info by roleID
		$scope.getRoleInfoByID = function () {
			loadService.showDialog();
			var param = { 
					operationType: constantService.SELECT_BY_ID,
					roleID: $routeParams.oid
			};
			var promisRoleInfo = roleService.getRoleInfoByID(param);
			promisRoleInfo.then(function(data) {
				ngProgress.complete();
				loadService.hideDialog();
				if (!data.success) {
					console.log(constantService.ComboFailMessage + ":" + constantService.AgentInfo);
					return;
				}
				$scope.statusInfos = [{ id: "BM", value: "Entered/ Edited" },
				                      { id: "BR", value: "Rejected" }];
				$scope.role = data.data;
				getAllTopMenu($scope.role);
				
			});
		};
		
		var getAllTopMenu =  function (role) {
			loadService.showDialog();
			var roleObj = { 
					operationType : constantService.GET_ALL_TOP_MENU		
			};

			promis = roleService.getAllTopMenu(roleObj);
			promis.then(function (data) {  
				ngProgress.complete();
				loadService.hideDialog();          	
				if (!data.success) { 
					resetData();  //rest pagination and blank data when data not found
					return;
				}
			$scope.allMenu = data.data;
			$scope.menuConvert = [];
			    for (var i = 0; i < $scope.allMenu.length; ++i){
			    	if ($scope.allMenu[i] !== undefined && $scope.allMenu[i] !== null ){
			        	if($scope.menuConvert.length > 0){
			        		var duplicateTopMenu = false;
				        	for(var j = 0; j < $scope.menuConvert.length; ++j){
				        		if($scope.allMenu[i].topMenuResourceID == $scope.menuConvert[j].topmenuid){
				        			duplicateTopMenu = true;
				        		}
				        	}
				        	if(!duplicateTopMenu){
				        		$scope.menuConvert.push({"topmenuid":$scope.allMenu[i].topMenuResourceID, "leftmenuids":[]})
				        	}
			        	}
				        	else{
				        		$scope.menuConvert.push({"topmenuid":$scope.allMenu[i].topMenuResourceID, "leftmenuids":[]})
				        	}
			        }
			    }
			    
			    for(var i = 0; i < $scope.allMenu.length; ++i){
			    	for(var j = 0; j < $scope.menuConvert.length; ++j){
			    		if($scope.menuConvert[j].topmenuid == $scope.allMenu[i].topMenuResourceID){
			    			$scope.menuConvert[j].leftmenuids.push({'leftmenuID' : $scope.allMenu[i].leftMenuResourceID});
			    		}
			    	}
			    }
			    
			    var myJson = JSON.parse(role.strMenuJson);
			    for(var i = 0; i < $scope.menuConvert.length; ++i){
			    	for(var j = 0; j < myJson.length; ++j){
			    		if($scope.menuConvert[i].topmenuid == myJson[j].topmenuid){
			    			$scope.menuConvert[i].value = true;
			    			
			    			for(var k = 0; k < $scope.menuConvert[i].leftmenuids.length; ++k){
			    				for(var l = 0; l < myJson[j].leftmenuids.length; ++l){
			    					if($scope.menuConvert[i].leftmenuids[k].leftmenuID == myJson[j].leftmenuids[l]){
			    						$scope.menuConvert[i].leftmenuids[k].value = true;
			    					}
			    				}
			    			}
			    		}
			    	}
			    }
			});
		};
		$scope.reset = function () {
		
		};
		$scope.goBack = function(){
			navigationService.menuNavigation('Role_BM');
		};

		var init = function () {
			ngProgress.start();
			$scope.action = $routeParams.actiontype;
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			//role = userInfo.data.roleBean;
			if( userInfo.data.branchID != undefined ||  userInfo.data.branchID != null ||  userInfo.data.branchID != ""){
				$scope.role.branchID = userInfo.data.branchID;
			}
			
			$scope.bankList = [];
			$scope.branchList = [];
			$scope.SevicePointList = [];

			$scope.title.id = $routeParams.oid;
			if($routeParams.actiontype == constantService.Update)
			{
				$scope.btn_save_up = "btn_ReMake";
				$scope.isShow.resetButton = false;
				$scope.isCancle.cancleButton = true;
				$scope.getRoleInfoByID(roleID);
			}
			else
			{
				$scope.btn_save_up = "btn_Make";
				$scope.isShow.resetButton = true;
				getAllTopMenu();
			}
			ngProgress.complete();
		};

		init();

	};

	app.register.controller('roleBMController', ['$rootScope','$scope', '$routeParams', '$timeout',  'comboService', 
	                                                        'localStorageService', 'loadService', 'navigationService', 'configurationService', 'constantService', 
	                                                        'roleService', 'modalService', 'messageService','ngProgress', roleBMController]);

});

