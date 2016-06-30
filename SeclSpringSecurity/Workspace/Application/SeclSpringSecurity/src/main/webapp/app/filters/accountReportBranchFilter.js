
'use strict';

define(['app'], function (app) {

    var accountFilter = function () {

        return function (accounts, filterValue) {
            if (!filterValue) return accounts;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < accounts.length; i++) {
                var account = accounts[i];
                if (
                		account.branchID.toLowerCase().indexOf(filterValue) > -1 ||
                		account.branchName.toLowerCase().indexOf(filterValue) > -1 ||
                		account.accountID.toLowerCase().indexOf(filterValue) > -1 ||
                		account.accountTitle.toLowerCase().indexOf(filterValue) > -1 ||
                		account.accountStatus.toLowerCase().indexOf(filterValue) > -1 ) {
                    matches.push(account);
                }
            }
            return matches;
        };
    };

    app.filter('accountReportBranchFilter', accountFilter);

});