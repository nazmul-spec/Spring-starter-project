package net.myapp.springsecurity.dal.bean;


public class PasswordPolicyJsonBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;

	private PassowrdValidityBean validity;	
	private PassowrdValidationBean validation;
	
	public PassowrdValidityBean getValidity() {
		return validity;
	}
	public void setValidity(PassowrdValidityBean validity) {
		this.validity = validity;
	}
	public PassowrdValidationBean getValidation() {
		return validation;
	}
	public void setValidation(PassowrdValidationBean validation) {
		this.validation = validation;
	}
}
