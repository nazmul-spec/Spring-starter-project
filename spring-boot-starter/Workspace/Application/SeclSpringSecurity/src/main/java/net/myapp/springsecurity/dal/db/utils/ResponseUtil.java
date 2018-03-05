package net.myapp.springsecurity.dal.db.utils;

import net.myapp.springsecurity.dal.bean.ResponseBean;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class ResponseUtil
{
	private static final Logger logger = LoggerFactory.getLogger(ResponseUtil.class);
	
	// get response on insert success or fail
	public static ResponseBean getResponse(int res)
	{
		ResponseBean responseBean = new ResponseBean();
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
	
	// get response on Approved
	public static ResponseBean getResponseMessege(String messageID, boolean isSuccess)
	{
		ResponseBean responseBean = new ResponseBean();
		responseBean.setSuccess(isSuccess);
		responseBean.setMessage(messageID);
		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);
		return responseBean;
	}
	
	// get response on Approved
	public static ResponseBean getResponseApproved(int res)
	{
		ResponseBean responseBean = new ResponseBean();
		if(res > 0)	{
			responseBean.setSuccess(true);
			responseBean.setMessage(Constant.SAP1000);
		} else {
			responseBean.setSuccess(false);
			responseBean.setMessage(Constant.UAP1000);
		}
		
		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);
		
		return responseBean;
	}
	// get response on Approved
	public static ResponseBean getResponseReject(int res)
	{
		ResponseBean responseBean = new ResponseBean();
		if(res > 0)	{
			responseBean.setSuccess(true);
			responseBean.setMessage(Constant.SRE1000);
		} else {
			responseBean.setSuccess(false);
			responseBean.setMessage(Constant.URE1000);
		}
		
		String responseJSON = GsonUtil.getJson(responseBean);
		logger.info("Response : "+responseJSON);
		
		return responseBean;
	}
	
	// get response on select with data object
	public static ResponseBean getResponseDataObj(Object obj)
	{
		ResponseBean res = new ResponseBean();
		res.setData(obj);
		res.setSuccess(true);
		
		String responseJSON = GsonUtil.getJson(res);
		logger.info("Response : "+responseJSON);
		
		return res;
	}
	
	public static ResponseBean getResponse(Boolean isSuccess, String message)
	{
		ResponseBean res = new ResponseBean();
		res.setMessage(message);
		res.setSuccess(isSuccess);
		
		String responseJSON = GsonUtil.getJson(res);
		logger.info("Response : "+responseJSON);
		
		return res;
	}
	
	
	
}
