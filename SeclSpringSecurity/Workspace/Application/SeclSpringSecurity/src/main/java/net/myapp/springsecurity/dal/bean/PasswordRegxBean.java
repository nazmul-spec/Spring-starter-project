package net.myapp.springsecurity.dal.bean;


public class PasswordRegxBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;

	private Integer ruleNumber;
	private String text;
	private Integer value;
	private String charsNotAllow;
	private String regex; 
	private String enable;
	private Boolean enableBool;
	
	public Integer getRuleNumber() {
		return ruleNumber;
	}
	public void setRuleNumber(Integer ruleNumber) {
		this.ruleNumber = ruleNumber;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public Integer getValue() {
		return value;
	}
	public void setValue(Integer value) {
		this.value = value;
	}
	public String getRegex() {
		return regex;
	}
	public void setRegex(String regex) {
		this.regex = regex;
	}
	public String getEnable() {
		return enable;
	}
	public void setEnable(String enable) {
		this.enable = enable;
	}
	public Boolean getEnableBool() {
		return enableBool;
	}
	public void setEnableBool(Boolean enableBool) {
		this.enableBool = enableBool;
	}
	public String getCharsNotAllow() {
		return charsNotAllow;
	}
	public void setCharsNotAllow(String charsNotAllow) {
		this.charsNotAllow = charsNotAllow;
	}
}
