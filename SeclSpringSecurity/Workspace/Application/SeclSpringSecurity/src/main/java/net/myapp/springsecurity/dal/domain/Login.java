package net.myapp.springsecurity.dal.domain;

import java.sql.Timestamp;

public class Login {
	
	private String loginId;
	private String password;
	private String email;
	private String mobileNo;
	private String bankID;
	private String branchID;
	private String status;
	private boolean reset;
	private String roleJSON;
	private Timestamp blockTime;
	private String blockStatus;
	private String rejectionCause;
	
	public String getLoginId() {
		return loginId;
	}
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getBankID() {
		return bankID;
	}
	public void setBankID(String bankID) {
		this.bankID = bankID;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRoleJSON() {
		return roleJSON;
	}
	public void setRoleJSON(String roleJSON) {
		this.roleJSON = roleJSON;
	}
	public boolean isReset() {
		return reset;
	}
	public void setReset(boolean reset) {
		this.reset = reset;
	}
	public String getBranchID() {
		return branchID;
	}
	public void setBranchID(String branchID) {
		this.branchID = branchID;
	}
	public Timestamp getBlockTime() {
		return blockTime;
	}
	public void setBlockTime(Timestamp blockTime) {
		this.blockTime = blockTime;
	}
	public String getBlockStatus() {
		return blockStatus;
	}
	public void setBlockStatus(String blockStatus) {
		this.blockStatus = blockStatus;
	}
	public String getRejectionCause() {
		return rejectionCause;
	}
	public void setRejectionCause(String rejectionCause) {
		this.rejectionCause = rejectionCause;
	}
}
