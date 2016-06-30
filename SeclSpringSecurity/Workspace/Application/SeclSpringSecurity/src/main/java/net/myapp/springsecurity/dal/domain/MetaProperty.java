package net.myapp.springsecurity.dal.domain;

public class MetaProperty {

	private String propertyID;
	private String valueJSON;
	private String description;

	public String getPropertyID() {
		return propertyID;
	}

	public void setPropertyID(String propertyID) {
		this.propertyID = propertyID;
	}

	public String getValueJSON() {
		return valueJSON;
	}

	public void setValueJSON(String valueJSON) {
		this.valueJSON = valueJSON;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
