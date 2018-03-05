package net.myapp.springsecurity.dal.domain;


public class PassowrdValidation{
	private PasswordRegx leastCharacters;
	private PasswordRegx mostCharacters;
	private PasswordRegx leastNumbers;
	private PasswordRegx mostNumbers;
	private PasswordRegx leastSpecialCharacters;
	private PasswordRegx mostSpecialCharaccters;
	private PasswordRegx leaseUpperCaseletters;
	private PasswordRegx mostUpperCaseletters;
	private PasswordRegx leastLowerCaseLetter;
	private PasswordRegx mostLowerCaseLetter;
	private PasswordRegx notContaintheseCharacters;
	
	public PasswordRegx getLeastCharacters() {
		return leastCharacters;
	}
	public void setLeastCharacters(PasswordRegx leastCharacters) {
		this.leastCharacters = leastCharacters;
	}
	public PasswordRegx getMostCharacters() {
		return mostCharacters;
	}
	public void setMostCharacters(PasswordRegx mostCharacters) {
		this.mostCharacters = mostCharacters;
	}
	public PasswordRegx getLeastNumbers() {
		return leastNumbers;
	}
	public void setLeastNumbers(PasswordRegx leastNumbers) {
		this.leastNumbers = leastNumbers;
	}
	public PasswordRegx getMostNumbers() {
		return mostNumbers;
	}
	public void setMostNumbers(PasswordRegx mostNumbers) {
		this.mostNumbers = mostNumbers;
	}
	public PasswordRegx getLeastSpecialCharacters() {
		return leastSpecialCharacters;
	}
	public void setLeastSpecialCharacters(PasswordRegx leastSpecialCharacters) {
		this.leastSpecialCharacters = leastSpecialCharacters;
	}
	public PasswordRegx getMostSpecialCharaccters() {
		return mostSpecialCharaccters;
	}
	public void setMostSpecialCharaccters(PasswordRegx mostSpecialCharaccters) {
		this.mostSpecialCharaccters = mostSpecialCharaccters;
	}
	public PasswordRegx getLeaseUpperCaseletters() {
		return leaseUpperCaseletters;
	}
	public void setLeaseUpperCaseletters(PasswordRegx leaseUpperCaseletters) {
		this.leaseUpperCaseletters = leaseUpperCaseletters;
	}
	public PasswordRegx getMostUpperCaseletters() {
		return mostUpperCaseletters;
	}
	public void setMostUpperCaseletters(PasswordRegx mostUpperCaseletters) {
		this.mostUpperCaseletters = mostUpperCaseletters;
	}
	public PasswordRegx getLeastLowerCaseLetter() {
		return leastLowerCaseLetter;
	}
	public void setLeastLowerCaseLetter(PasswordRegx leastLowerCaseLetter) {
		this.leastLowerCaseLetter = leastLowerCaseLetter;
	}
	public PasswordRegx getMostLowerCaseLetter() {
		return mostLowerCaseLetter;
	}
	public void setMostLowerCaseLetter(PasswordRegx mostLowerCaseLetter) {
		this.mostLowerCaseLetter = mostLowerCaseLetter;
	}
	public PasswordRegx getNotContaintheseCharacters() {
		return notContaintheseCharacters;
	}
	public void setNotContaintheseCharacters(
			PasswordRegx notContaintheseCharacters) {
		this.notContaintheseCharacters = notContaintheseCharacters;
	}
	
	
}
