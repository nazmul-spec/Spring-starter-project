
'use strict';

define(['app', 'services/utils/modalService'], function (app) {

    var modalService = function ($modal) {
    	
    	var modalDefaults = {
	        backdrop: true,
	        keyboard: true,
	        modalFade: true,
	        templateUrl: 'app/partials/modal.html'
	    };

	    var modalOptions = {
	        closeButtonText: 'Close',
	        actionButtonText: 'OK',
	        headerText: 'Proceed?',
	        bodyText: 'Perform this action?'
	    };

	    this.showModal = function (customModalDefaults, customModalOptions) {
	        if (!customModalDefaults) customModalDefaults = {};
	        customModalDefaults.backdrop = 'static';
	        return this.show(customModalDefaults, customModalOptions);
	    };

	    this.show = function (customModalDefaults, customModalOptions) {
	        //Create temp objects to work with since we're in a singleton service
	        var tempModalDefaults = {};
	        var tempModalOptions = {};

	        //Map angular-ui modal custom defaults to modal defaults defined in service
	        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

	        //Map modal.html $scope custom properties to defaults defined in service
	        angular.extend(tempModalOptions, modalOptions, customModalOptions);

	        if (!tempModalDefaults.controller) {
	            tempModalDefaults.controller = function ($scope, $modalInstance) {
	                $scope.modalOptions = tempModalOptions;

	                $scope.modalOptions.ok = function (result) {
	                    $modalInstance.close(result);
	                };
	                $scope.modalOptions.close = function (result) {
	                    $modalInstance.dismiss('cancel');
	                };
	                
	        		$scope.onEnd = function(){
	        			$('.clockpicker').clockpicker(); 
	                };
	            };
	        }

	        return $modal.open(tempModalDefaults).result;
	    };
	    
	   // getModal function for caching ok or cancel both click of modal
	    this.getModal = function (customModalDefaults, customModalOptions) {
	        if (!customModalDefaults) customModalDefaults = {};
	        customModalDefaults.backdrop = 'static';
	        return this.returnResult(customModalDefaults, customModalOptions);
	    };

	    this.returnResult = function (customModalDefaults, customModalOptions) {
	        //Create temp objects to work with since we're in a singleton service
	        var tempModalDefaults = {};
	        var tempModalOptions = {};

	        //Map angular-ui modal custom defaults to modal defaults defined in service
	        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

	        //Map modal.html $scope custom properties to defaults defined in service
	        angular.extend(tempModalOptions, modalOptions, customModalOptions);

	        if (!tempModalDefaults.controller) {
	            tempModalDefaults.controller = function ($scope, $modalInstance) {
	                $scope.modalOptions = tempModalOptions;

	                $scope.modalOptions.ok = function (result) {
	                    $modalInstance.close('ok');
	                };
	                $scope.modalOptions.close = function (result) {
	                    $modalInstance.close('cancel');
	                };
	                
	        		$scope.onEnd = function(){
	        			$('.clockpicker').clockpicker(); 
	                };
	            };
	        }

	        return $modal.open(tempModalDefaults).result;
	    };
	    
	    
    	    
	    this.isValidStartEndTime = function(startTime, endTime){
	    	var flag = false;
	    	var startTimeArray = startTime.split(":");
	    	var endTimeArraay = endTime.split(":");
    		if(parseInt(startTimeArray[0]) > parseInt(endTimeArraay[0])){
    			flag = true;
    		}
    		else if(parseInt(startTimeArray[0]) == parseInt(endTimeArraay[0]) 
    				&& parseInt(startTimeArray[1]) > parseInt(endTimeArraay[1])){
    			flag = true;
    		}
	    	return flag;
	    }
        
    };
    
    app.service('modalService', ['$modal',modalService]);

});