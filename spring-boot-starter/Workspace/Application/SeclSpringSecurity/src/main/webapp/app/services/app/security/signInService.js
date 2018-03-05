
'use strict';

define(['app', 'services/utils/configurationService'], function (app) {

    var signInService = function ($resource, $q, configurationService) {
    	
    	var signInResource, resetPasswordResource, delay;
        
        signInResource = $resource(configurationService.login, {}, {
            signin: { 
            	method: 'POST', 
            	headers : {'Content-Type': 'application/x-www-form-urlencoded'}}
        });
        
        resetPasswordResource = $resource(configurationService.signinResetPassword, {}, {
			resetPassword: { method: 'POST' }
        });
        
        
        this.doSignIn = function (obj) {
            delay = $q.defer();
            /*var data = { success : true};
            delay.resolve(data);*/
            signInResource.signin(obj, function (data) {
                delay.resolve(data);
            }, function () {
                delay.reject('Unable to fetch..');
            });
            return delay.promise;
        };
        
        this.doResetPassword = function (obj) {
	        delay = $q.defer();
	        resetPasswordResource.resetPassword(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
	    
    };
    
    app.service('signInService', ['$resource', '$q', 'configurationService', signInService]);

});







