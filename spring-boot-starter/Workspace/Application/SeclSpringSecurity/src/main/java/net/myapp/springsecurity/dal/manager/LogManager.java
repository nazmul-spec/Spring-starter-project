package net.myapp.springsecurity.dal.manager;

import net.myapp.springsecurity.dal.bean.LogSummaryBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;

/**
 * 
 * @author Kowsar
 *
 */
public interface LogManager extends BaseManager {
	
	
	public ResponseBean getLogs(String location, String fileName);
	
	public ResponseBean viewLog(LogSummaryBean logSummaryBean);
	
}
 