
'use strict';

define(['app'], function (app) {

    var comboCollection = function () {
        return {
        	restrict: 'EAC',
            transclude: true,
    		replace: true,
    		scope: {
    			options: '=',
    			selecteditem: '='
    		},
    		template: "<select data-ng-model='selecteditem' class='form-control' ui-select2=''"+
							  "placeholder='Sector' id='inputSector'"+
							  "data-ng-disabled='isFieldDisabled.Sector'>"+
						  "<option></option>",
			controller: function ($scope, $element, $attrs) {
				
       			for(var i=0; i<$scope.options.length; i++)
   				{
       				$scope.item = $scope.options[i];
       				$element.append("<option value='"+$scope.item.sectorID+"'>"+$scope.item.sectorName+"</option>");
   				}
       			$element.append("</select>");
       			
       		}
        };
    };

    app.directive('comboCollection', [comboCollection]);

});