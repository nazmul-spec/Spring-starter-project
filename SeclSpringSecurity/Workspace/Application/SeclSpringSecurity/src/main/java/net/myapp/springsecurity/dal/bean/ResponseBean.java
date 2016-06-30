package net.myapp.springsecurity.dal.bean;

public class ResponseBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;
	
	private boolean isSuccess;
	private boolean csbRequestStatus;
	private String message;
	private Object data;
	private Object data2;
	private Object data3;
	private Object data4;
	private Long totalCount;
	
	public ResponseBean() {
		this.isSuccess = false;
		this.csbRequestStatus = true;
		this.data = null;
		this.data2 = null;
	}
	public boolean isSuccess() {
		return isSuccess;
	}


	public void setSuccess(boolean isSuccess) {
		this.isSuccess = isSuccess;
	}


	public boolean isCsbRequestStatus() {
		return csbRequestStatus;
	}


	public void setCsbRequestStatus(boolean csbRequestStatus) {
		this.csbRequestStatus = csbRequestStatus;
	}


	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public Object getData2() {
		return data2;
	}

	public void setData2(Object data2) {
		this.data2 = data2;
	}

	public Object getData3() {
		return data3;
	}

	public void setData3(Object data3) {
		this.data3 = data3;
	}

	public Object getData4() {
		return data4;
	}
	public void setData4(Object data4) {
		this.data4 = data4;
	}
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	public Long getTotalCount() {
		return totalCount;
	}
	
	public void setTotalCount(Long totalCount) {
		this.totalCount = totalCount;
	}

}
