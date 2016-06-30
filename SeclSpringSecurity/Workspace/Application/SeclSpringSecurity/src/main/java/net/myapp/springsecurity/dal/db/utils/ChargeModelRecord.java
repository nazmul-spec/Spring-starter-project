package net.myapp.springsecurity.dal.db.utils;

import java.util.HashMap;
import java.util.Map;



public enum ChargeModelRecord {	
	
	FundTransferWithCBLAnyProductAnyAgent		("0001-000-00",		"{\"chargeName\":\"FundTransferWithCBL-AnyProduct-AnyAgent\",\"description\":\"\",\"chargeSlabs\":[{\"fromAmount\":0,\"toAmount\":\"0\",\"chargeAmount\":\"25\",\"method\":\"Absolute\",\"ID\":1}],\"Debitor\":{\"glcode\":\"\",\"accountType\":\"\"},\"Creditor\":{\"glcode\":\"\",\"accountType\":\"\"},\"VAT\":{\"glcode\":\"\",\"accountType\":\"\"}}"),
	CashDepositAnyProductAnyAgent				("0002-000-00",		"{\"chargeName\":\"CashDeposit-AnyProduct-AnyAgent\",\"description\":\"\",\"chargeSlabs\":[{\"fromAmount\":0,\"toAmount\":\"0\",\"chargeAmount\":\"25\",\"method\":\"Absolute\",\"ID\":1}],\"Debitor\":{\"glcode\":\"\",\"accountType\":\"\"},\"Creditor\":{\"glcode\":\"\",\"accountType\":\"\"},\"VAT\":{\"glcode\":\"\",\"accountType\":\"\"}}"),
	CashDepositAnyProductHomeAgent				("0002-000-01",		"{\"chargeName\":\"CashDeposit-AnyProduct-HomeAgent\",\"description\":\"\",\"chargeSlabs\":[{\"fromAmount\":0,\"toAmount\":\"0\",\"chargeAmount\":\"25\",\"method\":\"Absolute\",\"ID\":1}],\"Debitor\":{\"glcode\":\"\",\"accountType\":\"\"},\"Creditor\":{\"glcode\":\"\",\"accountType\":\"\"},\"VAT\":{\"glcode\":\"\",\"accountType\":\"\"}}"),
	CashDepositAnyProductAwayAgent				("0002-000-02",		"{\"chargeName\":\"CashDeposit-AnyProduct-AwayAgent\",\"description\":\"\",\"chargeSlabs\":[{\"fromAmount\":0,\"toAmount\":\"4000\",\"chargeAmount\":\"25\",\"method\":\"Absolute\",\"ID\":1},{\"fromAmount\":4001,\"toAmount\":\"0\",\"chargeAmount\":\"0.25\",\"method\":\"Percentage\",\"ID\":2}],\"Debitor\":{\"glcode\":\"\",\"accountType\":\"\"},\"Creditor\":{\"glcode\":\"\",\"accountType\":\"\"},\"VAT\":{\"glcode\":\"\",\"accountType\":\"\"}}"),
	CashWithdrawAnyProductAnyAgent				("0003-000-00",		"{\"chargeName\":\"CashWithdraw-AnyProduct-AnyAgent\",\"description\":\"\",\"chargeSlabs\":[{\"fromAmount\":0,\"toAmount\":\"0\",\"chargeAmount\":\"0\",\"method\":\"Absolute\",\"ID\":1}],\"Debitor\":{\"glcode\":\"\",\"accountType\":\"\"},\"Creditor\":{\"glcode\":\"\",\"accountType\":\"\"},\"VAT\":{\"glcode\":\"\",\"accountType\":\"\"}}"),
	CashWithdrawAnyProductHomeAgent				("0003-000-01",		"{\"chargeName\":\"CashWithdraw-AnyProduct-HomeAgent\",\"description\":\"\",\"chargeSlabs\":[{\"fromAmount\":0,\"toAmount\":\"0\",\"chargeAmount\":\"0\",\"method\":\"Absolute\",\"ID\":1}],\"Debitor\":{\"glcode\":\"\",\"accountType\":\"\"},\"Creditor\":{\"glcode\":\"\",\"accountType\":\"\"},\"VAT\":{\"glcode\":\"\",\"accountType\":\"\"}}"),
	CashWithdrawAnyProductAwayAgent				("0003-000-02",		"{\"chargeName\":\"CashWithdraw-AnyProduct-AwayAgent\",\"description\":\"\",\"chargeSlabs\":[{\"fromAmount\":0,\"toAmount\":\"4000\",\"chargeAmount\":\"25\",\"method\":\"Absolute\",\"ID\":1},{\"fromAmount\":4001,\"toAmount\":\"0\",\"chargeAmount\":\"0.25\",\"method\":\"Percentage\",\"ID\":2}],\"Debitor\":{\"glcode\":\"\",\"accountType\":\"\"},\"Creditor\":{\"glcode\":\"\",\"accountType\":\"\"},\"VAT\":{\"glcode\":\"\",\"accountType\":\"\"}}"),
	BalanceInquiryAnyProductAnyAgent			("0004-000-00",		"{\"chargeName\":\"BalanceInquiry-AnyProduct-AnyAgent\",\"description\":\"\",\"chargeSlabs\":[{\"fromAmount\":0,\"toAmount\":\"0\",\"chargeAmount\":\"0\",\"method\":\"Absolute\",\"ID\":1}],\"Debitor\":{\"glcode\":\"\",\"accountType\":\"\"},\"Creditor\":{\"glcode\":\"\",\"accountType\":\"\"},\"VAT\":{\"glcode\":\"\",\"accountType\":\"\"}}"),
	MiniStatementAnyProductAnyAgent				("0005-000-00",		"{\"chargeName\":\"MiniStatement-AnyProduct-AnyAgent\",\"description\":\"\",\"chargeSlabs\":[{\"fromAmount\":0,\"toAmount\":\"0\",\"chargeAmount\":\"0\",\"method\":\"Absolute\",\"ID\":1}],\"Debitor\":{\"glcode\":\"\",\"accountType\":\"\"},\"Creditor\":{\"glcode\":\"\",\"accountType\":\"\"},\"VAT\":{\"glcode\":\"\",\"accountType\":\"\"}}"),
	;

	private String chargeKey;
	private String valueJSON;
	
	
	private static Map<String, ChargeModelRecord> codeToChargeModelMapping;
	
	private ChargeModelRecord(String chargeKey, String valueJSON)
	{
		this.chargeKey = chargeKey;
		this.valueJSON = valueJSON;
	}
	
	public static ChargeModelRecord getChargeModelRecord(String i) {
        if (codeToChargeModelMapping == null) {
            initMapping();
        }
        return codeToChargeModelMapping.get(i);
    }
	
	private static void initMapping() {
		codeToChargeModelMapping = new HashMap<String, ChargeModelRecord>();
        for (ChargeModelRecord s : values()) {
        	codeToChargeModelMapping.put(s.chargeKey, s);
        }
    }

	public String getChargeKey() {
		return chargeKey;
	}

	public void setChargeKey(String chargeKey) {
		this.chargeKey = chargeKey;
	}
	
	public String getValueJSON() {
		return valueJSON;
	}

	public void setValueJSON(String valueJSON) {
		this.valueJSON = valueJSON;
	}
	

	@Override
	public String toString()
	{
		final StringBuilder sb = new StringBuilder();
		sb.append("ChargeModelRecord");
		sb.append("{chargeKey='").append(chargeKey).append('\'');
		sb.append(", valueJSON='").append(valueJSON).append('\'');
		sb.append('}');
		return sb.toString();
	}
}
