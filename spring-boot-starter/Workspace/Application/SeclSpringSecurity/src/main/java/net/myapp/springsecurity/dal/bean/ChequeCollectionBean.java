package net.myapp.springsecurity.dal.bean;


public class ChequeCollectionBean extends AbstractBean{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String requestID;
	private String chequeFrontPhotoPath;
	private String chequeBackPhotoPath;
	private String bearerPhotoPath;
	private String retryCount;
	private String requestType;	
	private String makerID;
	private ChequeDetails chequeDetail;
	private String strChequeDetail;
	private String bankID;
	private String branchID;
	private String servicePointID;
	private String agentID;
	private String trackingID;
	private String imgSrcFront;
	private String imgSrcBack;
	private String imgSrcBearer;
	private String status;
	
	
	public String getImgSrcFront() {
		return imgSrcFront;
	}
	public void setImgSrcFront(String imgSrcFront) {
		this.imgSrcFront = imgSrcFront;
	}
	public String getImgSrcBack() {
		return imgSrcBack;
	}
	public void setImgSrcBack(String imgSrcBack) {
		this.imgSrcBack = imgSrcBack;
	}
	public String getImgSrcBearer() {
		return imgSrcBearer;
	}
	public void setImgSrcBearer(String imgSrcBearer) {
		this.imgSrcBearer = imgSrcBearer;
	}
	public String getRequestID() {
		return requestID;
	}
	public void setRequestID(String requestID) {
		this.requestID = requestID;
	}
	public String getChequeFrontPhotoPath() {
		return chequeFrontPhotoPath;
	}
	public void setChequeFrontPhotoPath(String chequeFrontPhotoPath) {
		this.chequeFrontPhotoPath = chequeFrontPhotoPath;
	}
	public String getChequeBackPhotoPath() {
		return chequeBackPhotoPath;
	}
	public void setChequeBackPhotoPath(String chequeBackPhotoPath) {
		this.chequeBackPhotoPath = chequeBackPhotoPath;
	}
	public String getBearerPhotoPath() {
		return bearerPhotoPath;
	}
	public void setBearerPhotoPath(String bearerPhotoPath) {
		this.bearerPhotoPath = bearerPhotoPath;
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
	public ChequeDetails getChequeDetail() {
		return chequeDetail;
	}
	public void setChequeDetail(ChequeDetails chequeDetail) {
		this.chequeDetail = chequeDetail;
	}
	public String getStrChequeDetail() {
		return strChequeDetail;
	}
	public void setStrChequeDetail(String strChequeDetail) {
		this.strChequeDetail = strChequeDetail;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getTrackingID() {
		return trackingID;
	}
	public void setTrackingID(String trackingID) {
		this.trackingID = trackingID;
	}

}
