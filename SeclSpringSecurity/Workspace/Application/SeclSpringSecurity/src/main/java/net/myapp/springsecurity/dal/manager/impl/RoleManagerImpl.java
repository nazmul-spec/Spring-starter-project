package net.myapp.springsecurity.dal.manager.impl;

import java.util.List;

import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.bean.RoleBean;
import net.myapp.springsecurity.dal.db.utils.AuditLogUtil;
import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.db.utils.GsonUtil;
import net.myapp.springsecurity.dal.manager.RoleManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

public class RoleManagerImpl extends BaseManagerImpl implements RoleManager, Constant {
	ResponseBean responseBean = new ResponseBean();
	private static final Logger logger = LoggerFactory.getLogger(RoleManagerImpl.class);
	private static AuditLogUtil auditLogManager;
	private String sql = new String();
	private Object[] param = new Object[]{};
	@Override
	public ResponseBean saveRoleService(RoleBean roleBean) {
		String requestJSON = GsonUtil.getJson(roleBean);
		logger.debug("Start Creating New  Role : "+requestJSON);
		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus  transStatus = springJdbcDao.getTransactionManager().getTransaction(def);
		int res = 0;
		int checkRole = 0;
		
		try {
			//check duplicate RoleID
			sql = "";//queryManager.countRoleID();
			param  = new Object[] { roleBean.getRoleID()};
			checkRole = springJdbcDao.count(sql, param);
			if (checkRole > 0) {
				springJdbcDao.getTransactionManager().rollback(transStatus);
				responseBean.setSuccess(false);
				responseBean.setMessage(DUPROLEID);
				responseBean.setData(roleBean);
				return responseBean;
			}
			//End Check duplicate 
			sql = "";//queryManager.insertRole();
			param =  new Object[] {roleBean.getRoleID(),
									roleBean.getRoleDescription(),
									roleBean.getStrMenuJSON(),
									roleBean.getStatus(),
									roleBean.getMakerID(),
									roleBean.getChecker(),
									roleBean.getApproverID(),
									roleBean.getRejectionCause(),
									roleBean.getChangedBy(),
									dateManager.getTimestamp(dateManager.getCurrentDateTime())};
			//auditLogManager.beforeOperation(roleBean.getClass(), roleBean.getRoleID());
			res = springJdbcDao.updateObject(sql, param);
			//auditLogManager.afterOperation(AuditActionSourceType.USER.getValue(), roleBean.getChangedBy());			
			responseBean.setSuccess(true);
			responseBean.setMessage(SMA1000);
			responseBean.setData(roleBean);
			springJdbcDao.getTransactionManager().commit(transStatus);
			logger.info("Successfully Created Role : "+requestJSON);
		} catch (Exception e) {
			logger.error("Exception Occured While Role : "+requestJSON, e);
			springJdbcDao.getTransactionManager().rollback(transStatus);
		}
		logger.debug("End Creating Role : "+requestJSON);

		return responseBean;
	}
	@Override
	public ResponseBean updateRoleService(RoleBean roleBean) {
		String requestJSON = GsonUtil.getJson(roleBean);
		logger.debug("Start Updating role Info : "+requestJSON);
		int checkUpdateRole = 0;
		TransactionDefinition def = new DefaultTransactionDefinition();
		TransactionStatus status = springJdbcDao.getTransactionManager().getTransaction(def);
		try {
			//check duplicate RoleID
			/*sql = queryManager.UpdateCountRoleID();
			param  = new Object[] { roleBean.getRoleID()};
			checkUpdateRole = springJdbcDao.count(sql, param);
			if (checkUpdateRole > 0) {
				springJdbcDao.getTransactionManager().rollback(status);
				responseBean.setSuccess(false);
				responseBean.setMessage(DUPROLEID);
				responseBean.setData(roleBean);
				return responseBean;
			}*/
			//End Check duplicate 
			// update Terminal
			sql = ""/*queryManager.updateRoleByID()*/;//sqlUpdateTerminal;
			param = new Object[]{roleBean.getRoleID(),
					roleBean.getRoleDescription(),
					roleBean.getStrMenuJSON(),
					roleBean.getStatus(),
					roleBean.getMakerID(),
					roleBean.getChecker(),
					roleBean.getApproverID(),
					roleBean.getRejectionCause(),
					roleBean.getChangedBy(),
					dateManager.getTimestamp(dateManager.getCurrentDateTime()),
					roleBean.getRoleID()};	
			//auditLogManager.beforeOperation(terminalBean.getClass(), terminalBean.getServiceTerminalID());
			springJdbcDao.updateObject(sql, param);
			//auditLogManager.afterOperation( AuditActionSourceType.USER.getValue(), terminalBean.getChangedBy());
			springJdbcDao.getTransactionManager().commit(status);
			responseBean.setSuccess(true);
			responseBean.setMessage(SMA1000);
			logger.info("Successfully Service Terminal Info Updated: "+requestJSON);
		}
		catch (Exception e) {
			responseBean.setSuccess(false);
			responseBean.setMessage(Constant.Us1000);
			logger.error("Failed to Update Service Terminal Info : "+requestJSON, e);
			springJdbcDao.getTransactionManager().rollback(status);
		}
		logger.debug("End Updating Service Terminal Info : "+requestJSON);
		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}	

