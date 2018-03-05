package net.myapp.springsecurity.dal.bean;

import java.sql.Timestamp;


public class AuditLogDataBean extends AbstractBean {
	
	private static final long serialVersionUID = 45678L;
	
	private String OID;
	private String tableName;
	private String sectionName;
	private String rowKey;
	private Timestamp timeOfAction;
	private String actionType;
	private String actionSource;
	private String actionUser;
	private String rowImageBefore;
	private String rowImageAfter;
	private Object rowImageBeforeObj;
	private Object rowImageAfterObj;
	private AuditLogBeforeAfterBean[] listViewData;
	
	public String getOID() {
		return OID;
	}
	public void setOID(String oID) {
		OID = oID;
	}
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public String getRowKey() {
		return rowKey;
	}
	public void setRowKey(String rowKey) {
		this.rowKey = rowKey;
	}
	public Timestamp getTimeOfAction() {
		return timeOfAction;
	}
	public void setTimeOfAction(Timestamp timestamp) {
		this.timeOfAction = timestamp;
	}
	public String getActionType() {
		return actionType;
	}
	public void setActionType(String actionType) {
		this.actionType = actionType;
	}
	public String getActionSource() {
		return actionSource;
	}
	public void setActionSource(String actionSource) {
		this.actionSource = actionSource;
	}
	public String getActionUser() {
		return actionUser;
	}
	public void setActionUser(String actionUser) {
		this.actionUser = actionUser;
	}
	public String getRowImageBefore() {
		return rowImageBefore;
	}
	public void setRowImageBefore(String rowImageBefore) {
		this.rowImageBefore = rowImageBefore;
	}
	public String getRowImageAfter() {
		return rowImageAfter;
	}
	public void setRowImageAfter(String rowImageAfter) {
		this.rowImageAfter = rowImageAfter;
	}
	public String getSectionName() {
		return sectionName;
	}
	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}
	public Object getRowImageBeforeObj() {
		return rowImageBeforeObj;
	}
	public void setRowImageBeforeObj(Object rowImageBeforeObj) {
		this.rowImageBeforeObj = rowImageBeforeObj;
	}
	public Object getRowImageAfterObj() {
		return rowImageAfterObj;
	}
	public void setRowImageAfterObj(Object rowImageAfterObj) {
		this.rowImageAfterObj = rowImageAfterObj;
	}
	public AuditLogBeforeAfterBean[] getListViewData() {
		return listViewData;
	}
	public void setListViewData(AuditLogBeforeAfterBean[] listViewData) {
		this.listViewData = listViewData;
	}
	
}
