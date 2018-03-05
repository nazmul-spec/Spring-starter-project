package net.myapp.springsecurity.dal.manager.impl;

import java.util.ArrayList;
import java.util.List;

import net.myapp.springsecurity.dal.bean.LoginBean;
import net.myapp.springsecurity.dal.bean.LoginTrail;
import net.myapp.springsecurity.dal.bean.ResetPasswordBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.bean.SecurityUserLoginBean;
import net.myapp.springsecurity.dal.db.utils.AuditLogUtil;
import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.db.utils.GsonUtil;
import net.myapp.springsecurity.dal.db.utils.OIDGenerator;
import net.myapp.springsecurity.dal.domain.LoginInfo;
import net.myapp.springsecurity.dal.manager.SecurityUserManager;
import net.myapp.springsecurity.dal.sha1encryptor.PasswordEncryptor;
import net.myapp.springsecurity.dal.type.AuditActionSourceType;
import net.myapp.springsecurity.dal.type.LoginMessageType;
import net.myapp.springsecurity.dal.type.RoleType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.google.gson.Gson;

public class SecurityUserManagerImpl extends BaseManagerImpl implements SecurityUserManager, Constant {

	private static final Logger logger = LoggerFactory.getLogger(SecurityUserManagerImpl.class);
	private static AuditLogUtil auditLogManager;
	//Query Purpose
	private String sql = new String();
	private Object[] param = new Object[]{};


	@Override
	public ResponseBean getUserListForRoleAdmin(SecurityUserLoginBean userBean) {

		String requestJSON = GsonUtil.getJson(userBean);
		logger.debug("Start Fetching User List For Branch Manager : "+requestJSON);

		ResponseBean responseBean = new ResponseBean();
		Long count = 0L;
		List<SecurityUserLoginBean> userList = new ArrayList<SecurityUserLoginBean>();
		try {

			sql = "";//queryManager.selectUsersForRoleAdmin(userBean);
			param = new Object[]{}; 

			userList = (List<SecurityUserLoginBean>)springJdbcDao.getObjectList(sql, param, SecurityUserLoginBean.class);

			if(userList == null || userList.isEmpty())
			{
				responseBean.setMessage(Constant.Nd1000);
				responseBean.setSuccess(false);					
				logger.warn("No data found : "+requestJSON);

				String responseJSON = GsonUtil.getJson(responseBean);
				logger.info("Response : "+responseJSON);

				return responseBean;
			}	

			sql = "";//queryManager.countTotalUsersForRoleAdmin(userBean);
			param = new Object[]{};

			count = (long) springJdbcDao.count(sql, param);			
			responseBean.setTotalCount(count);

			responseBean.setData(userList);			
			responseBean.setSuccess(true);

			logger.info("Successfully Fetched User List For Branch Manager : "+requestJSON);

		} catch(Exception e){
			logger.error("Failed to Fetch User List For Branch Manager : "+requestJSON, e);
		}
		logger.debug("End Fetching User List For Branch Manager : "+requestJSON);

		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}	

	@Override
	public ResponseBean getUserListForRoleSA(SecurityUserLoginBean userBean) {

		String requestJSON = GsonUtil.getJson(userBean);
		logger.debug("Start Fetching User List For Branch Manager : "+requestJSON);

		ResponseBean responseBean = new ResponseBean();
		Long count = 0L;
		List<SecurityUserLoginBean> userList = new ArrayList<SecurityUserLoginBean>();
		try {

			sql ="";// queryManager.selectUsersForRoleSA(userBean);
			param = new Object[]{}; 

			userList = (List<SecurityUserLoginBean>)springJdbcDao.getObjectList(sql, param, SecurityUserLoginBean.class);

			if(userList == null || userList.isEmpty())
			{
				responseBean.setMessage(Constant.Nd1000);
				responseBean.setSuccess(false);					
				logger.warn("No data found : "+requestJSON);

				String responseJSON = GsonUtil.getJson(responseBean);
				logger.info("Response : "+responseJSON);

				return responseBean;
			}	

			sql ="";// queryManager.countTotalUsersForRoleSA(userBean);
			param = new Object[]{};

			count = (long) springJdbcDao.count(sql, param);			
			responseBean.setTotalCount(count);

			responseBean.setData(userList);			
			responseBean.setSuccess(true);

			logger.info("Successfully Fetched User List For Branch Manager : "+requestJSON);

		} catch(Exception e){
			logger.error("Failed to Fetch User List For Branch Manager : "+requestJSON, e);
		}
		logger.debug("End Fetching User List For Branch Manager : "+requestJSON);

		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}	

	
	@Override
	public ResponseBean getUserInfoByID(String loginId) {

		logger.debug("Start Retrieving User Info by Login ID : "+loginId);

		ResponseBean responseBean = new ResponseBean();

		try {

			sql = queryManager.selectUserInfoByLoginIdSql();
			param = new Object[] {loginId};

			LoginBean loginBean = (LoginBean)springJdbcDao.getObject(sql, param, LoginBean.class);

			if(loginBean == null || loginBean.toString().isEmpty()){

				responseBean.setSuccess(false);
				responseBean.setMessage(Constant.Nd1000);

				logger.warn("No Data Received While Retrieving User Info by Login ID : "+loginId);

				String responseJSON = GsonUtil.getJson(responseBean);
				logger.info("Response : "+responseJSON);

				return responseBean;
			}

			responseBean.setSuccess(true);
			responseBean.setData(loginBean);

			logger.info("Successfully User Info Retrieved : "+loginId);
		} catch (Exception e) {
			logger.error("Exception Occured while trying to Retrieve User Info by Login ID : "+loginId, e);
		}
		logger.debug("End Retrieving User Info by Login ID : "+loginId);

		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}

