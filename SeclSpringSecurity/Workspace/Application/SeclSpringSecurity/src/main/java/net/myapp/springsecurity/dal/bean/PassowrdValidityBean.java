package net.myapp.springsecurity.dal.bean;


public class PassowrdValidityBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;

	private Integer passwordWillRemainValidFor;
	private Integer lastNoPasswordNotUsedAgain;
	
	public Integer getPasswordWillRemainValidFor() {
		return passwordWillRemainValidFor;
	}
	public void setPasswordWillRemainValidFor(Integer passwordWillRemainValidFor) {
		this.passwordWillRemainValidFor = passwordWillRemainValidFor;
	}
	public Integer getLastNoPasswordNotUsedAgain() {
		return lastNoPasswordNotUsedAgain;
	}
	public void setLastNoPasswordNotUsedAgain(Integer lastNoPasswordNotUsedAgain) {
		this.lastNoPasswordNotUsedAgain = lastNoPasswordNotUsedAgain;
	}
	
}
