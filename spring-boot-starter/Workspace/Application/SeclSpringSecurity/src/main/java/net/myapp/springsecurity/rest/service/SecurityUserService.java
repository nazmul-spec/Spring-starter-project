package net.myapp.springsecurity.rest.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import net.myapp.springsecurity.dal.bean.LoginBean;
import net.myapp.springsecurity.dal.bean.ResetPasswordBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.bean.SecurityUserLoginBean;
import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.manager.SecurityUserManager;

@Path("/user")
public class SecurityUserService {
	
	SecurityUserManager securityUserManager;
	
	@Path("/userList")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean userList(SecurityUserLoginBean bean){
		ResponseBean responseBean = new ResponseBean();
		if(bean.getOperationType() == null){
			return responseBean;
		}
		
	/*	if (bean.getOperationType().equalsIgnoreCase(Constant.GET_USER_LIST_FOR_BM)) {
			responseBean = securityUserManager.getUserListForRoleBMorBA(bean);
		}
		else if (bean.getOperationType().equalsIgnoreCase(Constant.GET_USER_LIST_FOR_BA)) {
			responseBean = securityUserManager.getUserListForRoleBMorBA(bean);
		}
		else if (bean.getOperationType().equalsIgnoreCase(Constant.GET_ADMIN_OFFICER_LIST_FOR_BM)) {
			responseBean = securityUserManager.getAdminOfficerListForRoleBMorBA(bean);
		}
		else if (bean.getOperationType().equalsIgnoreCase(Constant.GET_ADMIN_OFFICER_LIST_FOR_BA)) {
			responseBean = securityUserManager.getAdminOfficerListForRoleBMorBA(bean);
		}
		else if (bean.getOperationType().equalsIgnoreCase(Constant.GET_ADMIN_OFFICER_LIST_FOR_BA)) {
			responseBean = securityUserManager.getUserListForRoleBMorBA(bean);
		}*/
		 if (bean.getOperationType().equalsIgnoreCase(Constant.GET_All_ADMINUSER_LIST)) {
			responseBean = securityUserManager.getUserListForRoleAdmin(bean);
		}
		else if (bean.getOperationType().equalsIgnoreCase(Constant.GET_USER_LIST_FOR_SA)) {
			responseBean = securityUserManager.getUserListForRoleSA(bean);
		}
		/*else if (bean.getOperationType().equalsIgnoreCase(Constant.GET_USER_LIST_FOR_Manager_BMBA)) {
			responseBean = securityUserManager.getUserListForRoleManagerBMBA(bean);
		}
		else if (bean.getOperationType().equalsIgnoreCase(Constant.GET_USER_LIST_FOR_ABD_USER)) {
			responseBean = securityUserManager.getUserListForABDuser(bean);
		}*/
		return responseBean;
	}
	
	@Path("/userResetPassword")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean userResetPassword(ResetPasswordBean bean){
		ResponseBean responseBean = new ResponseBean();
		
		if (bean.getOperationType().equalsIgnoreCase(Constant.RESET_PASSWORD)) {
			
			responseBean = securityUserManager.resetPassword(bean);
		}		
		return responseBean;
	}
	
	@Path("/userStatus")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean userStatus(SecurityUserLoginBean bean){
		ResponseBean responseBean = new ResponseBean();
		
		if (bean.getOperationType().equalsIgnoreCase(Constant.UPDATE_STATUS)){
			responseBean = securityUserManager.updateUserStatus(bean);
		}		
		return responseBean;
	}
	
	@Path("/userInfo")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean userInfo(LoginBean loginBean){
		ResponseBean responseBean = new ResponseBean();
		
		if(loginBean.getOperationType().equalsIgnoreCase(Constant.User))
		{
			responseBean = securityUserManager.getUserInfoByID(loginBean.getLoginId());
		}
		/*else if(loginBean.getOperationType().equalsIgnoreCase(Constant.Add))
		{
			responseBean = securityUserManager.saveNewUser(loginBean);
		}*/
		else if(loginBean.getOperationType().equalsIgnoreCase(Constant.UPDATE))
		{
			responseBean = securityUserManager.updateUserInfo(loginBean);
		}
		
		return responseBean;
	}
	

	public void setSecurityUserManager(SecurityUserManager securityUserManager) {
		this.securityUserManager = securityUserManager;
	}
	
}