	/*@Override
	public ResponseBean saveNewUser(LoginBean loginBean) {

		String requestJSON = GsonUtil.getJson(loginBean);
		logger.debug("Start Creating New User : "+requestJSON);

		ResponseBean responseBean = new ResponseBean();

		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus  transStatus = springJdbcDao.getTransactionManager().getTransaction(def);

		int res = 0;
		try {

			if(loginBean.getRoleID() !=null)
			{
				if(loginBean.getRoleID().equalsIgnoreCase(RoleType.AgentManager.getValue()) 
						|| loginBean.getRoleID().equalsIgnoreCase(RoleType.Admin.getValue())
						|| loginBean.getRoleID().equalsIgnoreCase(RoleType.AdminMaker.getValue())
						|| loginBean.getRoleID().equalsIgnoreCase(RoleType.AdminApprover.getValue()))
				{
					loginBean.setBranchID(null);
				}
				if(loginBean.getRoleID().equalsIgnoreCase(RoleType.BranchManager.getValue()) 
						&& loginBean.getStatus().equalsIgnoreCase("ACTIVE")
						&& existsActiveBMperBranch(loginBean.getBranchID()))
				{
					responseBean.setSuccess(false);
					responseBean.setMessage(Constant.ACTIVE_BM_EXISTS_BY_BRANCH);
					logger.warn("Can't Create Branch Manager; Active BM Exists by this branch already : "+requestJSON);
					springJdbcDao.getTransactionManager().rollback(transStatus);
					return responseBean;
				}
			}

			sql = queryManager.insertLoginInfoSql();
			param = new Object[] {
					loginBean.getLoginId(), 
					PasswordEncryptor.encryptor(loginBean.getPassword()),
					loginBean.getEmail(),
					loginBean.getMobileNo(),
					loginBean.getBankID(),
					loginBean.getBranchID(),
					loginBean.getStatus(), 
					"Y",//loginBean.isReset()
					new Gson().toJson(loginBean.getRoleJSONArray()),
					loginBean.getChangedBy(),
					dateManager.getTimestamp(dateManager.getCurrentDateTime())};

			
			auditLogManager.beforeOperation(loginBean.getClass(), loginBean.getLoginId());
			res = springJdbcDao.updateObject(sql, param);
			auditLogManager.afterOperation(	AuditActionSourceType.USER.getValue(), loginBean.getChangedBy());
			auditLogManager.insertPasswordHistory(loginBean.getLoginId(), PasswordEncryptor.encryptor(loginBean.getPassword()), loginBean.getChangedBy());

			springJdbcDao.getTransactionManager().commit(transStatus);
			logger.info("Successfully New User Created : "+requestJSON);
		} catch (Exception e) {
			logger.error("Exception Occured while trying to Create New User : "+requestJSON, e);
			springJdbcDao.getTransactionManager().rollback(transStatus);
		}

		logger.debug("End Creating New User : "+requestJSON);

		if(res > 0)
		{
			responseBean.setSuccess(true);
			responseBean.setMessage(Constant.Sc1000);
		}
		else
		{
			responseBean.setMessage(Constant.Us1000);
		}

		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}*/

