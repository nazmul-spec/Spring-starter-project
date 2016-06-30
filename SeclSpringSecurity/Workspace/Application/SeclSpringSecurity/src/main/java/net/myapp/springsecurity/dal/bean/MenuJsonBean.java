package net.myapp.springsecurity.dal.bean;

public class MenuJsonBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;
	
	private String topmenuid;
	private String[] leftmenuids;
	
	public String getTopmenuid() {
		return topmenuid;
	}
	public void setTopmenuid(String topmenuid) {
		this.topmenuid = topmenuid;
	}
	public String[] getLeftmenuids() {
		return leftmenuids;
	}
	public void setLeftmenuids(String[] leftmenuids) {
		this.leftmenuids = leftmenuids;
	}
}
