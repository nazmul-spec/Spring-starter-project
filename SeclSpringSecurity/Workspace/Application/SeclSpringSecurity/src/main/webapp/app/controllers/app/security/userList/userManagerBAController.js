
'use strict';

define(['app'], function (app) {

	var userManagerBAController = function ($rootScope, $scope, $log, $filter, $timeout, $route, _,  messageService, 
			comboService, userService, constantService, navigationService, localStorageService, configurationService, ngProgress, 
			modalService, ngTableParams, loadService ) {

		$scope.title = {value: "Security_Manager_BA"};

		var userInfo, promis;
		$scope.isFieldDisabledBranchID = false;
		$scope.combo = {};
		$scope.loadData = false;
		//paging
		$scope.users = [];
		$scope.ngTableUsers = [];
		$scope.ngTableTotalRecords = 0;
		$scope.cardUsers = [];

		$scope.pageSize = 9;
		$scope.itemsPerPage = 10;
		$scope.currentPage = $scope.prevPage = 1;

		$scope.pageDataBegin = 0;
		$scope.pageDataEnd = 0;
		$scope.pageDataTotal = 0;
		$scope.pageItemText = "";
		$scope.noDataText = "NUFT00";
		$scope.totalRecords = 0;

		$scope.roleList = [{ key: 'Agent.Manager', 	value: 'Agent Manager'},
		                   { key: 'Branch.Manager', value: 'Branch Manager'}];

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
							$scope.pageDataTotal, "Users", userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "User", userInfo.selectedLanguage);    		
				}
			}
			else {
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.user, userInfo.selectedLanguage);
			}
		};

		var createWatches = function () {

			$scope.$watch("searchText", function (filterText) {
				if (filterText === undefined) 
					return;
				$scope.currentPage = $scope.prevPage = 1;
				getUserList();
			});

			$scope.$watch("pageSize", function (filterText) {
				$scope.currentPage = $scope.prevPage = 1;
				if($scope.tableParams != undefined){
					$scope.tableParams.count($scope.pageSize);
					getUserList($scope.currentPage);
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

		//Change user status server request
		var changeUserStatus = function (user){	

			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);	 	 
			user.operationType = constantService.updateStatus;
			user.changedBy = userInfo.data.loginId;
			userInfo.data.changedBy = user.changedBy;
			localStorageService.setValue(configurationService.loginCookieStoreKey, userInfo);

			promis = userService.changeUserStatus(user);
			promis.then(function(data) {
				if (!data.success) {
					messageService.showMessage(constantService.Danger, constantService.changeStatusFailed);
					return;
				}

				if(user.status == constantService.docStatusType.ACTIVE)
				{
					user.status = constantService.docStatusType.INACTIVE;
				}            		
				else
				{
					user.status = constantService.docStatusType.ACTIVE;
				}
				if($scope.tableParams != undefined){
					$scope.tableParams.reload();
				}
				messageService.showMessage(constantService.Success, constantService.changeStatusSuccess);	
			});
		};

		//Modal Status Change
		$scope.changeUserStatus = function(user) {

			var modalOptions = {
					closeButtonText: 'No',
					actionButtonText: 'Yes',
					headerText: 'Change Status?',
					bodyText: 'Are you sure you want to change User Status ',
					data: user,
					id: user.loginId,
					showChangeStatusText: true
			};

			var modalDefaults = {
					templateUrl: 'app/partials/confirmation.html'
			};

			modalService.showModal(modalDefaults, modalOptions).then(function (result) {            	
				changeUserStatus(user);            	
			});

		};  

		$scope.goForResetPassword = function(user) {
			navigationService.menuNavigation('Security_ResetPassword' + '/' + constantService.resetPassword + '/' + user.loginId);
		};

		//Card View Edit Option
		$scope.goForEdit = function(user) {
			navigationService.menuNavigation('Security_Manager_BA' + '/' + constantService.Update + '/' + user.loginId);        
		};
		
		
		//End Card View Edit Option

		/*$scope.goToNewUserPage = function() {
			navigationService.menuNavigation('Security_BranchUser_Admin_BA' + '/' + constantService.Add + '/' + 'nan');
		};*/

		//for on demand data load when click in page number
		$scope.pageChanged = function() { 
			
			if($scope.prevPage == $scope.currentPage)
        		return;
			
			getUserList();
		};

		var getUserList = function () {
			loadService.showDialog(); 
			$scope.prevPage = $scope.currentPage;
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);

			if(userInfo.data.branchID != undefined && userInfo.data.branchID != null && userInfo.data.branchID != "")
			{
				$scope.combo.branchID = userInfo.data.branchID;
				$scope.isFieldDisabledBranchID = true;
			}
			else
				$scope.isFieldDisabledBranchID = false;
			var userObj = { 
					operationType : constantService.GET_USER_LIST_FOR_Manager_BMBA,
					bankID : $scope.combo.bankID,
					branchID : $scope.combo.branchID,
					role: $scope.combo.role,
					approverID : userInfo.data.loginId,
					changedBy : userInfo.data.loginId,
					//for database pagination and searching
					offset : ( $scope.currentPage * $scope.pageSize) -  $scope.pageSize, //calculate which row start showing
					limit : $scope.pageSize, //how much data show per page
					searchText : $scope.searchText    //Search text 
			};
			promis = userService.userListForRoleBM(userObj);
			promis.then(function (data) {
				ngProgress.complete();
				loadService.hideDialog();
				if (!data.success) {
					resetData();  //rest pagination and blank data when data not found
					return;
				}

				$scope.users = $filter('orderBy')(data.data, 'loginId');
				$scope.ngTableUsers = $scope.users;
				$scope.cardUsers = $scope.users;
				$scope.totalRecords= data.totalCount;
				$scope.ngTableTotalRecords =  Math.ceil($scope.users.length);
				
				
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
				filter: { loginId: ''},
				sorting: {
					loginId : 'asc'     // initial sorting
				}
			}, {
				total: 1, // length of data
				counts: [],
				defaultSort : 'asc',
				getData: function($defer, params) {			        	
					var orderedData = params.sorting() ? $filter('orderBy')($scope.ngTableUsers, params.orderBy()) : $scope.ngTableUsers;
					$defer.resolve(orderedData);
				}, 
				$scope: { $data: $scope.ngTableUsers }
			},{
				counts: [] // hides page sizes
			});
			$scope.tableParams.settings().$scope = $scope;
		};
		

		/*$scope.filterByRole = function (){
			getUserList();
		};
*/

		var resetData= function(){
			$scope.ngTableUsers = [];
			$scope.cardUsers = [];
			$scope.totalRecords = 0;    		
			$scope.pageDataTotal = 0;
			$scope.pageDataBegin = 0;
			$scope.pageDataEnd = 0;
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo.selectedLanguage == 'English'){
				if($scope.pageDataTotal > 1){
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Users", userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "User", userInfo.selectedLanguage);    		
				}
			}
			else {
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.user, userInfo.selectedLanguage);
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
					$scope.bankInfos = [];
					return;
				}
				$scope.bankInfos = data.data;
				$scope.combo.bankID = userInfo.data.bankID;
				$scope.isVisible=true;
				$scope.loadBranchInformation();
			});
		};

		// load branches in combo
		$scope.loadBranchInformation = function () {
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			var comboInfo = {
					comboName : constantService.Branch,
					operationType: constantService.ID,
					searchID: $scope.combo.bankID
			};
			var promisBranchInfo = comboService.getAllBranchComboList(comboInfo);
			promisBranchInfo.then(function(data) {
				if (!data.success) {
					console.log(constantService.ComboFailMessage + ":" + constantService.Branch);
					$scope.branchInfos = [];
					return;
				}
				$scope.branchInfos =_.where(data.data,{status:status="A"});
				$scope.branchInfos = _.sortBy($scope.branchInfos, 'branchName');

				userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);

				if(userInfo.data.branchID != undefined && userInfo.data.branchID != null && userInfo.data.branchID != "")
				{
					$scope.combo.branchID = userInfo.data.branchID;
					$scope.isFieldDisabledBranchID = true;
				}
				else
					$scope.isFieldDisabledBranchID = false;
				
				getUserList();
			});
		};
		
		$scope.filterUserByBranchId=function(){
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);

			if(userInfo.data.branchID != undefined && userInfo.data.branchID != null && userInfo.data.branchID != "")
			{
				$scope.combo.branchID = userInfo.data.branchID;
				$scope.isFieldDisabledBranchID = true;
			}
			else{
				$scope.isFieldDisabledBranchID = false;
			}				
			if($scope.loadData != false){
				  getUserList();
			    }
		};

		$scope.filterUserByRole=function(){
			if($scope.loadData != false){
			  getUserList();
		    }
		};
		
		$scope.$on(constantService.LanguageChange, function (event, languageChange) {
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo.selectedLanguage == 'English'){
				$scope.columns = [
				                  { title: constantService.LoginIdEn, field: 'loginId', visible: true },
				                  { title: constantService.EmailEn, field: 'email', visible: true },
				                  { title: constantService.RoleEn, field: 'roleJSON', visible: true },
				                  { title: constantService.statusEn, field: 'status', visible: true },
				                  { title: constantService.ChangedByEn, field: 'changedBy', visible: true }
				                  ];
				$scope.itemRows = constantService.RowEn;
				$scope.cardView = constantService.cardViewEn;
				$scope.listView = constantService.listViewEn;
				$scope.resetPasswordBtnText = constantService.resetEn;
				if($scope.pageDataTotal > 1){
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Users", userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "User", userInfo.selectedLanguage);    		
				}
			}
			else {
				$scope.columns = [
				                  { title: constantService.LoginIdBn, field: 'loginId', visible: true },
				                  { title: constantService.EmailBn, field: 'email', visible: true },
				                  { title: constantService.RoleBn, field: 'roleJSON', visible: true },
				                  { title: constantService.statusBn, field: 'status', visible: true },
				                  { title: constantService.ChangedByBn, field: 'changedBy', visible: true }
				                  ];
				$scope.itemRows = constantService.RowBn;
				$scope.cardView = constantService.cardViewBn;
				$scope.listView = constantService.listViewBn;
				$scope.resetPasswordBtnText = constantService.resetBn;
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.user, userInfo.selectedLanguage);
			}

		});

		var init = function () {
			ngProgress.start();
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo.selectedLanguage == 'English'){
				$scope.columns = [
				                  { title: constantService.LoginIdEn, field: 'loginId', visible: true },
				                  { title: constantService.EmailEn, field: 'email', visible: true },
				                  { title: constantService.RoleEn, field: 'roleJSON', visible: true },
				                  { title: constantService.statusEn, field: 'status', visible: true },
				                  { title: constantService.ChangedByEn, field: 'changedBy', visible: true }
				                  ];
				$scope.itemRows = constantService.RowEn;
				$scope.cardView = constantService.cardViewEn;
				$scope.listView = constantService.listViewEn;
				$scope.resetPasswordBtnText = constantService.resetEn;
				if($scope.pageDataTotal > 1){
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Users", userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "User", userInfo.selectedLanguage);    		
				}
			}
			else {
				$scope.columns = [
				                  { title: constantService.LoginIdBn, field: 'loginId', visible: true },
				                  { title: constantService.EmailBn, field: 'email', visible: true },
				                  { title: constantService.RoleBn, field: 'roleJSON', visible: true },
				                  { title: constantService.statusBn, field: 'status', visible: true },
				                  { title: constantService.ChangedByBn, field: 'changedBy', visible: true }
				                  ];
				$scope.itemRows = constantService.RowBn;
				$scope.cardView = constantService.cardViewBn;
				$scope.listView = constantService.listViewBn;
				$scope.resetPasswordBtnText = constantService.resetBn;
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.user, userInfo.selectedLanguage);
			}
			createWatches();
			$scope.loadBankInformation();
			ngProgress.complete();
		};

		init();

	};

	app.register.controller('userManagerBAController', ['$rootScope', '$scope', '$log', '$filter', '$timeout', 
	                                             '$route', '_',  'messageService', 'comboService', 'userService', 'constantService', 'navigationService',
	                                             'localStorageService','configurationService', 'ngProgress', 'modalService', 'ngTableParams',
	                                             'loadService', userManagerBAController]);

});

