package net.myapp.springsecurity.dal.manager.impl;

import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import net.myapp.springsecurity.dal.bean.BranchBean;
import net.myapp.springsecurity.dal.bean.LoginBean;
import net.myapp.springsecurity.dal.bean.LoginTrail;
import net.myapp.springsecurity.dal.bean.PasswordHistoryBean;
import net.myapp.springsecurity.dal.bean.PasswordPolicyBean;
import net.myapp.springsecurity.dal.bean.PasswordPolicyJsonBean;
import net.myapp.springsecurity.dal.bean.ResetPasswordBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.bean.RoleBean;
import net.myapp.springsecurity.dal.bean.UserTransferBean;
import net.myapp.springsecurity.dal.converter.DomainToBeanConverter;
import net.myapp.springsecurity.dal.db.utils.AuditLogUtil;
import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.db.utils.GsonUtil;
import net.myapp.springsecurity.dal.db.utils.OIDGenerator;
import net.myapp.springsecurity.dal.domain.LoginInfo;
import net.myapp.springsecurity.dal.domain.Role;
import net.myapp.springsecurity.dal.manager.LoginManager;
import net.myapp.springsecurity.dal.sha1encryptor.PasswordEncryptor;
import net.myapp.springsecurity.dal.springsecurity.security.TokenUtils;
import net.myapp.springsecurity.dal.type.AuditActionSourceType;
import net.myapp.springsecurity.dal.type.LoginMessageType;
import net.myapp.springsecurity.dal.type.RoleType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.google.gson.Gson;

public class LoginManagerImpl extends BaseManagerImpl implements LoginManager, Constant {

	private static final Logger logger = LoggerFactory.getLogger(LoginManagerImpl.class); 
	private static AuditLogUtil auditLogManager;
	@Autowired
	private UserDetailsService userService;
	@Autowired
	@Qualifier("authenticationManager")
	private AuthenticationManager authManager;

	private String LoginMsg = new String();
	//Query Purpose
	private String sql = new String();
	private Object[] param = new Object[]{};
	private Integer failAtm = 5;
	private Double blockTime = 5.00;

