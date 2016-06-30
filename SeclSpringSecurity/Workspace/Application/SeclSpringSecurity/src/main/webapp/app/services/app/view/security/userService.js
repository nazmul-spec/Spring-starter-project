
'use strict';

define(['app'], function (app) {

	var userService = function ($rootScope, $resource, $q, $cookieStore, constantService, messageService,
			configurationService) {

		var userListResource, resetPasswordResource, statusResource, userInfoResource, blockResource;
		var delay;
		var userListForRoleBM, userListForRoleAdmin, userListForRoleSA;
		var doChangeUserStatus, doResetPassword, saveOrUpdateUser, getUserInfoByID;
		var isValidForm , isValidFormForPolicy;
		
		var getBlockedUserList, getBlockedIPList, unblockUser, unblockIP;
		
		userListResource = $resource(configurationService.userList, {}, {
			userListForRoleBM: { method: 'POST' },
			userListForRoleAdmin: { method: 'POST' },
			userListForRoleSA: { method: 'POST' }
		});

		resetPasswordResource = $resource(configurationService.userResetPassword, {}, {
			resetPassword: { method: 'POST' }
		});

		statusResource = $resource(configurationService.userStatus, {}, {
			changeUserStatus: {method: 'POST'}
		});

		userInfoResource = $resource(configurationService.userInfo, {}, {
			saveOrUpdateUser : { method: 'POST' },
			getUserInfoByID : { method: 'POST' }
		});
		
		blockResource = $resource(configurationService.blockedLogin, {}, {
			blockedUserList : { method: 'POST' },
			blockedIPList : { method: 'POST' },
			unblockUser : { method: 'POST' },
			unblockIP : { method: 'POST' }
		});


		userListForRoleBM = function (obj) {
			delay = $q.defer();
			userListResource.userListForRoleBM(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};

		userListForRoleAdmin = function (obj) {
			delay = $q.defer();
			userListResource.userListForRoleAdmin(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};

		userListForRoleSA = function (obj) {
			delay = $q.defer();
			userListResource.userListForRoleSA(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};


		doChangeUserStatus = function (obj) {
			delay = $q.defer();
			statusResource.changeUserStatus(obj, function (data) {
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

		saveOrUpdateUser = function (obj) {
			delay = $q.defer();
			userInfoResource.saveOrUpdateUser(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};

		getUserInfoByID = function (obj) {
			delay = $q.defer();
			userInfoResource.getUserInfoByID(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};
		
		getBlockedUserList = function (obj) {
			delay = $q.defer();
			blockResource.blockedUserList(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};
		
		getBlockedIPList = function (obj) {
			delay = $q.defer();
			blockResource.blockedIPList(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};
		
		unblockUser = function (obj) {
			delay = $q.defer();
			blockResource.unblockUser(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};
		
		unblockIP = function (obj) {
			delay = $q.defer();
			blockResource.unblockIP(obj, function (data) {
				delay.resolve(data);
			}, function () {
				delay.reject('Unable to fetch..');
			});
			return delay.promise;
		};
		

		isValidFormForPolicy = function (userInfo, passwordShow) {
			
		if ($('#InputLoginId').val().trim() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#InputLoginId').focus();

			return false;
		}
		if ($('#InputEmail').val().trim() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#InputEmail').focus();

			return false;
		}
		if (($('#InputEmail').val() != "") && (!constantService.regexForEmail.test($('#InputEmail').val()))) {
			messageService.showMessage(constantService.Danger, 'EVE1000');
			$("#InputEmail").focus();

			return false;
		}
		if (($('#InputMobile').val().trim() != "") && (!constantService.regexForMobileNo.test($('#InputMobile').val()))) {
			messageService.showMessage(constantService.Danger, 'EDP1002');
			$("#InputMobile").focus();

			return false;
		}
		if (($('#InputMobile').val().trim() != "") && ($('#InputMobile').val().trim().length < 11)) {
			messageService.showMessage(constantService.Danger, 'EDP1001');
			$("#InputMobile").focus();

			return false;
		}
		if ($('#selectRole').val().trim() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#s2id_selectRole input').focus();

			return false;
		}
		
		if ($('#selectBankName').val().trim() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#s2id_selectBankName input').focus();
			return false;
		}
		if ((($('#selectRole').val().trim() == constantService.roleType.BranchManager)
				|| ($('#selectRole').val().trim() == constantService.roleType.BranchOfficerMaker)
				|| ($('#selectRole').val().trim() == constantService.roleType.BranchOfficerApprover)) 
				&& ($('#selectBranchName').val().trim() == "")) {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#s2id_selectBranchName input').focus();
			return false;
		}
		if ($('#selectStatus').val() != undefined && $('#selectStatus').val().trim() == "") {
			messageService.showMessage(constantService.Danger, 'RF1000');
			$('#s2id_selectStatus input').focus();

			return false;
		}
		if(passwordShow)
		{
			if ($('#InputPassword').val().trim() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#InputPassword').focus();

				return false;
			}
			

			if ($("#inputConfirmPassword") !== null && $('#inputConfirmPassword').val().trim() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#inputConfirmPassword').focus();
				return false;
			}

			if ($('#InputPassword').val() !== $('#inputConfirmPassword').val()) {
				messageService.showMessage(constantService.Danger, 'CNFPDM1000');
				$("#inputConfirmPassword").focus();
				return;
			}	
		}			

		return true;
	};
	
		

		isValidForm = function (userInfo, passwordShow) {

			if ($('#InputLoginId').val().trim() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#InputLoginId').focus();

				return false;
			}
			if ($('#InputEmail').val().trim() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#InputEmail').focus();

				return false;
			}
			if (($('#InputEmail').val() != "") && (!constantService.regexForEmail.test($('#InputEmail').val()))) {
				messageService.showMessage(constantService.Danger, 'EVE1000');
				$("#InputEmail").focus();

				return false;
			}
			if (($('#InputMobile').val().trim() != "") && (!constantService.regexForMobileNo.test($('#InputMobile').val()))) {
				messageService.showMessage(constantService.Danger, 'EDP1002');
				$("#InputMobile").focus();

				return false;
			}
			if (($('#InputMobile').val().trim() != "") && ($('#InputMobile').val().trim().length < 11)) {
				messageService.showMessage(constantService.Danger, 'EDP1001');
				$("#InputMobile").focus();

				return false;
			}
			if ($('#selectRole').val().trim() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#s2id_selectRole input').focus();

				return false;
			}
			
			if ($('#selectBankName').val().trim() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#s2id_selectBankName input').focus();
				return false;
			}
			if ((($('#selectRole').val().trim() == constantService.roleType.BranchManager)
					|| ($('#selectRole').val().trim() == constantService.roleType.BranchOfficerMaker)
					|| ($('#selectRole').val().trim() == constantService.roleType.BranchOfficerApprover)) 
					&& ($('#selectBranchName').val().trim() == "")) {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#s2id_selectBranchName input').focus();
				return false;
			}
			if ($('#selectStatus').val() != undefined && $('#selectStatus').val().trim() == "") {
				messageService.showMessage(constantService.Danger, 'RF1000');
				$('#s2id_selectStatus input').focus();

				return false;
			}
			if(passwordShow)
			{
				if ($('#InputPassword').val().trim() == "") {
					messageService.showMessage(constantService.Danger, 'RF1000');
					$('#InputPassword').focus();

					return false;
				}

				if (!constantService.isAlphaNumeric($('#InputPassword').val().trim())) {
					messageService.showMessage(constantService.Danger, 'Ivp1001');
					$("#InputPassword").focus();

					return false;
				}

				if (($('#InputPassword').val().trim().length < 8)) {
					messageService.showMessage(constantService.Danger, 'Ivp1002');
					$("#InputPassword").focus();

					return false;
				}

				if ($("#inputConfirmPassword") !== null && $('#inputConfirmPassword').val().trim() == "") {
					messageService.showMessage(constantService.Danger, 'RF1000');
					$('#inputConfirmPassword').focus();
					return false;
				}

				if ($('#InputPassword').val() !== $('#inputConfirmPassword').val()) {
					messageService.showMessage(constantService.Danger, 'CNFPDM1000');
					$("#inputConfirmPassword").focus();
					return;
				}	
			}			

			return true;
		};

		return {
			userListForRoleBM : userListForRoleBM,
			userListForRoleAdmin : userListForRoleAdmin,
			userListForRoleSA : userListForRoleSA,
			changeUserStatus : doChangeUserStatus,
			resetPassword : doResetPassword,
			saveOrUpdateUser:saveOrUpdateUser,
			getUserInfoByID : getUserInfoByID,
			isValidForm : isValidForm,
			isValidFormForPolicy : isValidFormForPolicy,
			blockedUserList : getBlockedUserList,
			blockedIPList : getBlockedIPList,
			unblockUser : unblockUser,
			unblockIP : unblockIP
		};


	};

	app.service('userService', ['$rootScope', '$resource', '$q', '$cookieStore', 'constantService', 
	                            'messageService', 'configurationService', userService]);

});

