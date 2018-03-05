package net.myapp.springsecurity.dal.domain;


public class PasswordPolicyJson{

	private PassowrdValidity validity;	
	private PassowrdValidation validation;
	
	public PassowrdValidity getValidity() {
		return validity;
	}
	public void setValidity(PassowrdValidity validity) {
		this.validity = validity;
	}
	public PassowrdValidation getValidation() {
		return validation;
	}
	public void setValidation(PassowrdValidation validation) {
		this.validation = validation;
	}
}
