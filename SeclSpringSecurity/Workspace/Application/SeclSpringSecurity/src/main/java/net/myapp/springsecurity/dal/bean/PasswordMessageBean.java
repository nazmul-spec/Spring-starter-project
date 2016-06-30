package net.myapp.springsecurity.dal.bean;

import java.util.List;

public class PasswordMessageBean extends AbstractBean {	
	private static final long serialVersionUID = 1L;
	
	private List<String> msgList;
	private Integer leastChar;
	private Integer mostChar;
	
	public List<String> getMsgList() {
		return msgList;
	}
	public void setMsgList(List<String> msgList) {
		this.msgList = msgList;
	}
	public Integer getLeastChar() {
		return leastChar;
	}
	public void setLeastChar(Integer leastChar) {
		this.leastChar = leastChar;
	}
	public Integer getMostChar() {
		return mostChar;
	}
	public void setMostChar(Integer mostChar) {
		this.mostChar = mostChar;
	}
}
