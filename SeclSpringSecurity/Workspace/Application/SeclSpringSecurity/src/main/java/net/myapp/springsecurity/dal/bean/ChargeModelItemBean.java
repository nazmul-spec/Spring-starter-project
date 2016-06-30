package net.myapp.springsecurity.dal.bean;



public class ChargeModelItemBean extends AbstractBean {	
	private static final long serialVersionUID = 1L;	
	
	private String OID;				
	private String chargeKey;			
	private String chargeModelDefID;	
	private String valueJSON;	
	private String serviceCategory;
	private String bankingProduct;
	private String chargeModelDef;	
	private String agentOutletLocation;
	private String view;
	
	public String getOID() {
		return OID;
	}
	public void setOID(String oID) {
		OID = oID;
	}
	public String getChargeKey() {
		return chargeKey;
	}
	public void setChargeKey(String chargeKey) {
		this.chargeKey = chargeKey;
	}
	public String getChargeModelDefID() {
		return chargeModelDefID;
	}
	public void setChargeModelDefID(String chargeModelDefID) {
		this.chargeModelDefID = chargeModelDefID;
	}
	public String getValueJSON() {
		return valueJSON;
	}
	public void setValueJSON(String valueJSON) {
		this.valueJSON = valueJSON;
	}
	public String getServiceCategory() {
		return serviceCategory;
	}
	public void setServiceCategory(String serviceCategory) {
		this.serviceCategory = serviceCategory;
	}
	public String getBankingProduct() {
		return bankingProduct;
	}
	public void setBankingProduct(String bankingProduct) {
		this.bankingProduct = bankingProduct;
	}
	public String getAgentOutletLocation() {
		return agentOutletLocation;
	}
	public void setAgentOutletLocation(String agentOutletLocation) {
		this.agentOutletLocation = agentOutletLocation;
	}
	public String getChargeModelDef() {
		return chargeModelDef;
	}
	public void setChargeModelDef(String chargeModelDef) {
		this.chargeModelDef = chargeModelDef;
	}
	public String getView() {
		return view;
	}
	public void setView(String view) {
		this.view = view;
	}
	
}
