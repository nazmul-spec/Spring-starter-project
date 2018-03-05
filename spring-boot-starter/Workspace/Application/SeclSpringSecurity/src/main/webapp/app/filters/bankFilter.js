
'use strict';

define(['app'], function (app) {

    var bankFilter = function () {

        return function (banks, filterValue) {
            if (!filterValue) return banks;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < banks.length; i++) {
                var bank = banks[i];
                if (bank.bankID.toLowerCase().indexOf(filterValue) > -1 ||
                		bank.bankName.toLowerCase().indexOf(filterValue) > -1 ||
                		bank.bankID.toLowerCase().indexOf(filterValue) > -1 ||
                		bank.status.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(bank);
                }
            }
            return matches;
        };
    };

    app.filter('bankFilter', bankFilter);

});