package net.myapp.springsecurity.dal.bean;

public class LoginTrail extends AbstractBean {
	
	private String oid;
	private String loginID;
	private String roleID;
	private String signinDate;
	private String signoutDate;
	private String machineIP;
	private String loginStatus;
	private double timediff;
	private int countFailed;
	private int countID;
	
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
	public double getTimediff() {
		return timediff;
	}
	public void setTimediff(double timediff) {
		this.timediff = timediff;
	}
	public int getCountFailed() {
		return countFailed;
	}
	public void setCountFailed(int countFailed) {
		this.countFailed = countFailed;
	}
	public int getCountID() {
		return countID;
	}
	public void setCountID(int countID) {
		this.countID = countID;
	}
	public String getOid() {
		return oid;
	}
	public void setOid(String oid) {
		this.oid = oid;
	}
}
