
'use strict';

define(['app'], function (app) {
	
var yearDrop = function () {
	function getYears(){
        var startingYear = 2015;
        var years = [];
        var range = new Date().getFullYear()- startingYear;
        
        for (var i = 0; i < range + 1; i++){
            years.push(startingYear + i);
        }
        return years;
    }
    return {
        link: function(scope,element,attrs){
        	scope.years = getYears();
            scope.selected = scope.years[0];
        },
        template: '<select class="form-control" id="yearDrop" ui-select2 data-ng-model="calendar.calendarYear" placeholder="Select Year"><option></option><option data-ng-selected="{{y == calendar.calendarYear}}"data-ng-repeat="y in years" value="{{y}}">{{y}}</option></select>'       	
        	
    }
   };
    app.directive('yearDrop', [yearDrop]);
});




















