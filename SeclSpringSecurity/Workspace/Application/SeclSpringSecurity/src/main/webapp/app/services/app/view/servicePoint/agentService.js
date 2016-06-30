

'use strict';

define(['app'], function (app) {

	var agentService = function ($rootScope, $resource, $q, constantService, messageService, configurationService) {		

		var agentResource, agentDetailsResource, resetPasswordResource, delay, updateAgentStatus, getAllAgent, getOperationalAcNoByAgentID, agentInfo, doResetPassword;
		var newAgentResource, UpdateResetPassword ,newAgentComboResource, delay, saveOrUpdateAgent, getAgentInfoByID,isValidForm, isValidEmail,agentResetPassword,isValidResetForm, getAllAgentResetPasswordList,getAgentResetInfoByID;		

		newAgentResource = $resource(configurationService.newAgent, {}, {
			saveOrUpdateAgent:		{ method: 'POST' },
			getAgentInfoByID:		{ method: 'POST' }
		});
		agentResource = $resource(configurationService.agentList, {}, {
			getAllAgent : 					{ method: 'POST' },
			getOperationalAcNoByAgentID : 	{ method: 'POST' },
			getAllAgentResetPasswordList :  { method: 'POST' },
			updateAgentStatus : 			{ method: 'POST' }
		});

		resetPasswordResource = $resource(configurationService.agentResetPassword, {}, {
			resetPassword: 		{ method: 'POST' },
			agentResetPassword: { method: 'POST' },
			UpdateResetPassword: { method: 'POST' },
			getAgentResetInfoByID:	{ method: 'POST' }
		});

		agentDetailsResource = $resource(configurationService.agentDetails, {}, {
			agentInfo : { method: 'POST' },
		});

		agentInfo = function (obj) {
			delay = $q.defer();
			agentDetailsResource.agentInfo(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};

		getAllAgent = function (obj) {
			delay = $q.defer();
			agentResource.getAllAgent(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};
		
		getOperationalAcNoByAgentID = function (obj) {
			delay = $q.defer();
			agentResource.getOperationalAcNoByAgentID(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};
		
		getAllAgentResetPasswordList = function (obj) {
			delay = $q.defer();
			agentResource.getAllAgentResetPasswordList(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};
		
		updateAgentStatus = function (obj) {
			delay = $q.defer();
			agentResource.updateAgentStatus(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};

		doResetPassword = function (obj) {
			delay = $q.defer();
			resetPasswordResource.resetPassword(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};

		agentResetPassword = function (obj) {
			delay = $q.defer();
			resetPasswordResource.agentResetPassword(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};
		
		UpdateResetPassword = function (obj) {
			delay = $q.defer();
			resetPasswordResource.UpdateResetPassword(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};
		
		saveOrUpdateAgent = function (obj) {
			delay = $q.defer();
			newAgentResource.saveOrUpdateAgent(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};
		
		getAgentResetInfoByID = function (obj) {
			delay = $q.defer();
			resetPasswordResource.getAgentResetInfoByID(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};
		
		isValidForm = function (agent, passwordShow) {

			if ($('#selectBankName').val() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#s2id_selectBankName input').focus();
				return false;
			}
			
			if ($('#selectBranchName').val() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#s2id_selectBranchName input').focus();
				return false;
			} 
			if ($('#selectAgentCat').val() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#s2id_selectAgentCat input').focus();
				return false;
			}
			    

			if ($('#agentType').val() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#s2id_agentType input').focus();
				return false;
			}

			if ($('#agentType').val() === 'SA') {
				if ($('#parentAgent').val() == "") {
					messageService.showMessage(constantService.Danger, 'RF1000');
					$('#s2id_parentAgent input').focus();
					return false;
				}
			}
			if ($("#inputAgentName") !== null && $('#inputAgentName').val().trim() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#inputAgentName').focus();
				return false;
			}
			if(passwordShow)
			{
				if ($("#inputAgentPassword") !== null && $('#inputAgentPassword').val().trim() == "") {
					messageService.showMessage(constantService.Danger, 'RF1000');
					$('#inputAgentPassword').focus();
					return false;
				}

				if ($("#inputConfirmPassword") !== null && $('#inputConfirmPassword').val().trim() == "") {
					messageService.showMessage(constantService.Danger, 'RF1000');
					$('#inputConfirmPassword').focus();
					return false;
				}

				if ($('#inputAgentPassword').val() !== $('#inputConfirmPassword').val()) {
					messageService.showMessage(constantService.Danger, 'CNFPDM1000');
					$("#inputConfirmPassword").focus();
					return;
				}							
			}

			if(agent.operationalAccountList == null || agent.operationalAccountList.length < 1){
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#agentOperationalAccountNo').focus();
				return false;
			}
			
			if(agent.transactionalAccountList == null || agent.transactionalAccountList.length < 1){
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#agentTransactionalAccountNo').focus();
				return false;
			}

			


			if ($("#FatherName") !== null && $('#FatherName').val().trim() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#FatherName').focus();
				return false;
			}

			if ($("#MotherName") !== null && $('#MotherName').val().trim() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#MotherName').focus();
				return false;
			}

			if ($('#BirthDate').val() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#BirthDate').focus();
				return false;
			}

			if ($("#inputAgentMobile") !== null && $('#inputAgentMobile').val().trim() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#inputAgentMobile').focus();
				return false;
			}

			if (($('#inputAgentMobile').val() != "") && (!constantService.regexForMobileNo.test($('#inputAgentMobile').val()))) {
				messageService.showMessage(constantService.Danger, 'EDP1002');
				$("#inputAgentMobile").focus();
				return false;
			}

			if (($('#inputAgentMobile').val().length < 11)) {
				messageService.showMessage(constantService.Danger, 'EDP1001');
				$("#inputAgentMobile").focus();
				return false;
			}

			if (($('#inputAgentEmail').val().trim() != "") && (!constantService.regexForEmail.test($('#inputAgentEmail').val()))) {
				messageService.showMessage(constantService.Danger, 'EVE1000');
				$("#inputAgentEmail").focus();
				return false;
			}

			if ($("#presentAddress") !== null && $('#presentAddress').val().trim() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#presentAddress').focus();
				return false;
			}
			if ($("#permanentAddress") !== null && $('#permanentAddress').val().trim() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#permanentAddress').focus();
				return false;
			}

			if(agent.kyc.gender == undefined || agent.kyc.gender == null || agent.kyc.gender == ''){
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#genderRadioMale').focus();
				return false;
			}

			if ($('#selectNationality').val() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#s2id_selectNationality input').focus();
				return false;
			}
			/*var NationalIDNo =  $('#NationalIDNo').val();
			var PassportNo =  $('#PassportNo').val();
			var tinNo =  $('#tinNo').val();
			var BirthRegNo =  $('#BirthRegNo').val();*/

			if (($("#NationalIDNo") !== null && $('#NationalIDNo').val().trim() == "" )&& ($("#tinNo") !== null && $('#tinNo').val().trim() == "")
					&& ($("#PassportNo") !== null && $('#PassportNo').val().trim() == "") && ($("#BirthRegNo") !== null && $('#BirthRegNo').val().trim() == "")) {
				messageService.showMessage(constantService.Danger, 'RF1002');	        	
				$('#NationalIDNo').focus();
				return false;
			}

			return true;
		};
		
		isValidResetForm = function (obj) {
		
		if ($('#AgentID').val() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$("#AgentID").focus();
			return;
		}
		if ($('#LoginID').val() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$("#LoginID").focus();
			return;
		}
		if ($('#NewPassword').val() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$("#NewPassword").focus();
			return;
		}
		if ($('#Confirm_Password').val() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$("#Confirm_Password").focus();
			return;
		}
		if (!constantService.isAlphaNumeric($('#NewPassword').val().trim())) {
			messageService.showMessage(constantService.Danger, 'Ivp1001');
			$("#NewPassword").focus();
			return;
		}
		if (($('#NewPassword').val().trim().length < 8)) {
			messageService.showMessage(constantService.Danger, 'Ivp1002');
			$("#NewPassword").focus();
			return;
		}
		if ($('#NewPassword').val() !== $('#Confirm_Password').val()) {
			messageService.showMessage(constantService.Danger, 'CNFPDM1000');
			$("#Confirm_Password").focus();
			return;
		}
		
		return true;
	};
		getAgentInfoByID = function (obj) {
			var delay1 = $q.defer();
			newAgentResource.getAgentInfoByID(obj, function (data) {
				delay1.resolve(data);
			}, function () {
				delay1.reject('Unable to fetch..');
			});
			return delay1.promise;
		};

		return {
			saveOrUpdateAgent : saveOrUpdateAgent, 
			getAgentResetInfoByID : getAgentResetInfoByID, 
			getAgentInfoByID : getAgentInfoByID,
			isValidForm : isValidForm,
			isValidResetForm : isValidResetForm,
			updateAgentStatus : updateAgentStatus,
			UpdateResetPassword : UpdateResetPassword,
			getAllAgent : getAllAgent,
			getAllAgentResetPasswordList : getAllAgentResetPasswordList,
			resetPassword: doResetPassword,
			agentResetPassword: agentResetPassword,
			getOperationalAcNoByAgentID : getOperationalAcNoByAgentID,
			agentInfo : agentInfo
		};

	};

	app.service('agentService', ['$rootScope', '$resource', '$q', 'constantService', 'messageService',
	                             'configurationService', agentService]);	
});

