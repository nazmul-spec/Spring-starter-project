
'use strict';

define(['app'], function (app) {

    var agentStaffFilter = function () {

        return function (accounts, filterValue) {
            if (!filterValue) return accounts;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < accounts.length; i++) {
                var account = accounts[i];
                if (account.accountID.toLowerCase().indexOf(filterValue) > -1 ||
                		account.accountName.toLowerCase().indexOf(filterValue) > -1 ||
                		account.accountID.toLowerCase().indexOf(filterValue) > -1 ||
                		account.status.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(account);
                }
            }
            return matches;
        };
    };

    app.filter('agentStaffFilter', agentStaffFilter);

});