	@Override
	public ResponseBean updateUserInfo(LoginBean loginBean) {

		String requestJSON = GsonUtil.getJson(loginBean);
		logger.debug("Start Updating User Info : "+requestJSON);

		ResponseBean responseBean = new ResponseBean();

		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus  transStatus = springJdbcDao.getTransactionManager().getTransaction(def);

		int res = 0;
		try {

			if(loginBean.getRoleID() !=null)
			{
				if(loginBean.getRoleID().equalsIgnoreCase(RoleType.AgentManager.getValue()) 
						|| loginBean.getRoleID().equalsIgnoreCase(RoleType.Admin.getValue())
						|| loginBean.getRoleID().equalsIgnoreCase(RoleType.AdminMaker.getValue())
						|| loginBean.getRoleID().equalsIgnoreCase(RoleType.AdminApprover.getValue()))
				{
					loginBean.setBranchID(null);
				}
				if(loginBean.getRoleID().equalsIgnoreCase(RoleType.BranchManager.getValue()) 
						&& loginBean.getStatus().equalsIgnoreCase("ACTIVE") 
						/*&& existsActiveBMperBranch(loginBean.getBranchID())*/)
				{
					responseBean.setSuccess(false);
					responseBean.setMessage(Constant.ACTIVE_BM_EXISTS_BY_BRANCH);
					logger.warn("Can't update Branch Manager; Active BM Exists by this branch already : "+requestJSON);
					springJdbcDao.getTransactionManager().rollback(transStatus);
					return responseBean;
				}
			}

			sql = "";//queryManager.updateLoginInfoSql();
			param = new Object[] {loginBean.getEmail(),
					loginBean.getMobileNo(),
					loginBean.getStatus(),
					new Gson().toJson(loginBean.getRoleJSONArray()),
					loginBean.getBranchID(),
					loginBean.getRejectionCause(),
					loginBean.getChangedBy(),
					dateManager.getTimestamp(dateManager.getCurrentDateTime()),
					loginBean.getLoginId()};

			auditLogManager.beforeOperation(loginBean.getClass(), loginBean.getLoginId());
			res = springJdbcDao.updateObject(sql, param);
			auditLogManager.afterOperation(
					AuditActionSourceType.USER.getValue(), 
					loginBean.getChangedBy());

			springJdbcDao.getTransactionManager().commit(transStatus);
			logger.info("Successfully User Info Updated : "+requestJSON);
		} catch (Exception e) {
			logger.error("Exception Occured while trying to update New User : "+requestJSON, e);
			springJdbcDao.getTransactionManager().rollback(transStatus);
		}

		logger.debug("End Updating User Info : "+requestJSON);

		if(res > 0)
		{
			responseBean.setSuccess(true);
			responseBean.setMessage(Constant.Sc1000);
		}
		else
		{
			responseBean.setMessage(Constant.Us1000);
		}

		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}

	@Override
	public ResponseBean updateUserStatus(SecurityUserLoginBean userBean) {

		String requestJSON = GsonUtil.getJson(userBean);
		logger.debug("Start Updating User Status : "+requestJSON);

		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus transStatus = springJdbcDao.getTransactionManager().getTransaction(def);

		ResponseBean responseBean = new ResponseBean();
		try {

			sql = queryManager.selectUserInfoByLoginIdSql();
			param = new Object[]{userBean.getLoginId()};

			SecurityUserLoginBean login = (SecurityUserLoginBean) springJdbcDao.getObject(sql, param, SecurityUserLoginBean.class);

			if (login == null) {
				responseBean.setSuccess(false);
				responseBean.setMessage("No user found");
				logger.warn("No data found : "+requestJSON);
			}
			else  {
				String status = new String();
				
				
				if(login.getRoleJSON().contains(RoleType.BranchManager.getValue()) 
						&& status.equalsIgnoreCase("ACTIVE") 
						/*&& existsActiveBMperBranch(login.getBranchID())*/)
				{
					responseBean.setSuccess(false);
					responseBean.setMessage(Constant.ACTIVE_BM_EXISTS_BY_BRANCH);
					logger.warn("Can't Change Status of Branch Manager; Active BM Exists by this branch already : "+requestJSON);
					springJdbcDao.getTransactionManager().rollback(transStatus);
					return responseBean;
				}

				sql ="";// queryManager.UpdateUserStatusbyLoginIDSql();
				param = new Object[] {status,
						userBean.getChangedBy(),
						dateManager.getTimestamp(dateManager.getCurrentDateTime()),
						userBean.getLoginId()};

				LoginInfo loginBean = new LoginInfo();
				auditLogManager.beforeOperation(loginBean.getClass(), userBean.getLoginId());
				int res = springJdbcDao.updateObject(sql, param);
				auditLogManager.afterOperation(
						AuditActionSourceType.USER.getValue(), 
						userBean.getChangedBy());
				
				if (res > 0) {
					springJdbcDao.getTransactionManager().commit(transStatus);
					responseBean.setSuccess(true);
					responseBean.setMessage("Status change successfully !");
					logger.info("Successfully Updated User Status : "+requestJSON);
				}

			}			
			responseBean.setData(login);

		} catch(Exception e){
			logger.error("Exception Occured while trying to Update User Status : "+requestJSON, e);
			springJdbcDao.getTransactionManager().rollback(transStatus);
		}
		logger.debug("End Updating User Status : "+requestJSON);

		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}

