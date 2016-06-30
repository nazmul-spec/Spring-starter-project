package net.myapp.springsecurity.dal.bean;

import java.sql.Timestamp;

public class PasswordHistoryBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;

	private String passHistoryID; 
	private String loginID;
	private String oldPassword; 
	private String newPassword; 
	private String updatedBy; 
	private Timestamp updatedOn;
	public String getPassHistoryID() {
		return passHistoryID;
	}
	public void setPassHistoryID(String passHistoryID) {
		this.passHistoryID = passHistoryID;
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
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	public Timestamp getUpdatedOn() {
		return updatedOn;
	}
	public void setUpdatedOn(Timestamp updatedOn) {
		this.updatedOn = updatedOn;
	}
}
