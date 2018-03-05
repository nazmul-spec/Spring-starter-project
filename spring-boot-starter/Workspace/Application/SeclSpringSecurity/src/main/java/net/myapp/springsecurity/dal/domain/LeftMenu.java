package net.myapp.springsecurity.dal.domain;

public class LeftMenu {

	private String menuResourceID;
	private String topMenuID;
	private String menuDefaultText;
	private int menuSequence;

	public String getMenuResourceID() {
		return menuResourceID;
	}

	public void setMenuResourceID(String menuResourceID) {
		this.menuResourceID = menuResourceID;
	}

	public String getTopMenuID() {
		return topMenuID;
	}

	public void setTopMenuID(String topMenuID) {
		this.topMenuID = topMenuID;
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