	@Override
	public ResponseBean resetPassword(ResetPasswordBean bean) {

		String requestJSON = GsonUtil.getJson(bean);
		logger.debug("Start Reset Password : "+requestJSON);

		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus  transStatus = springJdbcDao.getTransactionManager().getTransaction(def);

		ResponseBean responseBean = new ResponseBean();
		try {

			sql = queryManager.selectUserInfoByLoginIdSql();
			param = new Object[]{bean.getUserID()};

			LoginBean login = (LoginBean) springJdbcDao.getObject(sql, param, LoginBean.class);

			if (login == null) {
				responseBean.setSuccess(false);
				responseBean.setMessage("No user found");
				logger.warn("No user found to Reset Password : "+requestJSON);
			}
			else {
				sql = queryManager.ResetPasswordbyLoginIDSql();
				param = new Object[] {
						PasswordEncryptor.encryptor(bean.getNewPass()),
						bean.getChangedBy(),
						dateManager.getCurrentDateTime(),
						bean.getResetRequired(),
						bean.getUserID()};

				LoginInfo loginBean = new LoginInfo();
				auditLogManager.beforeOperation(loginBean.getClass(), bean.getUserID());
				int res = springJdbcDao.updateObject(sql, param);
				auditLogManager.afterOperation(
						AuditActionSourceType.USER.getValue(), 
						bean.getChangedBy());
				
				if (res > 0) {
					responseBean.setSuccess(true);
					responseBean.setMessage("Password reset successfully!");	
					logger.info("Successfully Reset Password : "+requestJSON);
				}
			}
			responseBean.setData(bean);
			springJdbcDao.getTransactionManager().commit(transStatus);

		} catch(Exception e){
			responseBean.setSuccess(false);
			responseBean.setData(bean);
			logger.error("Exception occured while Tring to Update User Password"+requestJSON, e);
			springJdbcDao.getTransactionManager().rollback(transStatus);
		}
		logger.debug("End Reset Password : "+requestJSON);


		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}

	/*private Boolean existsActiveBMperBranch(String Branch)
	{
		boolean existsActiveBM = false;
		Long count = 0L;

		String sqlActiveBMperBranch = queryManager.countActiveBMbyBranch();
		Object[] paramBranch = new Object[] {Branch};

		try{
			count = (long) springJdbcDao.count(sqlActiveBMperBranch, paramBranch);

			if(count > 0)
			{
				existsActiveBM = true;
				logger.warn("Found Active BM by branch : "+Branch);
			}
			else
			{
				existsActiveBM = false;
				logger.info("Not Found Active BM by branch : "+Branch);
			}

		}catch(Exception e){
			logger.error("Exception occured while Tring to count Active BM by branch : "+Branch, e);
		}

		return existsActiveBM;
	}*/
	
	public static void setAuditLogManager(AuditLogUtil auditLogManager) {
		SecurityUserManagerImpl.auditLogManager = auditLogManager;
	}

	@Override
	public ResponseBean getBlockedUserList(SecurityUserLoginBean userBean) {
		
		String requestJSON = GsonUtil.getJson(userBean);
		logger.debug("Start Fetching Blocked User List : "+requestJSON);

		ResponseBean responseBean = new ResponseBean();
		Long count = 0L;
		List<SecurityUserLoginBean> userList = new ArrayList<SecurityUserLoginBean>();
		try {

			sql = "";/*queryManager.selectBlockedUsers(userBean);*/
			param = new Object[]{}; 

			userList = (List<SecurityUserLoginBean>)springJdbcDao.getObjectList(sql, param, SecurityUserLoginBean.class);

			if(userList == null || userList.isEmpty())
			{
				responseBean.setMessage(Constant.Nd1000);
				responseBean.setSuccess(false);					
				logger.warn("No data found : "+requestJSON);

				String responseJSON = GsonUtil.getJson(responseBean);
				logger.info("Response : "+responseJSON);

				return responseBean;
			}	

			sql ="";// queryManager.countBlockedUsers(userBean);
			param = new Object[]{};

			count = (long) springJdbcDao.count(sql, param);			
			responseBean.setTotalCount(count);

			responseBean.setData(userList);			
			responseBean.setSuccess(true);

			logger.info("Successfully Fetched Blocked User List : "+requestJSON);

		} catch(Exception e){
			logger.error("Failed to Fetch Blocked User List : "+requestJSON, e);
		}
		logger.debug("End Fetching Blocked User List : "+requestJSON);

		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}

