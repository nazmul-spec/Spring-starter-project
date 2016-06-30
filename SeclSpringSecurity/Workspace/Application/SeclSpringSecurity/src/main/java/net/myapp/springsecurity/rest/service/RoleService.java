package net.myapp.springsecurity.rest.service;

import javax.ws.rs.Path;

import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.manager.RoleManager;


@Path("/role")
public class RoleService implements Constant{	
	RoleManager roleManager;
	/*	
	@POST
	@Path("/save")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean save(RoleBean roleBean){
		ResponseBean responseBean = new ResponseBean();
		
		if(roleBean.getOperationType() != null && roleBean.getOperationType().equalsIgnoreCase(CrudeType.ADD.name())){
			responseBean = roleManager.saveRoleService(roleBean);
		}
		
		return responseBean;
	}
	
	
	@POST
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean update(RoleBean roleBean){
		ResponseBean responseBean = new ResponseBean();
		
		if(roleBean.getOperationType().equalsIgnoreCase(CrudeType.UPDATE.name())){
			responseBean = roleManager.updateRoleService(roleBean);
		}else if(roleBean.getOperationType().equalsIgnoreCase(DocStatusType.BANK_CHECKED.getValue())){
			responseBean = roleManager.updateTerminalStatus(roleBean);
		}else if(roleBean.getOperationType().equalsIgnoreCase(DocStatusType.BANK_APPROVED.getValue())){
			responseBean = roleManager.updateTerminalStatus(roleBean);
		}else if(roleBean.getOperationType().equalsIgnoreCase(DocStatusType.BANK_REJECTED.getValue())){
			responseBean = roleManager.updateTerminalStatus(roleBean);
			
		}else if(roleBean.getOperationType().equalsIgnoreCase(DocStatusType.MAKE_EDITABLE.getValue())){
			responseBean = roleManager.updateTerminalStatus(roleBean);
			
		}else if(roleBean.getOperationType().equalsIgnoreCase(DocStatusType.CLOSED.getValue())){
			responseBean = roleManager.updateTerminalStatus(roleBean);
			
		}
		else if(roleBean.getOperationType().equalsIgnoreCase(CrudeType.UPDATE_STATUS_BY_ADMIN.name())){
			responseBean = roleManager.updateStatusByAdmin(roleBean);
			
		}
		
		return responseBean;
	}
	
	
	@POST
	@Path("/get")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean get(RoleBean roleBean){
		ResponseBean responseBean = new ResponseBean();
		
		if(roleBean.getOperationType().equalsIgnoreCase(CrudeType.SELECT_BY_PARAM.name())){
			responseBean = roleManager.getAllRole(roleBean);
		}		
		else if(roleBean.getOperationType().equalsIgnoreCase(CrudeType.GET_ALL_TOP_MENU.name())){
			responseBean = roleManager.getAllTopMenu(roleBean);
		}
		else if(roleBean.getOperationType().equalsIgnoreCase(CrudeType.SELECT_BY_ID.name())){
			responseBean = roleManager.getRoleInfoByID(roleBean);
		}
		return responseBean;
	}*/
	
	
	public void setRoleManager(RoleManager roleManager) {
		this.roleManager = roleManager;
	}	
}