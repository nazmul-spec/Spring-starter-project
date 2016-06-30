
'use strict';

define(['app'], function (app) {

    var branchFilter = function () {

        return function (branches, filterValue) {
            if (!filterValue) return branches;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < branches.length; i++) {
                var branch = branches[i];
                if (branch.branchID.toLowerCase().indexOf(filterValue) > -1 ||
            		branch.branchName.toLowerCase().indexOf(filterValue) > -1 ||
            		branch.status.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(branch);
                }
            }
            return matches;
        };
    };

    app.filter('branchFilter', branchFilter);

});