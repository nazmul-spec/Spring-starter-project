package net.myapp.springsecurity.dal.bean;

import java.io.Serializable;
import java.sql.Timestamp;

public class LoginBean implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String OID;
	private String loginId;
	private String password;
	private String confirmPassword;
	private String email;
	private String mobileNo;
	private String bankID;
	private String branchID;
	private String branchName;
	private String status;
	private String message;
	private String resetRequired;
	private String roleID;
	private String roleJSON;
	private String [] roleJSONArray;
	private RoleBean roleBean;
	private String operationType;
	private String changedBy;
	private String bankName;	
	private String agentName;
	private Timestamp blockTime;
	private String blockStatus;
	private Double timediff;
	private String rejectionCause;
	private String role;
	
	public String getRejectionCause() {
		return rejectionCause;
	}
	public void setRejectionCause(String rejectionCause) {
		this.rejectionCause = rejectionCause;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public String getOID() {
		return OID;
	}
	public void setOID(String oID) {
		OID = oID;
	}
	public String getLoginId() {
		return loginId;
	}
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}
	public String getPassword() {
		return password;
	}
	public String getOperationType() {
		return operationType;
	}
	public void setOperationType(String operationType) {
		this.operationType = operationType;
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
	
	public String getResetRequired() {
		return resetRequired;
	}
	public void setResetRequired(String resetRequired) {
		this.resetRequired = resetRequired;
	}
	public String getRoleJSON() {
		return roleJSON;
	}
	public void setRoleJSON(String roleJSON) {
		this.roleJSON = roleJSON;
	}
	public RoleBean getRoleBean() {
		return roleBean;
	}
	public void setRoleBean(RoleBean roleBean) {
		this.roleBean = roleBean;
	}
	public String getChangedBy() {
		return changedBy;
	}
	public void setChangedBy(String changedBy) {
		this.changedBy = changedBy;
	}
	public String[] getRoleJSONArray() {
		return roleJSONArray;
	}
	public void setRoleJSONArray(String[] roleJSONArray) {
		this.roleJSONArray = roleJSONArray;
	}
	public String getRoleID() {
		return roleID;
	}
	public void setRoleID(String roleID) {
		this.roleID = roleID;
	}
	public String getBranchID() {
		return branchID;
	}
	public void setBranchID(String branchID) {
		this.branchID = branchID;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getConfirmPassword() {
		return confirmPassword;
	}
	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	public String getAgentName() {
		return agentName;
	}
	public void setAgentName(String agentName) {
		this.agentName = agentName;
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
	public Double getTimediff() {
		return timediff;
	}
	public void setTimediff(Double timediff) {
		this.timediff = timediff;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
}
