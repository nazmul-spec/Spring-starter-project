
'use strict';

define(['app'], function (app) {

	var userResetPasswordController = function ($rootScope, $scope, $log, $timeout, $route, $routeParams, _,  messageService, passwordPolicyService, 
			constantService, configurationService, navigationService, localStorageService, userService, ngProgress,
			modalService, loadService) {

		var userInfo, promis;
		$scope.title = { value: "Reset_Password" };
		$scope.isFieldDisabled = true;
		
		var isValidPassword = false;
		$scope.showGeneratePass = false;
		$scope.passwordValidRules = {};

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

				//$scope.passFieldValidationResult = constantService.isValidField($scope.passFieldValidationResult);
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

				$scope.confirmPassFieldValidationResult = constantService.isValidField($scope.confirmPassFieldValidationResult);
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
			$scope.user = {userID: $routeParams.oid};
		};

		//request for previous page 
		$scope.goBack = function(user) {
			
			$scope.resetForm();
			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);
			var role = userInfo.data.roleBean;
			if(role.roleID == constantService.roleType.Admin)
			{
				navigationService.menuNavigation('Security_AdminUser');
			}
			else if(role.roleID == constantService.roleType.BranchManager)
			{
				navigationService.menuNavigation('Security_BranchUser');
			}
			else if(role.roleID == constantService.roleType.SA)
			{
				navigationService.menuNavigation('Security_Users');
			}
			else if(role.roleID == constantService.roleType.AdminApprover)
			{
				navigationService.menuNavigation('Security_BranchUser');
			}
			else if(role.roleID == constantService.roleType.AdminMaker)
			{
				navigationService.menuNavigation('Security_BranchUser');
			}
		};

		$scope.resetPassword = function (user){	

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

			userInfo = localStorageService.getValue(configurationService.loginCookieStoreKey);

			user.operationType = $routeParams.actiontype;
			user.changedBy = userInfo.data.loginId;
			user.resetRequired = "Y";
			/*userInfo.data.changedBy = user.changedBy;
			userInfo.data.reset = true;

			localStorageService.setValue(configurationService.loginCookieStoreKey, userInfo);*/

			goForResetPassword(user);
		}; 

		var goForResetPassword = function (user){			

			var modalOptions = {
					closeButtonText: 'No',
					actionButtonText: 'Yes',
					headerText: 'Reset Password?',
					bodyText: 'Are you sure you want to Reset Password ',
					data: user,
					id: user.userID,
					showChangeStatusText: false
			};

			var modalDefaults = {
					templateUrl: 'app/partials/confirmation.html'
			};

			modalService.showModal(modalDefaults, modalOptions).then(function (result) {
				loadService.showDialog();

				promis = userService.resetPassword(user);

				promis.then(function(data) {
					ngProgress.complete();
					loadService.hideDialog();

					if (!data.success) {
						messageService.showMessage(constantService.Danger, 'PRF1000');
						$scope.user = data.data;
						return;
					}

					messageService.showMessage(constantService.Success, 'PRS1000');
					$scope.user = {userID: $routeParams.oid};

					$timeout( function(){
						$scope.goBack(user);
					}, 5000);

				});
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
					//console.log(data.message);
				}				
				
				$scope.havePolicy = data.success;
				$scope.passwordPolicyData = data.data.msgList;
				$scope.passwordValidRules = data.data;
			});
		};
		
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

		var init = function () {
			ngProgress.start();
			fieldValidationInit();
			$scope.user = {userID: $routeParams.oid};
			getPasswordPolicy();
			ngProgress.complete();
		};

		init();

	};

	app.register.controller('userResetPasswordController', ['$rootScope', '$scope', '$log', '$timeout', '$route', '$routeParams','_', 
	                                                        'messageService', 'passwordPolicyService', 'constantService', 'configurationService', 'navigationService', 'localStorageService',
	                                                        'userService', 'ngProgress', 'modalService', 'loadService', userResetPasswordController]);


});

