package net.myapp.springsecurity.dal.type;

public enum AuditActionType {
	INSERT("I"),
	UPDATE("E"),
	DELETE("D");
	
	private String value;

	private AuditActionType(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