	@Override
	public UserTransferBean userValidation(LoginBean loginBean, String remoteHost) {

		String IP = new String();
		String responseJSON = new String();
		
		//// spring security start
		String requestJSON = getLoginBeanRequestJSON(loginBean);		
		logger.info("User Login Request Received : "+requestJSON);
		try 
		{
			if(this.dosePasswordDateOver(loginBean)){
				this.resetLoginStatus(loginBean.getLoginId());
			}
			
			LoginMsg = "Password Not Valid!";
			IP = remoteHost;

			logger.debug("Start Retrieving User Login Info for : "+requestJSON);			
			LoginInfo loginInfo = getLoginInfoByLoginId(loginBean.getLoginId());
			responseJSON = getLoginInforesponseJSON(loginInfo);
			logger.debug("User Login Info : "+responseJSON);

			logger.info("Start User Login Request Validation Process for Responsed Login Info : "+responseJSON);

			if(loginInfo == null){
				LoginMsg = "Login ID Not Valid!";
				return saveFailLoginTrail(loginBean, IP, "Failed", "Login ID Not Valid!", LoginMessageType.IVI.name().toString());
			}
			else if(loginInfo != null && loginInfo.getStatus().equalsIgnoreCase("I")){
				LoginMsg = "Login ID Not Active!";
				return saveFailLoginTrail(loginBean, IP, "Failed", "Login ID Not Active!", LoginMessageType.UNA.name().toString());
			}
			else if(!this.isBranchActive(loginBean.getLoginId())){
				LoginMsg = LoginMessageType.INBR.name().toString();
				return saveFailLoginTrail(loginBean, IP, "Failed", "Branch is not active!", LoginMessageType.INBR.name().toString());
			}

			logger.debug("Start Retrieving User Info for Responsed Login info : "+responseJSON);	

			logger.info("Binding User Bank Info : "+requestJSON);
			

			logger.info("Binding user branch information : "+requestJSON);
			BranchBean branchBean = null;
			if(loginInfo.getBranchID() !=null)
			{				
				branchBean = getBranchbyBranchID(loginInfo.getBranchID());
			}
			if(branchBean == null)
			{
				branchBean = new BranchBean();
				branchBean.setBranchName("");
			}
			responseJSON = GsonUtil.getJson(branchBean);
			logger.debug("User Branch Info : "+responseJSON);

			logger.info("Binding user Role definition : "+requestJSON);
			LoginBean validateLoginBean = DomainToBeanConverter.convertLoginInfoToBean(loginInfo);
			validateLoginBean.setBankName(loginBean.getBankName());
			String [] roleList =  new Gson().fromJson(validateLoginBean.getRoleJSON(), String[].class);
			if(hasThisRole(roleList, RoleType.Agent.getValue()))
			{
				/*********** the commentted lines would be used 
				 *********** if agents were allowed to login *************/
				/*AgentsBean agentsBean = getAgentInfoByAgentID(loginBean.getLoginId());
				loginBean.setPassword(loginBean.getPassword() + agentsBean.getMobileIMEI());*/
				/*********** the commentted lines would be used 
				 *********** if agents were allowed to login *************/

				LoginMsg = "An Agent!";
			}
			responseJSON = GsonUtil.getJson(roleList);
			logger.debug("User Role Info : "+responseJSON);
			///// end get user info for branch officer password convert (not spring security)

			logger.debug("Start Password Authentication Process for User Login request : "+requestJSON);
			///// start get user info (not spring security)
			UsernamePasswordAuthenticationToken authenticationToken = 
					new UsernamePasswordAuthenticationToken(loginBean.getLoginId(), loginBean.getPassword());
			Authentication authentication = null;
			try{
				logger.info("Responding to User Login request Failure : "+requestJSON);
				authentication = this.authManager.authenticate(authenticationToken);
				if(this.checkUserIDBlock(loginBean.getLoginId(), blockTime)){
					return saveFailLoginTrail(loginBean, IP, "Failed", "ID is Blocked!", LoginMessageType.BLOCK_ID.name().toString());
				}
				/*else if(this.checkIPBlock(IP, blockTime)){
					return saveFailLoginTrail(loginBean, IP, "Failed", "IP is Blocked!", LoginMessageType.BLOCK_IP.name().toString());
				}*/
			}catch(Exception e){
				return saveFailLoginTrail(loginBean, IP, "Failed", "Password Not Valid!", LoginMessageType.PNM.name().toString());
			}
			SecurityContextHolder.getContext().setAuthentication(authentication);
			///// spring security end
			Map<String, Boolean> roles = new HashMap<String, Boolean>();
			validateLoginBean.setRoleBean(getRoleMenuTree(roleList[0]));			
			UserDetails userDetails = this.userService.loadUserByUsername(loginBean.getLoginId());

			for (GrantedAuthority authority : userDetails.getAuthorities()) {
				roles.put(authority.toString(), Boolean.TRUE);
			}
			logger.debug("End Password Authentication Process for User Login request : "+requestJSON);

			logger.debug("End Retrieving User Info for Responsed Login info : "+responseJSON);

			logger.info("Validation Successful : "+requestJSON);
			logger.debug("End User Login Request Validation Process : "+requestJSON);
			logger.info("Responding to User Login request Success : "+requestJSON);

			return entry_LoginSuccessInfo_Into_Logintrail(userDetails, branchBean, roles, validateLoginBean, requestJSON, IP);
		}
		catch (Exception e) {
			logger.error("Validation Failed : "+e.getMessage());
			logger.debug("End User Login Request Validation Process : "+requestJSON);
			logger.info("Responding to User Login request Failure : "+requestJSON);

			logger.debug("Start Enter Login Failure History in Login Trail for : "+requestJSON);

			TransactionDefinition def = new DefaultTransactionDefinition();
			TransactionStatus  transStatus = springJdbcDao.getTransactionManager().getTransaction(def);

			try {

				String status = new String("Failed");

				sql = queryManager.insertLogInTrailSql();
				String trailID = OIDGenerator.generateId();
				param = new Object[]{trailID,
						loginBean.getLoginId(),
						loginBean.getRoleJSON(),
						dateManager.getCurrentDateTime(),
						IP,
						status};

				springJdbcDao.saveObject(sql,param);

				springJdbcDao.getTransactionManager().commit(transStatus);
				logger.debug("Successfully Entered Login Failure History in Login Trail for : "+requestJSON);
			} catch (Exception e1) {
				logger.error("Exception occured while Entering Login Failure History in Login Trail for : "+requestJSON, e1);
				springJdbcDao.getTransactionManager().rollback(transStatus);
			}

			logger.debug("End Enter Login Failure History in Login Trail for : "+requestJSON);

			logger.info("Log In Failure Msg : "+LoginMsg);
			return new UserTransferBean(null, null, null,null, null, false, LoginMsg, null);
		}
	}

