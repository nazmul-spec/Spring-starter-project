package net.myapp.springsecurity.rest.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import net.myapp.springsecurity.dal.bean.AuditLogDataBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.manager.AuditLogManager;


@Path("/auditLog")
public class AuditLogService implements Constant{
	
	AuditLogManager auditManager;
	
	@POST
	@Path("/get")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean post(AuditLogDataBean auditLogBean) {
		
		ResponseBean responseBean = new ResponseBean();
		if(auditLogBean.getOperationType().equalsIgnoreCase(GET_ALL)) {
			responseBean =  auditManager.getAllAuditLogData(auditLogBean);
		}
		else if(auditLogBean.getOperationType().equalsIgnoreCase(GET_BY_ID)) {
			responseBean =  auditManager.getAuditLogDataByID(auditLogBean);
		}
		return responseBean;
	}
	
	public void setAuditManager(AuditLogManager auditLogManager) {
		this.auditManager = auditLogManager;
	}
	
}