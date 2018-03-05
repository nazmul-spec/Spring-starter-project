package net.myapp.springsecurity.dal.bean;


public class RoleBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;
	
	private String roleID;
	private String roleDescription;
	private MenuJsonBean[] menuJSON;
	private String strMenuJSON;
	private String roleName;
	private String status;
	private String topMenuResourceID;
	private String leftMenuResourceID;
	private String menuSequence;
	private String topMenuID;
	private String bankID;
	private String branchID;
	private String makerID;
	private String checker;
	private String approverID;
	private String rejectionCause;
	private String strMenuJson;
	
	public String getRoleID() {
		return roleID;
	}
	public void setRoleID(String roleID) {
		this.roleID = roleID;
	}
	public String getRoleDescription() {
		return roleDescription;
	}
	public void setRoleDescription(String roleDescription) {
		this.roleDescription = roleDescription;
	}
	public MenuJsonBean[] getMenuJSON() {
		return menuJSON;
	}
	public void setMenuJSON(MenuJsonBean[] menuJSON) {
		this.menuJSON = menuJSON;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}	
	public String getTopMenuResourceID() {
		return topMenuResourceID;
	}
	public void setTopMenuResourceID(String topMenuResourceID) {
		this.topMenuResourceID = topMenuResourceID;
	}
	public String getLeftMenuResourceID() {
		return leftMenuResourceID;
	}
	public void setLeftMenuResourceID(String leftMenuResourceID) {
		this.leftMenuResourceID = leftMenuResourceID;
	}
	public String getMenuSequence() {
		return menuSequence;
	}
	public void setMenuSequence(String menuSequence) {
		this.menuSequence = menuSequence;
	}
	public String getTopMenuID() {
		return topMenuID;
	}
	public void setTopMenuID(String topMenuID) {
		this.topMenuID = topMenuID;
	}
	public String getMakerID() {
		return makerID;
	}
	public void setMakerID(String makerID) {
		this.makerID = makerID;
	}
	public String getChecker() {
		return checker;
	}
	public void setChecker(String checker) {
		this.checker = checker;
	}
	public String getApproverID() {
		return approverID;
	}
	public void setApproverID(String approverID) {
		this.approverID = approverID;
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
	public String getRejectionCause() {
		return rejectionCause;
	}
	public void setRejectionCause(String rejectionCause) {
		this.rejectionCause = rejectionCause;
	}
	public String getStrMenuJSON() {
		return strMenuJSON;
	}
	public void setStrMenuJSON(String strMenuJSON) {
		this.strMenuJSON = strMenuJSON;
	}
	public String getStrMenuJson() {
		return strMenuJson;
	}
	public void setStrMenuJson(String strMenuJson) {
		this.strMenuJson = strMenuJson;
	}

}
