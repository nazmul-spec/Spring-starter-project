
'use strict';

define(['app'], function (app) {

    var customerAccountFilter = function () {

        return function (customerAccounts, filterValue) {
            if (!filterValue) return customerAccounts;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < customerAccounts.length; i++) {
                var customerAccount = customerAccounts[i];
                if (customerAccount.customerAccountID.toLowerCase().indexOf(filterValue) > -1 ||
            		customerAccount.customerAccountName.toLowerCase().indexOf(filterValue) > -1 ||
            		customerAccount.status.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(customerAccount);
                }
            }
            return matches;
        };
    };

    app.filter('customerAccountFilter', customerAccountFilter);

});