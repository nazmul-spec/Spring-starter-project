
'use strict';

define(['app'], function (app) {

	var productService =  function ($rootScope, $resource, $q, constantService , messageService, configurationService) {
		
	var productResource, delay, validateProductForm,  getAllProducts, saveOrUpdate, getProductByID, updateProductStatus;
    
    
	productResource = $resource(configurationService.product, {}, {
    	getAllProducts : { method: 'POST' },
    	saveOrUpdate: { method: 'POST' },
    	getProductByID: { method: 'POST' },
    	updateProductStatus: {method: 'POST'}
    });
	
	validateProductForm = function (obj) {
    	if ($('#txtProductID').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#txtProductID').focus();
            return false;
        }
    	if ($('#txtProductName').val() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#txtProductName').focus();
            return false;
        }
       
        if ($('#txtProductType').val() == "") {
        	messageService.showMessage(constantService.Danger, 'RF1000');
            $('#txtProductType').focus();
            return false;
        }
        
    
        return true;
    };
    
    getAllProducts = function (obj) {
        delay = $q.defer();
        productResource.getAllProducts(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    saveOrUpdate = function (obj) {
        delay = $q.defer();
        productResource.saveOrUpdate(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    getProductByID = function (obj) {
        delay = $q.defer();
        productResource.getProductByID(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    updateProductStatus = function (obj) {
        delay = $q.defer();
        productResource.updateProductStatus(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    
    
   
    return {
        
    	validateProductForm: validateProductForm, getAllProducts: getAllProducts, saveOrUpdate: saveOrUpdate,
    	getProductByID: getProductByID, updateProductStatus: updateProductStatus
    };

	
	};
	
	 app.service('productService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService', 'configurationService', productService]);
	
});