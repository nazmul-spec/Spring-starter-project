package net.myapp.springsecurity.dal.bean;


public class PassowrdValidationBean extends AbstractBean {
	
	private static final long serialVersionUID = 1L;

	private PasswordRegxBean leastCharacters;
	private PasswordRegxBean mostCharacters;
	private PasswordRegxBean leastNumbers;
	private PasswordRegxBean mostNumbers;
	private PasswordRegxBean leastSpecialCharacters;
	private PasswordRegxBean mostSpecialCharaccters;
	private PasswordRegxBean leaseUpperCaseletters;
	private PasswordRegxBean mostUpperCaseletters;
	private PasswordRegxBean leastLowerCaseLetter;
	private PasswordRegxBean mostLowerCaseLetter;
	private PasswordRegxBean notContaintheseCharacters;
	
	public PasswordRegxBean getLeastCharacters() {
		return leastCharacters;
	}
	public void setLeastCharacters(PasswordRegxBean leastCharacters) {
		this.leastCharacters = leastCharacters;
	}
	public PasswordRegxBean getMostCharacters() {
		return mostCharacters;
	}
	public void setMostCharacters(PasswordRegxBean mostCharacters) {
		this.mostCharacters = mostCharacters;
	}
	public PasswordRegxBean getLeastNumbers() {
		return leastNumbers;
	}
	public void setLeastNumbers(PasswordRegxBean leastNumbers) {
		this.leastNumbers = leastNumbers;
	}
	public PasswordRegxBean getMostNumbers() {
		return mostNumbers;
	}
	public void setMostNumbers(PasswordRegxBean mostNumbers) {
		this.mostNumbers = mostNumbers;
	}
	public PasswordRegxBean getLeastSpecialCharacters() {
		return leastSpecialCharacters;
	}
	public void setLeastSpecialCharacters(PasswordRegxBean leastSpecialCharacters) {
		this.leastSpecialCharacters = leastSpecialCharacters;
	}
	public PasswordRegxBean getMostSpecialCharaccters() {
		return mostSpecialCharaccters;
	}
	public void setMostSpecialCharaccters(PasswordRegxBean mostSpecialCharaccters) {
		this.mostSpecialCharaccters = mostSpecialCharaccters;
	}
	public PasswordRegxBean getLeaseUpperCaseletters() {
		return leaseUpperCaseletters;
	}
	public void setLeaseUpperCaseletters(PasswordRegxBean leaseUpperCaseletters) {
		this.leaseUpperCaseletters = leaseUpperCaseletters;
	}
	public PasswordRegxBean getMostUpperCaseletters() {
		return mostUpperCaseletters;
	}
	public void setMostUpperCaseletters(PasswordRegxBean mostUpperCaseletters) {
		this.mostUpperCaseletters = mostUpperCaseletters;
	}
	public PasswordRegxBean getLeastLowerCaseLetter() {
		return leastLowerCaseLetter;
	}
	public void setLeastLowerCaseLetter(PasswordRegxBean leastLowerCaseLetter) {
		this.leastLowerCaseLetter = leastLowerCaseLetter;
	}
	public PasswordRegxBean getMostLowerCaseLetter() {
		return mostLowerCaseLetter;
	}
	public void setMostLowerCaseLetter(PasswordRegxBean mostLowerCaseLetter) {
		this.mostLowerCaseLetter = mostLowerCaseLetter;
	}
	public PasswordRegxBean getNotContaintheseCharacters() {
		return notContaintheseCharacters;
	}
	public void setNotContaintheseCharacters(
			PasswordRegxBean notContaintheseCharacters) {
		this.notContaintheseCharacters = notContaintheseCharacters;
	}
	
	
}
