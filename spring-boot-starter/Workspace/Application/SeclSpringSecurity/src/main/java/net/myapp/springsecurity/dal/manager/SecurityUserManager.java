package net.myapp.springsecurity.dal.manager;

import net.myapp.springsecurity.dal.bean.LoginBean;
import net.myapp.springsecurity.dal.bean.LoginTrail;
import net.myapp.springsecurity.dal.bean.ResetPasswordBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.bean.SecurityUserLoginBean;

public interface SecurityUserManager extends BaseManager {
	
	/**
	 * Used by the role "Branch.Manager"
	 * @param userBean
	 * @return List of Users with role Branch.OfficerMaker, Branch.OfficerChecker, Branch.OfficerApprover
	 */
	//public ResponseBean getUserListForRoleBMorBA(SecurityUserLoginBean userBean);
	/**
	 * Used by the role "Branch.Manager"
	 * @param userBean
	 * @return List of Users with role Branch.OfficerMaker, Branch.OfficerChecker, Branch.OfficerApprover
	 */
	//public ResponseBean getAdminOfficerListForRoleBMorBA(SecurityUserLoginBean userBean);
	/**
	 * Used by the role "Admin"
	 * @param userBean
	 * @return List of Users with role Branch.Manager, Agent Manager
	 */
	public ResponseBean getUserListForRoleAdmin(SecurityUserLoginBean userBean);
	/**
	 * Used by the role "SA"
	 * @param userBean
	 * @return List of Users with role Admin
	 */
	public ResponseBean getUserListForRoleSA(SecurityUserLoginBean userBean);
	/**
	 * Used by the role "Branch.Manager"<br>
	 * Change User Status from Active to Inactive or Vice Versa
	 * @param userBean 
	 */
	public ResponseBean updateUserStatus(SecurityUserLoginBean userBean);
	/**
	 * Used by the role "Branch.Manager"<br>
	 * Reset User Password
	 * @param userBean 
	 */
	public ResponseBean resetPassword(ResetPasswordBean bean);
	/**
	 * Used by any role<br>
	 * Get User Info While Updating
	 * @param loginId 
	 */
	public ResponseBean getUserInfoByID(String loginId);
	/**
	 * Used by any role<br>
	 * Update User Info
	 * @param loginBean
	 */
	public ResponseBean updateUserInfo(LoginBean loginBean);
	/**
	 * Used by any role<br>
	 * Add New User
	 * @param loginBean 
	 */
	//public ResponseBean saveNewUser(LoginBean loginBean);
	
	//public ResponseBean getUserListForRoleManagerBMBA(SecurityUserLoginBean loginBean);
	
	//public ResponseBean getUserListForABDuser(SecurityUserLoginBean userBean);
	
	/**
	 * Used by Admin<br>
	 * View Blocked User List
	 * @param SecurityUserLoginBean 
	 */
	public ResponseBean getBlockedUserList(SecurityUserLoginBean userBean);
	
	/**
	 * Used by Admin<br>
	 * View Blocked IP List
	 * @param LoginTrail 
	 */
	public ResponseBean getBlockedIPList(LoginTrail trail);
	
	/**
	 * Used by Admin<br>
	 * Unblock User By ID
	 * @param SecurityUserLoginBean 
	 */
	public ResponseBean unblockUser(SecurityUserLoginBean userBean);
	
	/**
	 * Used by Admin<br>
	 * UnBlock IP 
	 * @param SecurityUserLoginBean 
	 */
	public ResponseBean unblockIP(LoginTrail trail);

}
