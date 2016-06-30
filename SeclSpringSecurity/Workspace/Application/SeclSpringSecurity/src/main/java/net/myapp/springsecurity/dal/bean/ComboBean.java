package net.myapp.springsecurity.dal.bean;


public class ComboBean extends AbstractBean {

	private static final long serialVersionUID = 1L;

	private String comboName;
	private String searchID;
	private String bankID;
	private String branchID;
	private String servicePointID;
	private String branchIDS;
	private String servicePointIDS;
	private String doseGetAgentCat;
	private String plugEnable;
	
	public String getBranchIDS() {
		return branchIDS;
	}

	public void setBranchIDS(String branchIDS) {
		this.branchIDS = branchIDS;
	}

	public String getServicePointIDS() {
		return servicePointIDS;
	}

	public void setServicePointIDS(String servicePointIDS) {
		this.servicePointIDS = servicePointIDS;
	}

	public String getComboName() {
		return comboName;
	}

	public void setComboName(String comboName) {
		this.comboName = comboName;
	}

	public String getSearchID() {
		return searchID;
	}

	public void setSearchID(String searchID) {
		this.searchID = searchID;
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

	public String getServicePointID() {
		return servicePointID;
	}

	public void setServicePointID(String servicePointID) {
		this.servicePointID = servicePointID;
	}

	public String getDoseGetAgentCat() {
		return doseGetAgentCat;
	}

	public void setDoseGetAgentCat(String doseGetAgentCat) {
		this.doseGetAgentCat = doseGetAgentCat;
	}

	public String getPlugEnable() {
		return plugEnable;
	}

	public void setPlugEnable(String plugEnable) {
		this.plugEnable = plugEnable;
	}

}
