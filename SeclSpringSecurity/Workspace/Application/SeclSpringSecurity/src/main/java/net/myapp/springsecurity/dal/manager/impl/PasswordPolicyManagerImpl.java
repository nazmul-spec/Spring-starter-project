package net.myapp.springsecurity.dal.manager.impl;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.myapp.springsecurity.dal.bean.PasswordHistoryBean;
import net.myapp.springsecurity.dal.bean.PasswordMessageBean;
import net.myapp.springsecurity.dal.bean.PasswordPolicyBean;
import net.myapp.springsecurity.dal.bean.PasswordPolicyJsonBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.db.utils.AuditLogUtil;
import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.db.utils.GsonUtil;
import net.myapp.springsecurity.dal.db.utils.OIDGenerator;
import net.myapp.springsecurity.dal.db.utils.ResponseUtil;
import net.myapp.springsecurity.dal.db.utils.Table;
import net.myapp.springsecurity.dal.manager.PasswordPolicyManager;
import net.myapp.springsecurity.dal.sha1encryptor.PasswordEncryptor;
import net.myapp.springsecurity.dal.type.AuditActionSourceType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.google.common.base.Strings;

public class PasswordPolicyManagerImpl extends BaseManagerImpl implements PasswordPolicyManager, Constant   {
	private static final Logger logger = LoggerFactory.getLogger(PasswordPolicyManagerImpl.class);
	private static AuditLogUtil auditLogManager;
	
	@Override
	public ResponseBean getByID(String passwordPolicyID) {
		logger.debug("Start Retrieving Password Policy By ID : " + passwordPolicyID);
		Object[] param = new Object[]{passwordPolicyID};
		ResponseBean responseBean = new ResponseBean();
		String sql = queryManager.getPasswordPolicieByID();		
		try {
			PasswordPolicyBean passwordPolicyBean = (PasswordPolicyBean) springJdbcDao.getObject(sql, param, PasswordPolicyBean.class);
			if(passwordPolicyBean == null){	
				logger.warn("No Data Received While Retrieving Password Policy By ID : "+passwordPolicyID);	
				ResponseUtil.getResponse(false, Nd1000);
				return responseBean;
			}
			PasswordPolicyJsonBean passwordPolicyJsonBean = (PasswordPolicyJsonBean) GsonUtil.parseObject(passwordPolicyBean.getPolicyJson(), PasswordPolicyJsonBean.class);
			passwordPolicyBean.setPolicyJsonObj(passwordPolicyJsonBean);
			
			if(passwordPolicyBean.getEffectiveFrom() != null){
				passwordPolicyBean.setEffectiveFromStr(dateManager.getFormatDate(DATE_TIME_FORMAT_S, passwordPolicyBean.getEffectiveFrom()));
			}
			if(passwordPolicyBean.getEffectiveTo() != null){
				passwordPolicyBean.setEffectiveToStr(dateManager.getFormatDate(DATE_TIME_FORMAT_S, passwordPolicyBean.getEffectiveTo()));
			}
			
			responseBean = ResponseUtil.getResponseDataObj(passwordPolicyBean);
			logger.info("Successfully Retrieved Password Policy List : " + passwordPolicyID);			
		} catch (Exception e) {
			logger.error("Exception occured while trying to Retrieve Password Policy By ID : "+passwordPolicyID, e);
		}
		logger.debug("End Retrieving Password Policy By ID : " + passwordPolicyID);		
		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);
		
