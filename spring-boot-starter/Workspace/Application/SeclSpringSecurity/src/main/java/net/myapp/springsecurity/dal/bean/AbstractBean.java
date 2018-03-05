package net.myapp.springsecurity.dal.bean;

import java.io.Serializable;
import java.sql.Timestamp;

public abstract class AbstractBean implements Serializable {
	
	protected LoginBean login;
	
	private String operationType;
    private String crudType;	
	private String createdBy;
	private Timestamp createdON;	
	private String changedBy;
	private String updatedBy;
	private Timestamp updatedOn;
	private String offset;
	private String limit;
	private String searchText;
	private String imgSrc;
	private String fromDate;
	private String toDate;
	private String ampereRequest;
	private String role;
	
	
	public LoginBean getLoginBean() {
		return login;
	}

	public void setLoginBean(LoginBean login) {
		this.login = login;
	}

	public String getOperationType() {
		return operationType;
	}

	public void setOperationType(String operationType) {
		this.operationType = operationType;
	}
	
	public String getChangedBy() {
		return changedBy;
	}

	public void setChangedBy(String changedBy) {
		this.changedBy = changedBy;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Timestamp getCreatedON() {
		return createdON;
	}

	public void setCreatedON(Timestamp createdON) {
		this.createdON = createdON;
	}

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Timestamp getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Timestamp updatedOn) {
		this.updatedOn = updatedOn;
	}

	public String getOffset() {
		return offset;
	}
	
	public void setOffset(String offset) {
		this.offset = offset;
	}
	
	public String getLimit() {
		return limit;
	}
	
	public void setLimit(String limit) {
		this.limit = limit;
	}
	
	public String getSearchText() {
		return searchText;
	}
	
	public void setSearchText(String searchText) {
		this.searchText = searchText;
	}
	public String getCrudType() {
		return crudType;
	}
	public void setCrudType(String crudType) {
		this.crudType = crudType;
	}
	public String getImgSrc() {
		return imgSrc;
	}
	public void setImgSrc(String imgSrc) {
		this.imgSrc = imgSrc;
	}
	
	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getAmpereRequest() {
		return ampereRequest;
	}

	public void setAmpereRequest(String ampereRequest) {
		this.ampereRequest = ampereRequest;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

}
