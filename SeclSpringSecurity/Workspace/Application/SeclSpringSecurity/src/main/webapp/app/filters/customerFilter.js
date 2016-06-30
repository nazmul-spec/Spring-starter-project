
'use strict';

define(['app'], function (app) {

    var customerFilter = function () {

        return function (customers, filterValue) {
            if (!filterValue) return customers;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < customers.length; i++) {
                var customer = customers[i];
                if (customer.customerID.toLowerCase().indexOf(filterValue) > -1 ||
            		customer.customerName.toLowerCase().indexOf(filterValue) > -1 ||
            		customer.customerType.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(customer);
                }
            }
            return matches;
        };
    };

    app.filter('customerFilter', customerFilter);

});