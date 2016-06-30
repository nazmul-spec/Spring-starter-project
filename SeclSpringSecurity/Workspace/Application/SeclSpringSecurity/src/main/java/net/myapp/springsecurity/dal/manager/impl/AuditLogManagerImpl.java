
package net.myapp.springsecurity.dal.manager.impl;

import java.util.ArrayList;
import java.util.List;

import net.myapp.springsecurity.dal.manager.AuditLogManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.myapp.springsecurity.dal.bean.AuditLogDataBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.db.utils.AuditLogUtil;
import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.db.utils.GsonUtil;

public class AuditLogManagerImpl extends BaseManagerImpl implements AuditLogManager {
	
	private static final Logger logger = LoggerFactory.getLogger(AuditLogManagerImpl.class);
	
	//Query Purpose
	private String sql = new String();
	private Object[] param = new Object[]{};
	
	@Override
	public ResponseBean getAllAuditLogData(AuditLogDataBean auditLogBean) {
		
		String requestJSON = GsonUtil.getJson(auditLogBean);
		logger.debug("Start Fetching All Audit Log Data : "+requestJSON);
		
		ResponseBean responseBean = new ResponseBean();
		Long count = 0L;
		List<AuditLogDataBean> auditLogList = new ArrayList<AuditLogDataBean>();
		
		try {
			
			sql = queryManager.selectAllAuditLogInfo(auditLogBean);
			param = new Object[]{};
			
			auditLogList = (List<AuditLogDataBean>)springJdbcDao.getObjectList(sql, param, AuditLogDataBean.class);
			
			if(auditLogList == null || auditLogList.isEmpty()){
				
				responseBean.setMessage(Constant.Nd1000);
				responseBean.setSuccess(false);
				logger.warn("No data found : "+requestJSON);
				
				String responseJSON = GsonUtil.getJson(responseBean);
				logger.info("Response : "+responseJSON);
				
				return responseBean;
			}
			sql = queryManager.countAllAuditLogInfo(auditLogBean);
			param = new Object[]{};

			count = (long) springJdbcDao.count(sql, param);			
			responseBean.setTotalCount(count);
			
			responseBean.setData(auditLogList);
			responseBean.setSuccess(true);
			
 		   	logger.info("Successfully Fetched All Audit Log Data : "+requestJSON);
		} catch(Exception e) {
			logger.error("An exception occured while getting all Audit Log Data : "+requestJSON, e);
		}
		
		logger.debug("End Fetching All Audit Log Data : "+requestJSON);
		
		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);
		
		return responseBean;
	}

	@Override
	public ResponseBean getAuditLogDataByID(AuditLogDataBean auditLogBean) {
		String requestJSON = GsonUtil.getJson(auditLogBean);
		logger.debug("Start Fetching Audit Log Data : "+requestJSON);
		
		ResponseBean responseBean = new ResponseBean();
		
		try {
			
			sql = queryManager.selectAuditLogInfoByID();
			param = new Object[]{auditLogBean.getOID()};
			
			auditLogBean = (AuditLogDataBean)springJdbcDao.getObject(sql, param, AuditLogDataBean.class);
			
			if(auditLogBean == null || auditLogBean.toString().isEmpty()){
				
				responseBean.setMessage(Constant.Nd1000);
				responseBean.setSuccess(false);
				logger.warn("No data found : "+requestJSON);
				
				String responseJSON = GsonUtil.getJson(responseBean);
				logger.info("Response : "+responseJSON);
				
				return responseBean;
			}
			
			auditLogBean = setListViewData(auditLogBean);
			
			responseBean.setData(auditLogBean);
			responseBean.setSuccess(true);
			
 		   	logger.info("Successfully Fetched Audit Log Data : "+requestJSON);
		} catch(Exception e) {
			logger.error("An exception occured while getting Audit Log Data : "+requestJSON, e);
		}
		
		logger.debug("End Fetching Audit Log Data : "+requestJSON);
		
		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);
		
		return responseBean;
	}
	
	private AuditLogDataBean setListViewData(AuditLogDataBean auditLogBean) throws Exception
	{
		AuditLogUtil util = new AuditLogUtil();
		auditLogBean.setRowImageBeforeObj(util.getRowImageObj(auditLogBean.getRowImageBefore(), auditLogBean.getTableName()));
		auditLogBean.setRowImageAfterObj(util.getRowImageObj(auditLogBean.getRowImageAfter(), auditLogBean.getTableName()));
		auditLogBean.setListViewData(util.getListviewData(auditLogBean.getRowImageBeforeObj(), auditLogBean.getRowImageAfterObj()));		
		return auditLogBean;
	}
	
}
