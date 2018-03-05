package net.myapp.springsecurity.dal.type;

public enum MessageType {
	STATUS_MESSAGE_SUCECSS("OK"), STATUS_MESSAGE_FAIL("Failed"), PROCESSED("Processed"), NOT_PROCESSED("Not Processed");
	
	private String value;

	private MessageType(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
