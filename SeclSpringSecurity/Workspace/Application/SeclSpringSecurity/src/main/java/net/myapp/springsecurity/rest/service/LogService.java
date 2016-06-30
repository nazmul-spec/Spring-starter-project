package net.myapp.springsecurity.rest.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import net.myapp.springsecurity.dal.bean.LogSummaryBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.manager.LogManager;

/**
 * 
 * @author Kowsar
 *
 */

@Path("/log")
public class LogService implements Constant {

	LogManager logManager;
	
	
	@POST
	@Path("/viewlog")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean viewlog(LogSummaryBean logSummaryBean){
		ResponseBean responseBean = new ResponseBean();
		responseBean = logManager.viewLog(logSummaryBean);		
		return responseBean;
	}

	public void setLogManager(LogManager logManager) {
		this.logManager = logManager;
	}
	
}