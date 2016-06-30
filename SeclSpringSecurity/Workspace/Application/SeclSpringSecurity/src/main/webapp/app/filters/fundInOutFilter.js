
'use strict';

define(['app'], function (app) {

    var fundInOutFilter = function () {

        return function (customers, filterValue) {
            if (!filterValue) return customers;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < customers.length; i++) {
                var customer = customers[i];
                if (customer.customerID.toLowerCase().indexOf(filterValue) > -1 ||
            		customer.customerName.toLowerCase().indexOf(filterValue) > -1 ||
            		customer.presentAddress.toLowerCase().indexOf(filterValue) > -1 ||
            		customer.permanentAddress.toLowerCase().indexOf(filterValue) > -1 ||
            		customer.mobileNo.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(customer);
                }
            }
            return matches;
        };
    };

    app.filter('fundInOutFilter', fundInOutFilter);

});