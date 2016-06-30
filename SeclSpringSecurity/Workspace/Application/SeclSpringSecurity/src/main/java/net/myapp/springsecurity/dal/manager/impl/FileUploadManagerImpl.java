package net.myapp.springsecurity.dal.manager.impl;

import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.db.utils.GsonUtil;
import net.myapp.springsecurity.dal.manager.FileUploadManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;

public class FileUploadManagerImpl  extends BaseManagerImpl implements FileUploadManager, Constant  {
	
	private static final Logger logger = LoggerFactory.getLogger(FileUploadManagerImpl.class);

	
	private ResponseBean getResponse(String[] sqlArray) throws DuplicateKeyException,Exception
	{
		ResponseBean responseBean = new ResponseBean();		
		try {
			int[] res = (int[])springJdbcDao.batchUpdate(sqlArray);
			if(res.length > 0)
			{
				responseBean.setSuccess(true);
				//String messageCode = operatyonType.equalsIgnoreCase(Constant.APPROVE) ? Constant.Sa1000 : Constant.Sr1000;
				responseBean.setMessage(Constant.DIS0001);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw new DuplicateKeyException(e.getMessage());
		}	
		
		return responseBean;
	}
	
	




	@Override
	public ResponseBean updateCbsStatus(String accountid,String accountstatus) {
		ResponseBean responseBean = new ResponseBean();
		logger.debug("Updating CBS Account Status by accountid of :"+ accountid);
		
		try {
			
			String sql =""; /*queryManager.updateCbsStatus();*/
			accountstatus = accountstatus.equals("U") ? "UA" : "U";
			Object [] param = new Object[]{accountstatus,accountid};		
			
			boolean isSuccess = springJdbcDao.updateObject(sql, param) > 0;
			if(isSuccess){				
				responseBean.setMessage(Constant.UdS1000);
				responseBean.setSuccess(isSuccess);
				responseBean.setData(accountstatus);
				logger.info("Successfully Updated CBS Account Status By AccountID of :"+ accountid);
			}
			else{
				responseBean.setMessage(Constant.Up1000);
				responseBean.setSuccess(isSuccess);
			}
			
			String responseJSON = GsonUtil.getJson(responseBean);
			logger.info("Response : "+responseJSON);
			
			
			
 		   	
		} catch(Exception e) {
			logger.error("An exception occured while updated cbs account status by accountid of:"+accountid, e);
		}	
		
		return responseBean;
	}




}
