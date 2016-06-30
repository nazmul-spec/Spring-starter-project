
'use strict';

define(['app'], function (app) {

    var depositSummaryFilter = function () {

        return function (trnsums, filterValue) {
            if (!filterValue) return trnsums;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < trnsums.length; i++) {
                var trnsum = trnsums[i];

                    matches.push(trnsum);
           
            }
            return matches;
        };
    };

    app.filter('depositSummaryFilter', depositSummaryFilter);

});