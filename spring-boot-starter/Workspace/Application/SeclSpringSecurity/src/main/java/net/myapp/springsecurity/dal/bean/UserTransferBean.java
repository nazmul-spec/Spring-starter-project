package net.myapp.springsecurity.dal.bean;

import java.util.Map;

public class UserTransferBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;

	private final String trailID;
	private final String name;
	private final String branchName;
	private final Map<String, Boolean> roles;
	private final String token;
	private boolean isSuccess;
	private String message;
	private Object data;

	public UserTransferBean(String trailID, String name, String branchName,
			Map<String, Boolean> roles, String token, boolean isSuccess,
			String message, Object data) {
		super();
		this.trailID = trailID;
		this.name = name;
		this.branchName = branchName;
		this.roles = roles;
		this.token = token;
		this.isSuccess = isSuccess;
		this.message = message;
		this.data = data;
	}

	public boolean isSuccess() {
		return isSuccess;
	}

	public void setSuccess(boolean isSuccess) {
		this.isSuccess = isSuccess;
	}

	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public Object getData() {
		return data;
	}


	public void setData(Object data) {
		this.data = data;
	}


	public String getName() {

		return this.name;
	}


	public String getBranchName() {
		return branchName;
	}

	public Map<String, Boolean> getRoles() {

		return this.roles;
	}


	public String getToken() {

		return this.token;
	}


	public String getTrailID() {
		return trailID;
	}

	
}
