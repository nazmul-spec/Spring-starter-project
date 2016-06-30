
'use strict';

define(['app'], function (app) {

    var customerQr = function () {

        return function (customerQrs, filterValue) {
            if (!filterValue) return customerQrs;
           
            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < customerQrs.length; i++) {
                var customerQr = customerQrs[i];
                if (customerQr.strRequestDate.toLowerCase().indexOf(filterValue) > -1 ||
            		customerQr.strPdfGenerationDate.toLowerCase().indexOf(filterValue) > -1 ||
            		customerQr.pdfFileName.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(customerQr);
                }
            }
            return matches;
        };
    };

    app.filter('customerQr', customerQr);

});