	private boolean dosePasswordDateOver(LoginBean loginBean) throws Exception{
		String requestJson = GsonUtil.getJson(loginBean);
		logger.info("Checking dose password date expire : " + requestJson);
		PasswordPolicyBean passwordPolicyBean = null;
		boolean flag = false;
		Integer validDayRange = 0;
		try {
			String sql = queryManager.getActivePasswordPolicy();
			passwordPolicyBean = (PasswordPolicyBean) springJdbcDao.getObject(sql, new Object[]{"A"}, PasswordPolicyBean.class);
			if(passwordPolicyBean == null){
				return false;
			}
			PasswordPolicyJsonBean passwordPolicyJsonBean = (PasswordPolicyJsonBean) GsonUtil.parseObject(passwordPolicyBean.getPolicyJson(), PasswordPolicyJsonBean.class);
			validDayRange = passwordPolicyJsonBean.getValidity().getPasswordWillRemainValidFor();
			
			sql = queryManager.getLastPassHistoryByID();
			PasswordHistoryBean passwordHistoryBean = (PasswordHistoryBean) springJdbcDao.getObject(sql, new Object[]{loginBean.getLoginId()}, PasswordHistoryBean.class);
			if(passwordHistoryBean == null){
				return false;
			}
			
			Timestamp lastUpdated = passwordHistoryBean.getUpdatedOn();
			Timestamp currentTime = dateManager.getTimestamp(dateManager.getCurrentDateTime());
			if(dateManager.getTimeDiff(currentTime, lastUpdated) > validDayRange){
				return true;
			}
			
		} catch (Exception e) {
			logger.error("Exception occured while checking dose password date expire : " + requestJson);
			throw new Exception(e);
		}
		return flag;
	}

	private void resetLoginStatus(String loginId) throws Exception{
		logger.info("Reset login status of " + loginId);
		try {
			String sql = queryManager.updateResetStatusById();
			springJdbcDao.updateObject(sql, new Object[]{"Y", loginId});
		} catch (Exception e) {
			logger.error("Exception occured while going to reset status of " + loginId);
			throw new Exception(e);
		}
	}

	public UserTransferBean entry_LoginSuccessInfo_Into_Logintrail(UserDetails uDetails, BranchBean brBean, 
			Map<String, Boolean> roles, LoginBean validateLoginBean, String requestJSON, String IP){

		logger.debug("Start Enter Login Success History in Login Trail for : "+requestJSON);

		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus  transStatus = springJdbcDao.getTransactionManager().getTransaction(def);

		String trailID = OIDGenerator.generateId();

		try {

			String status = new String("OK");

			sql = queryManager.insertLogInTrailSql();

			param = new Object[]{trailID,
					validateLoginBean.getLoginId(),
					validateLoginBean.getRoleJSON(),
					dateManager.getCurrentDateTime(),
					IP,
					status};

			springJdbcDao.saveObject(sql,param);

			springJdbcDao.getTransactionManager().commit(transStatus);
			logger.debug("Login Trail Entry Successfull. Trail ID : "+trailID);
		}catch (Exception e) {
			logger.error("Login Trail Entry Failed. Trail ID : "+trailID,e);
			springJdbcDao.getTransactionManager().rollback(transStatus);
		}

		logger.debug("End Enter Login Success History in Login Trail for : "+requestJSON);

		LoginMsg = "Login Successful!";
		logger.info("Log In Success Msg : "+LoginMsg);
		return new UserTransferBean(trailID, 
				uDetails.getUsername(),
				brBean.getBranchName(), 
				roles, 
				TokenUtils.createToken(uDetails),
				true, 
				LoginMsg, 
				validateLoginBean);
	}
	
