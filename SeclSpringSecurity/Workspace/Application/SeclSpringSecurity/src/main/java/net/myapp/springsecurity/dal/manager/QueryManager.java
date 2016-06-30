package net.myapp.springsecurity.dal.manager;

import net.myapp.springsecurity.dal.bean.AuditLogDataBean;
import net.myapp.springsecurity.dal.bean.LoginTrail;
import net.myapp.springsecurity.dal.bean.PasswordPolicyBean;
import net.myapp.springsecurity.dal.bean.RoleBean;
import net.myapp.springsecurity.dal.bean.SecurityUserLoginBean;

public interface QueryManager {

	//AUDIT LOG
	public String insertAuditLogInfo();//*************
	public String insertPasswordHistory();////////////*************
	public String selectAuditLogInfoByID();///************
	public String selectAllAuditLogInfo(AuditLogDataBean auditLogBean);//*********
	public String countAllAuditLogInfo(AuditLogDataBean auditLogBean);//************
	public String selectBranchbyBranchIDSql();//*****************

	
	//LOGIN
	
	/*public String selectUsersForRoleBMorBA(SecurityUserLoginBean userBean);
	public String selectUsersForRoleAdmin(SecurityUserLoginBean userBean);
	public String selectUsersForRoleSA(SecurityUserLoginBean userBean);*/
	public String selectUserInfoByLoginIdSql();//***************
	/*public String updateLoginInfoSql();
	public String updateLoginInfoSql2();
	public String updateUserStatusbyAgentID();
	public String UpdateUserStatusbyLoginIDSql();*/
	public String ResetPasswordbyLoginIDSql();//*************
	/*public String UnblockUserbyLoginID();
	public String countLoginbyLoginID();
	*/
	/*public String countLoginbyEmail();
	public String countLoginbyMobileNo();
	public String countTotalUsersForRoleAdmin(SecurityUserLoginBean userBean);
	public String countTotalUsersForRoleSA(SecurityUserLoginBean userBean);
	public String countBlockedUsers(SecurityUserLoginBean userBean);*/
	//LOGIN TRAIL
	public String insertLogInTrailSql();//*************
	/*public String insertLogInTrailSql2();
	public String selectLogInTrailByMachineIP(LoginTrail trail);*/
	public String updateLogInTrailClosed();//**********
/*	public String countLoginTrailbyLoginId();
	public String countLogInTrailByMachineIP(LoginTrail trail);
*/
	//ROLE
	/*public String insertRole();
	public String countRoleID();
	public String selectRolebyRoleIDSql();*/
	public String selectRolebyRoleIDForLoginSql();//************
	/*public String selectUserRolesSql();*/



	//Role
	/*public String countAllRole(RoleBean roleBean);
	public String getAllRole(RoleBean roleBean);
	public String getAllTopMenu();*/

	
	// ID and IP block query
	public String countLoginFailedByIp();//*********
	public String getLastLoginByIp();//*******
	public String getLastLoginById();//***************
	public String updateResetStatusById();//**************
	public String countLoginIdByIp();
	public String blockID();//*****************
	public String ubBlockID();//***********
	public String getBranchInfoByUser();//************
	//public String getUserBlockInfo();
	
	// PASSWORD POLICY START
/*	public String getPasswordPolicies(PasswordPolicyBean model);
	public String countTotalPassworPolicy(PasswordPolicyBean model);
	public String savePasswordPolicy();
	public String updatePasswordPolicy();
	public String updatePasswordPolicyStatus();
	public String hasActivePolicy();*/
	public String getPasswordPolicieByID();//***************
	public String getActivePasswordPolicy();//**************
	public String getLastNPasswordInfoByLoginID();
	public String getLastPassHistoryByID();
	// PASSWORD POLICY END
	
	
}
