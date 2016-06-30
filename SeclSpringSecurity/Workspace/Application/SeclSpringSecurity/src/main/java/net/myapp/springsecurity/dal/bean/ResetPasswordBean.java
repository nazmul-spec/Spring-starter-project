package net.myapp.springsecurity.dal.bean;

import java.sql.Timestamp;

public class ResetPasswordBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;

	private String userID;
	private String currentPass;
	private String newPass;
	private String confirmPass;
	private String agentID;
	private String servicePointID;
	private String servicePointName;
	private String loginID;
	private String oid;
	private String oldPassword;
	private String newPassword;
	private String bankID;
	private String branchID;
	private String branchName;
	private String resetStatus;
	private String resetRequired;
	private String makerID;
	private String checkerID;
	private String approverID;
	private Timestamp createdDate;
	private Timestamp approvedDate;
	private String reset;
	
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	
	public String getOid() {
		return oid;
	}
	public void setOid(String oid) {
		this.oid = oid;
	}
	public String getCurrentPass() {
		return currentPass;
	}
	public void setCurrentPass(String currentPass) {
		this.currentPass = currentPass;
	}
	public String getNewPass() {
		return newPass;
	}
	public void setNewPass(String newPass) {
		this.newPass = newPass;
	}
	public String getConfirmPass() {
		return confirmPass;
	}
	public void setConfirmPass(String confirmPass) {
		this.confirmPass = confirmPass;
	}
	public String getAgentID() {
		return agentID;
	}
	public void setAgentID(String agentID) {
		this.agentID = agentID;
	}
	public String getServicePointID() {
		return servicePointID;
	}
	public void setServicePointID(String servicePointID) {
		this.servicePointID = servicePointID;
	}
	public String getServicePointName() {
		return servicePointName;
	}
	public void setServicePointName(String servicePointName) {
		this.servicePointName = servicePointName;
	}
	public String getLoginID() {
		return loginID;
	}
	public void setLoginID(String loginID) {
		this.loginID = loginID;
	}
	public String getOldPassword() {
		return oldPassword;
	}
	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	public String getBankID() {
		return bankID;
	}
	public void setBankID(String bankID) {
		this.bankID = bankID;
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
	public String getResetStatus() {
		return resetStatus;
	}
	public void setResetStatus(String resetStatus) {
		this.resetStatus = resetStatus;
	}
	public String getMakerID() {
		return makerID;
	}
	public void setMakerID(String makerID) {
		this.makerID = makerID;
	}
	public String getCheckerID() {
		return checkerID;
	}
	public void setCheckerID(String checkerID) {
		this.checkerID = checkerID;
	}
	public String getApproverID() {
		return approverID;
	}
	public void setApproverID(String approverID) {
		this.approverID = approverID;
	}
	public Timestamp getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}
	public Timestamp getApprovedDate() {
		return approvedDate;
	}
	public void setApprovedDate(Timestamp approvedDate) {
		this.approvedDate = approvedDate;
	}
	public String getResetRequired() {
		return resetRequired;
	}
	public void setResetRequired(String resetRequired) {
		this.resetRequired = resetRequired;
	}
	public String getReset() {
		return reset;
	}
	public void setReset(String reset) {
		this.reset = reset;
	}
	
}
