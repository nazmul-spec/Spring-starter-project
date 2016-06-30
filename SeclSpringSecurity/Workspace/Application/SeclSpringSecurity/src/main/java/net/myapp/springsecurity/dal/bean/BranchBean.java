package net.myapp.springsecurity.dal.bean;

public class BranchBean extends AbstractBean {	
	private static final long serialVersionUID = 1L;
	private String branchID;
	private String bankID;
	private String branchName;
	private String address;					
	private String telephoneNo;				
	private String telephoneNo2;			
	private String email;					
	private String nameOfManager; 			
	private String telephoneNoOfManager;	
	private Double geoLocationLat;			
	private Double geoLocationLong;	
	private String accountNoForChargeModel;
	private String status;
	private String roleID;
	private String makerID;
	private String approverID;
	private String rejectionCause;
	
	public String getBranchID() {
		return branchID;
	}
	public void setBranchID(String branchID) {
		this.branchID = branchID;
	}
	public String getBankID() {
		return bankID;
	}
	public void setBankID(String bankID) {
		this.bankID = bankID;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getTelephoneNo() {
		return telephoneNo;
	}
	public void setTelephoneNo(String telephoneNo) {
		this.telephoneNo = telephoneNo;
	}
	public String getTelephoneNo2() {
		return telephoneNo2;
	}
	public void setTelephoneNo2(String telephoneNo2) {
		this.telephoneNo2 = telephoneNo2;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNameOfManager() {
		return nameOfManager;
	}
	public void setNameOfManager(String nameOfManager) {
		this.nameOfManager = nameOfManager;
	}
	public String getTelephoneNoOfManager() {
		return telephoneNoOfManager;
	}
	public void setTelephoneNoOfManager(String telephoneNoOfManager) {
		this.telephoneNoOfManager = telephoneNoOfManager;
	}	
	
	public Double getGeoLocationLat() {
		return geoLocationLat;
	}
	public void setGeoLocationLat(Double geoLocationLat) {
		this.geoLocationLat = geoLocationLat;
	}
	public Double getGeoLocationLong() {
		return geoLocationLong;
	}
	public void setGeoLocationLong(Double geoLocationLong) {
		this.geoLocationLong = geoLocationLong;
	}
	
	public String getAccountNoForChargeModel() {
		return accountNoForChargeModel;
	}
	public void setAccountNoForChargeModel(String accountNoForChargeModel) {
		this.accountNoForChargeModel = accountNoForChargeModel;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRoleID() {
		return roleID;
	}
	public void setRoleID(String roleID) {
		this.roleID = roleID;
	}
	public String getMakerID() {
		return makerID;
	}
	public void setMakerID(String makerID) {
		this.makerID = makerID;
	}
	public String getApproverID() {
		return approverID;
	}
	public void setApproverID(String approverID) {
		this.approverID = approverID;
	}
	public String getRejectionCause() {
		return rejectionCause;
	}
	public void setRejectionCause(String rejectionCause) {
		this.rejectionCause = rejectionCause;
	}	
}
