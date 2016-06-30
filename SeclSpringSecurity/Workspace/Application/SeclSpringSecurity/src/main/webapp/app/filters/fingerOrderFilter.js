
'use strict';

define(['app'], function (app) {

	var fingerOrderFilter = function () {

        return function (settings, filterValue) {
            if (!filterValue) return settings;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < settings.length; i++) {
                var setting = settings[i];
                if (setting.accountID.toLowerCase().indexOf(filterValue) > -1 ||
            		setting.changeFromFinger.toLowerCase().indexOf(filterValue) > -1 ||
            		setting.changeToFinger.toLowerCase().indexOf(filterValue) > -1 ||
            		setting.changeReason.toLowerCase().indexOf(filterValue) > -1 ||
            		setting.applyDate.toLowerCase().indexOf(filterValue) > -1
            		) {
                    matches.push(setting);
                }
            }
            return matches;
        };
    };

    app.filter('fingerOrderFilter', fingerOrderFilter);

});
