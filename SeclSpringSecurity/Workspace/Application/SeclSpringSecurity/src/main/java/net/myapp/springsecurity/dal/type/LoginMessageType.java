package net.myapp.springsecurity.dal.type;

public enum LoginMessageType {
	BLOCK_IP("IP is blocked"), 
	ALREADY_IP_BLOCK("Already ip is blocked"), 
	ALREADY_ID_BLOCK("Already id is blocked"), 
	BLOCK_ID("User id is blocked"),
	PNM("Password not match"),
	IVI("Invalid User ID"),
	UNA("User not active"),
	FAILDE("Failed"),
	INBR("Branch is not active"),
	UNBLOCK_IP("UNBLOCK_IP"),
	UNBLOCK_ID("UNBLOCK_ID")
	;
	
	private String value;

	private LoginMessageType(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
