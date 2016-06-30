
'use strict';

define(['app', 'services/utils/constantService'], function (app) {

    var messageService = function ($rootScope, constantService) {
    	
    	var showMessage, showModalMessage;
    	
        this.showMessage = function (msgType, msgText) {
            var message = {};
            message.type = msgType;
            message.msg = msgText;
            $rootScope.$broadcast(constantService.AlertMessage, message);
        };
        
        this.showMessageText = function (msgType, msgText) {
            var message = {};
            message.type = msgType;
            message.msgtxt = msgText;
            message.msg = "BLANK";
            $rootScope.$broadcast(constantService.AlertMessage, message);
        };
        
        this.showModalMessage = function (msgType, msgText) {
            var message = {};
            message.type = msgType;
            message.msg = msgText;
            $rootScope.$broadcast(constantService.AlertModalMessage, message);
        };
        
    };
    
    app.service('messageService', ['$rootScope', 'constantService', messageService]);

});

