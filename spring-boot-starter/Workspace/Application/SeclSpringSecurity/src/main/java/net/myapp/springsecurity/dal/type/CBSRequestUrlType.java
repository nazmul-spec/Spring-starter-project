package net.myapp.springsecurity.dal.type;

public enum CBSRequestUrlType {
	CUSTOMER("customer"),
	SEND_TO_CBS_IPCNA_CREATION_REQUEST("SendToCBSIPCNACreationRequest");
	
	private String value;
	
	private CBSRequestUrlType(String value){
		this.value = value;
	}

	public String getValue() {
		return value;
	}
	
	
}
