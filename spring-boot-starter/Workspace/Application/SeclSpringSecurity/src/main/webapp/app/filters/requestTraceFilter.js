
'use strict';

define(['app'], function (app) {

    var requestTraceFilter = function () {

        return function (requesrTraces, filterValue) {
            if (!filterValue) return requesrTraces;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < requesrTraces.length; i++) {
                var requesrTrace = requesrTraces[i];
                if (requesrTrace.requestID.toLowerCase().indexOf(filterValue) > -1 ||
                		requesrTrace.accountID.toLowerCase().indexOf(filterValue) > -1 ||
                		requesrTrace.transType.toLowerCase().indexOf(filterValue) > -1 ||
                		//requesrTrace.transDate.toLowerCase().indexOf(filterValue) > -1 ||
                		requesrTrace.transStatus.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(requesrTrace);
                }
            }
            return matches;
        };
    };

    app.filter('requestTraceFilter', requestTraceFilter);

});