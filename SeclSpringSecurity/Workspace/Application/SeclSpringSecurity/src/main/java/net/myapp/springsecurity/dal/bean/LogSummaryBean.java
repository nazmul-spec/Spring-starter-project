package net.myapp.springsecurity.dal.bean;

import java.sql.Timestamp;


public class LogSummaryBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;
	
	private Timestamp logTime;
	private String strLogtime;
	private String shortMsg;
	private String fullMsg;
	private String thread;
	private String level;
	private String levelColor;
	private int lineNum;
	private String location;
	private String fileName;
	
	public Timestamp getLogTime() {
		return logTime;
	}
	public void setLogTime(Timestamp logTime) {
		this.logTime = logTime;
	}
	public String getShortMsg() {
		return shortMsg;
	}
	public void setShortMsg(String shortMsg) {
		this.shortMsg = shortMsg;
	}
	public String getFullMsg() {
		return fullMsg;
	}
	public void setFullMsg(String fullMsg) {
		this.fullMsg = fullMsg;
	}
	public String getThread() {
		return thread;
	}
	public void setThread(String thread) {
		this.thread = thread;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public int getLineNum() {
		return lineNum;
	}
	public void setLineNum(int lineNum) {
		this.lineNum = lineNum;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getStrLogtime() {
		return strLogtime;
	}
	public void setStrLogtime(String strLogtime) {
		this.strLogtime = strLogtime;
	}
	public String getLevelColor() {
		return levelColor;
	}
	public void setLevelColor(String levelColor) {
		this.levelColor = levelColor;
	}
	
}
