
'use strict';

define(['app'], function (app) {

	var cbsAccountListAController = function ($rootScope, $scope, $timeout, $route, $filter,$http,  messageService, constantService, modalService,
			navigationService, localStorageService, configurationService, ngProgress,  constantJSON, loadService , ngTableParams) {

		var userInfo;
		$scope.checkboxes = {
         			checked : false   
         	   };
		
		$scope.title = {value: "CBS_AccountList_Approve"};	
		var init = function(){
			ngProgress.start();
			loadService.showDialog();
			getData();
			ngProgress.complete();
			loadService.hideDialog();
			
		};
		
		
		//for check all checkbox
		$scope.checkAll = function(value) {
			debugger;			
			if(value){
				angular.forEach($scope.tableParams.data, function(item,index) {	
					if(!$("#chkApprove"+index).is(":checked")){
						$("#chkApprove"+index).attr('checked', true);
						$scope.change(index,item);
						$scope.checkboxes.checked = false;
						getData();
					}			           
			    });	
			}			
		
	    };
		
		
		$scope.search = { term: '' };
		
	   var getData = function() {
	        $http({
	            url: configurationService.getCbsAccountList,
	            method: "POST",
	            data: {}
	        })
	        .then(function successCallback(response) {	        	
	        	$scope.uploadedData = _.where(response.data.data, { accountstatus:'U' });
	        	$scope.canShowTable = ($scope.uploadedData != undefined && $scope.uploadedData != null) ?  $scope.uploadedData.length > 0 : false;	        	
	        	if($scope.tableParams != undefined){
					$scope.tableParams.page(1);
					$scope.tableParams.reload();					 
				}
				else {			
					
					createTableParams();
				}      	
	        	
	        	
	        }, 
	        function failureCallback(response) { 
	                console.log(response);
	        });
	    };
	    
	   var createTableParams = function(){		
		   $scope.tableParams = new ngTableParams(
	   	             {page: 1, count: 10, sorting: { date: 'desc' }, filter: $scope.search}, 
	   	             {total: ($scope.uploadedData != undefined && $scope.uploadedData != null) ? $scope.uploadedData.length : 0,
	   	              getData: function($defer, params) {
	   	        	  
	   	           var orderedData;

	   	             if(params.sorting().date === 'asc'){
	   	            	if($scope.uploadedData != undefined && $scope.uploadedData != null){
	   	            		$scope.uploadedData.sort(function (a, b) {
	   	   	                 var dateA = new Date(a.date), dateB = new Date(b.date);
	   	   	                 return dateA - dateB; //sort by date descending
	   	   	               });
	   	   	               orderedData = $scope.uploadedData;
	   	            	}	   	            	

	   	             } else if(params.sorting().date === 'desc') {
	   	            	if($scope.uploadedData != undefined && $scope.uploadedData != null){
	   	            		$scope.uploadedData.sort(function (a, b) {
	   	                 var dateA = new Date(a.date), dateB = new Date(b.date);
	   	                 return dateB - dateA; //sort by date descending
	   	               });
	   	               orderedData = $scope.uploadedData;
	   	            	}

	   	             } else if(!params.sorting().date){

	   	               if (params.filter().term) {
	   	                 orderedData = params.filter() ? $filter('filter')($scope.uploadedData, params.filter().term) : $scope.uploadedData;
	   	               } else {
	   	                 orderedData = params.sorting() ? $filter('orderBy')($scope.uploadedData, params.orderBy()) : $scope.uploadedData;
	   	               }
	   	               
	   	             }
	   	               if(orderedData != undefined && orderedData != null){
	   	            	   params.total(orderedData.length);
	   	            	   $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	   	            	   if(params.page() > 1){
	   	            		   debugger;
	   	            		$scope.checkboxes.checked = false;	   			          			
	   	            	   }
	   	            	   
	   	               }
	   	                       },
	   	          $scope: { $data: $scope.uploadedData }
	   	             });
		   $scope.tableParams.settings().$scope = $scope;
		  
	   }; 
	   
	    $scope.change = function(index,row){	    	  	
	    	ngProgress.start();
			loadService.showDialog();
	    	$http({
	            url: configurationService.updateCbsStatus,
	            method: "POST",
	            data: {'accountid':row.accountid,'accountstatus':row.accountstatus}
	        })
	        .then(function successCallback(response) {
	        	if(response.data.success && response.status == 200){	        		
	        		row.accountstatus = response.data.data;
	        		var tableData = $scope.tableParams.data;
	        		$scope.tableParams.data.splice(_.indexOf(tableData,_.findWhere(tableData,{accountid:row.accountid})),1); //for removing the row which status changed
	        		if($scope.tableParams.data.length == 0){
	        			getData();
	        		}
	        		ngProgress.complete();
	    			loadService.hideDialog();
                	messageService.showMessage(constantService.Success,response.data.message);
                }
	    	  }, function errorCallback(response) {
	    		  	ngProgress.complete();
	  				loadService.hideDialog();
	  				messageService.showMessage(constantService.Danger,response.data.message);
	    	  });  
	    };    

	    

		init();
	};

	app.register.controller('cbsAccountListAController', ['$rootScope', '$scope', '$timeout', '$route', '$filter','$http',  'messageService', 
	                                              'constantService', 'modalService', 'navigationService', 'localStorageService', 'configurationService', 
	                                              'ngProgress',  'constantJSON', 'loadService', 'ngTableParams', cbsAccountListAController]);
});

