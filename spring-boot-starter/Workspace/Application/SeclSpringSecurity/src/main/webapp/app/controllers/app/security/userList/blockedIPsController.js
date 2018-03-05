
'use strict';

define(['app'], function (app) {

	var blockedIPsController = function ($rootScope, $scope, $log, $filter, $timeout, $route, _,  messageService, 
			userService, constantService, navigationService, localStorageService, configurationService, ngProgress, 
			modalService, ngTableParams, loadService, comboService, constantJSON) {

		$scope.title = {value: "Security_BlockedIPs"};

		var userInfo, promis;
		$scope.isFieldDisabledBranchID = false;
		$scope.combo = {};

		//paging
		$scope.machines = [];
		$scope.ngTableMachines = [];
		$scope.ngTableTotalRecords = 0;
		$scope.cardMachines = [];

		$scope.pageSize = 9;
		$scope.itemsPerPage = 10;
		$scope.currentPage = $scope.prevPage = 1;

		$scope.pageDataBegin = 0;
		$scope.pageDataEnd = 0;
		$scope.pageDataTotal = 0;
		$scope.pageItemText = "";
		$scope.noDataText = "NMFT00";
		$scope.totalRecords = 0;

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
							$scope.pageDataTotal, "Machine IPs", userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Machine IP", userInfo.selectedLanguage);    		
				}
			}
			else {
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.machine, userInfo.selectedLanguage);
			}
		};

		var createWatches = function () {

			$scope.$watch("searchText", function (filterText) {
				if (filterText === undefined) 
					return;
				$scope.currentPage = $scope.prevPage = 1;
				getMachineList();
			});

			$scope.$watch("pageSize", function (filterText) {
				$scope.currentPage = $scope.prevPage = 1;
				if($scope.tableParams != undefined){
					$scope.tableParams.count($scope.pageSize);
					getMachineList($scope.currentPage);
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

		//Modal Unblock
		$scope.unblock = function(machine) {

			var modalOptions = {
					closeButtonText: 'No',
					actionButtonText: 'Yes',
					headerText: 'Unblock?',
					bodyText: 'Are you sure you want to unblock machine ',
					data: machine,
					id: machine.machineIP,
					showChangeStatusText: false
			};

			var modalDefaults = {
					templateUrl: 'app/partials/confirmation.html'
			};

			modalService.showModal(modalDefaults, modalOptions).then(function (result) { 
				
				userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);	
				
				var ipObj = { 
						oid : machine.oid,
						loginID : machine.loginID,
						roleID : machine.roleID,
						signinDate : machine.signinDate,
						signoutDate : machine.signoutDate,
						machineIP : machine.machineIP,
						loginStatus : machine.loginStatus,
						changedBy : userInfo.data.loginId
				};			
				var blockObj = {
						operationType : constantService.UNBLOCK_IP_BY_MACHINE_IP,
						loginTrail : ipObj					
				};
				
			    promis = userService.unblockIP(blockObj);
			    promis.then(function(data) {
			    	if (!data.success) {
			    		messageService.showMessage(constantService.Danger, data.message);
			            return;
			        }
			    		    	
			    	if($scope.tableParams != undefined){
	            		$scope.tableParams.reload();
	            	}
			    	messageService.showMessage(constantService.Success, data.message);
			    	getMachineList();
			    });
				
			});

		};  

		//for on demand data load when click in page number
		$scope.pageChanged = function() { 
			
			if($scope.prevPage == $scope.currentPage)
        		return;
			
			getMachineList();
		};

		var getMachineList = function () {
			loadService.showDialog(); 
			$scope.prevPage = $scope.currentPage;
			
			var ipObj = { 
					//for database pagination and searching
					offset : ( $scope.currentPage * $scope.pageSize) -  $scope.pageSize, //calculate which row start showing
					limit : $scope.pageSize, //how much data show per page
					searchText : $scope.searchText    //Search text 
			};			
			var blockObj = {
					operationType : constantService.GET_BLOCKED_IP_LIST,
					loginTrail : ipObj					
			};
			promis = userService.blockedIPList(blockObj);
			promis.then(function (data) {
				ngProgress.complete();
				loadService.hideDialog();
				if (!data.success) {
					resetData();  //rest pagination and blank data when data not found
					return;
				}

				$scope.machines = $filter('orderBy')(data.data, 'machineIP');
				$scope.ngTableMachines = $scope.machines;
				$scope.cardMachines = $scope.machines;
				$scope.totalRecords= data.totalCount;
				$scope.ngTableTotalRecords =  Math.ceil($scope.machines.length);
				
				if($scope.tableParams != undefined){
					$scope.tableParams.page($scope.currentPage);
					$scope.tableParams.reload();					
				}
				else {
					createTableParams();
				}				
				setPagination();
			});
		};
		
		var createTableParams = function(){
			$scope.tableParams = new ngTableParams({
				page: $scope.currentPage,            // show first page
				count: $scope.pageSize,  			// count per page
				filter: { machineIP: ''},
				sorting: {
					loginId : 'asc'     // initial sorting
				}
			}, {
				total: 1, // length of data
				counts: [],
				defaultSort : 'asc',
				getData: function($defer, params) {			        	
					var orderedData = params.sorting() ? $filter('orderBy')($scope.ngTableMachines, params.orderBy()) : $scope.ngTableMachines;
					$defer.resolve(orderedData);
				}, 
				$scope: { $data: $scope.ngTableMachines }
			},{
				counts: [] // hides page sizes
			});
			$scope.tableParams.settings().$scope = $scope;
		};

		var resetData= function(){
			$scope.ngTableMachines = [];
			$scope.cardMachines = [];
			$scope.totalRecords = 0;    		
			$scope.pageDataTotal = 0;
			$scope.pageDataBegin = 0;
			$scope.pageDataEnd = 0;
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo.selectedLanguage == 'English'){
				if($scope.pageDataTotal > 1){
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Machine IPs", userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Machine IP", userInfo.selectedLanguage);    		
				}
			}
			else {
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.machine, userInfo.selectedLanguage);
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

				getMachineList();
			});
		};

		$scope.$on(constantService.LanguageChange, function (event, languageChange) {
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo.selectedLanguage == 'English'){
				$scope.columns = [
				                  { title: constantService.machineIPEn, field: 'machineIP', visible: true },
				                  { title: constantService.LoginIdEn, field: 'loginId', visible: true },
				                  { title: constantService.RoleEn, field: 'roleJSON', visible: true },
				                  { title: constantService.signinDateEn, field: 'signinDate', visible: true },
				                  { title: constantService.signoutDateEn, field: 'signoutDate', visible: true }
				                  ];
				$scope.itemRows = constantService.RowEn;
				$scope.cardView = constantService.cardViewEn;
				$scope.listView = constantService.listViewEn;
				if($scope.pageDataTotal > 1){
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Machine IPs", userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Machine IP", userInfo.selectedLanguage);    		
				}
			}
			else {
				$scope.columns = [
				                  { title: constantService.machineIPBn, field: 'machineIP', visible: true },
				                  { title: constantService.LoginIdBn, field: 'loginId', visible: true },
				                  { title: constantService.RoleBn, field: 'roleJSON', visible: true },
				                  { title: constantService.signinDateBn, field: 'signinDate', visible: true },
				                  { title: constantService.signoutDateBn, field: 'signoutDate', visible: true }
				                  ];
				$scope.itemRows = constantService.RowBn;
				$scope.cardView = constantService.cardViewBn;
				$scope.listView = constantService.listViewBn;
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.machine, userInfo.selectedLanguage);
			}

		});
		
		var init = function () {
			ngProgress.start();
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo.selectedLanguage == 'English'){
				$scope.columns = [
				                  { title: constantService.machineIPEn, field: 'machineIP', visible: true },
				                  { title: constantService.LoginIdEn, field: 'loginId', visible: true },
				                  { title: constantService.RoleEn, field: 'roleJSON', visible: true },
				                  { title: constantService.signinDateEn, field: 'signinDate', visible: true },
				                  { title: constantService.signoutDateEn, field: 'signoutDate', visible: true }
				                  ];
				$scope.itemRows = constantService.RowEn;
				$scope.cardView = constantService.cardViewEn;
				$scope.listView = constantService.listViewEn;
				if($scope.pageDataTotal > 1){
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Machine IPs", userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Machine IP", userInfo.selectedLanguage);    		
				}
			}
			else {
				$scope.columns = [
				                  { title: constantService.machineIPBn, field: 'machineIP', visible: true },
				                  { title: constantService.LoginIdBn, field: 'loginId', visible: true },
				                  { title: constantService.RoleBn, field: 'roleJSON', visible: true },
				                  { title: constantService.signinDateBn, field: 'signinDate', visible: true },
				                  { title: constantService.signoutDateBn, field: 'signoutDate', visible: true }
				                  ];
				$scope.itemRows = constantService.RowBn;
				$scope.cardView = constantService.cardViewBn;
				$scope.listView = constantService.listViewBn;
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.machine, userInfo.selectedLanguage);
			}
			createWatches();
			$scope.loadBankInformation();
			ngProgress.complete();
		};

		init();

	};

	app.register.controller('blockedIPsController', ['$rootScope', '$scope', '$log', '$filter', '$timeout', 
	                                                '$route', '_',  'messageService', 'userService', 'constantService', 'navigationService',
	                                                'localStorageService','configurationService', 'ngProgress', 'modalService', 'ngTableParams',
	                                                'loadService', 'comboService', 'constantJSON', blockedIPsController]);

});