	// only for fail login
	private UserTransferBean saveFailLoginTrail(LoginBean loginBean, String ip, String status, String loginFailMsg, String failCause) throws Exception{
		String requestJSON = getLoginBeanRequestJSON(loginBean);
		logger.info(loginFailMsg);
		logger.info("Start Enter Login Failure History in Login Trail for : " + requestJSON + "with ip : " + ip);
		String trailStatus = status;
		
		try {
			if(failCause.equalsIgnoreCase(LoginMessageType.PNM.name().toString())){ // If password not match
				if(this.checkUserIDBlock(loginBean.getLoginId(), blockTime)){
					LoginMsg = LoginMessageType.BLOCK_ID.name().toString();
					trailStatus = LoginMessageType.ALREADY_ID_BLOCK.name().toString();
				}
				else{
					if(this.lastNthAttemptFail(ip, (failAtm - 1))){
						if(this.checkAllIDSame(ip, (failAtm - 1), loginBean.getLoginId())){
							LoginMsg = LoginMessageType.BLOCK_ID.name().toString();
							trailStatus = LoginMessageType.BLOCK_ID.name().toString();
							this.blockID(loginBean.getLoginId());
						}else{
							LoginMsg = LoginMessageType.BLOCK_IP.name().toString();
							trailStatus = LoginMessageType.BLOCK_IP.name().toString();
						}
					}
				}
			}
			else if(failCause.equalsIgnoreCase(LoginMessageType.BLOCK_ID.name().toString())){ // password match but ID is blocked
				LoginMsg = LoginMessageType.BLOCK_ID.name().toString();
				trailStatus = LoginMessageType.ALREADY_ID_BLOCK.name().toString();
			}
			else if(failCause.equalsIgnoreCase(LoginMessageType.BLOCK_IP.name().toString())){ // password match but ID is blocked
				LoginMsg = LoginMessageType.BLOCK_IP.name().toString();
				trailStatus = LoginMessageType.ALREADY_IP_BLOCK.name().toString();
			}
			else if(failCause.equalsIgnoreCase(LoginMessageType.UNA.name().toString())){ // If user not active
				LoginMsg = loginFailMsg;
				trailStatus = status;
			}
			else if(failCause.equalsIgnoreCase(LoginMessageType.IVI.name().toString())){ // If invalid user id
				if(this.checkIPBlock(ip, blockTime)){
					LoginMsg = LoginMessageType.BLOCK_IP.name().toString();
					trailStatus = LoginMessageType.ALREADY_IP_BLOCK.name().toString();
				}
				else{
					if(this.lastNthAttemptFail(ip, (failAtm - 1))){
						LoginMsg = LoginMessageType.BLOCK_IP.name().toString();
						trailStatus = LoginMessageType.BLOCK_IP.name().toString();
					}
				}
			}
		
		
			sql = queryManager.insertLogInTrailSql();
			String trailID = OIDGenerator.generateId();
			param = new Object[]{trailID,
					loginBean.getLoginId(),
					loginBean.getRoleJSON(),
					dateManager.getCurrentDateTime(),
					ip,
					trailStatus};

			springJdbcDao.saveObject(sql,param);
			logger.debug("Successfully Entered Login Failure History in Login Trail for : "+requestJSON);
		} catch (Exception e1) {
			logger.error("Exception occured while Entering Login Failure History in Login Trail for : "+requestJSON, e1);
		}
		logger.debug("End Enter Login Failure History in Login Trail for : "+requestJSON);
		logger.info("Log In Failure Msg : "+LoginMsg);
		return new UserTransferBean(null, null, null,null, null, false, LoginMsg, null);
	}
	
	
	/****************************************
	 * Start IP and ID checking for blocking*
	 ****************************************/
	
	/**
	 * Check is IP block with hour
	 * @param string ip
	 * @param int hour
	 * @return boolean
	 * @throws Exception 
	 */
	private boolean checkIPBlock(String ip, Double hour) throws Exception{
		boolean isIPBlock = false;
		sql = queryManager.getLastLoginByIp();
		param = new Object[]{dateManager.getCurrentDateTime(), ip, LoginMessageType.ALREADY_IP_BLOCK.name().toString()};
		try {
			LoginTrail loginTrail = (LoginTrail) springJdbcDao.getObject(sql, param, LoginTrail.class);
			if(loginTrail != null && loginTrail.getLoginStatus().equalsIgnoreCase(LoginMessageType.BLOCK_IP.name().toString())
					&& (loginTrail.getTimediff() < hour)){
				isIPBlock = true;
			}
		}
		catch (EmptyResultDataAccessException er){
			logger.error("Empty Result Data for ip : " + ip + "Check is ip block", er);
		}
		catch (Exception e) {
			logger.error("Error occured while check is ip block :  " + ip, e);
			throw new Exception(e);
		}
		return isIPBlock;
	}
	
