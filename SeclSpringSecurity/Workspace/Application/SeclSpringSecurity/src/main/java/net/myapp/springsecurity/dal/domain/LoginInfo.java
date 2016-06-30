package net.myapp.springsecurity.dal.domain;

import java.sql.Timestamp;

import net.myapp.springsecurity.dal.bean.AbstractBean;
import net.myapp.springsecurity.dal.bean.RoleBean;

public class LoginInfo extends AbstractBean {
	
	private String OID;
	private String loginId;
	private String password;
	private String email;
	private String mobileNo;
	private String bankID;
	private String branchID;
	private String branchName;
	private String status;
	private String roleJSON;
	private String reset;
	private String [] roleJSONArray;
	private RoleBean roleBean;
	private Timestamp blockTime;
	private String blockStatus;
	private String resetRequired;
	
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
	
	public String getReset() {
		return reset;
	}
	public void setReset(String reset) {
		this.reset = reset;
	}
	public String[] getRoleJSONArray() {
		return roleJSONArray;
	}
	public void setRoleJSONArray(String[] roleJSONArray) {
		this.roleJSONArray = roleJSONArray;
	}
	public RoleBean getRoleBean() {
		return roleBean;
	}
	public void setRoleBean(RoleBean roleBean) {
		this.roleBean = roleBean;
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
	public String getResetRequired() {
		return resetRequired;
	}
	public void setResetRequired(String resetRequired) {
		this.resetRequired = resetRequired;
	}
	
}
