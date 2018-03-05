package net.myapp.springsecurity.dal.type;

public enum TransType {
	WITHDRAWAL("Withdrawal"), SELFDEPOSIT("SelfDeposit"), BEARERDEPOSIT("BearerDeposit"), TRANSFER("Transfer");
	
	private String value;
	
	private TransType(String value){
		this.value = value;
	}

	public String getValue() {
		return value;
	}
	
	
}
