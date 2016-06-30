package net.myapp.springsecurity.dal.type;

public enum RawLogType {
	ADVANCE("Advance"), DEPOSIT("Deposit");
	
	private String value;

	private RawLogType(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
