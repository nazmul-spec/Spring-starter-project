package net.myapp.springsecurity.dal.bean;



public class AuditLogBeforeAfterBean extends AbstractBean {
	
	private static final long serialVersionUID = 4535778L;
	
	private String label;
	private String beforeOperation;
	private String afterOperation;
	private String isJSON;
	
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public String getBeforeOperation() {
		return beforeOperation;
	}
	public void setBeforeOperation(String beforeOperation) {
		this.beforeOperation = beforeOperation;
	}
	public String getAfterOperation() {
		return afterOperation;
	}
	public void setAfterOperation(String afterOperation) {
		this.afterOperation = afterOperation;
	}
	public String getIsJSON() {
		return isJSON;
	}
	public void setIsJSON(String isJSON) {
		this.isJSON = isJSON;
	}
	
	
}
