
'use strict';

define(['app'], function (app) {

	var accountBalanceMController = function ($rootScope, $scope, $timeout, $route, $filter,$http,  messageService, constantService, modalService,
			navigationService, localStorageService, configurationService, ngProgress,  constantJSON, loadService , ngTableParams) {

		var userInfo;
		$scope.title = {value: "Upload_Account_Balance"};	
		var init = function(){
			ngProgress.start();
			loadService.showDialog();
			//userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			getData();
			ngProgress.complete();
			loadService.hideDialog();
			
		}; 
		
		
		$scope.search = { term: '' };
		
	   var getData = function() {
	        $http({
	            url: configurationService.getAccountBalance,
	            method: "POST",
	            data: {}
	        })
	        .then(function successCallback(response) {
	        	$scope.uploadedData = response.data.data;
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
	   	               }
	   	                       },
	   	          $scope: { $data: $scope.uploadedData }
	   	             });
		   $scope.tableParams.settings().$scope = $scope;
	   }; 
	   
	    

		
	    
	    $scope.continueFileUpload=function (){
	    	//uploadFile
	    	var uploadUrl=configurationService.accBlncXlUpload;
	    	var formData=new FormData();
	    	formData.append("file",file.files[0]);
	    	ngProgress.start();
	    	loadService.showDialog();
	    	 $http({
	    	        method: 'POST',
	    	        url: uploadUrl,
	    	        headers: {'Content-Type': undefined},
	    	        data: formData,
	    	        transformRequest: function(data, headersGetterFunction) {
	    	                        return data;
	    	         }
	    	     }).then(function successCallback(response) {
	    	    	 if(response.data.success && response.status == 200){
	    	    		    getData();
	    	    		    ngProgress.complete();
	    	    			loadService.hideDialog();
	                    	messageService.showMessage(constantService.Success,response.data.message);
	                    }
	    	    	 else{
	    	    		ngProgress.complete();
	    	 			loadService.hideDialog();
	    	    		 messageService.showMessage(constantService.Danger,response.data.message); 
	    	    	 }
	    	    	  }, function errorCallback(response) {
	    	    		  	ngProgress.complete();
	    	  				loadService.hideDialog();
	    	  				messageService.showMessage(constantService.Danger,response.data.message);
	    	    	  });    	 
	    	    
	    	

	    	};
	    

		init();
	};

	app.register.controller('accountBalanceMController', ['$rootScope', '$scope', '$timeout', '$route', '$filter','$http',  'messageService', 
	                                              'constantService', 'modalService', 'navigationService', 'localStorageService', 'configurationService', 
	                                              'ngProgress',  'constantJSON', 'loadService', 'ngTableParams', accountBalanceMController]);
});

