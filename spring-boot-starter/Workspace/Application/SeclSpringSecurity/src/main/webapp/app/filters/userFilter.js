
'use strict';

define(['app'], function (app) {

    var userFilter = function () {

        return function (users, filterValue) {
            if (!filterValue) return users;

            var matches = [];
            filterValue = filterValue.toLowerCase();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.loginId.toLowerCase().indexOf(filterValue) > -1 ||
                    user.email.toLowerCase().indexOf(filterValue) > -1 ||
                    user.roleJSON.toLowerCase().indexOf(filterValue) > -1 ||
                    user.status.toLowerCase().indexOf(filterValue) > -1) {
                    matches.push(user);
                }
            }
            return matches;
        };
    };

    app.filter('userFilter', userFilter);

});