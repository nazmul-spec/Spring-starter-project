package net.myapp.springsecurity.dal.domain;

import net.myapp.springsecurity.dal.bean.AbstractBean;

public class LoginTrail extends AbstractBean {
	
	private String loginID;
	private String roleID;
	private String signinDate;
	private String signoutDate;
	private String machineIP;
	private String loginStatus;
	
	public String getLoginID() {
		return loginID;
	}
	public void setLoginID(String loginID) {
		this.loginID = loginID;
	}
	public String getRoleID() {
		return roleID;
	}
	public void setRoleID(String roleID) {
		this.roleID = roleID;
	}
	public String getSigninDate() {
		return signinDate;
	}
	public void setSigninDate(String signinDate) {
		this.signinDate = signinDate;
	}
	public String getSignoutDate() {
		return signoutDate;
	}
	public void setSignoutDate(String signoutDate) {
		this.signoutDate = signoutDate;
	}
	public String getMachineIP() {
		return machineIP;
	}
	public void setMachineIP(String machineIP) {
		this.machineIP = machineIP;
	}
	public String getLoginStatus() {
		return loginStatus;
	}
	public void setLoginStatus(String loginStatus) {
		this.loginStatus = loginStatus;
	}

}
