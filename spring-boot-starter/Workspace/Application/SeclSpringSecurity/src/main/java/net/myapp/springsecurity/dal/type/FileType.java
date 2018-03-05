package net.myapp.springsecurity.dal.type;

public enum FileType {
	AGENT("agent"), 
	AGENT_STAFF("agentStaff"), 
	DST("dst"), 
	CUSTOMER("customer"),
	PHOTOID("customer/photoid"),
	IFR("ifr"),
	CHEQUE_FRONT("cheque/front/"),
	CHEQUE_BACK("cheque/back/"),
	CHEQUE_BEARER("cheque/bearer/");
	
	private String value;

	private FileType(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
