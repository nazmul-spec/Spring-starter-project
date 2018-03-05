
'use strict';

define(['app'], function (app) {

	var profileController = function ($rootScope, $scope, $log, $timeout, $route, _,  messageService, constantService,
			configurationService, navigationService, localStorageService, signInService, ngProgress, loadService, modalService, passwordPolicyService) {

		var userInfo, promis;
		$scope.title = { value: "Change_Password" };
		$scope.isFieldDisabled = true;
		var isValidPassword = false;
		$scope.showGeneratePass = false;
		
		var fieldValidationInit = function(){
			$scope.passFieldValidationResult = {fieldMsg : 'BLANK'};
			$scope.confirmPassFieldValidationResult = {fieldMsg : 'BLANK'};
		};

		var initInputFieldValidationResult = function(field, changeOrBlur){			

			if(field === $scope.passFieldValidationResult)
			{
				fieldValidationInit();
				$scope.passFieldValidationResult = constantService.fieldValidationResult;

				$scope.passFieldValidationResult.fieldObj = $scope.user.newPass;
				$scope.passFieldValidationResult.fieldID = "#NewPassword";
				$scope.passFieldValidationResult.fieldType = constantService.inputFieldType.PASSWORD;
				$scope.passFieldValidationResult.changeORblur = changeOrBlur;
				$scope.passFieldValidationResult.mandatory = true;
				
				$scope.passFieldValidationResult.passLength = $scope.passwordValidRules.leastChar;		
				$scope.passFieldValidationResult = constantService.isValidFieldForPolicy($scope.passFieldValidationResult);
				//here to check validate password
				$scope.passFieldValidationResult = validateWithPolicy($scope.passFieldValidationResult);

			}
			else if(field === $scope.confirmPassFieldValidationResult)
			{
				fieldValidationInit();
				$scope.confirmPassFieldValidationResult = constantService.fieldValidationResult;

				$scope.confirmPassFieldValidationResult.fieldObj = $scope.user.confirmPass;
				$scope.confirmPassFieldValidationResult.fieldID = "#Confirm_Password";
				$scope.confirmPassFieldValidationResult.compareObj = $scope.user.newPass;
				$scope.confirmPassFieldValidationResult.compareFieldID = "#NewPassword";
				$scope.confirmPassFieldValidationResult.fieldType = constantService.inputFieldType.CONFIRM_PASSWORD;
				$scope.confirmPassFieldValidationResult.changeORblur = changeOrBlur;
				$scope.confirmPassFieldValidationResult.mandatory = true;

				$scope.confirmPassFieldValidationResult = constantService.isValidFieldForPolicy($scope.confirmPassFieldValidationResult);
			}

		};

		$scope.changeInputField = function(field){

			var changeOrBlur = constantService.inputFieldAction.CHANGE;			
			initInputFieldValidationResult(field, changeOrBlur);
		};

		$scope.leaveInputField = function(field){

			var changeOrBlur = constantService.inputFieldAction.BLUR;
			initInputFieldValidationResult(field, changeOrBlur);
		};

		$scope.resetForm = function (){
			$scope.user = {userID: userInfo.data.loginId};
		};
		
		var validateWithPolicy = function(passFieldValidationResult){
			
			if(passFieldValidationResult.fieldMsg == "PasswordStrengthFair"){				
				var params = {};
				var userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
				params.passwordStr = passFieldValidationResult.fieldObj;
				params.userID = userInfo.data.loginId;
				params.operationType = constantService.VALIDATE_PASSWORD;
				var promisForPassPolicy = passwordPolicyService.get(params);
				promisForPassPolicy.then(function (data) {
					if (!data.success) {
						passFieldValidationResult.fieldMsg = 'PasswordPolicyFail';
						passFieldValidationResult.showMsg = true;						
						passFieldValidationResult.fieldMsgStyle.color = 'red';
						isValidPassword = false;
						return passFieldValidationResult;
					}
					
					passFieldValidationResult.fieldMsg = 'PasswordPolicySuccess';
					passFieldValidationResult.showMsg = true;						
					passFieldValidationResult.fieldMsgStyle.color = 'green';
					isValidPassword = true;
					});
				
			}
			return passFieldValidationResult;
		};

		$scope.resetPassword = function (user){	

			
			if ($('#Current_Password').val() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$("#Current_Password").focus();
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
			if ($('#Current_Password').val() == $('#NewPassword').val()) {
				messageService.showMessage(constantService.Danger, 'NPCPS1000');
				$("#NewPassword").focus();
				return;
			}
			
			if ($('#NewPassword').val() !== $('#Confirm_Password').val()) {
				messageService.showMessage(constantService.Danger, 'CNFPDM1000');
				$("#Confirm_Password").focus();
				return;
			}
			if(!$scope.havePolicy){
			    messageService.showMessage(constantService.Danger, 'NPPF100');
			    return;
			   }
			
			if(!isValidPassword){
				messageService.showMessage(constantService.Danger, 'PFP1001');
				$('#NewPassword').focus();
				return;
			}
			
			ngProgress.start();
			loadService.showDialog();
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			user.operationType = constantService.resetPassword;
			user.changedBy = userInfo.data.loginId;
			user.resetRequired = "N";

			var modalOptions = {
					closeButtonText: 'No',
					actionButtonText: 'Yes',
					headerText: 'Change Password?',
					bodyText: 'Are you sure you want to Change Password ',
					data: user,
					id: user.userID,
					showChangeStatusText: false
			};

			var modalDefaults = {
					templateUrl: 'app/partials/confirmation.html'
			};

			modalService.showModal(modalDefaults, modalOptions).then(function (result) {
				loadService.showDialog();

				promis = signInService.doResetPassword(user);

				promis.then(function(data) {
					ngProgress.complete();
					loadService.hideDialog();

					if (!data.success) {
						if (data.message == "Oldpassworddosenotmatch") {
							messageService.showMessage(constantService.Danger, constantService.OldPasswordDidNotMached);
							$('#Current_Password').focus();
							return;
						}
						messageService.showMessage(constantService.Danger, 'PCF1000');
						$scope.user = data.data;
						return;
					}
					constantService.menuDisable = true;
					$scope.user = {userID: userInfo.data.loginId};
					messageService.showMessage(constantService.Warning, 'PCSOI100');
					localStorageService.setValue(configurationService.loginCookieStoreKey, null);
				});
			});

		};
		
		/*****************************************************************
		* Generate Password  *
		*****************************************************************/
		
		$scope.generatePassword = function(){			
			var params = {};
			params.operationType = constantService.GENERATE_PASSWORD;
			var promisForPass = passwordPolicyService.get(params);
			promisForPass.then(function (data) {
				if (!data.success) {
					$scope.showGeneratePass = data.success;
					messageService.showMessage(constantService.Danger, 'NPPF100');
					return;
				}

				$scope.showGeneratePass = data.success;	
				$("#InputGeneratedPass").val(data.data);

				});
			
			
		};
		
		var getPasswordPolicy = function(){			
			var params = {};
			params.operationType = constantService.GET_PASSWORD_POLICY;
			var promisForPassPolicy = passwordPolicyService.get(params);
			promisForPassPolicy.then(function (data) {
				if (!data.success) {
					$scope.havePolicy = data.success;
					return;
				}				
				
				$scope.havePolicy = data.success;
				$scope.passwordPolicyData = data.data.msgList;
				$scope.passwordValidRules = data.data;

				});
			
			
		};
		
		$scope.copyPassword = function(){			
			if($scope.copypass){				
				$scope.user.newPass = $("#InputGeneratedPass").val();
				$scope.user.confirmPass = $("#InputGeneratedPass").val();
				isValidPassword = true;
				
			}
			else{
				$scope.user.newPass = '';
				$scope.user.confirmPass ='';
			}
			
		};

		var init = function () {
			ngProgress.start();
			fieldValidationInit();
			getPasswordPolicy();
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			
			$scope.user = {userID: userInfo.data.loginId};
			ngProgress.complete();
		};

		init();

	};

	app.register.controller('profileController', ['$rootScope', '$scope', '$log', '$timeout', '$route', '_',  
	                                              'messageService', 'constantService', 'configurationService', 'navigationService', 'localStorageService',
	                                              'signInService', 'ngProgress', 'loadService', 'modalService','passwordPolicyService', profileController]);


});