	@Override
	public ResponseBean getBlockedIPList(LoginTrail trail) {
		String requestJSON = GsonUtil.getJson(trail);
		logger.debug("Start Fetching Blocked IP List : "+requestJSON);

		ResponseBean responseBean = new ResponseBean();
		Long count = 0L;
		List<LoginTrail> machineList = new ArrayList<LoginTrail>();
		try {

			sql = "";//queryManager.selectLogInTrailByMachineIP(trail);
			param = new Object[]{}; 

			machineList = (List<LoginTrail>)springJdbcDao.getObjectList(sql, param, LoginTrail.class);

			if(machineList == null || machineList.isEmpty())
			{
				responseBean.setMessage(Constant.Nd1000);
				responseBean.setSuccess(false);					
				logger.warn("No data found : "+requestJSON);

				String responseJSON = GsonUtil.getJson(responseBean);
				logger.info("Response : "+responseJSON);

				return responseBean;
			}	

			sql = "";//queryManager.countLogInTrailByMachineIP(trail);
			param = new Object[]{};

			count = (long) springJdbcDao.count(sql, param);			
			responseBean.setTotalCount(count);

			responseBean.setData(machineList);			
			responseBean.setSuccess(true);

			logger.info("Successfully Fetched Blocked IP List : "+requestJSON);

		} catch(Exception e){
			logger.error("Failed to Fetch Blocked IP List : "+requestJSON, e);
		}
		logger.debug("End Fetching Blocked IP List : "+requestJSON);

		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}

	@Override
	public ResponseBean unblockUser(SecurityUserLoginBean userBean) {
		
		String requestJSON = GsonUtil.getJson(userBean);
		logger.debug("Start Unblocking User : "+requestJSON);

		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus transStatus = springJdbcDao.getTransactionManager().getTransaction(def);

		ResponseBean responseBean = new ResponseBean();
		try {

			sql ="";// queryManager.UnblockUserbyLoginID();
			param = new Object[]{userBean.getLoginId()};

			LoginInfo loginBean = new LoginInfo();
			auditLogManager.beforeOperation(loginBean.getClass(), userBean.getLoginId());
			int res = springJdbcDao.updateObject(sql, param);
			auditLogManager.afterOperation(
					AuditActionSourceType.USER.getValue(), 
					userBean.getChangedBy());

			if (res > 0) {
				springJdbcDao.getTransactionManager().commit(transStatus);
				responseBean.setSuccess(true);
				responseBean.setMessage(Constant.SUU1000);
				logger.info("Successfully Unblocked User : "+requestJSON);
			}

		} catch(Exception e){
			logger.error("Exception Occured while trying to Unblock User : "+requestJSON, e);
			springJdbcDao.getTransactionManager().rollback(transStatus);
			responseBean.setSuccess(false);
			responseBean.setMessage(Constant.FUU1000);
		}
		logger.debug("End Unblocking User : "+requestJSON);

		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}

	@Override
	public ResponseBean unblockIP(LoginTrail trail) {
		String requestJSON = GsonUtil.getJson(trail);
		logger.debug("Start Unblocking IP : "+requestJSON);

		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus transStatus = springJdbcDao.getTransactionManager().getTransaction(def);

		ResponseBean responseBean = new ResponseBean();
		try {

			String trailID = OIDGenerator.generateId();
			sql = "";//queryManager.insertLogInTrailSql2();
			param = new Object[]{trailID,
					AuditActionSourceType.SYSTEM.name(),
					AuditActionSourceType.SYSTEM.name(),
					dateManager.getCurrentDateTime(),
					dateManager.getCurrentDateTime(),
					trail.getMachineIP(),
					LoginMessageType.UNBLOCK_IP.name()};

			springJdbcDao.saveObject(sql,param);
			
			springJdbcDao.getTransactionManager().commit(transStatus);
			responseBean.setSuccess(true);
			responseBean.setMessage(Constant.SUI1000);
			logger.info("Successfully Unblocked User : "+requestJSON);

		} catch(Exception e){
			logger.error("Exception Occured while trying to Unblock IP : "+requestJSON, e);
			springJdbcDao.getTransactionManager().rollback(transStatus);
			responseBean.setSuccess(false);
			responseBean.setMessage(Constant.FUI1000);
		}
		logger.debug("End Unblocking IP : "+requestJSON);

		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}


}