	/**
	 * In last n.. login attempt count fail no 
	 * @param String ip
	 * @param int count
	 * @return boolean
	 */
	private boolean lastNthAttemptFail(String ip, Integer count){
		boolean isAllAttemptFail = false;
		sql = queryManager.countLoginFailedByIp();
		param = new Object[]{LoginMessageType.FAILDE.getValue(), ip, count};
		try {
			/*LoginTrail loginTrail = (LoginTrail) springJdbcDao.getObject(sql, param, LoginTrail.class);
			if(loginTrail != null && loginTrail.getCountFailed() >= count){
				isAllAttemptFail = true;
			}*/
			Integer failAttempCount = springJdbcDao.count(sql, param);
			if(failAttempCount != null && failAttempCount >= count){
				isAllAttemptFail = true;
			}
		} 
		catch (EmptyResultDataAccessException er){
			logger.error("Empty Result Data for ip : " + ip + "Check is fail no. ", er);
		}
		catch (Exception e) {
			logger.error("Error occured while count number of failed attemped :  " + ip, e);
		}
		return isAllAttemptFail;
	}
	
	/**
	 * check last n.. fail attempt same
	 * @param ip
	 * @param count
	 * @return boolean
	 */
	private boolean checkAllIDSame(String ip, Integer count, String loginID) throws Exception{
		boolean isAllIDSame = false;
		sql = queryManager.countLoginIdByIp();
		param = new Object[]{loginID, ip, count};
		try {
			LoginTrail loginTrail = (LoginTrail) springJdbcDao.getObject(sql, param, LoginTrail.class);
			if(loginTrail != null && loginTrail.getCountID() >= count){
				isAllIDSame = true;
			}
		} 
		catch (EmptyResultDataAccessException er){
			logger.error("Empty Result Data for ip : " + ip + "Check is ip same", er);
		}
		catch (Exception e) {
			logger.error("Error occured while count same login id attemped :  " + ip, e);
			throw new Exception(e);
		}
		return isAllIDSame;
	}
	
	/**
	 * block user, so user can't login
	 * @param userID
	 * @throws Exception
	 */
	private void blockID(String loginID) throws Exception{
		sql = queryManager.blockID();
		try {
			param = new Object[]{LoginMessageType.BLOCK_ID.name().toString(), dateManager.getCurrentDateTime(), loginID};
			springJdbcDao.updateObject(sql, param);
			logger.debug("Successfully Block User: "+ loginID);
		} catch (Exception e1) {
			logger.error("Exception occured while going to block user id : ", e1);
		}
	}
	
	private void unbockID(String loginID) throws Exception{
		sql = queryManager.ubBlockID();
		try {
			param = new Object[]{loginID};
			springJdbcDao.updateObject(sql, param);
			logger.debug("Successfully Unblock User: "+ loginID);
		} catch (Exception e1) {
			logger.error("Exception occured while going to unblock user id : ", e1);
		}
	}
	
	/**
	 * 
	 * @param loginID
	 * @return boolean
	 */
	private boolean checkUserIDBlock(String loginID, Double hour) throws Exception{
		boolean isUserIDBlock = false;
		sql = queryManager.getLastLoginById();
		param = new Object[]{dateManager.getCurrentDateTime(), loginID};
		try {
			LoginBean login = (LoginBean) springJdbcDao.getObject(sql, param, LoginBean.class);
			if(login.getBlockStatus() != null && login.getBlockStatus().equalsIgnoreCase(LoginMessageType.BLOCK_ID.name().toString())
					){
				if(login.getTimediff() != null && (login.getTimediff() < hour)){
					isUserIDBlock = true;
				}
				else{
					this.unbockID(loginID);
				}
			}
		} catch (Exception e) {
			logger.error("Error occured while check is user block:  " + loginID, e);
			throw new Exception(e);
		}
		return isUserIDBlock;
	}
	
	
	/**************************************
	 * End IP and ID checking for blocking*
	 **************************************/

