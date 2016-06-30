package net.myapp.springsecurity.dal.type;

public enum UserStatusType {
	APPLICATION_SUBMITTED("AS"), 
	BANK_MADE("BM"), 
	BANK_CHECKED("BC"), 
	BANK_APPROVED("BA"),
	BANK_REJECTED("BR"),
	ACTIVE("A"),
	INACTIVE("I"),
	CLOSED("C"),
	
	AS("Submitted"), 
	BM("Entered/ Edited"), 
	BC("Checked"), 
	BA("Approved"),
	BR("Rejected"),
	A("Active"),
	I("Inactive"),
	C("Closed");
	private String value;

	private UserStatusType(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
