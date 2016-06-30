'use strict';

define(
		[ 'app' ],
		function(app) {

			var requestTraceService = function($rootScope, $resource, $q,
					$cookieStore, messageService, constantService,
					configurationService) {

				var getRequestTraceByRequestID, getRequestTraceByCBSReferenceNo, traceResource, delay, doValidateForm, doValidateFormAccount;

				traceResource = $resource(configurationService.requestTrace,{}, {
							getRequestTrace 		: {method : 'POST'},
							getRequestTraceByCBSReferenceNo : {method : 'POST'},
							getRequestTraceByRequestID 		: {method : 'POST'}
						});

				this.getRequestTrace = function(obj) {
					delay = $q.defer();
					traceResource.getRequestTrace(obj,
							function(data) {
								delay.resolve(data);
							}, function() {
								delay.reject('Unable to fetch..');
							});
					return delay.promise;
				};

				this.getRequestTraceByRequestID = function(obj) {
					delay = $q.defer();
					traceResource.getRequestTraceByRequestID(obj,
							function(data) {
								delay.resolve(data);
							}, function() {
								delay.reject('Unable to fetch..');
							});
					return delay.promise;
				};
				
				this.getRequestTraceByCBSReferenceNo = function(obj) {
					delay = $q.defer();
					traceResource.getRequestTraceByCBSReferenceNo(obj,
							function(data) {
								delay.resolve(data);
							}, function() {
								delay.reject('Unable to fetch..');
							});
					return delay.promise;
				};
				this.doValidateFormCBSReferenceNo = function(obj) {

					if ($('#referenceNo').val() == "") {
						messageService.showMessage(constantService.Info,'RF1000');
						$("#referenceNo").focus();
						return false;
					}

					return true;
				};
				this.doValidateForm = function(obj) {

					if ($('#requestID').val() == "") {
						messageService.showMessage(constantService.Info,'RF1000');
						$("#requestID").focus();
						return false;
					}

					return true;
				};
				
				this.doValidate = function(searchParam) {
					/*if ($('#requestTraceType').val() == "") {
						messageService.showMessage(constantService.Danger, 'RF1000');
						$('#s2id_requestTraceType input').focus();
						  return false;
					}
					if (obj.requestTraceType == 'requestID' && $('#requestID').val().trim() == "") {
						messageService.showMessage(constantService.Info,'RF1000');
						$("#requestID").focus();
						return false;
					}
					if (obj.requestTraceType == 'CBSReferenceNo' && $('#CBSReferenceNo').val() == "") {
						messageService.showMessage(constantService.Info,'RF1000');
						$("#CBSReferenceNo").focus();
						return false;
					}
					if (obj.requestTraceType == 'accountID' && $('#accountID').val() == "") {
						messageService.showMessage(constantService.Info,'RF1000');
						$("#accountID").focus();
						return false;
					}
					if (obj.requestTraceType == 'accountID' && $('#accountID').val() != "") {
						if ($('#selectFromDate').val() == "") {
							messageService.showMessage(constantService.Info,'RF1000');
							$("#selectFromDate").focus();
							return false;
						} 
						if ($('#selectToDate').val() == "") {
							messageService.showMessage(constantService.Info,'RF1000');
							$("#selectToDate").focus();
							return false;
						}
						if ($('#selectFromDate').val().trim() != "" && $('#selectToDate').val().trim() != "") {
				    		var fromDate = new Date($('#selectFromDate').val().trim());
					    	var toDate = new Date($('#selectToDate').val().trim());
				    		if (fromDate > toDate) {
				    			messageService.showMessage(constantService.Danger, 'FTD1000');			            
					            return false;
							}
				        }
					}
					
					return true;*/
					
					if ($('#requestTraceType').val() == "") {
						messageService.showMessage(constantService.Danger, 'RF1000');
						$('#s2id_requestTraceType input').focus();
						  return false;
					}
			    	
					if (searchParam.requestTraceType === 'requestId' && $('#requestID').val().trim() == "") {
						messageService.showMessage(constantService.Info, 'RF1000');
						$('#requestID').focus();
				            return false;
					}
					
					if (searchParam.requestTraceType === 'accountID') {
						if ( $('#accountID').val().trim() == "") {
				    		messageService.showMessage(constantService.Info, 'RF1000');
				    		$('#accountID').focus();
				            return false;
						}
						if ($('#requestTraceFromDate').val().trim() == "" ) {
			            	messageService.showMessage(constantService.Info, 'RF1000');
			            	 $('#requestTraceFromDate').focus();
				            return false;
				        }
				    	if ( $('#requestTraceToDate').val().trim() == "") {
			            	messageService.showMessage(constantService.Info, 'RF1000');				           
				            $('#requestTraceToDate').focus();
				            return false;
				        }				    	
						
					}
					if (searchParam.requestTraceType === 'agentID') {
						
						if ( $('#agentID').val().trim() == "") {
				    		messageService.showMessage(constantService.Info, 'RF1000');
				    		$('#agentID').focus();
				            return false;
						}
						if ($('#requestTraceFromDate').val().trim() == "" ) {
			            	messageService.showMessage(constantService.Info, 'RF1000');
			            	 $('#requestTraceFromDate').focus();
				            return false;
				        }
				    	if ( $('#requestTraceToDate').val().trim() == "") {
			            	messageService.showMessage(constantService.Info, 'RF1000');				           
				            $('#requestTraceToDate').focus();
				            return false;
				        }				    	
						
					}
					

					if (searchParam.requestTraceType === 'transdate') {
						
						if ($('#requestTraceFromDate').val().trim() == "" ) {
			            	messageService.showMessage(constantService.Info, 'RF1000');
			            	 $('#requestTraceFromDate').focus();
				            return false;
				        }
				    	if ( $('#requestTraceToDate').val().trim() == "") {
			            	messageService.showMessage(constantService.Info, 'RF1000');				           
				            $('#requestTraceToDate').focus();
				            return false;
				        }				    	
						
					}
					
					if (searchParam.requestTraceType === 'servicePointID') {
						
						if ( $('#fromServicePointID').val().trim() == "") {
				    		messageService.showMessage(constantService.Info, 'RF1000');
				    		$('#fromServicePointID').focus();
				            return false;
						}
						else if ( $('#toServicePointID').val().trim() == "") {
				    		messageService.showMessage(constantService.Info, 'RF1000');
				    		$('#toServicePointID').focus();
				            return false;
						}
						else if ($('#requestTraceFromDate').val().trim() == "" ) {
			            	messageService.showMessage(constantService.Info, 'RF1000');
			            	 $('#requestTraceFromDate').focus();
				            return false;
				        }
						else if ( $('#requestTraceToDate').val().trim() == "") {
			            	messageService.showMessage(constantService.Info, 'RF1000');				           
				            $('#requestTraceToDate').focus();
				            return false;
				        }				    	
						
					}
					
					if (searchParam.requestTraceType === 'serviceTerminalID') {
						
						if ( $('#fromServiceTerminalID').val().trim() == "") {
				    		messageService.showMessage(constantService.Info, 'RF1000');
				    		$('#fromServiceTerminalID').focus();
				            return false;
						}
						else if ( $('#toServiceTerminalID').val().trim(Info) == "") {
				    		messageService.showMessage(constantService.Danger, 'RF1000');
				    		$('#toServiceTerminalID').focus();
				            return false;
						}
						else if ($('#requestTraceFromDate').val().trim() == "" ) {
			            	messageService.showMessage(constantService.Info, 'RF1000');
			            	 $('#requestTraceFromDate').focus();
				            return false;
				        }
						else if ( $('#requestTraceToDate').val().trim() == "") {
			            	messageService.showMessage(constantService.Info, 'RF1000');				           
				            $('#requestTraceToDate').focus();
				            return false;
				        }				    	
						
					}

					if (searchParam.requestTraceType === 'bankAccountNo') {
						
						if ( $('#bankAccountNo').val().trim() == "") {
				    		messageService.showMessage(constantService.Info, 'RF1000');
				    		$('#bankAccountNo').focus();
				            return false;
						}						
						else if ($('#requestTraceFromDate').val().trim() == "" ) {
			            	messageService.showMessage(constantService.Info, 'RF1000');
			            	 $('#requestTraceFromDate').focus();
				            return false;
				        }
						else if ( $('#requestTraceToDate').val().trim() == "") {
			            	messageService.showMessage(constantService.Info, 'RF1000');				           
				            $('#requestTraceToDate').focus();
				            return false;
				        }				    	
						
					}
					
					if (searchParam.requestTraceType === 'referenceNo' && $('#referenceNo').val().trim() == "") {
						messageService.showMessage(constantService.Info, 'RF1000');
						$('#referenceNo').focus();
				            return false;
					}
					
					if (searchParam.requestTraceType === 'transId' && $('#transId').val().trim() == "") {
						messageService.showMessage(constantService.Info, 'RF1000');
						$('#transId').focus();
				            return false;
					}
			
				if (searchParam.requestTraceType === 'branchID') {
						
						if ( $('#selectBranchName').val().trim() == "") {
				    		messageService.showMessage(constantService.Info, 'RF1000');
				    		$('#s2id_selectBranchName input').focus();
				            return false;
						}
						if ($('#requestTraceFromDate').val().trim() == "" ) {
			            	messageService.showMessage(constantService.Info, 'RF1000');
			            	 $('#requestTraceFromDate').focus();
				            return false;
				        }
				    	if ( $('#requestTraceToDate').val().trim() == "") {
			            	messageService.showMessage(constantService.Info, 'RF1000');				           
				            $('#requestTraceToDate').focus();
				            return false;
				        }				    	
						
					}
			    	return true;
					
				};
			};

			app.service('requestTraceService', [ '$rootScope', '$resource',
					'$q', '$cookieStore', 'messageService', 'constantService',
					'configurationService', requestTraceService ]);

		});
