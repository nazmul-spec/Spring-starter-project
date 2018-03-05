package net.myapp.springsecurity.dal.type;

public enum AuditActionSourceType {
	USER("U"),
	SYSTEM("S"),
	ADMIN("A");
	
	private String value;

	private AuditActionSourceType(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