	@Override
	public void LoginTrailIDClosed(String trailID) {

		logger.debug("Start User Log Out. Login Trail ID : "+trailID);

		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus  transStatus = springJdbcDao.getTransactionManager().getTransaction(def);

		String status = new String("Logout");

		try {

			sql = queryManager.updateLogInTrailClosed();
			param = new Object[]{status,
					dateManager.getCurrentDateTime(),
					trailID};

			springJdbcDao.updateObject(sql,param);

			springJdbcDao.getTransactionManager().commit(transStatus);
			logger.info("Login Trail Update Successfull. Trail ID : "+trailID);
		}catch (Exception e) {
			logger.error("Login Trail Update Failed. Trail ID : "+trailID,e);
			springJdbcDao.getTransactionManager().rollback(transStatus);
		}

		logger.debug("End User Log Out. Login Trail ID : "+trailID);
	}

	@Override
	public LoginInfo getLoginInfoByLoginId(String loginId) {

		logger.debug("Start Get Login Info By Login ID : "+loginId);

		sql = queryManager.selectUserInfoByLoginIdSql();
		param = new Object[]{loginId};

		LoginInfo loginInfo = new LoginInfo();
		try {
			loginInfo = (LoginInfo)springJdbcDao.getObject(sql, param, LoginInfo.class);

			if(loginInfo != null)
			{
				logger.debug("Successfully Got Login Info By Login ID : "+loginId);				
			}
			else
				logger.warn("There is no Login Info with Login ID : "+loginId);

			logger.debug("End Get Login Info By Login ID : "+loginId);

			return loginInfo;
		} catch (Exception e) {

			logger.error("Exception Occured while getting Login Info By Login ID : "+loginId,e.getMessage());
			logger.debug("End Get Login Info By Login ID : "+loginId);

			return null;
		}
	}

	

	public BranchBean getBranchbyBranchID(String branchID)
	{
		logger.debug("Start Get Branch Info By Branch ID : "+branchID);

		sql = queryManager.selectBranchbyBranchIDSql();
		param = new Object[]{branchID};

		BranchBean branchBean = new BranchBean();
		try {
			branchBean = (BranchBean)springJdbcDao.getObject(sql, param, BranchBean.class);

			if(branchBean != null)
				logger.debug("Successfully Got Branch Info By Branch ID : "+branchID);
			else
				logger.warn("There is no Branch Info with Branch ID : "+branchID);

			logger.debug("End Get Branch Info By Branch ID : "+branchID);

			return branchBean;
		} catch (Exception e) {

			logger.error("Exception Occured while getting Branch Info By Branch ID : "+branchID,e);
			logger.debug("End Get Branch Info By Branch ID : "+branchID);

			return null;
		}
	}

	public boolean hasThisRole(String[] roleList, String role)
	{
		logger.debug("Start Boolean Check; has this Role : \""+role+"\" in Rolelist");

		boolean hasThisRole = false;
		for(String r:roleList)
		{
			if(r.equalsIgnoreCase(role))
			{
				hasThisRole = true;
			}
		}

		logger.debug("Checking Resulted : "+hasThisRole);		
		logger.debug("End Boolean Check; has this Role : \""+role+"\" in Rolelist");
		return hasThisRole;
	}

	public boolean isValidUser(LoginInfo loginInfo, LoginBean loginBean) {

		String requestJSON = getLoginBeanRequestJSON(loginBean);		
		logger.debug("Start Boolean Check; is Valid User : "+requestJSON);

		boolean isValid = false;
		String encryptPass = "";
		try 
		{
			encryptPass = PasswordEncryptor.sha1(loginBean.getPassword());

			if(encryptPass != null)			
				logger.debug("Successfully Encrypted password during validation check for : "+requestJSON);
			else
				logger.warn("Could not Encrypt password during validation check for : "+requestJSON);
		} 
		catch (NoSuchAlgorithmException e) 
		{
			logger.error("Exception occured while encrypting password during validation check for : "+requestJSON,e);
		}
		if(loginInfo.getLoginId().equals(loginBean.getLoginId()) && loginInfo.getPassword().equals(encryptPass))
		{
			isValid = true;
		}

		logger.debug("Checking Resulted : "+isValid);
		logger.debug("End Boolean Check; is Valid User : "+requestJSON);
		return isValid;
	}

