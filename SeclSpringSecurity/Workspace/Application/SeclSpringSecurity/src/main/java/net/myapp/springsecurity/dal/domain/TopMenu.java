package net.myapp.springsecurity.dal.domain;

public class TopMenu {

	private String menuResourceID;
	private String menuDefaultText;
	private int menuSequence;

	public String getMenuResourceID() {
		return menuResourceID;
	}

	public void setMenuResourceID(String menuResourceID) {
		this.menuResourceID = menuResourceID;
	}

	public String getMenuDefaultText() {
		return menuDefaultText;
	}

	public void setMenuDefaultText(String menuDefaultText) {
		this.menuDefaultText = menuDefaultText;
	}

	public int getMenuSequence() {
		return menuSequence;
	}

	public void setMenuSequence(int menuSequence) {
		this.menuSequence = menuSequence;
	}

}
