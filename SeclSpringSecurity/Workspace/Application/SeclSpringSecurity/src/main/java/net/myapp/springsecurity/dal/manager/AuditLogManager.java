/* Author Usha */
package net.myapp.springsecurity.dal.manager;

import net.myapp.springsecurity.dal.bean.AuditLogDataBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;

public interface AuditLogManager extends BaseManager {
	
	public ResponseBean getAllAuditLogData(AuditLogDataBean auditLogBean);
	
	public ResponseBean getAuditLogDataByID(AuditLogDataBean auditLogBean);
}


