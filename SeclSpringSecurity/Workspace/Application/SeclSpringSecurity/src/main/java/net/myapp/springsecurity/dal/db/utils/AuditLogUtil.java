package net.myapp.springsecurity.dal.db.utils;

import java.lang.reflect.Field;

import net.myapp.springsecurity.dal.bean.AuditLogBean;
import net.myapp.springsecurity.dal.bean.AuditLogBeforeAfterBean;
import net.myapp.springsecurity.dal.bean.PasswordPolicyBean;
import net.myapp.springsecurity.dal.domain.Login;
import net.myapp.springsecurity.dal.domain.MetaProperty;
import net.myapp.springsecurity.dal.domain.PasswordPolicy;
import net.myapp.springsecurity.dal.manager.impl.BaseManagerImpl;
import net.myapp.springsecurity.dal.type.AuditActionSourceType;
import net.myapp.springsecurity.dal.type.AuditActionType;
import net.myapp.springsecurity.dal.type.AuditSectionType1;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class AuditLogUtil extends BaseManagerImpl {

	private static final Logger logger = LoggerFactory.getLogger(AuditLogUtil.class);
	private static AuditLogBean auditLogBean = new AuditLogBean();

	public void init_AuditLogManager(Class tableBean)
	{
		 
		
		 if(tableBean.equals(PasswordPolicyBean.class))
		{
			auditLogBean.setTableName(Table.PASSWORD_POLICY);
			auditLogBean.setSectionName(AuditSectionType1.SETTINGS.getValue());
			auditLogBean.setTableOIDName("passwordPolicyID");
			auditLogBean.setBeanClass(PasswordPolicy.class);
			PasswordPolicy obj = new PasswordPolicy();
			auditLogBean.setDomainObj(obj);
		}
	
		
	}

	public String getRowImage()
	{
		String rowImage = new String("{}");
		try {
	
			String selectAllsql = "SELECT * FROM "+auditLogBean.getTableName()+
					" WHERE "+auditLogBean.getTableOIDName()+" = \'"+auditLogBean.getRowKey()+"\'";
	
			if(auditLogBean.getTableName().equalsIgnoreCase(Table.CUSTOMER_ACCOUNT))
			{
				String[] tableOIDNames = auditLogBean.getTableOIDName().split("&");
				String[] rowKeys = auditLogBean.getRowKey().split("&");
	
				selectAllsql = "SELECT * FROM "+auditLogBean.getTableName()+" WHERE 1 = 1";
	
				for(int i=0; i<tableOIDNames.length; i++)
					selectAllsql += " AND "+tableOIDNames[i]+" = \'"+rowKeys[i]+"\'";
			}
	
	
			Object[] param = new Object[]{};
			Object beanClassObj = new Object();
		
			if(auditLogBean.getRowKey() != null && !auditLogBean.getRowKey().toString().isEmpty())
				beanClassObj = springJdbcDao.getObject(selectAllsql, param, auditLogBean.getBeanClass());
			
			if(beanClassObj == null || beanClassObj.toString().isEmpty())
				beanClassObj = auditLogBean.getDomainObj();
			
			rowImage = GsonUtil.getJsonWithDate(beanClassObj, "yyyy-MM-dd HH:mm:ss");
		} catch (Exception e) {
			e.printStackTrace();
		}

		return rowImage;
	}

	public Object getRowImageObj(String rowImage, String tableName)
	{
		Object obj = null;

		
		 if(tableName.equalsIgnoreCase(Table.CUSTOMER))   
		{
			String rowImage2 = new String();
			String IPCUniqueInfo = new String("{}");
			String IPCMandatoryInfo = new String("{}");
			String OPSCUniqueInfo = new String("{}");
			String OPSCMandatoryInfo = new String("{}");
			String applicationDate = new String();
			if(rowImage != null && !rowImage.toString().isEmpty() && !rowImage.equalsIgnoreCase("{}"))	
			{
				if(rowImage.indexOf("\",\"IPCUniqueInfo\":\"") != -1)
				{
					IPCUniqueInfo = rowImage.substring(rowImage.indexOf("\",\"IPCUniqueInfo\":\"")+19,rowImage.indexOf("\",\"IPCMandatoryInfo\":\""));
					rowImage2 += rowImage.substring(0, rowImage.indexOf("\",\"IPCUniqueInfo\":\"")+19)
							+ "";
	
					if(rowImage.indexOf("\",\"mobileNo\":\"") != -1)
						IPCMandatoryInfo = rowImage.substring(rowImage.indexOf("\",\"IPCMandatoryInfo\":\"")+22,rowImage.indexOf("\",\"mobileNo\":\""));
					else
						IPCMandatoryInfo = rowImage.substring(rowImage.indexOf("\",\"IPCMandatoryInfo\":\"")+22,rowImage.indexOf("\",\"email\":\""));
					
					rowImage2 += rowImage.substring(rowImage.indexOf("\",\"IPCMandatoryInfo\":\""),rowImage.indexOf("\",\"IPCMandatoryInfo\":\"")+22)
							+ "";
				}
				else if(rowImage.indexOf("\",\"OPSCUniqueInfo\":\"") != -1)
				{
					OPSCUniqueInfo = rowImage.substring(rowImage.indexOf("\",\"OPSCUniqueInfo\":\"")+20,rowImage.indexOf("\",\"OPSCMandatoryInfo\":\""));
					rowImage2 += rowImage.substring(0,rowImage.indexOf("\",\"OPSCUniqueInfo\":\"")+20)
							+ "";
	
					if(rowImage.indexOf("\",\"mobileNo\":\"") != -1)
						OPSCMandatoryInfo = rowImage.substring(rowImage.indexOf("\",\"OPSCMandatoryInfo\":\"")+23,rowImage.indexOf("\",\"mobileNo\":\""));
					else
						OPSCMandatoryInfo = rowImage.substring(rowImage.indexOf("\",\"OPSCMandatoryInfo\":\"")+23,rowImage.indexOf("\",\"email\":\""));
					
					rowImage2 += rowImage.substring(rowImage.indexOf("\",\"OPSCMandatoryInfo\":\""),rowImage.indexOf("\",\"OPSCMandatoryInfo\":\"")+23)
							+ "";
				}
				applicationDate = rowImage.substring(rowImage.indexOf("\",\"applicationDate\":\"")+21,rowImage.indexOf("\",\"submittedBy\":\""));
	
				if(rowImage.indexOf("\",\"mobileNo\":\"") != -1) {
					rowImage2 += rowImage.substring(rowImage.indexOf("\",\"mobileNo\":\""),rowImage.indexOf("\",\"applicationDate\":\"")+21)
							+ ""
							+ rowImage.substring(rowImage.indexOf("\",\"submittedBy\":\""),rowImage.length());
				}
				else {
					rowImage2 += rowImage.substring(rowImage.indexOf("\",\"email\":\""),rowImage.indexOf("\",\"applicationDate\":\"")+21)
							+ ""
							+ rowImage.substring(rowImage.indexOf("\",\"submittedBy\":\""),rowImage.length());
				}
			}
		}
		
		else if(tableName.equalsIgnoreCase(Table.LOGIN))
		{
			String roleJson = new String("{}");
			Login login = new Login();
			if(rowImage != null && !rowImage.toString().isEmpty() && !rowImage.equalsIgnoreCase("{}")) {
				login = (Login) GsonUtil.parseObject(rowImage, Login.class);
				login.setPassword("******");
				
			}
			if(obj == null || obj.toString().isEmpty())
				obj = new Login();
			
			if(roleJson != null && !roleJson.isEmpty())
				obj = login;
		}
		else if(tableName.equalsIgnoreCase(Table.AGENT))
		{
			String rowImage2 = new String();
			String kycJson = new String("{}");
			if(rowImage != null && !rowImage.toString().isEmpty() && !rowImage.equalsIgnoreCase("{}"))	
			{
				if(rowImage.indexOf("\",\"kycJson\":\"") != -1)
				{
					rowImage2 = rowImage.substring(0, rowImage.indexOf("\",\"kycJson\":\"")+13)
							+ "";
					
					if(rowImage.indexOf("\",\"bankAccountNo\":\"") == -1 && rowImage.indexOf("\",\"makerID\":\"") != -1)
					{
						kycJson = rowImage.substring(rowImage.indexOf("\",\"kycJson\":\"")+13,rowImage.indexOf("\",\"makerID\":\""));
						rowImage2 += rowImage.substring(rowImage.indexOf("\",\"makerID\":\""),rowImage.length());
					}
					else if(rowImage.indexOf("\",\"bankAccountNo\":\"") == -1 && rowImage.indexOf("\",\"makerID\":\"") == -1)
					{
						kycJson = rowImage.substring(rowImage.indexOf("\",\"kycJson\":\"")+13,rowImage.indexOf("\",\"role\":\""));
						rowImage2 += rowImage.substring(rowImage.indexOf("\",\"role\":\""),rowImage.length());
					}
					else if(rowImage.indexOf("\",\"bankAccountNo\":\"") != -1)
					{
						kycJson = rowImage.substring(rowImage.indexOf("\",\"kycJson\":\"")+13,rowImage.indexOf("\",\"bankAccountNo\":\""));
						rowImage2 += rowImage.substring(rowImage.indexOf("\",\"bankAccountNo\":\""),rowImage.length());
					}
	
				}
				
			}
		}
		else if(tableName.equalsIgnoreCase(Table.AGENT_SERVICE_STAFF))
		{
			String kycJson = new String("{}");
			if(rowImage != null && !rowImage.toString().isEmpty() && !rowImage.equalsIgnoreCase("{}"))	
			{
				if(rowImage.indexOf("\",\"kycJson\":\"") != -1)
				{
					kycJson = rowImage.substring(rowImage.indexOf("\",\"kycJson\":\"")+13,rowImage.indexOf("\",\"loginID\":\""));
					rowImage = rowImage.substring(0, rowImage.indexOf("\",\"kycJson\":\"")+13)
							+ ""
							+ rowImage.substring(rowImage.indexOf("\",\"loginID\":\""),rowImage.length());
	
				}
				
			}
		}
		else if(tableName.equalsIgnoreCase(Table.DDL_METADATA))
		{
			String valueJSON = new String("{}");
			if(rowImage != null && !rowImage.toString().isEmpty() && !rowImage.equalsIgnoreCase("{}"))	
			{
				if(rowImage.indexOf("\",\"valueJSON\":\"") != -1)
				{
					valueJSON = rowImage.substring(rowImage.indexOf("\",\"valueJSON\":\"")+15,rowImage.indexOf("\",\"description\":\""));
					rowImage = rowImage.substring(0, rowImage.indexOf("\",\"valueJSON\":\"")+15)
							+ ""
							+ rowImage.substring(rowImage.indexOf("\",\"description\":\""),rowImage.length());
	
				}
				
			}
		}
		else if(tableName.equalsIgnoreCase(Table.FINGERPRINT))
		{
			String rowImage2 = new String();
			
			if(rowImage != null && !rowImage.toString().isEmpty() && !rowImage.equalsIgnoreCase("{}"))	
			{		
				rowImage2 = rowImage.substring(0, rowImage.indexOf("\",\"ri\":\"")+8)
						+ "NOT AUTHORIZED TO VIEW"
						+ rowImage.substring(rowImage.indexOf("\",\"rm\":\""), rowImage.indexOf("\",\"rm\":\"")+8)
						+ "NOT AUTHORIZED TO VIEW"
						+ rowImage.substring(rowImage.indexOf("\",\"rt\":\""), rowImage.indexOf("\",\"rt\":\"")+8)
						+ "NOT AUTHORIZED TO VIEW"
						+ rowImage.substring(rowImage.indexOf("\",\"rr\":\""), rowImage.indexOf("\",\"rr\":\"")+8)
						+ "NOT AUTHORIZED TO VIEW"
						+ rowImage.substring(rowImage.indexOf("\",\"rp\":\""), rowImage.indexOf("\",\"rp\":\"")+8)
						+ "NOT AUTHORIZED TO VIEW"
						+ rowImage.substring(rowImage.indexOf("\",\"li\":\""), rowImage.indexOf("\",\"li\":\"")+8)
						+ "NOT AUTHORIZED TO VIEW"
						+ rowImage.substring(rowImage.indexOf("\",\"lm\":\""), rowImage.indexOf("\",\"lm\":\"")+8)
						+ "NOT AUTHORIZED TO VIEW"
						+ rowImage.substring(rowImage.indexOf("\",\"lt\":\""), rowImage.indexOf("\",\"lt\":\"")+8)
						+ "NOT AUTHORIZED TO VIEW"
						+ rowImage.substring(rowImage.indexOf("\",\"lr\":\""), rowImage.indexOf("\",\"lr\":\"")+8)
						+ "NOT AUTHORIZED TO VIEW"
						+ rowImage.substring(rowImage.indexOf("\",\"lp\":\""), rowImage.indexOf("\",\"lp\":\"")+8)
						+ "NOT AUTHORIZED TO VIEW"
						+ rowImage.substring(rowImage.indexOf("\",\"defaultFP\":"),rowImage.length());
			
			}
			
		}
		else if(tableName.equalsIgnoreCase(Table.CHARGE_MODEL))
		{
			String valueJSON = new String("{}");
			if(rowImage != null && !rowImage.toString().isEmpty() && !rowImage.equalsIgnoreCase("{}"))	
			{
				if(rowImage.indexOf("\",\"valueJSON\":\"") != -1)
				{
					valueJSON = rowImage.substring(rowImage.indexOf("\",\"valueJSON\":\"")+15,rowImage.indexOf("\",\"description\":\""));
					rowImage = rowImage.substring(0, rowImage.indexOf("\",\"valueJSON\":\"")+15)
							+ ""
							+ rowImage.substring(rowImage.indexOf("\",\"description\":\""),rowImage.length());
	
				}
				
			}
		}
		
		else if(tableName.equalsIgnoreCase(Table.META_PROPERTY))
		{
			String valueJSON = new String("{}");
			if(rowImage != null && !rowImage.toString().isEmpty() && !rowImage.equalsIgnoreCase("{}"))	
			{
				if(rowImage.indexOf("\",\"valueJSON\":\"") != -1)
				{
					valueJSON = rowImage.substring(rowImage.indexOf("\",\"valueJSON\":\"")+15,rowImage.indexOf("\",\"description\":\""));
					rowImage = rowImage.substring(0, rowImage.indexOf("\",\"valueJSON\":\"")+15)
							+ ""
							+ rowImage.substring(rowImage.indexOf("\",\"description\":\""),rowImage.length());
	
				}
				
				obj = GsonUtil.parseObject(rowImage, MetaProperty.class);
			}
			if(obj == null || obj.toString().isEmpty())
				obj = new MetaProperty();

			if(valueJSON != null && !valueJSON.isEmpty())
				((MetaProperty) obj).setValueJSON(valueJSON);
		}
	
		else if(tableName.equalsIgnoreCase(Table.PASSWORD_POLICY))
		{
			if(rowImage != null && !rowImage.toString().isEmpty() && !rowImage.equalsIgnoreCase("{}"))
				obj = GsonUtil.parseObject(rowImage, PasswordPolicy.class);
			if(obj == null || obj.toString().isEmpty())
				obj = new PasswordPolicy();
		}

		return obj;
	}

	public AuditLogBeforeAfterBean[] getListviewData(Object beforeObj, Object afterObj) throws Exception {

		int beanSize = beforeObj.getClass().getDeclaredFields().length;

		AuditLogBeforeAfterBean[] beans = new AuditLogBeforeAfterBean[beanSize];
		int index = 0;

		Object obj = beforeObj;

		for (Field field : obj.getClass().getDeclaredFields()) {
			field.setAccessible(true); // if you want to modify private fields
			if(!field.getName().contains("serialVersionUID"))
			{
				AuditLogBeforeAfterBean bean = new AuditLogBeforeAfterBean();
				bean.setLabel(field.getName());

				String str0 = new String("JSON");
				String str1 = new String("UniqueInfo");
				String str2 = new String("MandatoryInfo");

				if(bean.getLabel().toLowerCase().contains(str0.toLowerCase())
						|| bean.getLabel().toLowerCase().contains(str1.toLowerCase())
						|| bean.getLabel().toLowerCase().contains(str2.toLowerCase()))
					bean.setIsJSON("Y");
				else
					bean.setIsJSON("N");

				if(field.get(obj) != null && !field.get(obj).toString().isEmpty())
					bean.setBeforeOperation(field.get(obj).toString());	
				else
					bean.setBeforeOperation("NULL");
				beans[index++] = bean;
			}
		}

		index = 0;
		obj = afterObj;

		for (Field field : obj.getClass().getDeclaredFields()) {
			field.setAccessible(true); // if you want to modify private fields
			if(!field.getName().contains("serialVersionUID") && beans[index] != null)
			{
				if(field.get(obj) != null && !field.get(obj).toString().isEmpty())
					beans[index++].setAfterOperation(field.get(obj).toString()); 
				else
					beans[index++].setAfterOperation("NULL");       	
			}
		}

		return beans;
	}

	public void beforeOperation(Class tableBean, String rowKey)
	{
		init_AuditLogManager(tableBean); 
		auditLogBean.setRowKey(rowKey);
		auditLogBean.setRowImageBefore(getRowImage());
	}

	public void afterOperation(String actionSource, String actionUser) throws Exception
	{
		if(actionSource.equalsIgnoreCase(AuditActionSourceType.SYSTEM.getValue())){
			actionUser = AuditActionSourceType.SYSTEM.name();
		}
		else if(actionSource.equalsIgnoreCase(AuditActionSourceType.ADMIN.getValue())){
			actionUser = AuditActionSourceType.ADMIN.name();
		}

		auditLogBean.setTimeOfAction(dateManager.getTimestamp(dateManager.getCurrentDateTime()));
		auditLogBean.setActionSource(actionSource);
		auditLogBean.setActionUser(actionUser);
		auditLogBean.setRowImageAfter(getRowImage());
		
		String actionType = AuditActionType.UPDATE.getValue();
		if((auditLogBean.getRowImageBefore() == null || auditLogBean.getRowImageBefore().isEmpty() || auditLogBean.getRowImageBefore().equalsIgnoreCase("{}")) 
			&& !(auditLogBean.getRowImageAfter() == null || auditLogBean.getRowImageAfter().isEmpty() || auditLogBean.getRowImageAfter().equalsIgnoreCase("{}"))) 
		{
			actionType = AuditActionType.INSERT.getValue();
		}
			
		else if(!(auditLogBean.getRowImageBefore() == null || auditLogBean.getRowImageBefore().isEmpty() || auditLogBean.getRowImageBefore().equalsIgnoreCase("{}")) 
				&& (auditLogBean.getRowImageAfter() == null || auditLogBean.getRowImageAfter().isEmpty() || auditLogBean.getRowImageAfter().equalsIgnoreCase("{}")))
		{
			actionType = AuditActionType.DELETE.getValue();
		}
		
		auditLogBean.setActionType(actionType);
		insertIntoAuditLog();		
	}

	public void insertIntoAuditLog() throws Exception
	{
		String insertAuditsql = queryManager.insertAuditLogInfo();
		Object[] param = new Object[]{
				OIDGenerator.generateId(),
				auditLogBean.getSectionName(),
				auditLogBean.getTableName(),
				auditLogBean.getRowKey(),
				auditLogBean.getTimeOfAction(),
				auditLogBean.getActionType(),
				auditLogBean.getActionSource(),
				auditLogBean.getActionUser(),
				auditLogBean.getRowImageBefore(),
				auditLogBean.getRowImageAfter()};

		springJdbcDao.updateObject(insertAuditsql, param);			
		logger.info("Successfully Inserted data into Audit log");
	}
	
	public void insertPasswordHistory(String logingID, String newPassword, String updatedBy) throws Exception
	{
		String sql = queryManager.insertPasswordHistory();
		Object[] param = new Object[]{
				OIDGenerator.generateId(),
				logingID,
				newPassword,
				updatedBy,
				dateManager.getCurrentDateTime()};

		springJdbcDao.updateObject(sql, param);			
		logger.info("Successfully Inserted data into Audit log");
	}

}
