package net.myapp.springsecurity.dal.bean;

import java.sql.Date;


public class ChequeCollectionReportBean extends AbstractBean{
	
	private static final long serialVersionUID = 1L;
	
	private String requestID;	
	private String retryCount;
	private String requestType;	
	private String makerID;
	private String bankID;
	private String branchID;
	private String branchName;
	private String reportDate;	
	private String servicePointID;
	private String agentID;
	private String agentName;
	private String trackingID;	
	private String recipientAccountID;
	private String recipientName;
	private String chequeFrontPhotoContent;
	private String chequeBackPhotoContent;
	private double amount;
	private Date dateOnCheque;	
	private String branchRouting;
	private String chequeSequence;
	private String accountNumber;	
	private String payerName;
	private String issuingBank;
	private String issuingBankBranch;	
	private String bearerPhotoContent;
	private String bearerName;
	private String bearerPhoneNumber;	
	private String bearerNationalID;
	private String bearerAddress;
	private String bearerRelationship;
	private String strRequestDate;
	private String strReceiptDate;
	private String branchIDS;
	private String servicePointIDS;
	private String agentIDS;
	
	private String status;
	
	public String getRequestID() {
		return requestID;
	}
	public void setRequestID(String requestID) {
		this.requestID = requestID;
	}
	public String getRetryCount() {
		return retryCount;
	}
	public void setRetryCount(String retryCount) {
		this.retryCount = retryCount;
	}
	public String getRequestType() {
		return requestType;
	}
	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}
	public String getMakerID() {
		return makerID;
	}
	public void setMakerID(String makerID) {
		this.makerID = makerID;
	}
	public String getBankID() {
		return bankID;
	}
	public void setBankID(String bankID) {
		this.bankID = bankID;
	}
	public String getBranchID() {
		return branchID;
	}
	public void setBranchID(String branchID) {
		this.branchID = branchID;
	}
	public String getServicePointID() {
		return servicePointID;
	}
	public void setServicePointID(String servicePointID) {
		this.servicePointID = servicePointID;
	}
	public String getAgentID() {
		return agentID;
	}
	public void setAgentID(String agentID) {
		this.agentID = agentID;
	}
	public String getTrackingID() {
		return trackingID;
	}
	public void setTrackingID(String trackingID) {
		this.trackingID = trackingID;
	}
	public String getRecipientAccountID() {
		return recipientAccountID;
	}
	public void setRecipientAccountID(String recipientAccountID) {
		this.recipientAccountID = recipientAccountID;
	}
	public String getRecipientName() {
		return recipientName;
	}
	public void setRecipientName(String recipientName) {
		this.recipientName = recipientName;
	}
	public String getChequeFrontPhotoContent() {
		return chequeFrontPhotoContent;
	}
	public void setChequeFrontPhotoContent(String chequeFrontPhotoContent) {
		this.chequeFrontPhotoContent = chequeFrontPhotoContent;
	}
	public String getChequeBackPhotoContent() {
		return chequeBackPhotoContent;
	}
	public void setChequeBackPhotoContent(String chequeBackPhotoContent) {
		this.chequeBackPhotoContent = chequeBackPhotoContent;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public Date getDateOnCheque() {
		return dateOnCheque;
	}
	public void setDateOnCheque(Date dateOnCheque) {
		this.dateOnCheque = dateOnCheque;
	}
	public String getBranchRouting() {
		return branchRouting;
	}
	public void setBranchRouting(String branchRouting) {
		this.branchRouting = branchRouting;
	}
	public String getChequeSequence() {
		return chequeSequence;
	}
	public void setChequeSequence(String chequeSequence) {
		this.chequeSequence = chequeSequence;
	}
	public String getAccountNumber() {
		return accountNumber;
	}
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
	public String getPayerName() {
		return payerName;
	}
	public void setPayerName(String payerName) {
		this.payerName = payerName;
	}
	public String getIssuingBank() {
		return issuingBank;
	}
	public void setIssuingBank(String issuingBank) {
		this.issuingBank = issuingBank;
	}
	public String getIssuingBankBranch() {
		return issuingBankBranch;
	}
	public void setIssuingBankBranch(String issuingBankBranch) {
		this.issuingBankBranch = issuingBankBranch;
	}
	public String getBearerPhotoContent() {
		return bearerPhotoContent;
	}
	public void setBearerPhotoContent(String bearerPhotoContent) {
		this.bearerPhotoContent = bearerPhotoContent;
	}
	public String getBearerName() {
		return bearerName;
	}
	public void setBearerName(String bearerName) {
		this.bearerName = bearerName;
	}
	public String getBearerPhoneNumber() {
		return bearerPhoneNumber;
	}
	public void setBearerPhoneNumber(String bearerPhoneNumber) {
		this.bearerPhoneNumber = bearerPhoneNumber;
	}
	public String getBearerNationalID() {
		return bearerNationalID;
	}
	public void setBearerNationalID(String bearerNationalID) {
		this.bearerNationalID = bearerNationalID;
	}
	public String getBearerAddress() {
		return bearerAddress;
	}
	public void setBearerAddress(String bearerAddress) {
		this.bearerAddress = bearerAddress;
	}
	public String getBearerRelationship() {
		return bearerRelationship;
	}
	public void setBearerRelationship(String bearerRelationship) {
		this.bearerRelationship = bearerRelationship;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}	
	public String getReportDate() {
		return reportDate;
	}
	public void setReportDate(String reportDate) {
		this.reportDate = reportDate;
	}
	public String getBranchIDS() {
		return branchIDS;
	}
	public void setBranchIDS(String branchIDS) {
		this.branchIDS = branchIDS;
	}
	public String getServicePointIDS() {
		return servicePointIDS;
	}
	public void setServicePointIDS(String servicePointIDS) {
		this.servicePointIDS = servicePointIDS;
	}
	public String getAgentIDS() {
		return agentIDS;
	}
	public void setAgentIDS(String agentIDS) {
		this.agentIDS = agentIDS;
	}
	public String getStrRequestDate() {
		return strRequestDate;
	}
	public void setStrRequestDate(String strRequestDate) {
		this.strRequestDate = strRequestDate;
	}
	public String getStrReceiptDate() {
		return strReceiptDate;
	}
	public void setStrReceiptDate(String strReceiptDate) {
		this.strReceiptDate = strReceiptDate;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getAgentName() {
		return agentName;
	}
	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}	

}
