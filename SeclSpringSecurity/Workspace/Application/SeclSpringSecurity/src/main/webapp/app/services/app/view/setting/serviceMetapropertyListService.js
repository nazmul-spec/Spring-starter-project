
'use strict';

define(['app'], function (app) {

	var serviceMetapropertyListService = function ($rootScope, $resource, $q,  $cookieStore, constantService, 
		configurationService, localStorageService) {
		
		var getColumnDefs, setCustomToolbar, getAllServiceMetaProperty, settingsResource, delay, settingsResource ;
		
		
		settingsResource = $resource(configurationService.serviceMetaproperty, {id: '@id'}, {
			getAllServiceMetaProperty: { method: 'POST' }
	    });    
	   
	    
		getAllServiceMetaProperty = function (obj) {
	        delay = $q.defer();
	        settingsResource.getAllServiceMetaProperty(obj, function (data) {
	            delay.resolve(data);
	        }, function () {
	            delay.reject('Unable to fetch..');
	        });
	        return delay.promise;
	    };
		
	    setCustomToolbar = function () {	    	
	        $("#buttonDiv").empty();
	        $("#buttonDiv").addClass("buttonDiv");
	        $("#buttonDiv").parent().find('div').eq(1).find('select').addClass("cmbDataTableLength");
	    };
	    
	    getColumnDefs = function (userInfo) {
	        
	        var columnDefs = [
	            {
	                "mDataProp": "propertyID",
	                "sWidth": "25%",
	                "sTitle": constantService.propertyIDBn,
	                "aTargets": [0],
	                "bSearchable": true,
	                "bSortable": true,
	                "fnRender": function (obj) {
	                	return obj.aData["propertyID"];
	                }
	            },
	            {
	                "mDataProp": "valueJSON",
	                "sTitle": constantService.jsonBn,
	                "sType": "html",
	                "aTargets": [1],
	                "bSearchable": true,
	                "bSortable": true,
	                "fnRender": function (obj) {
	                	/*var json = angular.fromJson(obj.aData["valueJSON"]);
	                    return json.join(", ");*/
	                    return obj.aData["valueJSON"];
	                }
	            },
	            
	            {
	                "mDataProp": "description",
	                "sTitle": constantService.DescriptionBn,
	                "sWidth": "25%",
	                "aTargets": [2],
	                "bSearchable": true,
	                "bSortable": true,
	                "fnRender": function (obj) {
	                	return obj.aData["description"];
	                }
	            }
	        ];
	        if (userInfo.selectedLanguage == constantService.English) {
	        	columnDefs[0].sTitle = constantService.propertyIDEn;
	            columnDefs[1].sTitle = constantService.jsonEn;
	            columnDefs[2].sTitle = constantService.DescriptionEn;
	        }
	    	 
	        return columnDefs;
	    };
	    

	    return {
	        getColumnDefs: getColumnDefs, getAllServiceMetaProperty: getAllServiceMetaProperty,
	        setCustomToolbar: setCustomToolbar
	    };
	    
		
		
	};
	
	 app.service('serviceMetapropertyListService', ['$rootScope', '$resource', '$q', '$cookieStore', 
        'constantService', 'configurationService', 'localStorageService', serviceMetapropertyListService]);
	
});



/*
setCustomToolbar = function () {
	var isDisable = "";
    //var isDisable = "disabled = \"false\"";
    
    var btnNew = constantService.NewBn;
    if ($rootScope.selectedLanguage == constantService.English) {
        btnNew = constantService.NewEn;
    }
    
    $("#buttonDiv").empty();
    $("#buttonDiv").addClass("buttonDiv");
    $("#buttonDiv").append("<input id='btnNew' type='button' class='btn btn-success btn-primary' value='" + btnNew + "' " + isDisable + "/>&nbsp;&nbsp;&nbsp;");
    $("#buttonDiv").parent().find('div').eq(1).find('select').addClass("cmbDataTableLength");
};*/

