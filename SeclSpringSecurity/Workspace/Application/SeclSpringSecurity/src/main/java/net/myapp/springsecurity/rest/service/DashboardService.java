/**
 * @author mashud.karim
 *
 */
package net.myapp.springsecurity.rest.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.manager.DashboardManager;

import org.springframework.stereotype.Service;

@Service
@Path("/dashboard")
public class DashboardService implements Constant {
	private DashboardManager dashboardManager;
	
	/*@POST
	@Path("/systemData")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean postSystemData(SystemData systemData){
		ResponseBean responseBean = new ResponseBean();		
		if(systemData.getOperationType().equalsIgnoreCase(SYSTEMDATA)) {
			responseBean =  dashboardManager.getSystemData(systemData);
		}
		else if(systemData.getOperationType().equalsIgnoreCase(SERVICE_DATA)) {
			responseBean =  dashboardManager.getServiceData(systemData);
		}
		
		return responseBean;
	}*/

	public void setDashboardManager(DashboardManager dashboardManager) {
		this.dashboardManager = dashboardManager;
	}

}





