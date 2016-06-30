
'use strict';

define(['app'], function (app) {

    var transFilter = function () {
        return function (acoountStates, filterValue) {
            if (!filterValue) return acoountStates;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < acoountStates.length; i++) {
                var acoountState = acoountStates[i];
                if (acoountState.transId.toLowerCase().indexOf(filterValue) > -1 ||
            		acoountState.referenceId.toLowerCase().indexOf(filterValue) > -1 ||
            		acoountState.strTransDate.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(acoountState);
                }
            }
            return matches;
        };
    };

    app.filter('transFilter', transFilter);

});