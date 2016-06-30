/**
 * @author mehedi.hasan
 *
 */
package net.myapp.springsecurity.rest.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import net.myapp.springsecurity.dal.bean.BranchBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.manager.BranchManager;

@Path("/branch")
public class BranchService implements Constant {
	BranchManager branchManager;
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean post(BranchBean model) {
		ResponseBean responseBean = new ResponseBean();
		if(model.getOperationType().equalsIgnoreCase(GET_ALL)) {
			responseBean =  branchManager.getAllBranch(responseBean, model);
		}		
		else if(model.getOperationType().equalsIgnoreCase(UPDATE_STATUS)) {
			responseBean =  branchManager.updateBranchStatus(responseBean, model);
		}
		
		return responseBean;
	}
	public void setBranchManager(BranchManager branchManager) {
		this.branchManager = branchManager;
	}
}