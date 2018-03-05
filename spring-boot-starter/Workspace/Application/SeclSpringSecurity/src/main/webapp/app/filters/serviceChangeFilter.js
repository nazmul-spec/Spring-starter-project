
'use strict';

define(['app'], function (app) {
	
	 var serviceChangeFilter = function () {

	        return function (settings, filterValue) {
	            if (!filterValue) return settings;

	            var matches = [];
	            filterValue = filterValue.toLowerCase();
	            for (var i = 0; i < settings.length; i++) {
	                var setting = settings[i];
	                if (setting.propertyID.toLowerCase().indexOf(filterValue) > -1 ||
	            		setting.valueJSON.toLowerCase().indexOf(filterValue) > -1 ||
	            		setting.description.toLowerCase().indexOf(filterValue) > -1
	            		) {
	                    matches.push(setting);
	                }
	            }
	            return matches;
	        };
	    };

	    app.filter('serviceChangeFilter', serviceChangeFilter);

});
