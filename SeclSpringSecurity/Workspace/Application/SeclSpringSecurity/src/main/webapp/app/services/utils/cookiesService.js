
'use strict';


define(['app'], function (app) {

    var cookiesService = function ($cookieStore) {
    	
    	this.setValue = function (key, value) {
            $cookieStore.put(key, value);
        };

        this.getValue = function (key) {
            return $cookieStore.get(key);
        };
    	
    };
    
    app.service('cookiesService', ['$cookieStore', cookiesService]);

});


