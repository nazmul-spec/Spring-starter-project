package net.myapp.springsecurity.dal.bean;

import java.sql.Date;


public class ChequeDetails {

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
	private String trackingID;
	
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

	public String getTrackingID() {
		return trackingID;
	}

	public void setTrackingID(String trackingID) {
		this.trackingID = trackingID;
	}

}