		return responseBean;
	}
	
	@Override
	public ResponseBean getAll(PasswordPolicyBean passwordPolicyBean) {
		String requestJSON = GsonUtil.getJson(passwordPolicyBean);
		logger.debug("Start Retrieving Password Policy List : " + requestJSON);
		Long totalCount = 0L;		
		Object[] param = new Object[]{};
		ResponseBean responseBean = new ResponseBean();
		String sql ="";// queryManager.getPasswordPolicies(passwordPolicyBean);		
		try {
			List<PasswordPolicyBean> passwordPolicyBeans = springJdbcDao.getObjectList(sql, param, PasswordPolicyBean.class);
			
			if(passwordPolicyBeans == null || passwordPolicyBeans.size() < 1){	
				logger.warn("No Data Received While Retrieving Password Policy List : "+requestJSON);	
				ResponseUtil.getResponse(false, Nd1000);
				return responseBean;
			}
			
			sql = "";//queryManager.countTotalPassworPolicy(passwordPolicyBean);
			totalCount = (long) springJdbcDao.count(sql, new Object[]{});	
			
			responseBean.setTotalCount(totalCount);
			responseBean.setSuccess(true);
			responseBean.setData(passwordPolicyBeans);			
			logger.info("Successfully Retrieved Password Policy List : " + requestJSON);			
		} catch (Exception e) {
			logger.error("Exception occured while trying to Retrieve Password Policy List : "+requestJSON, e);
		}
		logger.debug("End Retrieving Password Policy List : " + requestJSON);		
		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);
		
		return responseBean;
	}
	
	@Override
	public ResponseBean save(PasswordPolicyBean passwordPolicyBean) {
		String requestJSON = GsonUtil.getJson(passwordPolicyBean);
		logger.debug("Start Saving Password Policy : "+requestJSON);
		
		Object[] param = new Object[]{};
		PasswordPolicyBean pp = passwordPolicyBean;
		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus  transStatus = springJdbcDao.getTransactionManager().getTransaction(def);		
		int res = 0;
		
		try {
			String sql ="";// queryManager.savePasswordPolicy();
			//pp.setPasswordPolicyID(this.getPasswordPolicyID());
			param =  this.getPasswordPolicyParamObj(pp);			
			auditLogManager.beforeOperation(pp.getClass(), pp.getPasswordPolicyID());
			res = springJdbcDao.updateObject(sql, param);
			auditLogManager.afterOperation(AuditActionSourceType.USER.getValue(), pp.getChangedBy());			
			springJdbcDao.getTransactionManager().commit(transStatus);			
			logger.info("Successfully Created Password Policy : "+requestJSON);
		} catch (Exception e) {
			res = 0;
			logger.error("Exception Occured While Creating Password Policy : "+requestJSON, e);
			springJdbcDao.getTransactionManager().rollback(transStatus);
		}		
		logger.debug("End Creating New Password Policy : "+requestJSON);
		
		return ResponseUtil.getResponseMessege((res > 0 ? Constant.Sc1000 : Constant.Us1000), (res > 0 ? true : false));
	}

	@Override
	public ResponseBean update(PasswordPolicyBean passwordPolicyBean) {
		String requestJSON = GsonUtil.getJson(passwordPolicyBean);
		logger.debug("Start Updating Password Policy : "+requestJSON);
		
		Object[] param = new Object[]{};
		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus  transStatus = springJdbcDao.getTransactionManager().getTransaction(def);		
		int res = 0;
		
		try {
			String sql ="";// queryManager.updatePasswordPolicy();
			param =  this.getPasswordPolicyObjectsToUpdateAll(passwordPolicyBean);			
			auditLogManager.beforeOperation(passwordPolicyBean.getClass(), passwordPolicyBean.getPasswordPolicyID());
			res = springJdbcDao.updateObject(sql, param);
			auditLogManager.afterOperation(
					AuditActionSourceType.USER.getValue(), 
					passwordPolicyBean.getChangedBy());
			
			springJdbcDao.getTransactionManager().commit(transStatus);
			logger.info("Successfully Updating Password Policy : "+requestJSON);
		} catch (Exception e) {
			res = 0;
			logger.error("Exception Occured While Updating Password Policy : "+requestJSON, e);
			springJdbcDao.getTransactionManager().rollback(transStatus);
		}		
		logger.debug("End Updating Password Policy: "+requestJSON);
		
		return ResponseUtil.getResponseMessege((res > 0 ? Constant.UdS1000 : Constant.Up1000), (res > 0 ? true : false));
	}
	
	@Override
	public ResponseBean updateStatus(String status,	PasswordPolicyBean passwordPolicyBean) {
		String requestJSON = GsonUtil.getJson(passwordPolicyBean);
		logger.debug("Start Updating Password Policy Status : "+requestJSON);

		Object[] param = new Object[]{};
		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus  transStatus = springJdbcDao.getTransactionManager().getTransaction(def);		
		int res = 0;
		
		try {
			if(status.equalsIgnoreCase("ACTIVE") && this.hasActivePolicy()){
				springJdbcDao.getTransactionManager().rollback(transStatus);
				return ResponseUtil.getResponseMessege(APA100, false);
			}
			
			String sql ="";// queryManager.updatePasswordPolicyStatus();
			param =  this.getPasswordPolicyObjectsToUpdateStatus(status, passwordPolicyBean);			
			auditLogManager.beforeOperation(passwordPolicyBean.getClass(), passwordPolicyBean.getPasswordPolicyID());
			res = springJdbcDao.updateObject(sql, param);
			auditLogManager.afterOperation(AuditActionSourceType.USER.getValue(), passwordPolicyBean.getChangedBy());
			
			springJdbcDao.getTransactionManager().commit(transStatus);
			logger.info("Successfully Updating Password Policy Status : "+requestJSON);
		} catch (Exception e) {
			res = 0;
			logger.error("Exception Occured While Updating Password Policy Status : "+requestJSON, e);
			springJdbcDao.getTransactionManager().rollback(transStatus);
		}		
		logger.debug("End Updating Password Policy Status: "+requestJSON);
		
		return ResponseUtil.getResponseMessege((res > 0 ? Constant.UdS1000 : Constant.Up1000), (res > 0 ? true : false));
	}

	private boolean hasActivePolicy() throws Exception{
		boolean activePasswordPolicy = false;
		try {
			String sql ="";// queryManager.hasActivePolicy();
			activePasswordPolicy = springJdbcDao.isDuplicateItem(sql);
		} catch (Exception e) {
			logger.error("Exception occured while checking has any active password policy", e);
			throw new Exception(e);
		}
		return activePasswordPolicy;
	}
	
	@Override
	public ResponseBean generatePassword() {
		logger.debug("Start Generating Password");			
		ResponseBean responseBean = new ResponseBean();		
		
		try {
			if(hasActivePolicy()){
				PasswordPolicyBean passwordPolicyBean = this.getActivePasswordPolicy();
				if(passwordPolicyBean == null){	
					responseBean.setSuccess(false);
					responseBean.setMessage("No Data Received While Retrieving Password Policy");
					logger.warn("No Data Received While Retrieving Password Policy");
					return responseBean;					
				}
				
				PasswordPolicyJsonBean  passwordPolicyJsonBean = passwordPolicyBean.getPolicyJsonObj();
				
				//create password from here
				if(passwordPolicyJsonBean != null){				
					
					int atLstChar = passwordPolicyJsonBean.getValidation().getLeastCharacters().getValue() != null ?  passwordPolicyJsonBean.getValidation().getLeastCharacters().getValue() : 0;					
					int atLstNumber = passwordPolicyJsonBean.getValidation().getLeastNumbers().getValue() !=null ? passwordPolicyJsonBean.getValidation().getLeastNumbers().getValue() : 0;					
					int atLstSpclChar = passwordPolicyJsonBean.getValidation().getLeastSpecialCharacters().getValue() != null ? passwordPolicyJsonBean.getValidation().getLeastSpecialCharacters().getValue() : 0;					
					int atLstUprCsLtr = passwordPolicyJsonBean.getValidation().getLeaseUpperCaseletters().getValue() != null ? passwordPolicyJsonBean.getValidation().getLeaseUpperCaseletters().getValue() : 0;					
					int atLstLwrCsLtr = passwordPolicyJsonBean.getValidation().getLeastLowerCaseLetter().getValue() != null ? passwordPolicyJsonBean.getValidation().getLeastLowerCaseLetter().getValue() : 0;					
					String charNotAllowed = passwordPolicyJsonBean.getValidation().getNotContaintheseCharacters().getCharsNotAllow() != null ? passwordPolicyJsonBean.getValidation().getNotContaintheseCharacters().getCharsNotAllow() : "";
					
					int restCharLength = atLstChar - (atLstNumber + atLstSpclChar + atLstUprCsLtr + atLstLwrCsLtr);
					
					if (atLstChar > 0) {
						StringBuilder passwordChar = new StringBuilder(atLstChar);
						Random r = new Random();
						char[] specialChars = "~!@#$%^&()_<>?|+-/*".toCharArray();
						char[] upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toCharArray();
						char[] lowerChars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
						char[] mixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".toCharArray();
						
						for (int i = 0; i < atLstNumber; i++) {
							int randNum = r.nextInt(9 - 0 + 1) + 0; //r.nextInt(max - min + 1) + min;
							passwordChar.append(randNum);
						}
						
						for (int i = 0; i < atLstSpclChar; i++) {
							String specialString = new String(specialChars);
							StringBuilder specialBuilder = new StringBuilder(specialString);

							for (int j = 0; j < charNotAllowed.length(); j++) {
								int indexToRemoveChar = specialBuilder.toString().indexOf(charNotAllowed.toCharArray()[j]);
								specialBuilder.deleteCharAt(indexToRemoveChar);
							}

							specialChars = specialBuilder.toString().toCharArray();

							char specialChar = specialChars[r.nextInt(specialChars.length)];
							passwordChar.append(specialChar);
						}
						
						for (int i = 0; i < atLstUprCsLtr; i++) {
							char upperChar = upperChars[r.nextInt(upperChars.length)];
							passwordChar.append(upperChar);
						}
						
						for (int i = 0; i < atLstLwrCsLtr; i++) {
							char lowerChar = lowerChars[r.nextInt(lowerChars.length)];
							passwordChar.append(lowerChar);
						}
						
						for (int i = 0; i < restCharLength; i++) {
							char mixChar = mixChars[r.nextInt(mixChars.length)];
							passwordChar.append(mixChar);
						}
	
						responseBean.setData(passwordChar.toString());
						responseBean.setSuccess(true);
					}
					
					
				}
				
				logger.info("passwordPolicyJsonBean: "+passwordPolicyJsonBean);
				
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("Exception occured while generating password", e);			
		}
		
		return responseBean;
	}
	
	@Override
	public ResponseBean getPasswordPolicy() {
		logger.debug("Start Getting Password Policy");			
		ResponseBean responseBean = new ResponseBean();	
		List<String> msgList = new ArrayList<String>();
		
		try {
			if(hasActivePolicy()){
				PasswordPolicyBean passwordPolicyBean = this.getActivePasswordPolicy();
				if(passwordPolicyBean == null){	
					msgList.add("There is no active password policy");
					responseBean.setSuccess(true);
					responseBean.setData(msgList);
					responseBean.setMessage("No Data Received While Retrieving Password Policy");
					logger.warn("No Data Received While Retrieving Password Policy");
					return responseBean;					
				}
				
				PasswordPolicyJsonBean  passwordPolicyJsonBean = passwordPolicyBean.getPolicyJsonObj();
				
				//Get password policy from here
				if(passwordPolicyJsonBean != null){
					//int remainValid = passwordPolicyJsonBean.getValidity().getPasswordWillRemainValidFor() != null ? passwordPolicyJsonBean.getValidity().getPasswordWillRemainValidFor() : 0;
					//int lastCantUse = passwordPolicyJsonBean.getValidity().getLastNoPasswordNotUsedAgain() != null ? passwordPolicyJsonBean.getValidity().getLastNoPasswordNotUsedAgain() : 0;
					
					int atLstChar = passwordPolicyJsonBean.getValidation().getLeastCharacters().getValue() != null ?  passwordPolicyJsonBean.getValidation().getLeastCharacters().getValue() : 0;					
					int atMstChar = passwordPolicyJsonBean.getValidation().getMostCharacters().getValue() != null ? passwordPolicyJsonBean.getValidation().getMostCharacters().getValue() : 0;
					String charNotAllowed = !Strings.isNullOrEmpty(passwordPolicyJsonBean.getValidation().getNotContaintheseCharacters().getCharsNotAllow()) ? passwordPolicyJsonBean.getValidation().getNotContaintheseCharacters().getCharsNotAllow() : "";
					
					int atLstNumber = passwordPolicyJsonBean.getValidation().getLeastNumbers().getValue() !=null ? passwordPolicyJsonBean.getValidation().getLeastNumbers().getValue() : 0;					
					int atMstNumber = passwordPolicyJsonBean.getValidation().getMostNumbers().getValue() != null ? passwordPolicyJsonBean.getValidation().getMostNumbers().getValue():0;					
					int atLstSpclChar = passwordPolicyJsonBean.getValidation().getLeastSpecialCharacters().getValue() != null ? passwordPolicyJsonBean.getValidation().getLeastSpecialCharacters().getValue() : 0;					
					int atMstSpclChar = passwordPolicyJsonBean.getValidation().getMostSpecialCharaccters().getValue() != null ? passwordPolicyJsonBean.getValidation().getMostSpecialCharaccters().getValue() : 0;					
					int atLstUprCsLtr = passwordPolicyJsonBean.getValidation().getLeaseUpperCaseletters().getValue() != null ? passwordPolicyJsonBean.getValidation().getLeaseUpperCaseletters().getValue() : 0;					
					int atMstUprCsLtr = passwordPolicyJsonBean.getValidation().getMostUpperCaseletters().getValue() != null ? passwordPolicyJsonBean.getValidation().getMostUpperCaseletters().getValue():0;					
					int atLstLwrCsLtr = passwordPolicyJsonBean.getValidation().getLeastLowerCaseLetter().getValue() != null ? passwordPolicyJsonBean.getValidation().getLeastLowerCaseLetter().getValue() : 0;					
					int atMstLwrCsLtr = passwordPolicyJsonBean.getValidation().getMostLowerCaseLetter().getValue() != null ? passwordPolicyJsonBean.getValidation().getMostLowerCaseLetter().getValue() : 0;					
					
					//Boolean leastCharactersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeastCharacters().getEnableBool();
					//Boolean mostCharactersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostCharacters().getEnableBool();
					Boolean notContaintheseCharactersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getNotContaintheseCharacters().getEnableBool();
					
					Boolean leastNumbersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeastNumbers().getEnableBool();
					Boolean mostNumbersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostNumbers().getEnableBool();
					Boolean leastSpecialCharactersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeastSpecialCharacters().getEnableBool();
					Boolean mostSpecialCharacctersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostSpecialCharaccters().getEnableBool();
					Boolean leaseUpperCaselettersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeaseUpperCaseletters().getEnableBool();
					Boolean mostUpperCaselettersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostUpperCaseletters().getEnableBool();
					Boolean leastLowerCaseLetterBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeastLowerCaseLetter().getEnableBool();
					Boolean mostLowerCaseLetterBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostLowerCaseLetter().getEnableBool();
					
					// passwordPolicyMsg += "Password will remain valid for " + remainValid + "days form change.";
					// passwordPolicyMsg += "\n Last " + lastCantUse + "password can not be reused.";
					msgList.add("Password length should be between " + atLstChar + " and " + atMstChar + " characters.");
					
					if(notContaintheseCharactersBool){
						msgList.add("Password must not contain any of the following character(s) [ " + charNotAllowed + " ].");
					}
					
					if(leastNumbersBool){
						msgList.add("Password must contain at least " + atLstNumber + " digit(s).");
					}
					if(mostNumbersBool){
						msgList.add("Password can contain at most " + atMstNumber + " digit(s).");
					}
					
					if(leastLowerCaseLetterBool){
						msgList.add("Password must contain at least " + atLstLwrCsLtr + " lower case character(s).");
					}
					if(mostLowerCaseLetterBool){
						msgList.add("Password can contain at most " + atMstLwrCsLtr + " lower Case character(s).");
					}
					
					if(leaseUpperCaselettersBool){
						msgList.add("Password must contain at least " + atLstUprCsLtr + " upper case character(s).");
					}
					if(mostUpperCaselettersBool){
						msgList.add("Password can contain at most " + atMstUprCsLtr + " upper Case character(s).");
					}
					
					if(leastSpecialCharactersBool){
						msgList.add("Password must contain at least " + atLstSpclChar + " special character(s).");
					}
					if(mostSpecialCharacctersBool){
						msgList.add("Password can contain at most " + atMstSpclChar + " special character(s).");
					}
					PasswordMessageBean passwordMessageBean = new PasswordMessageBean();
					passwordMessageBean.setMsgList(msgList);
					passwordMessageBean.setLeastChar(atLstChar);
					passwordMessageBean.setMostChar(atMstChar);
					responseBean.setData(passwordMessageBean);
					responseBean.setSuccess(true);					
				}
				
				logger.info("passwordPolicyJsonBean: "+passwordPolicyJsonBean);
				
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			logger.error("Exception occured while getting password policy", e);			
		}
		
		return responseBean;
	}

	@Override
	public ResponseBean validatePassword(String password, String userID) {
		if(this.isBlank(password)){
			return ResponseUtil.getResponse(false, "PCB1000");
		}
		
		PasswordPolicyBean passwordPolicyBean = this.getActivePasswordPolicy();
		
		if(passwordPolicyBean == null){
			return ResponseUtil.getResponse(false, "NPPF100");
		}
		
		//Integer passwordWillRemainValidFor = passwordPolicyBean.getPolicyJsonObj().getValidity().getPasswordWillRemainValidFor();
		// TODO
		Integer lastNoPasswordNotUsedAgain = passwordPolicyBean.getPolicyJsonObj().getValidity().getLastNoPasswordNotUsedAgain();
		try {
			if(this.doseLastUsed(lastNoPasswordNotUsedAgain, userID, PasswordEncryptor.sha1(password))){
				return ResponseUtil.getResponse(false, "Last " + lastNoPasswordNotUsedAgain + "password can not be used again.");
			}
		} catch (NoSuchAlgorithmException e) {
			logger.error("Exception occurs while endcode password policy : " + userID, e);
		}
		
		Integer leastCharactersVal = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeastCharacters().getValue();
		Boolean leastCharactersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeastCharacters().getEnableBool();
		Integer mostCharactersVal = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostCharacters().getValue();	
		Boolean mostCharactersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostCharacters().getEnableBool();
		
		if(leastCharactersBool && password.length() < leastCharactersVal){
			return ResponseUtil.getResponse(false, "Password must have at least " + leastCharactersVal + "characters");
		}
		if(mostCharactersBool && password.length() > mostCharactersVal){
			return ResponseUtil.getResponse(false, "Password can not over " + leastCharactersVal + "characters");
		}
		
		
		Integer leastNumbersVal = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeastNumbers().getValue();
		Boolean leastNumbersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeastNumbers().getEnableBool();
		String regexLeastNumber = "(([^0-9]*)[0-9]([^0-9]*)){" + leastNumbersVal + ",}";
		Integer mostNumbersVal = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostNumbers().getValue();
		Boolean mostNumbersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostNumbers().getEnableBool();
		String regexMostNumber = "(([^0-9]*)[0-9]([^0-9]*)){" + leastNumbersVal + "," + mostNumbersVal + "}";
		
		
		//block to check is password has number
				if(this.passwordMatcher(password, "(([^0-9]*)[0-9]([^0-9]*)){1,}")){
					if(leastNumbersBool && mostNumbersBool && leastNumbersVal <= mostNumbersVal){						
						
						if(!this.passwordMatcher(password, regexLeastNumber)){
							return ResponseUtil.getResponse(false, "Password must have at least " + leastNumbersVal + "numbers");
						}
						
						if(!this.passwordMatcher(password, regexMostNumber)){
							return ResponseUtil.getResponse(false, "Password can not over " + mostNumbersVal + "numbers");
						}
					}
					else if(leastNumbersBool && !mostNumbersBool){
						if(!this.passwordMatcher(password, regexLeastNumber)){
							return ResponseUtil.getResponse(false, "Password must have at least " + leastNumbersVal + "numbers");
						}
					}
					else if(!leastNumbersBool && mostNumbersBool){
						if(!this.passwordMatcher(password, "(([^0-9]*)[0-9]([^0-9]*)){1,"+ mostNumbersVal + "}")){
							return ResponseUtil.getResponse(false, "Password can not over " + mostNumbersVal + "numbers");
						}
					}			
				}
				else if(leastNumbersBool && leastNumbersVal > 0){
					return ResponseUtil.getResponse(false, "Password must have at least " + leastNumbersVal + "numbers");
				}
		
		
		
		Integer leastSpecialCharactersVal = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeastSpecialCharacters().getValue();
		Boolean leastSpecialCharactersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeastSpecialCharacters().getEnableBool();
		String regexLeastSpecialChar = "(([A-Za-z0-9]*)[^A-Za-z0-9]([A-Za-z0-9]*)){" + leastSpecialCharactersVal + ",}";
		Integer mostSpecialCharacctersVal = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostSpecialCharaccters().getValue();
		Boolean mostSpecialCharacctersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostSpecialCharaccters().getEnableBool();
		String regexMostSpecialChar = "(([A-Za-z0-9]*)[^A-Za-z0-9]([A-Za-z0-9]*)){" + (leastSpecialCharactersVal == null ? "" : leastSpecialCharactersVal) + "," + mostSpecialCharacctersVal + "}";
		
		//block to check is password has special character
		if(this.passwordMatcher(password, "(([A-Za-z0-9]*)[^A-Za-z0-9]([A-Za-z0-9]*)){1,}")){
			if(leastSpecialCharactersBool && mostSpecialCharacctersBool && leastSpecialCharactersVal <= mostSpecialCharacctersVal){				
				
				if(!this.passwordMatcher(password, regexLeastSpecialChar)){
					return ResponseUtil.getResponse(false, "Password must have at least " + leastSpecialCharactersVal + "special characters");
				}
				
				if(!this.passwordMatcher(password, regexMostSpecialChar)){
					return ResponseUtil.getResponse(false, "Password can not over " + mostSpecialCharacctersVal+ "special characters");
				}
			}
			else if(leastSpecialCharactersBool && !mostSpecialCharacctersBool){
				if(!this.passwordMatcher(password, regexLeastSpecialChar)){
					return ResponseUtil.getResponse(false, "Password must have at least " + leastSpecialCharactersVal + "special characters");
				}
			}
			else if(!leastSpecialCharactersBool && mostSpecialCharacctersBool){
				if(!this.passwordMatcher(password, "(([A-Za-z0-9]*)[^A-Za-z0-9]([A-Za-z0-9]*)){1,"+ mostSpecialCharacctersVal + "}")){
					return ResponseUtil.getResponse(false, "Password can not over " + mostSpecialCharacctersVal+ "special characters");
				}
			}			
		}
		else if(leastSpecialCharactersBool && leastSpecialCharactersVal > 0){
			return ResponseUtil.getResponse(false, "Password must have at least " + leastSpecialCharactersVal + "special characters");
		}
		
		
		
		Integer leaseUpperCaselettersVal = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeaseUpperCaseletters().getValue();
		Boolean leaseUpperCaselettersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeaseUpperCaseletters().getEnableBool();
		String regexLeastUpperCase = "(([^A-Z]*)[A-Z]([^A-Z]*)){" + leaseUpperCaselettersVal + ",}";
		Integer mostUpperCaselettersVal = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostUpperCaseletters().getValue();
		Boolean mostUpperCaselettersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostUpperCaseletters().getEnableBool();
		String regexMostUpperCase = "(([^A-Z]*)[A-Z]([^A-Z]*)){" + leaseUpperCaselettersVal + "," + mostUpperCaselettersVal + "}";
		
		//block to check is password has upper case
		if(this.passwordMatcher(password, "(([^A-Z]*)[A-Z]([^A-Z]*)){1,}")){
			if(leaseUpperCaselettersBool && mostUpperCaselettersBool  && leaseUpperCaselettersVal <= mostUpperCaselettersVal){
				
				if(!this.passwordMatcher(password, regexLeastUpperCase)){
					return ResponseUtil.getResponse(false, "Password must have at least " + leaseUpperCaselettersVal + "uppercase letter");
				}
				
				if(!this.passwordMatcher(password, regexMostUpperCase)){
					return ResponseUtil.getResponse(false, "Password can not over " + mostUpperCaselettersVal + "uppercase letter");
				}
			}
			else if(leaseUpperCaselettersBool && !mostUpperCaselettersBool){
				if(!this.passwordMatcher(password, regexLeastUpperCase)){
					return ResponseUtil.getResponse(false, "Password must have at least " + leaseUpperCaselettersVal + "uppercase letter");
				}
			}
			else if(!leaseUpperCaselettersBool && mostUpperCaselettersBool){
				if(!this.passwordMatcher(password, "(([^A-Z]*)[A-Z]([^A-Z]*)){1,"+ mostUpperCaselettersVal + "}")){
					return ResponseUtil.getResponse(false, "Password can not over " + mostUpperCaselettersVal + "uppercase letter");
				}
			}			
		}
		else if(leaseUpperCaselettersBool && leaseUpperCaselettersVal > 0){
			return ResponseUtil.getResponse(false, "Password must have at least " + leaseUpperCaselettersVal + "uppercase letter");
		}		
		
		
		
		Integer leastLowerCaseLetterVal = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeastLowerCaseLetter().getValue();
		Boolean leastLowerCaseLetterBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getLeastLowerCaseLetter().getEnableBool();
		String regexLeastLowerCase = "(([^a-z]*)[a-z]([^a-z]*)){" + leastLowerCaseLetterVal + ",}";
		Integer mostLowerCaseLetterVal = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostLowerCaseLetter().getValue();
		Boolean mostLowerCaseLetterBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getMostLowerCaseLetter().getEnableBool();
		String regexMostLowerCase = "(([^a-z]*)[a-z]([^a-z]*)){" + leastLowerCaseLetterVal + "," + mostLowerCaseLetterVal + "}";
		
		//block to check is password has lower case
				if(this.passwordMatcher(password, "(([^a-z]*)[a-z]([^a-z]*)){1,}")){
					if(leastLowerCaseLetterBool && mostLowerCaseLetterBool && leastLowerCaseLetterVal <= mostLowerCaseLetterVal){
												
						if(!this.passwordMatcher(password, regexLeastLowerCase)){
							return ResponseUtil.getResponse(false, "Password must have at least " + leastLowerCaseLetterVal + "lowercase letter");
						}
						
						if(!this.passwordMatcher(password, regexMostLowerCase)){
							return ResponseUtil.getResponse(false, "Password can not over " + mostLowerCaseLetterVal + "lowercase letter");
						}
					}
					else if(leastLowerCaseLetterBool && !mostLowerCaseLetterBool){
						if(!this.passwordMatcher(password, regexLeastLowerCase)){
							return ResponseUtil.getResponse(false, "Password must have at least " + leastLowerCaseLetterVal + "lowercase letter");
						}
					}
					else if(!leastLowerCaseLetterBool && mostLowerCaseLetterBool){
						if(!this.passwordMatcher(password, "(([^a-z]*)[a-z]([^a-z]*)){1,"+ mostLowerCaseLetterVal + "}")){
							return ResponseUtil.getResponse(false, "Password can not over " + mostLowerCaseLetterVal + "lowercase letter");
						}
					}			
				}
				else if(leastLowerCaseLetterBool && leastLowerCaseLetterVal > 0){
					return ResponseUtil.getResponse(false, "Password must have at least " + leastLowerCaseLetterVal + "lowercase letter");
				}		
		
		
		
		String notContaintheseCharactersVal = passwordPolicyBean.getPolicyJsonObj().getValidation().getNotContaintheseCharacters().getCharsNotAllow();
		if(notContaintheseCharactersVal.equalsIgnoreCase("^")){
			notContaintheseCharactersVal = notContaintheseCharactersVal.replace("^", "\\\\^");
		}
		Boolean notContaintheseCharactersBool = passwordPolicyBean.getPolicyJsonObj().getValidation().getNotContaintheseCharacters().getEnableBool();
		String regexNotContChar = "(.*[" + notContaintheseCharactersVal + "].*){1,}";
		
		if(notContaintheseCharactersBool && this.passwordMatcher(password, regexNotContChar)){
			return ResponseUtil.getResponse(false, "Not allow this" + notContaintheseCharactersVal + "characters");
		}
		
		return ResponseUtil.getResponse(true, "Valid Password");
	}
	
	private boolean doseLastUsed(Integer lastNoPasswordNotUsedAgain, String userID, String encodePassword) {
		logger.info("Start getting password info by userID : " + userID);
		try {
			String sql = queryManager.getLastNPasswordInfoByLoginID();
			PasswordHistoryBean passwordHistoryBean = (PasswordHistoryBean) springJdbcDao.getObject(sql, new Object[]{userID, lastNoPasswordNotUsedAgain, encodePassword}, PasswordHistoryBean.class); 
			
			if(passwordHistoryBean == null || Strings.isNullOrEmpty(passwordHistoryBean.getNewPassword())){
				return false;
			}
			
		} catch (Exception e) {
			logger.error("Exception occurs while getting password info by userID : " + userID, e);
			return true;
		}
		return true;
	}

	public boolean passwordMatcher(String password, String regex){
		Pattern pattern = Pattern.compile(regex);  // least number
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
	}

	private PasswordPolicyBean getActivePasswordPolicy() {
		PasswordPolicyBean passwordPolicyBean = null;
		try {
			String sql = queryManager.getActivePasswordPolicy();
			passwordPolicyBean = (PasswordPolicyBean) springJdbcDao.getObject(sql, new Object[]{"ACTIVE"}, PasswordPolicyBean.class);
			if(passwordPolicyBean == null){
				return passwordPolicyBean;
			}
			PasswordPolicyJsonBean passwordPolicyJsonBean = (PasswordPolicyJsonBean) GsonUtil.parseObject(passwordPolicyBean.getPolicyJson(), PasswordPolicyJsonBean.class);
			passwordPolicyBean.setPolicyJsonObj(passwordPolicyJsonBean);
			passwordPolicyBean.setEffectiveFromStr(dateManager.getFormatDate(DATE_TIME_FORMAT_S, passwordPolicyBean.getEffectiveFrom()));
			passwordPolicyBean.setEffectiveToStr(dateManager.getFormatDate(DATE_TIME_FORMAT_S, passwordPolicyBean.getEffectiveTo()));
		} catch (Exception e) {
			logger.error("Exception occured while getting active password policy", e);
		}
		return passwordPolicyBean;
	}

	private boolean isBlank(String password) {
		return Strings.isNullOrEmpty(password);
	}

	public static void setAuditLogManager(AuditLogUtil auditLogManager) {
		PasswordPolicyManagerImpl.auditLogManager = auditLogManager;
	}
/*	
	private String getPasswordPolicyID() {
		long maxNumber = springJdbcDao.getTableMaxCount(queryManager.getTableMaxCount(Table.PASSWORD_POLICY_ID, Table.PASSWORD_POLICY, 3), Table.PASSWORD_POLICY);
		String tpgID = OIDGenerator.getOID(maxNumber, OidSuffexType.PASSWORD_POLICY.getValue(), 4);
		return tpgID;
	}*/
	
	private Object[] getPasswordPolicyParamObj(PasswordPolicyBean pp) {
		List<Object> objList = new ArrayList<Object>(); 
		
		objList.add(pp.getPasswordPolicyID()); 										// passwordPolicyID	
		objList.add(pp.getName());													// name		
		objList.add(pp.getDescription());											// description
		objList.add("INACTIVE");								// status
		objList.add(dateManager.getTimestamp(dateManager.getFormatDate(DATE_TIME_FORMAT_S, pp.getEffectiveFromStr()))); 	// effectiveFrom	
		objList.add(dateManager.getTimestamp(dateManager.getFormatDate(DATE_TIME_FORMAT_S, pp.getEffectiveToStr())));		// effectiveTo		
		objList.add(GsonUtil.getJson(pp.getPolicyJsonObj()));						// policyJson	
		
		objList.add(pp.getChangedBy());												// createdBy
		objList.add(dateManager.getTimestamp(dateManager.getCurrentDateTime()));	// createdOn
		Object[] params = objList.toArray();
		return params;	
	}
	
	private Object[] getPasswordPolicyObjectsToUpdateAll(PasswordPolicyBean pp) {
		List<Object> objList = new ArrayList<Object>(); 
		
		objList.add(pp.getName());													// name		
		objList.add(pp.getDescription());											// description
		if(Strings.isNullOrEmpty(pp.getEffectiveFromStr())){
			objList.add(null);	
		}
		else{
			objList.add(dateManager.getTimestamp(dateManager.getFormatDate(DATE_TIME_FORMAT_S, pp.getEffectiveFromStr()))); 	// effectiveFrom
		}
		if(Strings.isNullOrEmpty(pp.getEffectiveToStr())){
			objList.add(null);	
		}
		else{
			objList.add(dateManager.getTimestamp(dateManager.getFormatDate(DATE_TIME_FORMAT_S, pp.getEffectiveToStr())));		// effectiveTo
		}
		
		objList.add(GsonUtil.getJson(pp.getPolicyJsonObj()));						// policyJson	
		
		objList.add(pp.getChangedBy());												// updatedBy
		objList.add(dateManager.getTimestamp(dateManager.getCurrentDateTime()));	// updatedOn
		objList.add(pp.getPasswordPolicyID()); 										// passwordPolicyID	
		Object[] params = objList.toArray();
		return params;	
	}
	
	private Object[] getPasswordPolicyObjectsToUpdateStatus(String status, PasswordPolicyBean pp) {
		List<Object> objList = new ArrayList<Object>(); 
		
		objList.add(status);														// name		
		objList.add(pp.getChangedBy());												// updatedBy
		objList.add(dateManager.getTimestamp(dateManager.getCurrentDateTime()));	// updatedOn
		objList.add(pp.getPasswordPolicyID()); 										// passwordPolicyID	
		Object[] params = objList.toArray();
		return params;	
	}
}
