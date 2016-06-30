
'use strict';

define(['app'], function (app) {

	var roleBMListController = function ($rootScope, $scope, $timeout, $route, $filter,  messageService, constantService, modalService,
			navigationService, localStorageService, loadService, configurationService, ngProgress, ngTableParams,comboService, roleService) {

		var userInfo, promis;
		$scope.title = {value: "Role_TopMenu"};
		$scope.isFieldDisabledBranchID = false
		$scope.isFieldDisabled = true;
		$scope.loadData = false;
		//paging
		$scope.role = [];
		$scope.ngTableRoles = [];
		$scope.ngTableTotalRecords = 0;
		$scope.cardRoles = [];  
		$scope.pageSize = 9;
		$scope.itemsPerPage = 10;
		$scope.currentPage = $scope.prevPage = 1;
		$scope.pageDataBegin = 0;
		$scope.pageDataEnd = 0;
		$scope.pageDataTotal = 0;
		$scope.pageItemText = "";
		$scope.noDataText = "ROLE_NOT_AVAILABLE";
		$scope.combo ={};
		$scope.role={};
		$scope.totalRecords = 0;
		$scope.statusList = [{ key: 'BR', value: 'Rejected'},
		                     { key: 'ME', value: 'Edit'}];
		

		var setPagination = function(){
			$scope.pageSize = constantService.convertStringToInteger($scope.pageSize);
			var begin = (($scope.currentPage - 1) * $scope.pageSize), end = begin + ($scope.pageSize - 0);            	
			if($scope.tableParams != undefined){            		
				$scope.tableParams.page($scope.currentPage);                	
				$scope.tableParams.reload();
			}
			$scope.pageDataTotal = $scope.totalRecords;
			if($scope.pageDataTotal == 0)
			{
				$scope.pageDataBegin = 0;
				$scope.pageDataEnd = 0;        		    		
			}
			else
			{
				$scope.pageDataBegin = begin + 1;
				$scope.pageDataEnd = end;
			}

			if($scope.pageDataTotal != 0 && $scope.pageDataEnd > $scope.pageDataTotal)
			{
				$scope.pageDataEnd = $scope.pageDataTotal
			}

			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo.selectedLanguage == 'English'){
				if($scope.pageDataTotal > 1){
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Roles", userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Role", userInfo.selectedLanguage);    		
				}
			}
			else {
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.role, userInfo.selectedLanguage);
			}
		};

		var createWatches = function () { 
			$scope.$watch("searchText", function (filterText) {
				if (filterText === undefined) return;
				$scope.currentPage = $scope.prevPage = 1;
				getAllRole();

			});

			$scope.$watch("pageSize", function (filterText) {
				$scope.currentPage = $scope.prevPage = 1;
				if($scope.tableParams != undefined){
					$scope.tableParams.count($scope.pageSize);                	
					getAllRole();
					$scope.tableParams.reload();
				}
			});
            
        	$scope.$watch('currentPage', function() {            	            	
				if($scope.tableParams != undefined){            		
					$scope.tableParams.page($scope.currentPage);                	
					$scope.tableParams.reload();
				}
				setPagination(); //set pagination when change page size 
			});

		};

		$scope.$on(constantService.LanguageChange, function (event, languageChange) {
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo.selectedLanguage == 'English'){
				$scope.columns = [
				                  { title: constantService.RoleIDEn, field: 'roleID', visible: true },
				                  { title: constantService.RoleDescriptionEn, 	field: 'roleDescription', visible: true },
				                  { title: constantService.statusEn, field: 'status', visible: true }
				                  ];
				$scope.itemRows = constantService.RowEn;
				$scope.cardView = constantService.cardViewEn;
				$scope.listView = constantService.listViewEn;
				$scope.ViewDetailsBtnText = constantService.ViewDetailsEn;
				if($scope.pageDataTotal > 1){
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Roles", userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Role", userInfo.selectedLanguage);    		
				}
			}
			else {
				$scope.columns = [
				                  { title: constantService.RoleIDBn, field: 'roleID', visible: true },
				                  { title: constantService.RoleDecriptionBn, 	field: 'roleDescription', visible: true },
				                  { title: constantService.statusEn, field: 'status', visible: true }
				                  ];
				$scope.itemRows = constantService.RowBn;
				$scope.cardView = constantService.cardViewBn;
				$scope.listView = constantService.listViewBn;
				$scope.ViewDetailsBtnText = constantService.ViewDetailsBn;
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.role, userInfo.selectedLanguage);
			} 
		});

		$scope.goForEdit = function(role) {
			navigationService.menuNavigation('Role_BM' + '/' + constantService.Update + '/' + role.roleID);        
		};

		$scope.goToNewPage = function() {
			navigationService.menuNavigation('Role_BM' + '/' + constantService.Add + '/' + 'nan');
		};
		//for on demand data load when click in page number
		$scope.pageChanged = function() {    
			if($scope.prevPage == $scope.currentPage)
        		return;
        	
			getAllRole();

		}; 

		$scope.filterRoleByStatus = function(){    
			$scope.currentPage = $scope.prevPage = 1;
			if($scope.loadData != false){
				getAllRole();
			}
		}

		$scope.filterByBranchId = function (){
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo.data.branchID != undefined && userInfo.data.branchID != null && userInfo.data.branchID != "")
			{
				$scope.role.branchID = userInfo.data.branchID;
				$scope.isFieldDisabledBranchID = true;
			}
			else
			{
				$scope.isFieldDisabledBranchID = false;
			}
			$scope.currentPage = $scope.prevPage = 1;
			if($scope.loadData != false){
				getAllRole();
			}
			
		}; 
		
		$scope.filterByServicePoint = function (){	
			$scope.currentPage = $scope.prevPage = 1;
			if($scope.loadData != false){
				getAllRole();
			}
		}; 
		
		var getAllRole =  function () {
			loadService.showDialog();
			$scope.prevPage = $scope.currentPage;
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo.data.branchID != undefined && userInfo.data.branchID != null && userInfo.data.branchID != "")
			{
				$scope.role.branchID = userInfo.data.branchID;
				$scope.isFieldDisabledBranchID = true;
			}
			else
			{
				$scope.isFieldDisabledBranchID = false;
			}
			
			var roleObj = { 
					operationType : constantService.SELECT_BY_PARAM,
					bankID :  userInfo.data.bankID,
					makerID : userInfo.data.roleBean.roleID,
					status : $scope.role.status,
					//for database pagination and searching
					offset : ( $scope.currentPage * $scope.pageSize) -  $scope.pageSize, //calculate which row start showing
					limit : $scope.pageSize, //how much data show per page
					searchText : $scope.searchText    //Search text    			
			};

			promis = roleService.getAllRole(roleObj);
			promis.then(function (data) {  
				ngProgress.complete();
				loadService.hideDialog();          	
				if (!data.success) { 
					resetData();  //rest pagination and blank data when data not found
					return;
				}

				$scope.roles = $filter('orderBy')(data.data, 'roleID');
				$scope.ngTableRoles = $scope.roles;
				$scope.cardRoles = $scope.roles;
				$scope.totalRecords= data.totalCount;
				$scope.ngTableTotalRecords =  Math.ceil($scope.roles.length);
				
				if($scope.tableParams != undefined){
					$scope.tableParams.page($scope.currentPage);
					$scope.tableParams.reload();					
				}
				else {
					createTableParams();
				}				
				setPagination();
				if($scope.loadData == false){
					$scope.loadData = true;
				}				
			});
		};
		
		var createTableParams = function(){
			$scope.tableParams = new ngTableParams({
				page: $scope.currentPage,            // show first page
				count: $scope.pageSize,  			// count per page
				filter: { roleID: ''},
				sorting: {
					roleID : 'asc'     // initial sorting
				}
			}, {
				total: 1, // length of data
				counts: [],
				defaultSort : 'asc',
				getData: function($defer, params) {			        	
					var orderedData = params.sorting() ? $filter('orderBy')($scope.ngTableRoles, params.orderBy()) : $scope.ngTableRoles;
					$defer.resolve(orderedData);
				}, 
				$scope: { $data: $scope.ngTableRoles }
			},{
				counts: [] // hides page sizes
			});
			$scope.tableParams.settings().$scope = $scope;
			setPagination(); // set pagination when data load
		};

		var resetData= function(){
			$scope.ngTableRoles = {};
			$scope.cardRoles = {};
			$scope.totalRecords = 0;    		
			$scope.pageDataTotal = 0;
			$scope.pageDataBegin = 0;
			$scope.pageDataEnd = 0;
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo.selectedLanguage == 'English'){
				if($scope.pageDataTotal > 1){
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Roles", userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Role", userInfo.selectedLanguage);    		
				}    		

			}
			else {
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.role, userInfo.selectedLanguage);
			}
		};

		// load banks in combo
		$scope.loadBankInformation = function () {
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			var comboInfo = {
					comboName : constantService.Bank,
					operationType: constantService.All
			};
			var promisBankInfo = comboService.getAllBankComboList(comboInfo);
			promisBankInfo.then(function(data) {
				if (!data.success) {
					console.log(constantService.ComboFailMessage + ":" + constantService.Bank);
					return;
				}

				$scope.bankInfos = data.data;
				$scope.combo.bankID = userInfo.data.bankID;
				getAllRole();
			});
		};

		var init = function(){
			ngProgress.start();
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo.selectedLanguage == 'English'){
				$scope.columns = [
				                  { title: constantService.RoleIDEn, field: 'roleID', visible: true },
				                  { title: constantService.RoleDescriptionEn, 	field: 'roleDescription', visible: true },
				                  { title: constantService.statusEn, field: 'status', visible: true }
				                  ];
				$scope.itemRows = constantService.RowEn;
				$scope.cardView = constantService.cardViewEn;
				$scope.listView = constantService.listViewEn;
				$scope.ViewDetailsBtnText = constantService.ViewDetailsEn;
				if($scope.pageDataTotal > 1){
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Roles", userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Role", userInfo.selectedLanguage);    		
				}
			}
			else {
				$scope.columns = [
				                  { title: constantService.RoleIDBn, field: 'roleID', visible: true },
				                  { title: constantService.RoleDescriptionBn, 	field: 'roleDescription', visible: true },
				                  { title: constantService.statusEn, field: 'status', visible: true }
				                  ];
				$scope.itemRows = constantService.RowBn;
				$scope.cardView = constantService.cardViewBn;
				$scope.listView = constantService.listViewBn;
				$scope.ViewDetailsBtnText = constantService.ViewDetailsBn;
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.role, userInfo.selectedLanguage);
			} 

			$scope.role.bankID = userInfo.data.bankID;
			$scope.role.branchID = userInfo.data.branchID;
			createWatches();
			$scope.loadBankInformation();
			ngProgress.complete();

		}; 

		init();
	};

	app.register.controller('roleBMListController', ['$rootScope', '$scope', '$timeout', '$route', '$filter',  'messageService', 
	                                                            'constantService', 'modalService', 'navigationService', 'localStorageService', 'loadService', 'configurationService', 
	                                                            'ngProgress', 'ngTableParams','comboService','roleService', roleBMListController]);
});

