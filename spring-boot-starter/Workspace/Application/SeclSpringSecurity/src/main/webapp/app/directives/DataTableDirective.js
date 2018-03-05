
'use strict';

define(['app'], function (app) {

    var myTable = function () {
        return {
        	restrict: 'A',
            replace: true,
            controller: function ($scope, $element, $attrs) {
            	
                // apply DataTable options, use defaults if none specified by user
                var options = { };
                if ($attrs.myTable.length > 0) {
                    options = $scope.$eval($attrs.myTable);
                } else {
                    options = {
                        "bStateSave": true,
                        "iCookieDuration": 2419200,
                        "bJQueryUI": true,
                        "bPaginate": false,
                        "bLengthChange": false,
                        "bFilter": false,
                        "bInfo": false,
                        "bDestroy": true
                    };
                }
                // Tell the dataTables plugin what columns to use
                // We can either derive them from the dom, or use setup from the controller           
                var explicitColumns = [];
                $element.find('th').each(function (index, elem) {
                    explicitColumns.push($(elem).text());
                });
                if (explicitColumns.length > 0) {
                    options["aoColumns"] = explicitColumns;
                } else if ($attrs.aoColumns) {
                    options["aoColumns"] = $scope.$eval($attrs.aoColumns);
                }

                // aoColumnDefs is dataTables way of providing fine control over column config
                if ($attrs.aoColumnDefs) {
                    options["aoColumnDefs"] = $scope.$eval($attrs.aoColumnDefs);
                }

                if ($attrs.fnRowCallback) {
                    options["fnRowCallback"] = $scope.$eval($attrs.fnRowCallback);
                }

                if ($attrs.fnDrawCallback) {
                    options["fnDrawCallback"] = $scope.$eval($attrs.fnDrawCallback);
                }

                if ($attrs.fnFooterCallback) {
                    options["fnFooterCallback"] = $scope.$eval($attrs.fnFooterCallback);
                }

                if ($attrs.fnInitComplete) {
                    options["fnInitComplete"] = $scope.$eval($attrs.fnInitComplete);
                }
                
                
                // apply the plugin
                var dataTable = $element.dataTable(options);
                // watch for any changes to our data, rebuild the DataTable
                $scope.$watch($attrs.aaData, function(value) {
                    var val = value || null;
                    if (val) {
                        dataTable.fnClearTable();
                        dataTable.fnAddData($scope.$eval($attrs.aaData));
                    }
                });

                $scope.reloadGrid = function() {
                    dataTable.fnDraw();
                };

                $scope.getData = function() {
                    return dataTable.fnGetData();
                };
                
                $scope.dataTableGrouping = function(){
                	dataTable.rowGrouping({bExpandableGrouping: true,
                        iGroupingColumnIndex: 0,
                        sGroupingColumnSortDirection: "desc",
                        iGroupingOrderByColumnIndex: 0
                     });
                };

                $scope.switchLanguage = function (option) {
                    dataTable.fnDestroy(); //important! you have to destroy first or you'll get an alert-error.
                    dataTable = null;
                    //dataTable = $element.dataTable(option);
                    /*dataTable.fnSettings().oLanguage = option;
                    dataTable.fnDraw();*/
                };
            	
            }
        	
        }
    };

    app.directive('myTable', [myTable]);

});

