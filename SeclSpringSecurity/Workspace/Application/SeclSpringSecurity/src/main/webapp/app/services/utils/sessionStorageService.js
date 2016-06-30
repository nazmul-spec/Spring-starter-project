
define(['app'], function (app) {

    var sessionStorageService = function () {
    	
    	this.setData = function (key, data) {
            if (typeof (Storage) !== "undefined") {
                //window.sessionStorage.setItem(key, JSON.stringify(data));
                window.localStorage.setItem(key, JSON.stringify(data));
            }
        };
        
        this.getData = function (key) {
            if (typeof (Storage) !== "undefined") {
                //return $.parseJSON(window.sessionStorage.getItem(key));
                return $.parseJSON(window.localStorage.getItem(key));
            }
        };
        
    };
    app.service('sessionStorageService', [sessionStorageService]);

});

