package net.myapp.springsecurity.rest.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import net.myapp.springsecurity.dal.bean.PasswordPolicyBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.manager.PasswordPolicyManager;

@Path("/passwordpolicy")
public class PasswordPolicyService implements Constant {
	PasswordPolicyManager passwordPolicyManager;
	@POST
	@Path("/save")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean save(PasswordPolicyBean model){
		ResponseBean responseBean = new ResponseBean();
		
		if(model.getOperationType() != null ){
			responseBean = passwordPolicyManager.save(model);
		}
		
		return responseBean;
	}
	/*
	@POST
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean update(PasswordPolicyBean model){
		ResponseBean responseBean = new ResponseBean();
		
		if(model.getOperationType().equalsIgnoreCase(CrudeType.UPDATE.name())){
			responseBean = passwordPolicyManager.update(model);
		}else if(model.getOperationType().equalsIgnoreCase(CrudeType.UPDATE_STATUS_BY_ADMIN.name())){
			String status = model.getStatus().equalsIgnoreCase(DocStatusType.ACTIVE.getValue()) ? DocStatusType.INACTIVE.getValue() : DocStatusType.ACTIVE.getValue();
			responseBean = passwordPolicyManager.updateStatus(status, model);
		}
		
		return responseBean;
	}*/
	
	/*@POST
	@Path("/get")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean get(PasswordPolicyBean model){
		ResponseBean responseBean = new ResponseBean();
		
		if(model.getOperationType().equalsIgnoreCase(CrudeType.SELECT_BY_ID.name())){
			responseBean = passwordPolicyManager.getByID(model.getPasswordPolicyID());
		}else if(model.getOperationType().equalsIgnoreCase(CrudeType.SELECT_BY_PARAM.name())){
			responseBean = passwordPolicyManager.getAll(model);
		}else if(model.getOperationType().equalsIgnoreCase(CrudeType.SELECT_ALL.name())){
			responseBean = passwordPolicyManager.getAll(model);
		}else if(model.getOperationType().equalsIgnoreCase(CrudeType.VALIDATE_PASSWWORD.name())){
			responseBean = passwordPolicyManager.validatePassword(model.getPasswordStr(), model.getUserID());
		}else if(model.getOperationType().equalsIgnoreCase(CrudeType.GENERATE_PASSWORD.name())){
			responseBean = passwordPolicyManager.generatePassword();
		}else if(model.getOperationType().equalsIgnoreCase(CrudeType.GET_PASSWORD_POLICY.name())){
			responseBean = passwordPolicyManager.getPasswordPolicy();
		}
		
		return responseBean;
	}*/

	public void setPasswordPolicyManager(PasswordPolicyManager passwordPolicyManager) {
		this.passwordPolicyManager = passwordPolicyManager;
	}
}