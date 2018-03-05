'use strict';

define(['app'], function (app) {

    var mydatepicker = function ($parse) {    	
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs) {
                var ngModel = $parse(attrs.ngModel);
                $(function() {
                    element.datepicker({
                        showOn: "focus",
                        changeYear: true,
                        changeMonth: true,
                        dateFormat: 'dd-M-yy',
                        //maxDate: new Date(),
                        yearRange: '1920:' + new Date().getFullYear(),
                        defaultDate: new Date(),
                        onSelect: function(dateText) {
                            scope.$apply(function() {
                                // Change binded variable
                                ngModel.assign(scope, dateText);
                            });
                        }
                    });
                });
            }
        }
    };

    app.directive('mydatepicker', [ mydatepicker]);

});