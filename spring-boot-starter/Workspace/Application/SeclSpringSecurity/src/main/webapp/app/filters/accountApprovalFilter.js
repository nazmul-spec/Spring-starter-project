
'use strict';

define(['app'], function (app) {

    var accountApprovalFilter = function () {

        return function (accounts, filterValue) {
            if (!filterValue) return accounts;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < accounts.length; i++) {
                var account = accounts[i];
                if (account.accountID.toLowerCase().indexOf(filterValue) > -1 ||                   
                    account.accountTitle.toLowerCase().indexOf(filterValue) > -1 ||
                    account.nationalIDNo.toLowerCase().indexOf(filterValue) > -1 ||
                    account.mobileNo.toLowerCase().indexOf(filterValue) > -1 ||
                    account.accountStatus.toLowerCase().indexOf(filterValue) > -1 ||
                    account.applicationDate.toLowerCase().indexOf(filterValue) > -1 ||
                    account.accountOpeningDate.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(agent);
                }
            }
            return matches;
        };
    };

    app.filter('accountApprovalFilter', accountApprovalFilter);

});