package net.myapp.springsecurity.dal.bean;

import java.sql.Timestamp;

public class RequestTraceBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;

	private String		OID;
	private String 		requestID;
	private String 		accountID;
	private String 		agentID;
	private String 		branchID;
	private String 		transID;
	private String 		transType;
	private Timestamp   transDate;
	private String   	strTransDate;
	private String   	transAmount;
	private String   	transStatus;
	private String 		referenceNO;
	private String 		requestTraceType;
	private String 		fromServicePointID;
	private String 		toServicePointID;
	private String 		fromServiceTerminalID;
	private String 		toServiceTerminalID;
	private String 		debitedAccount;
	private String 		creditedAccount;
	private String 		bankAccountNo;
	private String 		servicePointID;

	
	public String getAgentID() {
		return agentID;
	}
	public void setAgentID(String agentID) {
		this.agentID = agentID;
	}
	public String getOID() {
		return OID;
	}
	public void setOID(String oID) {
		OID = oID;
	}
	public String getRequestID() {
		return requestID;
	}
	public void setRequestID(String requestID) {
		this.requestID = requestID;
	}
	public String getAccountID() {
		return accountID;
	}
	public void setAccountID(String accountID) {
		this.accountID = accountID;
	}
	public String getTransID() {
		return transID;
	}
	public void setTransID(String transID) {
		this.transID = transID;
	}
	public String getTransType() {
		return transType;
	}
	public void setTransType(String transType) {
		this.transType = transType;
	}
	public Timestamp getTransDate() {
		return transDate;
	}
	public void setTransDate(Timestamp transDate) {
		this.transDate = transDate;
	}
	public String getTransAmount() {
		return transAmount;
	}
	public void setTransAmount(String transAmount) {
		this.transAmount = transAmount;
	}
	public String getTransStatus() {
		return transStatus;
	}
	public void setTransStatus(String transStatus) {
		this.transStatus = transStatus;
	}
	public String getReferenceNO() {
		return referenceNO;
	}
	public void setReferenceNO(String referenceNO) {
		this.referenceNO = referenceNO;
	}
	public String getRequestTraceType() {
		return requestTraceType;
	}
	public void setRequestTraceType(String requestTraceType) {
		this.requestTraceType = requestTraceType;
	}
	public String getStrTransDate() {
		return strTransDate;
	}
	public void setStrTransDate(String strTransDate) {
		this.strTransDate = strTransDate;
	}
	public String getFromServicePointID() {
		return fromServicePointID;
	}
	public void setFromServicePointID(String fromServicePointID) {
		this.fromServicePointID = fromServicePointID;
	}
	public String getToServicePointID() {
		return toServicePointID;
	}
	public void setToServicePointID(String toServicePointID) {
		this.toServicePointID = toServicePointID;
	}
	public String getFromServiceTerminalID() {
		return fromServiceTerminalID;
	}
	public void setFromServiceTerminalID(String fromServiceTerminalID) {
		this.fromServiceTerminalID = fromServiceTerminalID;
	}
	public String getToServiceTerminalID() {
		return toServiceTerminalID;
	}
	public void setToServiceTerminalID(String toServiceTerminalID) {
		this.toServiceTerminalID = toServiceTerminalID;
	}
	public String getDebitedAccount() {
		return debitedAccount;
	}
	public void setDebitedAccount(String debitedAccount) {
		this.debitedAccount = debitedAccount;
	}
	public String getCreditedAccount() {
		return creditedAccount;
	}
	public void setCreditedAccount(String creditedAccount) {
		this.creditedAccount = creditedAccount;
	}
	public String getBankAccountNo() {
		return bankAccountNo;
	}
	public void setBankAccountNo(String bankAccountNo) {
		this.bankAccountNo = bankAccountNo;
	}
	public String getServicePointID() {
		return servicePointID;
	}
	public void setServicePointID(String servicePointID) {
		this.servicePointID = servicePointID;
	}
	public String getBranchID() {
		return branchID;
	}
	public void setBranchID(String branchID) {
		this.branchID = branchID;
	}
	
}
