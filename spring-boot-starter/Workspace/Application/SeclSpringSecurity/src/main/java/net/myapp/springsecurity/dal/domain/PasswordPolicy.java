package net.myapp.springsecurity.dal.domain;

import java.sql.Timestamp;

public class PasswordPolicy{

	private String passwordPolicyID;
	private String name;			
	private String status;			
	private Timestamp effectiveFrom;	
	private Timestamp effectiveTo;			
	private String effectiveFromStr;	
	private String effectiveToStr;	
	private String description;		
	private PasswordPolicyJson policyJsonObj;
	private String policyJson;
	private String createdBy;
	private String createdOn;
	private String updatedBy;
	private String updateOn;
	
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
	public PasswordPolicyJson getPolicyJsonObj() {
		return policyJsonObj;
	}
	public void setPolicyJsonObj(PasswordPolicyJson policyJsonObj) {
		this.policyJsonObj = policyJsonObj;
	}
	public String getPolicyJson() {
		return policyJson;
	}
	public void setPolicyJson(String policyJson) {
		this.policyJson = policyJson;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public String getCreatedOn() {
		return createdOn;
	}
	public void setCreatedOn(String createdOn) {
		this.createdOn = createdOn;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	public String getUpdateOn() {
		return updateOn;
	}
	public void setUpdateOn(String updateOn) {
		this.updateOn = updateOn;
	}
	
}
