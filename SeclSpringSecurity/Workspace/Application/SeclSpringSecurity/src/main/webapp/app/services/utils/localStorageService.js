


define(['app'], function (app) {

    var localStorageService = function () {
    	
        this.setValue = function (key, data) {
            if (typeof (Storage) !== "undefined") {
                //window.localStorage.setItem(key, JSON.stringify(data));
                window.sessionStorage.setItem(key, JSON.stringify(data));
            }
        };
        
        this.getValue = function (key) {
            if (typeof (Storage) !== "undefined") {
                //return $.parseJSON(window.localStorage.getItem(key));
            	return $.parseJSON(window.sessionStorage.getItem(key));
            }
        };
        
        this.removeValue = function (key) {
        	if (typeof (Storage) !== "undefined") {
        		//window.localStorage.removeItem (key);
        		window.sessionStorage.removeItem (key);
        	}
        };
    };
    
    app.service('localStorageService', [localStorageService]);

});


