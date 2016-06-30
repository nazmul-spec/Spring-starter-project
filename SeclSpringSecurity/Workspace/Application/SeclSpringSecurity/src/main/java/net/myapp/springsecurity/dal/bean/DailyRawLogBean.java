package net.myapp.springsecurity.dal.bean;

import java.sql.Date;

public class DailyRawLogBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;

	private Date processDay;
	private String rawType;
	private String processStatus;
	private String statusMessage;
	private Integer numOfCol;
	private Integer recordCount;
	private Integer recordProcessed;
	private String fileName;
	
	
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public Date getProcessDay() {
		return processDay;
	}
	public void setProcessDay(Date processDay) {
		this.processDay = processDay;
	}
	public String getRawType() {
		return rawType;
	}
	public void setRawType(String rawType) {
		this.rawType = rawType;
	}
	public String getProcessStatus() {
		return processStatus;
	}
	public void setProcessStatus(String processStatus) {
		this.processStatus = processStatus;
	}
	public String getStatusMessage() {
		return statusMessage;
	}
	public void setStatusMessage(String statusMessage) {
		this.statusMessage = statusMessage;
	}
	public Integer getNumOfCol() {
		return numOfCol;
	}
	public void setNumOfCol(Integer numOfCol) {
		this.numOfCol = numOfCol;
	}
	public Integer getRecordCount() {
		return recordCount;
	}
	public void setRecordCount(Integer recordCount) {
		this.recordCount = recordCount;
	}
	public Integer getRecordProcessed() {
		return recordProcessed;
	}
	public void setRecordProcessed(Integer recordProcessed) {
		this.recordProcessed = recordProcessed;
	}

	

}
