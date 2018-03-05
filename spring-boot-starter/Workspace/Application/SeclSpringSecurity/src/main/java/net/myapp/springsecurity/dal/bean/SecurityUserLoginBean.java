package net.myapp.springsecurity.dal.bean;

public class SecurityUserLoginBean extends AbstractBean  {
	
	private static final long serialVersionUID = 1L;
	
	private String OID;
	private String loginId;
	private String password;
	private String confirmPassword;
	private String email;
	private String mobileNo;
	private String bankID;
	private String branchID;
	private String status;
	private String message;
	private String resetRequired;
	private String roleID;
	private String roleJSON;
	private String [] roleJSONArray;
	private RoleBean roleBean;
	private String makerID;
	private String checkerID;
	private String approverID;
	private String rejectionCause;
	
	public String getRejectionCause() {
		return rejectionCause;
	}
	public void setRejectionCause(String rejectionCause) {
		this.rejectionCause = rejectionCause;
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
}
