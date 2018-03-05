
package net.myapp.springsecurity.dal.manager.impl;

import java.io.File;
import java.io.IOException;
import java.util.List;

import net.myapp.springsecurity.dal.bean.LogSummaryBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.db.utils.FileUtil;
import net.myapp.springsecurity.dal.manager.LogManager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class LogManagerImpl extends BaseManagerImpl implements LogManager, Constant   {
	
	private static final Logger logger = LoggerFactory.getLogger(LogManagerImpl.class);


	@Override
	public ResponseBean getLogs(String location, String fileName) {
		logger.debug("Start reading log file");
		String fileLocation = "";
		ResponseBean responseBean = new ResponseBean();
		
		if(location == null || location.trim().isEmpty() || fileName == null || fileName.trim().isEmpty()){
			responseBean.setMessage(IVDL100);
			return responseBean;
		}
		
		fileLocation = location + File.separator + fileName;
		
		try {
			logger.info("Start reading log from : " + fileLocation);
			File file = new File(fileLocation);
			List<LogSummaryBean> logSummaryBeans = FileUtil.readLog(file);
			responseBean.setData(logSummaryBeans);
			responseBean.setSuccess(true);
		} catch (IOException e) {
			responseBean.setMessage(IVDL100);
			logger.error("Error occoured while reading file from " + fileLocation, e);
		}
		return responseBean;
	}

	@Override
	public ResponseBean viewLog(LogSummaryBean logSummaryBean) {
		logger.debug("Start reading log file");
		String fileLocation = "";
		ResponseBean responseBean = new ResponseBean();
		
		if(logSummaryBean.getLocation() == null 
			|| logSummaryBean.getLocation().trim().isEmpty() 
			|| logSummaryBean.getFileName() == null 
			|| logSummaryBean.getFileName().trim().isEmpty()){
			responseBean.setMessage(IVDL100);
			return responseBean;
		}
		
		fileLocation = logSummaryBean.getLocation() + File.separator + logSummaryBean.getFileName();
		
		try {
			logger.info("Start reading log from : " + fileLocation);
			File file = new File(fileLocation);
			LogSummaryBean logsumBean = FileUtil.getSingleLogMessage(file, logSummaryBean.getLineNum());
			responseBean.setData(logsumBean);
			responseBean.setSuccess(true);
		} catch (IOException e) {
			responseBean.setMessage(IVDL100);
			logger.error("Error occoured while reading file from " + fileLocation, e);
		}
		return responseBean;
	}
}