	@Override
	public ResponseBean getAllRole(RoleBean roleBean) {
		String requestJSON = GsonUtil.getJson(roleBean);
		logger.debug("Start Retrieving Role List : " + requestJSON);
		Long totalCount = 0L;
		Object[] param = new Object[]{};
		ResponseBean responseBean = new ResponseBean();
		String sql = "";//queryManager.getAllRole(roleBean);
		try {
			List<RoleBean> roleBeans = springJdbcDao.getObjectList(sql, param, RoleBean.class);

			if(roleBeans == null || roleBeans.size() < 1){
				responseBean.setSuccess(false);
				responseBean.setMessage(Constant.Nd1000);
				logger.warn("No Data Received While Retrieving Role List : "+requestJSON);
				String responseJSON = GsonUtil.getJson(responseBean);
				logger.info("Response : "+responseJSON);

				return responseBean;
			}
			sql = "";//queryManager.countAllRole(roleBean);
			totalCount = (long) springJdbcDao.count(sql, new Object[]{});	
			responseBean.setTotalCount(totalCount);
			responseBean.setSuccess(true);
			responseBean.setData(roleBeans);
			logger.info("Successfully Retrieved Role List : "+requestJSON);
		} catch (Exception e) {
			logger.error("Exception occured while trying to Retrieve Role List : "+requestJSON, e);
		}
		logger.debug("End Retrieving Role List : "+requestJSON);
		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}

	@Override
	public ResponseBean getAllTopMenu(RoleBean roleBean) {
		String requestJSON = GsonUtil.getJson(roleBean);
		logger.debug("Start Retrieving Role List : " + requestJSON);
		Long totalCount = 0L;
		Object[] param = new Object[]{};
		ResponseBean responseBean = new ResponseBean();
		String sql ="";// queryManager.getAllTopMenu();
		try {
			List<RoleBean> topMenus = springJdbcDao.getObjectList(sql, param, RoleBean.class);

			if(topMenus == null || topMenus.size() < 1){
				responseBean.setSuccess(false);
				responseBean.setMessage(Constant.Nd1000);
				logger.warn("No Data Received While Retrieving Role List : "+requestJSON);
				String responseJSON = GsonUtil.getJson(responseBean);
				logger.info("Response : "+responseJSON);

				return responseBean;
			}
			responseBean.setSuccess(true);
			responseBean.setData(topMenus);
			logger.info("Successfully Retrieved Role List : "+requestJSON);
		} catch (Exception e) {
			logger.error("Exception occured while trying to Retrieve Role List : "+requestJSON, e);
		}
		logger.debug("End Retrieving Role List : "+requestJSON);
		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}
	
	
	@Override
	public ResponseBean getRoleInfoByID(RoleBean roleBean) {
		logger.debug("Start Retrieving Role Info by Role ID : "+roleBean.getRoleID());
		sql ="";// queryManager.selectRolebyRoleIDSql();
		param = new Object[] {roleBean.getRoleID()};

		try {
			roleBean = (RoleBean) springJdbcDao.getObject(sql, param, RoleBean.class);
			if(roleBean == null || roleBean.toString().isEmpty()){
				responseBean.setSuccess(false);
				responseBean.setMessage(Constant.Nd1000);
				logger.warn("No Data Received While Retrieving Role Info by Role ID : "+roleBean.getRoleID());
				String responseJSON = GsonUtil.getJson(responseBean);
				logger.info("Response : "+responseJSON);

				return responseBean;
			}
			responseBean.setSuccess(true);
			responseBean.setData(roleBean);
			logger.info("Successfully Retrieved Role Info by Role ID : "+roleBean.getRoleID());
		} catch (Exception e) {
			logger.error("Exception occured while trying to Retrieve Role Info by Role ID : "+roleBean.getRoleID(), e);
		}
		logger.debug("End Retrieving Role Info by Role ID : "+roleBean.getRoleID());
		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);

		return responseBean;
	}

	@Override
	public ResponseBean updateTerminalStatus(RoleBean roleBean) {
		return responseBean;
		
	}
	@Override
	public ResponseBean updateStatusByAdmin(RoleBean roleBean) {
		return null;
		
	}
	
	public static void setAuditLogManager(AuditLogUtil auditLogManager) {
		RoleManagerImpl.auditLogManager = auditLogManager;
	}
}
