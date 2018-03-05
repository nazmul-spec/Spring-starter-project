
'use strict';

define(['app'], function (app) {

	var ddlMetaDataService =  function ($rootScope, $resource, $q, constantService , messageService, configurationService) {
		
	
    var requestResource, delay, postRequest, validateForm, checkDuplicate;
    
    requestResource = $resource(configurationService.ddlMetadataUrl, {}, {
    	post : { method: 'POST' }
    });   
    
    
    postRequest = function (obj) {    
    	delay = $q.defer();
    	requestResource.post(obj, function (data) {
            delay.resolve(data);
        }, function () {
            delay.reject('Unable to fetch..');
        });
        return delay.promise;
    };
    
    
    validateForm = function (ddlData) {
    	var keepGoing = true;
		var msgCode = '';
		
    	if ($('#title').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#title').focus();
            return false;
        }
    	if ($('#ddltype').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#ddltype').focus();
            return false;
        }
    	if ($('#description').val().trim() == "") {
    		messageService.showMessage(constantService.Danger, 'RF1000');
            $('#description').focus();
            return false;
        }
    	
		for (var i = 0; i < ddlData.length; i++) {
			
			if ($("#ID-input-" + i).val().trim() == '') {
				$("#ID-input-" + i).focus();
				keepGoing = false;
				msgCode = 'RF1000';
				break;	
			}
			
			
			if ($("#name-input-" + i).val().trim() == "") {
				$("#name-input-" + i).focus();
				keepGoing = false;
				msgCode = 'RF1000';
				break;						
			}
			 
			if ($("#sortOrder-input-" + i).val().trim() == "") {
				$("#sortOrder-input-" + i).focus();
				keepGoing = false;
				msgCode = 'RF1000';
				break;
			}
			else if (($("#sortOrder-input-" + i).val().trim() != "") && (!constantService.regexForNumericField.test($("#sortOrder-input-" + i).val()))) {
					
					$("#sortOrder-input-" + i).focus();
					keepGoing = false;
					msgCode = 'EDP1106';
					break;	
				}
		}
		
		if (!keepGoing) {
			messageService.showMessage(constantService.Danger, msgCode);
			false;
		}else {
			 return true;
		}        
       
    };
    
    checkDuplicate = function(ddls){
    	var isDuplicate = false;
    	var msgCode = '';
    	for (var i = 0; i < ddls.length; i++) {			
			for (var j = 0; j < ddls.length; j++) {
				if (ddls[j].ID === ddls[i].ID && i != j) {
					$("#ID-input-" + j).focus();
					isDuplicate = true;
					msgCode = 'ID-input-dup';
					break;
				}
				else if (ddls[j].name === ddls[i].name && i != j) {
					$("#name-input-" + j).focus();
					isDuplicate = true;
					msgCode = 'name-input-dup';
					break;
				}
				else if (ddls[j].sortOrder === ddls[i].sortOrder && i != j) {
					$("#sortOrder-input-" + j).focus();
					isDuplicate = true;
					msgCode = 'sortOrder-input-dup';
					break;
				}
				else {
					continue;
				}
			}
			if (isDuplicate === true) {
				messageService.showMessage(constantService.Danger, msgCode);
				break;
			}
		}
    	return isDuplicate;
    };
    
    return {
    	postRequest : postRequest, 	validateForm : validateForm, checkDuplicate: checkDuplicate
    };

	
	};
	
	 app.service('ddlMetaDataService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService', 'configurationService', ddlMetaDataService]);
	
});