package net.myapp.springsecurity.dal.type;

public enum AuditSectionType1 {
	BANK("Bank"),
	CUSTOMER_ACCOUNT("Customer & Account"),
	AGENT_SYSTEM("Agent System"),
	SECURITY("Security"),
	SETTINGS("Settings"),
	BILL_COLLECTION("Bill Collection"),
	CHARGE_MODEL_DEF("Charge Model Def"),
	CHARGE_MODEL_ITEM("Charge Model Item"),
	TAG_LIB("Iag Lib"),
	BILL_TYPE("Bill Type"),
	COMPANY_ZONE("Company Zone");
	
	private String value;

	private AuditSectionType1(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
