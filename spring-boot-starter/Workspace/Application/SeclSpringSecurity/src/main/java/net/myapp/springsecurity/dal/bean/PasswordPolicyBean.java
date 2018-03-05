package net.myapp.springsecurity.dal.bean;

import java.sql.Timestamp;

public class PasswordPolicyBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;

	private String passwordPolicyID;
	private String name;			
	private String status;			
	private Timestamp effectiveFrom;	
	private Timestamp effectiveTo;			
	private String effectiveFromStr;	
	private String effectiveToStr;	
	private String description;		
	private PasswordPolicyJsonBean policyJsonObj;
	private String policyJson;
	private String passwordStr;
	private String makerID;
	private String checkerID;
	private String approverID;
	private String userID;
	
	public String getPasswordPolicyID() {
		return passwordPolicyID;
	}
	public void setPasswordPolicyID(String passwordPolicyID) {
		this.passwordPolicyID = passwordPolicyID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Timestamp getEffectiveFrom() {
		return effectiveFrom;
	}
	public void setEffectiveFrom(Timestamp effectiveFrom) {
		this.effectiveFrom = effectiveFrom;
	}
	public Timestamp getEffectiveTo() {
		return effectiveTo;
	}
	public void setEffectiveTo(Timestamp effectiveTo) {
		this.effectiveTo = effectiveTo;
	}
	public String getEffectiveFromStr() {
		return effectiveFromStr;
	}
	public void setEffectiveFromStr(String effectiveFromStr) {
		this.effectiveFromStr = effectiveFromStr;
	}
	public String getEffectiveToStr() {
		return effectiveToStr;
	}
	public void setEffectiveToStr(String effectiveToStr) {
		this.effectiveToStr = effectiveToStr;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getPasswordStr() {
		return passwordStr;
	}
	public void setPasswordStr(String passwordStr) {
		this.passwordStr = passwordStr;
	}
	public PasswordPolicyJsonBean getPolicyJsonObj() {
		return policyJsonObj;
	}
	public void setPolicyJsonObj(PasswordPolicyJsonBean policyJsonObj) {
		this.policyJsonObj = policyJsonObj;
	}
	public String getPolicyJson() {
		return policyJson;
	}
	public void setPolicyJson(String policyJson) {
		this.policyJson = policyJson;
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
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
}