	public RoleBean getRoleMenuTree( String roleID )
	{
		logger.debug("Start Get Role Menu Tree By Role ID : "+roleID);

		sql = queryManager.selectRolebyRoleIDForLoginSql();
		param = new Object[]{roleID};

		Role role = new Role();
		try {
			role = (Role)springJdbcDao.getObject(sql, param, Role.class);

			if(role != null)
				logger.debug("Successfully Got Role Menu Tree By Role ID : "+roleID);
			else
				logger.warn("There is no Role Menu Tree with Role ID : "+roleID);

			logger.debug("End Get Role Menu Tree By Role ID : "+roleID);

			return DomainToBeanConverter.convertRoleToBean(role);
		} catch (Exception e) {

			logger.error("Exception Occured while getting Role Menu Tree By Role ID : "+roleID,e);
			logger.debug("End Get Role Menu Tree By Role ID : "+roleID);

			return null;
		}

	}

	private String getLoginBeanRequestJSON(LoginBean loginBean)
	{
		String requestJSON = GsonUtil.getJson(loginBean);
		try {
			if(requestJSON != null)
			{
				requestJSON = requestJSON.substring(0, requestJSON.indexOf("\",\"password\":\"")+14)
						+ "**************"
						+ requestJSON.substring(requestJSON.indexOf("\",\"reset\":"),requestJSON.length());
			}
		} catch (Exception e) {
			logger.error("Exception in getLoginBeanRequestJSON : "+e.getMessage());
		}
		return requestJSON;	
	}

	private String getLoginInforesponseJSON(LoginInfo loginInfo)
	{
		String responseJSON = GsonUtil.getJson(loginInfo);
		try {
			if(responseJSON != null)
			{
				responseJSON = responseJSON.substring(0, responseJSON.indexOf("\",\"password\":\"")+14)
						+ "**************"
						+ responseJSON.substring(responseJSON.indexOf("\",\"email\":\""),responseJSON.length());
			}
		} catch (Exception e) {
			logger.error("Exception in getLoginInforesponseJSON : "+e.getMessage());
		}
		return responseJSON;
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
			else if (login.getPassword().equalsIgnoreCase(PasswordEncryptor.encryptor(bean.getCurrentPass()))) 
			{
				sql = queryManager.ResetPasswordbyLoginIDSql();
				param = new Object[] {PasswordEncryptor.encryptor(bean.getNewPass()),
						bean.getChangedBy(),
						dateManager.getTimestamp(dateManager.getCurrentDateTime()),
						bean.getResetRequired(),
						bean.getUserID()};

				int res = 0;
				
				LoginInfo loginBean = new LoginInfo();
				auditLogManager.beforeOperation(loginBean.getClass(), bean.getUserID());
				res = springJdbcDao.updateObject(sql, param);
				auditLogManager.afterOperation(	AuditActionSourceType.USER.getValue(), bean.getChangedBy());
				auditLogManager.insertPasswordHistory(bean.getUserID(), PasswordEncryptor.encryptor(bean.getNewPass()), bean.getChangedBy());
				
				if (res > 0) {
					responseBean.setSuccess(true);
					responseBean.setMessage("Password reset successfully!");	

					logger.info("Successfully Reset Password : "+requestJSON);
				}
			}
			else  {

				responseBean.setSuccess(false);
				responseBean.setMessage("Oldpassworddosenotmatch");		

				logger.warn("Old Password Does Not Match : "+requestJSON);
			}			
			responseBean.setData(bean);
			springJdbcDao.getTransactionManager().commit(transStatus);

		} catch(Exception e){
			responseBean.setSuccess(false);
			responseBean.setData(bean);
			logger.error("Exception occured while Tring to Update User Status : "+requestJSON, e);
			springJdbcDao.getTransactionManager().rollback(transStatus);
		}


		logger.debug("End Reset Password : "+requestJSON);

		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}

	private boolean isBranchActive(String loginId) throws Exception {
		boolean isActive = true;
		sql = queryManager.getBranchInfoByUser();
		param = new Object[]{loginId};
		try {
			LoginBean userBankInfo = (LoginBean) springJdbcDao.getObject(sql, param, LoginBean.class);
			if(userBankInfo.getBranchID() != null && !userBankInfo.getStatus().equalsIgnoreCase("A")){
				isActive = false;
			}
		} catch (Exception e) {
			logger.error("Error occured while check is branch id active :  ", e);
			throw new Exception(e);
		}
		return isActive;
	}
	
	public static void setAuditLogManager(AuditLogUtil auditLogManager) {
		LoginManagerImpl.auditLogManager = auditLogManager;
	}

}
