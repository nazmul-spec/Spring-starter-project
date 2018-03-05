
'use strict';

define(['app'], function (app) {

    var repeatEnd = function () {
    	return {
            restrict: "A",
            link: function (scope, element, attrs) {
                if (scope.$last) {
                    scope.$eval(attrs.repeatEnd);
                }
            }
        };
    };

    app.directive('repeatEnd', [repeatEnd]);

});