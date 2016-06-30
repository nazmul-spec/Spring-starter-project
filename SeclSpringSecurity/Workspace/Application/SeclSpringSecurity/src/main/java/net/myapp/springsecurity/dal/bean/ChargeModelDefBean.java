package net.myapp.springsecurity.dal.bean;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

public class ChargeModelDefBean extends AbstractBean {	
	private static final long serialVersionUID = 1L;	
	
	private String OID;				
	private String name;			
	private String description;		
	private String status;			
	private Date effectiveFrom;	
	private Date effectiveTo;
	private Timestamp tstmpEffectiveFrom;	
	private Timestamp tstmpEffectiveTo;
	private String strEffectiveFrom;	
	private String strEffectiveTo;
	private String isDefault;	
	
	private List<ChargeModelItemBean> chargeModelItemList;
	
	public String getOID() {
		return OID;
	}
	public void setOID(String oID) {
		OID = oID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

	public Date getEffectiveFrom() {
		return effectiveFrom;
	}
	public void setEffectiveFrom(Date effectiveFrom) {
		this.effectiveFrom = effectiveFrom;
	}
	public Date getEffectiveTo() {
		return effectiveTo;
	}
	public void setEffectiveTo(Date effectiveTo) {
		this.effectiveTo = effectiveTo;
	}
	public String getStrEffectiveFrom() {
		return strEffectiveFrom;
	}
	public void setStrEffectiveFrom(String strEffectiveFrom) {
		this.strEffectiveFrom = strEffectiveFrom;
	}
	public String getStrEffectiveTo() {
		return strEffectiveTo;
	}
	public void setStrEffectiveTo(String strEffectiveTo) {
		this.strEffectiveTo = strEffectiveTo;
	}
	public Timestamp getTstmpEffectiveFrom() {
		return tstmpEffectiveFrom;
	}
	public void setTstmpEffectiveFrom(Timestamp tstmpEffectiveFrom) {
		this.tstmpEffectiveFrom = tstmpEffectiveFrom;
	}
	public Timestamp getTstmpEffectiveTo() {
		return tstmpEffectiveTo;
	}
	public void setTstmpEffectiveTo(Timestamp tstmpEffectiveTo) {
		this.tstmpEffectiveTo = tstmpEffectiveTo;
	}
	public List<ChargeModelItemBean> getChargeModelItemList() {
		return chargeModelItemList;
	}
	public void setChargeModelItemList(List<ChargeModelItemBean> chargeModelItemList) {
		this.chargeModelItemList = chargeModelItemList;
	}
	public String getIsDefault() {
		return isDefault;
	}
	public void setIsDefault(String isDefault) {
		this.isDefault = isDefault;
	}
	
}
