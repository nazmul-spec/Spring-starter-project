
'use strict';

define(['app'], function (app) {

	var userAdminController = function ($rootScope, $scope, $log, $timeout, $route, _,$filter,  messageService, dashboardService, 
			constantService, localStorageService, configurationService, ngProgress, comboService, wsClientService, loadService, constantJSON, 
			reportsService, navigationService, ngTableParams) {

		var userInfo;
		var loadBranchInformation;

		$scope.title = {value: "Dashboard_DashboardBM"};
		$scope.isFieldDisabled= {branchID : false};		
		$scope.dashboardInfo = {};
		var promis;		 
		var params = {};		 
		$scope.objKey = { };
		$scope.today={};
		$scope.dashboard={};
		$scope.dashboardBarChart = {};
		$scope.dashboardPieChart = {};
		$scope.barChartDashboardInfo = {};
		$scope.pieChartDashboardInfo = {};
		$scope.bankInfos={};
		
		
		// for trans list view
		
		$scope.cardViewContent = true;
		$scope.trueFlag = true;
		$scope.falseFlag = false;
		$scope.transViewContent=false;
		
		$scope.transaction = [];
		$scope.transactionbytype=[];
		$scope.totalRecords = 0;
		$scope.ngTableTransaction = [];
		$scope.ngTableTotalRecords = 0;

		$scope.pageSize = 10;
		$scope.itemsPerPage = 10;
		$scope.currentPage = $scope.prevPage = 1;

		$scope.pageDataBegin = 0;
		$scope.pageDataEnd = 0;
		$scope.pageDataTotal = 0;
		$scope.pageItemText = "";
		$scope.noDataText = "NTF1000";
		$scope.searchParam={};

		// start set current date

		var d=new Date();
		var year = d.getFullYear();
		var month = d.getMonth()+1;
		if (month<10){
			month = "0" + month;
		};
		var day=d.getDate();
		if (day < 10){
			day = "0" + day;
		}
		$scope.dashboardInfo.date = year + "-" + month + "-" + day;
		$scope.searchParam.strTransDate = year + "-" + month + "-" + day;

		// end set current date
		
		$scope.transTypes = constantJSON.TransTypes;

		$scope.getWithdrawalTransList = function(statusName,flag) {		    
			navigationService.menuNavigation('Dashboard_DashboardAdmin' + '/' + $scope.transTypes[1].transTypId + '/' + $scope.dashboardInfo.date  + '/' + statusName + '/' + flag);
		};
		
		$scope.getSelfDepositTransList = function(statusName,flag) {		    
			navigationService.menuNavigation('Dashboard_DashboardAdmin' + '/' + $scope.transTypes[2].transTypId + '/' + $scope.dashboardInfo.date + '/' + statusName + '/' + flag);
		};
		
		$scope.getBearerDepositTransList = function(statusName,flag) {		    
			navigationService.menuNavigation('Dashboard_DashboardAdmin' + '/' + $scope.transTypes[3].transTypId + '/' + $scope.dashboardInfo.date  + '/' + statusName + '/' + flag);
		};
		$scope.getBalanceInquiryTransList = function(statusName,flag) {		    
			navigationService.menuNavigation('Dashboard_DashboardAdmin' + '/' + $scope.transTypes[4].transTypId + '/' + $scope.dashboardInfo.date  + '/' + statusName + '/' + flag);
		};
		$scope.getMiniStatementTransList = function(statusName,flag) {		    
			navigationService.menuNavigation('Dashboard_DashboardAdmin' + '/' + $scope.transTypes[5].transTypId + '/' + $scope.dashboardInfo.date  + '/' + statusName + '/' + flag);
		};
		$scope.getTransferTransList = function(statusName,flag) {		    
			navigationService.menuNavigation('Dashboard_DashboardAdmin' + '/' + $scope.transTypes[6].transTypId + '/' + $scope.dashboardInfo.date  + '/' + statusName + '/' + flag);
		};
		$scope.getInitialDepositList = function(statusName,flag) {		    
			navigationService.menuNavigation('Dashboard_DashboardAdmin' + '/' + $scope.transTypes[7].transTypId + '/' + $scope.dashboardInfo.date  + '/' + statusName + '/' + flag);
		};

		$scope.cardViewContentToggle = function(flag)
		{
			$scope.cardViewContent = flag;
		};

		$scope.$on(constantService.LanguageChange, function (event, languageChange) {
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if(userInfo.selectedLanguage == 'English'){
				$scope.columns = [
				                  //{ title: constantService.requestIDEn, field: 'requestID', visible: true }
				                  { title: constantService.debitedAccountEn, field: 'debitedAccount', visible: true },
				                  { title: constantService.creditedAccountEn, field: 'creditedAccount', visible: true },,
				                  { title: constantService.AgentIDEn, field: 'agentID', visible: true },
				                  //{ title: constantService.AccountIDEn, field: 'accountID', visible: true },
				                  { title: constantService.BranchNameEn, field: 'branchName', visible: true },
				                  { title: constantService.transactionTypeEn, field: 'transactionType', visible: true },
				                  { title: constantService.transactionDateEn, field: 'strTransDate', visible: true },
				                  { title: constantService.transAmountEn, field: 'transAmount', visible: true },
				                  { title: constantService.statusEn, field: 'transStatus', visible: true }
				                  ];
				$scope.cardView = constantService.cardViewEn;
				$scope.chartView = constantService.chartViewEn;
				$scope.listView = constantService.listViewEn;
				$scope.transList = constantService.transListEn;
				if($scope.pageDataTotal > 1){
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Transactions", userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Transaction", userInfo.selectedLanguage);    		
				}
			}
			else {
				$scope.columns = [
				                  //{ title: constantService.requestIDBn, field: 'requestID', visible: true }
				                  { title: constantService.debitedAccountBn, field: 'debitedAccount', visible: true },
				                  { title: constantService.creditedAccountBn, field: 'creditedAccount', visible: true },,
				                  { title: constantService.AgentIDBn, field: 'agentID', visible: true },
				                  //{ title: constantService.AccountIDBn, field: 'accountID', visible: true },
				                  { title: constantService.BranchNameBn, field: 'branchName', visible: true },
				                  { title: constantService.transactionTypeBn, field: 'transactionType', visible: true },
				                  { title: constantService.transactionDateBn, field: 'strTransDate', visible: true },
				                  { title: constantService.transAmountBn, field: 'transAmount', visible: true },
				                  { title: constantService.statusBn, field: 'transStatus', visible: true }
				                  ];
				$scope.cardView = constantService.cardViewBn;
				$scope.chartView = constantService.chartViewBn;
				$scope.listView = constantService.listViewBn;
				$scope.transList = constantService.transListBn;
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.transaction, userInfo.selectedLanguage);
			}
		});


		$scope.columnChartConfig = {
				options: {
					chart: {
						type: 'column',
						margin: 75,
						options3d: {
							enabled: true,
							alpha: 15,
							beta: 0,
							depth: 50,
							viewDistance: 25
						}
					},
					title: {
						text: '' /*<b>Number of Actions</b>*/
					},
					subtitle: {
						text: ''
					},
					colors: ['#00a65a',, '#FFBB00', '#CCFF00', '#f56954', '#008080', '#483D8B', '#FA8072', '#00BFFF', '#99FF66', '#6666FF'],
					xAxis: {
						labels:{
							rotation: -45,
							style: {
								fontSize: '9px',
								fill: '#606060',
								fontFamily: 'Arial, Helvetica, sans-serif'
							}
						},
						categories: ['<b>Withdrawal</b>','<b>New Account</b>','<b>Enrolled Account</b>','<b>Self Deposit</b>','<b>Mini Statement</b>','<b>Initial Deposit</b>','<b>Fund Transfer</b>','<b>Bearer Deposit</b>','<b>Balance Inquiry</b>','<b>Account Statement Count</b>'],
						title: {
							text: ''
						}
					},
					yAxis: {
						min: 0,
						title: {
							text: ''
						},
						labels: {
							overflow: 'justify'
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
						pointFormat: '<tr><td style="color:{point.color};padding:0">{series.name}: </td>' +
						'<td style="align="right";padding:0"><b>{point.y:,.0f}</b></td></tr>'+
						'<tr><td style="color:{series.color};padding:0">Amount: </td>' +
						'<td style="align="right";padding:0"><b>{point.amount:,.0f}</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'top',
						x: 0,
						y: 0,
						floating: true,
						borderWidth: 1,
						backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
						shadow: true,
						enabled: false
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0,
							depth: 25
						}
					},
					credits: {
						enabled: false
					}
				},
				series: [],
				loading: false
		};

		var reloadCharts = function() {

			var colSeries = [], pieSeries = []; 	

			/*** Column Chart ****/

			var col = { name: 'Number' }, colData = [];

			colData.push({y:$scope.dashboard.withdrawalCount,
				amount:$scope.dashboard.withdrawalAmount,
				color:'#00a65a'});
			colData.push({y:$scope.dashboard.newAccount,
				//amount:$scope.dashboard.newAccount,
				color:'#FFBB00'});
			colData.push({y:$scope.dashboard.enrolledAccount,
				//amount:$scope.dashboard.enrolledAccount,
				color:'#CCFF00'});
			colData.push({y:$scope.dashboard.selfDepositCount,
				amount:$scope.dashboard.selfDepositedAmount,
				color:'#f56954'});
			colData.push({y:$scope.dashboard.miniStatementCount,
				//amount:$scope.dashboard.miniStatementCount,
				color:'#008080'});
			colData.push({y:$scope.dashboard.initialDeposit,
				//amount:$scope.dashboard.initialDeposit,
				color:'#483D8B'});
			colData.push({y:$scope.dashboard.transferCount,
				amount:$scope.dashboard.transferAmount,
				color:'#FA8072'});
			colData.push({y:$scope.dashboard.bearerDepositCount,
				amount:$scope.dashboard.bearerDepositedAmount,
				color:'#00BFFF'});
			colData.push({y:$scope.dashboard.balanceInquiryCount,
				//amount:$scope.dashboard.balanceInquiryCount,
				color:'#99FF66'});
			colData.push({y:$scope.dashboard.accountStatementCount,
				//amount:$scope.dashboard.accountStatementCount,
				color:'#6666FF'});
			col.data = colData;
			colSeries.push(col);


			$scope.columnChartConfig.series = colSeries;	

		};

		//for only Bar chart view
		var reloadBarCharts = function() {

			var colSeries = []; 

			var col = { name: 'Number' }, colData = [];

			colData.push({y:$scope.dashboardBarChart.withdrawalCount,
				amount:$scope.dashboardBarChart.withdrawalAmount,
				color:'#00a65a'});
			colData.push({y:$scope.dashboardBarChart.newAccount,
				//amount:$scope.dashboardBarChart.newAccount,
				color:'#FFBB00'});
			colData.push({y:$scope.dashboardBarChart.enrolledAccount,
				//amount:$scope.dashboardBarChart.enrolledAccount,
				color:'#CCFF00'});
			colData.push({y:$scope.dashboardBarChart.selfDepositCount,
				amount:$scope.dashboardBarChart.selfDepositedAmount,
				color:'#f56954'});
			colData.push({y:$scope.dashboardBarChart.miniStatementCount,
				//amount:$scope.dashboardBarChart.miniStatementCount,
				color:'#008080'});
			colData.push({y:$scope.dashboardBarChart.initialDeposit,
				//amount:$scope.dashboardBarChart.initialDeposit,
				color:'#483D8B'});
			colData.push({y:$scope.dashboardBarChart.transferCount,
				amount:$scope.dashboardBarChart.transferAmount,
				color:'#FA8072'});
			colData.push({y:$scope.dashboardBarChart.bearerDepositCount,
				amount:$scope.dashboardBarChart.bearerDepositedAmount,
				color:'#00BFFF'});
			colData.push({y:$scope.dashboardBarChart.balanceInquiryCount,
				//amount:$scope.dashboardBarChart.balanceInquiryCount,
				color:'#99FF66'});
			colData.push({y:$scope.dashboardBarChart.accountStatementCount,
				//amount:$scope.dashboardBarChart.accountStatementCount,
				color:'#6666FF'});

			col.data = colData;
			colSeries.push(col);
			$scope.columnChartConfig.series = colSeries;
		};

		$scope.getDashboardInfo  = function (dashboardInfo) {
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);

			if($('#DashboardDate').val() !=="" && ($('#inputOutletID').val() === undefined ||
					$('#inputOutletID').val() === null || $('#inputOutletID').val() === "")) {
				$scope.objKey.key =  "OverAll"  + "-" + $scope.dashboardInfo.date.split('-').join('');
			}
			
			if($('#DashboardDate').val() !=="" && $('#inputOutletID').val() !=="") {
				$scope.objKey.key =  $scope.dashboardInfo.outletID  + "-" + $scope.dashboardInfo.date.split('-').join('');
			}	

			var summaryObj = { operationType : constantService.getSummaryData, key :  $scope.objKey.key}; 
			var promis = dashboardService.getDashboradData(summaryObj);
			promis.then(function (data) {
				ngProgress.complete();
				if(data.data == null || !data.success) {
					$scope.dashboard={};
					reloadCharts();
					return;
				}
				$scope.dashboard = data.data;	
				$scope.dashboardInfo.date = $scope.dashboardInfo.date;
				reloadCharts();
			});
		};

		$scope.getBarChartDashboardInfo  = function (barChartDashboardInfo) {
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);


			if($('#selectBankName').val() !== "" && $('#barChartDashboardDate').val() !=="" && $('#barChartBranchName').val() !=="" && $('#barChartAgent').val() !=="") 
			{

				$scope.objKey.key =  $scope.barChartDashboardInfo.date.split('-').join('')  + "-" + userInfo.data.bankID
				+ "-" + $scope.barChartDashboardInfo.branchID+ "-" + $scope.barChartDashboardInfo.agentID

			}
			else if($('#selectBankName').val() !== "" && $('#barChartDashboardDate').val() !=="" && $('#barChartBranchName').val() !=="" && $('#barChartAgent').val() =="")
			{
				$scope.objKey.key = $scope.barChartDashboardInfo.date.split('-').join('')  + "-" + userInfo.data.bankID+ "-" + $scope.barChartDashboardInfo.branchID

			}
			else 
			{	    	  
				$scope.objKey.key =  $scope.barChartDashboardInfo.date.split('-').join('') + "-" + userInfo.data.bankID

			}	


			var summaryObj = { operationType : constantService.getSummaryData, key :  $scope.objKey.key}; 
			var promis = dashboardService.getDashboradData(summaryObj);
			promis.then(function (data) {
				ngProgress.complete();
				if(data.data == null || !data.success) {
					$scope.dashboardBarChart={};
					reloadBarCharts();
					return;
				}

				$scope.dashboardBarChart = data.data;   					
				$scope.barChartDashboardInfo.date = barChartDashboardInfo.date;
				reloadBarCharts();
			});
		};


		var getDashboardSummary = function () {
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);	

			var fromdate=$scope.dashboardInfo.date;
			var spliteddate = fromdate.split('-').join('');
			if(userInfo.name == constantService.roleType.BranchManager || userInfo.name == constantService.BankOfficer)
			{
				var summaryObj = { operationType : constantService.getSummaryData, key: spliteddate + "-" + userInfo.data.bankID + "-" + userInfo.data.branchID}; 

			}
			else
			{
				var summaryObj = { operationType : constantService.getSummaryData, key: spliteddate + "-" + userInfo.data.bankID}; 
			}

			var promis = dashboardService.getDashboradData(summaryObj);
			promis.then(function (data) {
				ngProgress.complete();
				if(data.data == null || !data.success) {
					$scope.dashboard={};
					reloadCharts();
					return;
				}

				$scope.dashboard = data.data;
				$scope.dashboardInfo.date = $scope.dashboardInfo.date;				
				reloadCharts();


			});
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
					return;
				}

				$scope.bankInfos = data.data;
				$scope.dashboardInfo.bankID = userInfo.data.bankID;
				$scope.dashboardInfo.branchID = userInfo.data.branchID;
				$scope.searchParam.bankID = userInfo.data.bankID;
				$scope.searchParam.branchID = userInfo.data.branchID;
				$scope.barChartDashboardInfo.branchID = userInfo.data.branchID;
				$scope.pieChartDashboardInfo.branchID = userInfo.data.branchID;
				$scope.dashboardInfo.date=$scope.dashboardInfo.date;
				$scope.barChartDashboardInfo.date = $scope.dashboardInfo.date;
				loadBranchInformation();
			});
		};

		// load branches in combo
		var loadBranchInformation = function () {

			var comboInfo = {
					comboName : constantService.Branch,
					operationType: constantService.ID,
					searchID: $scope.dashboardInfo.bankID
			};
			var promisBranchInfo = comboService.getAllBranchComboList(comboInfo);
			promisBranchInfo.then(function(data) {
				if (!data.success) {
					$scope.branchInfos = {};
					return;
				}
				$scope.branchInfos = data.data;	        	
				$scope.branchInfos =_.where( $scope.branchInfos,{status:status="A"});
				$scope.branchInfos = _.sortBy($scope.branchInfos, 'branchName');	
				// disable branch combo if role Branch Manager or Branch Officer
				userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
				var role = userInfo.data.roleBean;
				if(role.roleID == constantService.roleType.BranchManager || role.roleID == constantService.BranchOfficer)
				{
					$scope.isFieldDisabled.branchID = true;
					$scope.dashboardInfo.branchID = userInfo.data.branchID;
				}
			});
			$scope.getTransaction();
		};

		//added for websocket

		$scope.$on('$destroy', function () {
			wsClientService.close();
		});


		wsClientService.subscribe(function(res) {
			if(res == "connected" || res == "disconnected" || res == "close"){
				return;
			}
			getDashboardSummary();
		});
		
		//START TRANSACTION LIST VIEW
		var createTableParams = function (){
			$scope.tableParams = new ngTableParams({
				page: $scope.currentPage,            // show first page
				count: $scope.pageSize,  			// count per page
				filter: { strTransDate: ''},
				sorting: {
					strTransDate : 'desc'     // initial sorting
				}
			}, {
				total: 1, // length of data
				counts: [],
				defaultSort : 'asc',
				getData: function($defer, params) {			        	
					var orderedData = params.sorting() ? $filter('orderBy')($scope.ngTableTransaction, params.orderBy()) : $scope.ngTableTransaction;
					$defer.resolve(orderedData);
				}, 
				$scope: { $data: $scope.ngTableTransaction }
			},{
				counts: [] // hides page sizes
			});
			$scope.tableParams.settings().$scope = $scope;
			setPagination();
		}
		
		$scope.getTransaction = function (searchParam) {			
			var searchParam = $scope.searchParam;			
			searchParam.operationType= constantService.TRANSACTION_LIST;
			searchParam.offset = ( $scope.currentPage * $scope.pageSize) -  $scope.pageSize; //calculate which row start showing
			searchParam.limit = $scope.pageSize; //how much data show per page

			$scope.prevPage = $scope.currentPage;
			promis = reportsService.getTransactionData(searchParam);
			promis.then(function (data) {
				ngProgress.complete();
				if (!data.success) {
					resetData();
					return;
				}  
				$scope.transaction = $filter('orderBy')(data.data, 'strTransDate', true);
				$scope.totalRecords = data.totalCount;	            	
				$scope.ngTableTransaction = $scope.transaction;	            	
				if($scope.tableParams == undefined){
					createTableParams();	                	
				}
				else{		        		
					$scope.tableParams.reload();
					setPagination();
				}
			});
		};
		
		$scope.printTransaction = function (searchParam) {		
			
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			 
	    	var param = "OperationType=" + constantService.TRANSACTION_LIST + "&SearchID=9999"  + "&strTransDate=" + searchParam.strTransDate  +
	    	"&bankID=" + searchParam.bankID + "&branchID=" + searchParam.branchID +  "&agentID=" + searchParam.agentID + "&token=" + userInfo.token;
	    	$window.open(configurationService.pdfreportPath + param, "_parent", "location=no"); //for same window
	     };

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
			if( userInfo.selectedLanguage == 'English'){
				if($scope.pageDataTotal > 1){
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Transactions",  userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Transaction",  userInfo.selectedLanguage);    		
				}
			}
			else {
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.transaction,  userInfo.selectedLanguage);
			}
		};

		// for on demand data load when click in page number
		$scope.pageChanged = function() { 
			if($scope.prevPage == $scope.currentPage)
				return;

			$scope.getTransaction();
		};



		var createWatches = function () { 
			$scope.$watch("searchText", function (filterText) {
				if (filterText === undefined) return;
				$scope.currentPage = $scope.prevPage = 1;
				$scope.getTransaction();

			});

			$scope.$watch("pageSize", function (filterText) { 
				$scope.currentPage = $scope.prevPage = 1;
				if($scope.tableParams != undefined){
					$scope.tableParams.count($scope.pageSize);                	
					$scope.getTransaction();
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

		var resetData= function(){
			$scope.ngTableTransaction = {};			
			$scope.totalRecords = 0;    		
			$scope.pageDataTotal = 0;
			$scope.pageDataBegin = 0;
			$scope.pageDataEnd = 0;
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			if( userInfo.selectedLanguage == 'English'){
				if($scope.pageDataTotal > 1){
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Transaction",  userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Transaction",  userInfo.selectedLanguage);    		
				}		
			}
			else {
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.transaction,  userInfo.selectedLanguage);
			}
		}; 
		//END TRANSACTION LIST VIEW

		//for datepicker
		$(function() {
			$( ".datepicker" ).datepicker();
		}); 

		var init = function () {

			ngProgress.start();

			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);

			if(userInfo.selectedLanguage == 'English'){
				$scope.columns = [
				                  //{ title: constantService.requestIDEn, field: 'requestID', visible: true }
				                  { title: constantService.debitedAccountEn, field: 'debitedAccount', visible: true },
				                  { title: constantService.creditedAccountEn, field: 'creditedAccount', visible: true },,
				                  { title: constantService.AgentIDEn, field: 'agentID', visible: true },
				                  //{ title: constantService.AccountIDEn, field: 'accountID', visible: true },
				                  { title: constantService.BranchNameEn, field: 'branchName', visible: true },
				                  { title: constantService.transactionTypeEn, field: 'transactionType', visible: true },
				                  { title: constantService.transactionDateEn, field: 'strTransDate', visible: true },
				                  { title: constantService.transAmountEn, field: 'transAmount', visible: true },
				                  { title: constantService.statusEn, field: 'transStatus', visible: true }
				                  ];
				$scope.cardView = constantService.cardViewEn;
				$scope.chartView = constantService.chartViewEn;
				$scope.listView = constantService.listViewEn;
				$scope.transList = constantService.transListEn;
				if($scope.pageDataTotal > 1){
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Transactions", userInfo.selectedLanguage);       		    		
				}
				else{
					$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
							$scope.pageDataTotal, "Transaction", userInfo.selectedLanguage);    		
				}
			}
			else {
				$scope.columns = [
				                  //{ title: constantService.requestIDBn, field: 'requestID', visible: true }
				                  { title: constantService.debitedAccountBn, field: 'debitedAccount', visible: true },
				                  { title: constantService.creditedAccountBn, field: 'creditedAccount', visible: true },,
				                  { title: constantService.AgentIDBn, field: 'agentID', visible: true },
				                  //{ title: constantService.AccountIDBn, field: 'accountID', visible: true },
				                  { title: constantService.BranchNameBn, field: 'branchName', visible: true },
				                  { title: constantService.transactionTypeBn, field: 'transactionType', visible: true },
				                  { title: constantService.transactionDateBn, field: 'strTransDate', visible: true },
				                  { title: constantService.transAmountBn, field: 'transAmount', visible: true },
				                  { title: constantService.statusBn, field: 'transStatus', visible: true }
				                  ];
				$scope.cardView = constantService.cardViewBn;
				$scope.chartView = constantService.chartViewBn;
				$scope.listView = constantService.listViewBn;
				$scope.transList = constantService.transListBn;
				$scope.pageItemText = constantService.getPageItemText($scope.pageDataBegin, $scope.pageDataEnd, 
						$scope.pageDataTotal, constantService.pageItemTextBn.transaction, userInfo.selectedLanguage);
			}
			createWatches();
			/*$scope.loadBankInformation();
			getDashboardSummary();*/
			wsClientService.connect();

			ngProgress.complete();

		};

		init();

	};

	app.register.controller('userAdminController', ['$rootScope', '$scope', '$log', '$timeout', '$route', '_','$filter',  
	                                                  'messageService', 'dashboardService', 'constantService', 'localStorageService',
	                                                  'configurationService', 'ngProgress','comboService','wsClientService', 'loadService','constantJSON', 'reportsService','navigationService','ngTableParams', userAdminController]);


});

