package net.myapp.springsecurity.dal.manager.impl;

import com.google.common.base.Strings;

import net.myapp.springsecurity.dal.bean.AuditLogDataBean;
import net.myapp.springsecurity.dal.bean.LoginTrail;
import net.myapp.springsecurity.dal.bean.PasswordPolicyBean;
import net.myapp.springsecurity.dal.bean.RoleBean;
import net.myapp.springsecurity.dal.bean.SecurityUserLoginBean;
import net.myapp.springsecurity.dal.db.utils.Table;
import net.myapp.springsecurity.dal.manager.QueryManager;
import net.myapp.springsecurity.dal.type.LoginMessageType;

public class PostgreQueryManagerImpl implements QueryManager {

	
	/*@Override
	public String updateUserStatusbyAgentID() {
		return "update "+Table.LOGIN+
				" set status = ?, changedBy = ?" +
				" where loginID = (select loginID from "+Table.AGENT+
				" where agentID = ?)";
	}
*/

	@Override
	public String selectUserInfoByLoginIdSql() {
		return "select * from "+Table.LOGIN+
				" where loginID = ?";
	}

	/*@Override
	public String UpdateUserStatusbyLoginIDSql() {
		return "update "+Table.LOGIN+
				" set status=?, changedBy=?" +
				" where loginID=?";
	}*/

	@Override
	public String ResetPasswordbyLoginIDSql() {
		return "UPDATE "+Table.LOGIN+
				" SET password=?, changedBy=?, reset = NOT reset" +
				" WHERE loginID=?";
	}


	@Override
	public String selectBranchbyBranchIDSql() {
		return "select * from " +Table.BRANCH +				
				" where branchID = ?";
	}
	//Role Table Query//
/*	@Override
	public String insertRole() {
		return "insert into public."+Table.ROLE+
				" (roleID, roleDescription, menuJson, status, makerID, checkerID, approverID, changedBy)"+ 
				" values (?,?,?,?,?,?,?,?)";
	}
	@Override
	public String selectRolebyRoleIDSql() {
		return "select * from "+Table.ROLE +
				" where roleID = ?";
	}*/
	
	@Override
	public String selectRolebyRoleIDForLoginSql() {
		return "select * from public."+Table.ROLE +
				" where roleID = ?";
	}
	
/*	@Override
	public String selectUserRolesSql() {
		return "select roleId, roleId as roleName from public."+Table.ROLE +
				" where roleId != 'SA'";
	}
	@Override
	public String countRoleID(){
		return "select count(*) from public."+Table.ROLE +				
				" where roleID = ?";
	}*/
	@Override
	public String updateLogInTrailClosed() {
		return "update "+Table.LOGINTRAIL+
				" set loginStatus=?, signoutDate=?" +
				" where OID=?";
	}


/*	@Override
	public String updateLoginInfoSql() {
		return "update public."+Table.LOGIN+
				" set email=?, mobileNo=?, status=?, roleJSON=?, branchID=?, rejectionCause = ?, changedBy=?" +
				" where loginID=?";
	}

	@Override
	public String updateLoginInfoSql2() {
		return "update "+Table.LOGIN+
				" set email=?, mobileNo=?, bankID=?, branchID=?, status=?, roleJSON = ?, changedBy=?" +
				" where loginID=?";
	}


	@Override
	public String countLoginbyLoginID() {
		return "select count(*) from "+Table.LOGIN+
				" where loginID = ?";
	}

	@Override
	public String countLoginbyEmail() {
		return "select count(*) from "+Table.LOGIN+
				" where email = ?";
	}


	@Override
	public String countLoginTrailbyLoginId() {
		return "select count(*) from "+Table.LOGINTRAIL+
				" where loginID = ?";
	}

	@Override
	public String countLoginbyMobileNo() {
		return "select count(*) from "+Table.LOGIN+
				" where mobileNo = ?";
	}
	
	
	@Override
	public String selectUsersForRoleBMorBA(SecurityUserLoginBean userBean) {

		String sql = "";

		sql = "select * from "+Table.LOGIN+
				" where 1 = 1";

		if(userBean.getBankID() != null && !userBean.getBankID().trim().equalsIgnoreCase("undefined") && !userBean.getBankID().trim().isEmpty()){
			sql += " AND bankID = '"+userBean.getBankID()+"'";
		}

		if(userBean.getBranchID() != null && !userBean.getBranchID().trim().equalsIgnoreCase("undefined") && !userBean.getBranchID().trim().isEmpty()){
			sql += " AND branchID = '"+userBean.getBranchID()+"'";
		}

		if(userBean.getRoleID() != null && !userBean.getRoleID().trim().equalsIgnoreCase("undefined") && !userBean.getRoleID().trim().isEmpty()){
			sql += " AND roleJSON like '%"+userBean.getRoleID()+"%'";
		}
		else{
			sql += " AND roleJSON  in ('[\"Branch.OfficerMaker\"]',  '[\"Branch.OfficerApprover\"]')";
		}
		
		if(userBean.getSearchText() != null && !userBean.getSearchText().trim().isEmpty()){

			sql += " AND (loginId like '%"+ userBean.getSearchText().trim()+"%' OR" +
					" email like '%"+ userBean.getSearchText().trim()+"%' OR" +
					" status  like '%"+ userBean.getSearchText().trim()+"%')";
		}      

		sql += " order by loginId LIMIT '" +userBean.getLimit()+"' OFFSET '" +userBean.getOffset()+"'";
		return sql;	
	}


	
	@Override
	public String selectUsersForRoleAdmin(SecurityUserLoginBean userBean) {

		String sql = "";

		sql = "select * from "+Table.LOGIN+
				" where 1 = 1";

		if(userBean.getBankID() != null && !userBean.getBankID().trim().equalsIgnoreCase("undefined") && !userBean.getBankID().trim().isEmpty()){
			sql += " AND bankID = '"+userBean.getBankID()+"'";
		}

		if(userBean.getBranchID() != null && !userBean.getBranchID().trim().equalsIgnoreCase("undefined") && !userBean.getBranchID().trim().isEmpty()){
			sql += " AND branchID = '"+userBean.getBranchID()+"'";
		} 

		if(userBean.getRoleID() != null && !userBean.getRoleID().trim().equalsIgnoreCase("undefined") && !userBean.getRoleID().trim().isEmpty()){
			sql += " AND roleJSON like '%"+userBean.getRoleID()+"%'";
		}
		else{
			sql += " AND roleJSON  in ('[\"Admin.Maker\"]', '[\"Admin.Approver\"]','[\"Agent.Manager\"]', '[\"Branch.Manager\"]')";
		}

		if(userBean.getSearchText() != null && !userBean.getSearchText().trim().isEmpty()){

			sql += " AND (loginId like '%"+ userBean.getSearchText().trim()+"%' OR" +
					" email like '%"+ userBean.getSearchText().trim()+"%' OR" +
					" status  like '%"+ userBean.getSearchText().trim()+"%')";
		}      

		sql += " order by loginId LIMIT '" +userBean.getLimit()+"' OFFSET '" +userBean.getOffset()+"'";
		return sql;	
	}

	@Override
	public String countTotalUsersForRoleAdmin(SecurityUserLoginBean userBean) {

		String sql = "";

		sql = "select count(*) from "+Table.LOGIN+
				" where 1 = 1";

		if(userBean.getBankID() != null && !userBean.getBankID().trim().equalsIgnoreCase("undefined") && !userBean.getBankID().trim().isEmpty()){
			sql += " AND bankID = '"+userBean.getBankID()+"'";
		}

		if(userBean.getBranchID() != null && !userBean.getBranchID().trim().equalsIgnoreCase("undefined") && !userBean.getBranchID().trim().isEmpty()){
			sql += " AND branchID = '"+userBean.getBranchID()+"'";
		} 

		if(userBean.getRoleID() != null && !userBean.getRoleID().trim().equalsIgnoreCase("undefined") && !userBean.getRoleID().trim().isEmpty()){
			sql += " AND roleJSON like '%"+userBean.getRoleID()+"%'";
		}
		else{
			sql += " AND roleJSON  in ('[\"Admin.Maker\"]', '[\"Admin.Approver\"]','[\"Agent.Manager\"]', '[\"Branch.Manager\"]')";
		}

		if(userBean.getSearchText() != null && !userBean.getSearchText().trim().isEmpty()){

			sql += " AND (loginId like '%"+ userBean.getSearchText().trim()+"%' OR" +
					" email like '%"+ userBean.getSearchText().trim()+"%' OR" +
					" status  like '%"+ userBean.getSearchText().trim()+"%')";
		}

		return sql;	

	}

	@Override
	public String selectUsersForRoleSA(SecurityUserLoginBean userBean) {

		String sql = "";

		sql = "select * from "+Table.LOGIN+
				" where 1 = 1";

		if(userBean.getBankID() != null && !userBean.getBankID().trim().equalsIgnoreCase("undefined") && !userBean.getBankID().trim().isEmpty()){
			sql += " AND bankID = '"+userBean.getBankID()+"'";
		}

		if(userBean.getBranchID() != null && !userBean.getBranchID().trim().equalsIgnoreCase("undefined") && !userBean.getBranchID().trim().isEmpty()){
			sql += " AND branchID = '"+userBean.getBranchID()+"'";
		}

		sql+= " AND roleJSON  in ('[\"Admin\"]')";

		if(userBean.getSearchText() != null && !userBean.getSearchText().trim().isEmpty()){

			sql += " AND (loginId like '%"+ userBean.getSearchText().trim()+"%' OR" +
					" email like '%"+ userBean.getSearchText().trim()+"%' OR" +
					" status  like '%"+ userBean.getSearchText().trim()+"%')";
		}      

		sql += " order by loginId LIMIT '" +userBean.getLimit()+"' OFFSET '" +userBean.getOffset()+"'";
		return sql;	
	}

	@Override
	public String countTotalUsersForRoleSA(SecurityUserLoginBean userBean) {

		String sql = "";

		sql = "select count(*) from "+Table.LOGIN+
				" where 1 = 1";

		if(userBean.getBankID() != null && !userBean.getBankID().trim().equalsIgnoreCase("undefined") && !userBean.getBankID().trim().isEmpty()){
			sql += " AND bankID = '"+userBean.getBankID()+"'";
		}

		if(userBean.getBranchID() != null && !userBean.getBranchID().trim().equalsIgnoreCase("undefined") && !userBean.getBranchID().trim().isEmpty()){
			sql += " AND branchID = '"+userBean.getBranchID()+"'";
		}

		sql+= " AND roleJSON  in ('[\"Admin\"]')";

		if(userBean.getSearchText() != null && !userBean.getSearchText().trim().isEmpty()){

			sql += " AND (loginId like '%"+ userBean.getSearchText().trim()+"%' OR" +
					" email like '%"+ userBean.getSearchText().trim()+"%' OR" +
					" status  like '%"+ userBean.getSearchText().trim()+"%')";
		}

		return sql;	

	}
*/

	@Override
	public String insertAuditLogInfo() {
		return "insert into public."+Table.AUDITLOG+ 
				" (OID, sectionName, tableName, rowKey, timeOfAction, actionType, actionSource, actionUser, rowImageBefore, rowImageAfter)" +
				" values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	}

	@Override
	public String insertPasswordHistory() {
		return "insert into public."+Table.PASSWORD_HISTORY+ 
				" (passHistoryID, loginID, newPassword, updatedBy, updatedOn)" +
				" values (?, ?, ?, ?, ?)";
	}

	@Override
	public String selectAllAuditLogInfo(AuditLogDataBean auditLogBean) {

		String sql = "select * from public."+Table.AUDITLOG + " where 1 = 1";
		if (auditLogBean.getSectionName() != null && !auditLogBean.getSectionName().trim().isEmpty()) {
			sql += " AND sectionName = '"+auditLogBean.getSectionName()+"'";
		}
		if (auditLogBean.getTableName() != null && !auditLogBean.getTableName().trim().isEmpty()) {
			sql += " AND tableName = '"+auditLogBean.getTableName()+"'";
		}
		if (auditLogBean.getActionUser() != null && !auditLogBean.getActionUser().trim().isEmpty()) {
			sql += " AND (LOWER(actionUser) like '%"+ auditLogBean.getActionUser().trim().toLowerCase() +"%')";
		}
		if(auditLogBean.getFromDate() != null && !auditLogBean.getFromDate().trim().equalsIgnoreCase("undefined") && !auditLogBean.getFromDate().trim().isEmpty() 
				&& auditLogBean.getToDate() != null && !auditLogBean.getToDate().trim().equalsIgnoreCase("undefined")  && !auditLogBean.getToDate().trim().isEmpty()){
			sql += "AND timeOfAction BETWEEN '" + auditLogBean.getFromDate() + ":00' AND '" + auditLogBean.getToDate() + ":59'";
		}

		if(auditLogBean.getSearchText() != null && !auditLogBean.getSearchText().trim().isEmpty()){

			sql += " AND (LOWER(tableName) like '%"+ auditLogBean.getSearchText().trim().toLowerCase() +"%' OR" +
					" LOWER(actionType) like '%"+ auditLogBean.getSearchText().trim().toLowerCase() +"%' OR" +
					" LOWER(actionUser) like '%"+ auditLogBean.getSearchText().trim().toLowerCase() +"%')";
		}

		sql += " order by timeOfAction DESC LIMIT '" +auditLogBean.getLimit()+"' OFFSET '" +auditLogBean.getOffset()+"'";
		return sql;	
	}

	@Override
	public String countAllAuditLogInfo(AuditLogDataBean auditLogBean) {

		String sql = "select count(*) from public."+Table.AUDITLOG + " where 1 = 1";
		if (auditLogBean.getSectionName() != null && !auditLogBean.getSectionName().trim().isEmpty()) {
			sql += " AND sectionName = '"+auditLogBean.getSectionName()+"'";
		}
		if (auditLogBean.getTableName() != null && !auditLogBean.getTableName().trim().isEmpty()) {
			sql += " AND tableName = '"+auditLogBean.getTableName()+"'";
		}
		if (auditLogBean.getActionUser() != null && !auditLogBean.getActionUser().trim().isEmpty()) {
			sql += " AND (LOWER(actionUser) like '%"+ auditLogBean.getActionUser().trim().toLowerCase() +"%')";
		}
		if(auditLogBean.getFromDate() != null && !auditLogBean.getFromDate().trim().equalsIgnoreCase("undefined") && !auditLogBean.getFromDate().trim().isEmpty() 
				&& auditLogBean.getToDate() != null && !auditLogBean.getToDate().trim().equalsIgnoreCase("undefined")  && !auditLogBean.getToDate().trim().isEmpty()){
			sql += "AND timeOfAction BETWEEN '" + auditLogBean.getFromDate() + ":00' AND '" + auditLogBean.getToDate() + ":59'";
		}

		if(auditLogBean.getSearchText() != null && !auditLogBean.getSearchText().trim().isEmpty()){

			sql += " AND (LOWER(tableName) like '%"+ auditLogBean.getSearchText().trim().toLowerCase() +"%' OR" +
					" LOWER(actionType) like '%"+ auditLogBean.getSearchText().trim().toLowerCase() +"%' OR" +
					" LOWER(actionUser) like '%"+ auditLogBean.getSearchText().trim().toLowerCase() +"%')";
		}
		return sql;	
	}

	// Start ip and id block query
		@Override
		public String countLoginFailedByIp() {
			String sql = "SELECT " +
					" SUM(" +
					" CASE" +
					" WHEN l.loginstatus = '" + LoginMessageType.FAILDE.getValue() + "' THEN 1" +
					" ELSE 0" +
					" END" +
					" ) loginstatus FROM" +
					" (" +
					" SELECT loginstatus" +
					" FROM logintrail" +
					" WHERE machineip = ?" +
					" ORDER BY signindate DESC LIMIT ?" +
					" ) l";
			return sql;
		}

		@Override
		public String getLastLoginByIp() {
			String sql = "SELECT loginstatus, signindate, EXTRACT(EPOCH FROM ? - signindate)/3600 AS timediff" +
					" FROM logintrail " +
					" WHERE machineip = ? AND loginstatus <> '" + LoginMessageType.ALREADY_IP_BLOCK.name().toString() + "' " +
					" ORDER BY signindate DESC LIMIT 1";
			return sql;
		}

		@Override
		public String getLastLoginById() {
			String sql = "SELECT loginid, blockstatus, blocktime, EXTRACT(EPOCH FROM ? - blocktime)/3600 AS timediff " +
					" FROM login WHERE loginid = ?";
			return sql;
		}

		@Override
		public String updateResetStatusById() {
			String sql = "UPDATE login SET resetRequired = ? WHERE loginID = ?";
			return sql;
		}

		@Override
		public String countLoginIdByIp() {
			String sql = "SELECT" +
					" SUM(" +
					" CASE" +
					" WHEN l.loginid = ? THEN 1" +
					" ELSE 0" +
					" END" +
					" ) loginstatus FROM" +
					" (" +
					" SELECT loginid" +
					" FROM logintrail" +
					" WHERE machineip = ?" +
					" ORDER BY signindate DESC LIMIT ?" +
					" ) l";
			return sql;
		}

		@Override
		public String blockID() {
			String sql = "UPDATE login" +
					" SET blockstatus = '" + LoginMessageType.BLOCK_ID.name().toString() + "', blocktime = ?" +
					" WHERE loginid = ?";
			return sql;
		}
		
		@Override
		public String ubBlockID() {
			String sql = "UPDATE login" +
					" SET blockstatus = null, blocktime = null" +
					" WHERE loginid = ?";
			return sql;
		}

		@Override
		public String getBranchInfoByUser() {
			String sql = "SELECT l.loginid, l.branchid, b.status" +
					" FROM login l" +
					" LEFT OUTER JOIN branch b ON (l.branchid = b.branchid)" +
					" WHERE l.loginid = ?";
			return sql;
		}
		// End ip and id block query

	@Override
	public String selectAuditLogInfoByID() {
		return "select * from public."+Table.AUDITLOG+
				" where OID = ?" ;
	}

	/*@Override
	public String countBlockedUsers(SecurityUserLoginBean userBean) {

		String sql = "";

		sql = "select count(*) from public."+Table.LOGIN+
				" where 1 = 1";

		if(userBean.getBankID() != null && !userBean.getBankID().trim().equalsIgnoreCase("undefined") && !userBean.getBankID().trim().isEmpty()){
			sql += " AND bankID = '"+userBean.getBankID()+"'";
		}

		if(userBean.getBranchID() != null && !userBean.getBranchID().trim().equalsIgnoreCase("undefined") && !userBean.getBranchID().trim().isEmpty()){
			sql += " AND branchID = '"+userBean.getBranchID()+"'";
		}

		sql+= " AND blockStatus  = '"+LoginMessageType.BLOCK_ID+"'";

		if(userBean.getSearchText() != null && !userBean.getSearchText().trim().isEmpty()){

			sql += " AND (LOWER(loginId) like '%"+ userBean.getSearchText().trim().toLowerCase() + "%' OR" +
					" LOWER(email) like '%"+ userBean.getSearchText().trim().toLowerCase() + "%' OR" +
					" LOWER(status)  like '%"+ userBean.getSearchText().trim().toLowerCase() + "%')";
		}

		return sql;	
	}
	
	@Override
	public String UnblockUserbyLoginID() {
		return "update public."+Table.LOGIN+
				" set blockTime = null, blockStatus = null" +
				" where loginID = ?";
	}
	
	@Override
	public String selectLogInTrailByMachineIP(LoginTrail trail) {
		
		String sql = "SELECT * FROM (" +
				"SELECT oid, loginid, roleID, signindate, signoutDate, machineip, loginstatus, MAX(signindate) over (PARTITION BY machineip) AS max_signindate " +
				"FROM logintrail) l " +
				"WHERE signindate = max_signindate AND (loginstatus = 'BLOCK_IP' OR loginstatus = 'ALREADY_IP_BLOCK')";
		
		if(trail.getSearchText() != null && !trail.getSearchText().trim().isEmpty()){

			sql += " AND (LOWER(loginId) like '%"+ trail.getSearchText().trim().toLowerCase() + "%' OR" +
					" LOWER(email) like '%"+ trail.getSearchText().trim().toLowerCase() + "%' OR" +
					" LOWER(status) like '%"+ trail.getSearchText().trim().toLowerCase() + "%')";
		}

		sql += " order by loginId LIMIT '" +trail.getLimit()+"' OFFSET '" +trail.getOffset()+"'";
		return sql;	
	}

	@Override
	public String countLogInTrailByMachineIP(LoginTrail trail) {
		String sql = "SELECT count(*) FROM (" +
				"SELECT oid, loginid, roleID, signindate, signoutDate, machineip, loginstatus, MAX(signindate) over (PARTITION BY machineip) AS max_signindate " +
				"FROM logintrail) l " +
				"WHERE signindate = max_signindate AND (loginstatus = 'BLOCK_IP' OR loginstatus = 'ALREADY_IP_BLOCK')";
		
		if(trail.getSearchText() != null && !trail.getSearchText().trim().isEmpty()){

			sql += " AND (LOWER(loginId) like '%"+ trail.getSearchText().trim().toLowerCase() + "%' OR" +
					" LOWER(email) like '%"+ trail.getSearchText().trim().toLowerCase() + "%' OR" +
					" LOWER(status) like '%"+ trail.getSearchText().trim().toLowerCase() + "%')";
		}

		return sql;
	}
	
	@Override
	public String insertLogInTrailSql2() {
		return "insert into public."+Table.LOGINTRAIL+
				" (OID, loginID, roleID, signinDate, signoutDate, machineIP, loginStatus)"+ 
				" values (?,?,?,?,?,?,?)";
	}
	
	
		public String countAccountTransProfileByName(String name, String accountTpID){
			String sql = "SELECT COUNT(*) FROM  public." + Table.ACCOUNT_TRANS_PROFILE + " WHERE name = '"+name+"'";
			if (!Strings.isNullOrEmpty(accountTpID)) {
				sql+= " AND accountTpID != '"+accountTpID+"'";
			}
			return sql;
		}
		
		public String countAccountTransProfileByType(String tpType, String accountTpID){
			String sql = "SELECT COUNT(*) FROM  public." + Table.ACCOUNT_TRANS_PROFILE + " WHERE tpType = '"+tpType+"'";
			if (!Strings.isNullOrEmpty(accountTpID)) {
				sql+= " AND accountTpID != '"+accountTpID+"'";
			}
			return sql;
		}
		
	
		public String countOutletTransProfileByName(String name, String outletTpID){
			String sql= "SELECT COUNT(*) FROM  public." + Table.OUTLET_TRANS_PROFILE + " WHERE name = '"+name+"'";
			if (!Strings.isNullOrEmpty(outletTpID)) {
				sql+= " AND outletTpID !='"+outletTpID+"'";
			}
			return sql;
		}
		
		public String countOutletTransProfileTpType(String tpType, String outletTpID){
			String sql = "SELECT COUNT(*) FROM  public." + Table.OUTLET_TRANS_PROFILE + " WHERE tpType = '"+tpType+"'";
			if (!Strings.isNullOrEmpty(outletTpID)) {
				sql+= " AND outletTpID != '"+outletTpID+"'";
			}
			return sql;
		}
		
		@Override
		public String getPasswordPolicies(PasswordPolicyBean model){
			String sql = "SELECT passwordPolicyID, name, status, effectiveFrom, effectiveTo, description," +
					" policyJson, createdBy, createdOn, updatedBy, updatedOn FROM public."+Table.PASSWORD_POLICY + " s WHERE 1 = 1 ";

			
				if(model.getStatus() != null && !model.getStatus().trim().equalsIgnoreCase("undefined") && !model.getStatus().trim().isEmpty()){
					sql += "AND status = '" + model.getStatus() + "' ";
				}
			

			if(model.getSearchText() != null && !model.getSearchText().trim().isEmpty()){

				sql += " AND (LOWER(name) like '%"+ model.getSearchText().trim().toLowerCase()+"%' OR" +
						" LOWER(description) like '%"+ model.getSearchText().trim().toLowerCase()+"%' OR" +
						" LOWER(passwordPolicyID) like '%"+ model.getSearchText().trim().toLowerCase()+"%')";
			} 

			sql += " order by branchid LIMIT '" + model.getLimit() + "' OFFSET '" + model.getOffset()+"'";

			return sql;
		}
		*/
		@Override
		public String getLastNPasswordInfoByLoginID() {
			String sql = "select passHistoryID, loginID, oldPassword, newPassword, updatedBy, updatedOn" +
					" from PasswordHistory where loginID = ? order by Updatedon desc limit ?";
			return sql;
		}
		
		@Override
		public String getLastPassHistoryByID() {
			String sql = "select passHistoryID, loginID, oldPassword, newPassword, updatedBy, updatedOn" +
					" from " + Table.PASSWORD_HISTORY+ " where loginID = ? order by Updatedon desc limit 1";
			return sql;
		}

	/*	@Override
		public String countTotalPassworPolicy(PasswordPolicyBean model) {
			String sql = "SELECT COUNT(*) FROM public."+Table.PASSWORD_POLICY + " WHERE 1 = 1 ";

			
				if(model.getStatus() != null && !model.getStatus().trim().equalsIgnoreCase("undefined") && !model.getStatus().trim().isEmpty()){
					sql += "AND status = '" + model.getStatus() + "' ";
				}
			
			if(model.getSearchText() != null && !model.getSearchText().trim().isEmpty()){

				sql += " AND (LOWER(name) like '%"+ model.getSearchText().trim().toLowerCase()+"%' OR" +
						" LOWER(description) like '%"+ model.getSearchText().trim().toLowerCase()+"%' OR" +
						" LOWER(passwordPolicyID) like '%"+ model.getSearchText().trim().toLowerCase()+"%')";
			} 

			return sql;	
		}*/
		
	/*	@Override
		public String savePasswordPolicy() {
			return "insert into public."+Table.PASSWORD_POLICY+
					" (passwordPolicyID, name, description, status, effectiveFrom, effectiveTo, policyJson, createdBy, createdOn)"+ 
					" values (?,?,?,?,?,?,?,?,?)";
		}
		
		@Override
		public String updatePasswordPolicy() {
			return "UPDATE public."+Table.PASSWORD_POLICY+
					" SET name = ?, description=?, status=?, effectiveFrom=?, " +
					" effectiveTo = ?, policyJson = ?, updatedBy = ?, updatedOn = ? " +
					" where passwordPolicyID = ? ";
		}*/
	/*	
		@Override
		public String updatePasswordPolicyStatus() {
			return "UPDATE public."+Table.PASSWORD_POLICY+
					" SET status = ?, " +
					" updatedBy = ?, updatedOn = ? " +
					" where passwordPolicyID = ? ";
		}
		
		@Override
		public String hasActivePolicy() {
			String sql = "SELECT COUNT(*) FROM " + Table.PASSWORD_POLICY + " where status = 'A' "; 
			return sql;
		}*/

		@Override
		public String getPasswordPolicieByID() {
			String sql = "SELECT passwordpolicyid, name, status, effectivefrom, effectiveto, description, policyjson, " +
					"createdby, createdon, updatedby, updatedOn " +
					"FROM PasswordPolicy WHERE passwordpolicyid = ?";
			return sql;
		}

		@Override
		public String getActivePasswordPolicy() {
			String sql = "SELECT passwordpolicyid, name, status, effectivefrom, effectiveto, description, policyjson, " +
					"createdby, createdon, updatedby, updatedOn " +
					"FROM " + Table.PASSWORD_POLICY + " WHERE status = ?";
			return sql;
		}

	/*	
		
		@Override
		public String countAllRole(RoleBean roleBean){
			String sql = "";
			
				sql = "SELECT count(*) FROM "+Table.ROLE +"WHERE 1 = 1";
			
			if(roleBean.getStatus() != null && !roleBean.getStatus().trim().equalsIgnoreCase("undefined") && !roleBean.getStatus().trim().isEmpty()){
				sql += "AND status = '" + roleBean.getStatus() + "' ";			
			}
			if(roleBean.getSearchText() != null && !roleBean.getSearchText().trim().isEmpty()){

				sql += " AND (LOWER(roleID) like '%"+ roleBean.getSearchText().trim().toLowerCase() + "%' OR" +
						" LOWER(roleDescription) like '%"+ roleBean.getSearchText().trim().toLowerCase() + "%' OR" +
						" LOWER(status) like '%"+ roleBean.getSearchText().trim().toLowerCase() + "%')";
			}
			return sql;
		}
		
		@Override
		public String getAllTopMenu(){
			return "select t.menuresourceid, l.menuresourceid  from "+Table.TOPMENU+" t, "+Table.LEFTMENU+" l " +
					"where t.menuresourceid = l.topmenuid;";
		};
		
		@Override
		public String getAllRole(RoleBean roleBean){
			String sql = "";
			
			sql = "SELECT * FROM "+Table.ROLE +"WHERE 1 = 1";
			
			if(roleBean.getStatus() != null && !roleBean.getStatus().trim().equalsIgnoreCase("undefined") && !roleBean.getStatus().trim().isEmpty()){
				sql += "AND status = '" + roleBean.getStatus() + "' ";			
			}
			if(roleBean.getSearchText() != null && !roleBean.getSearchText().trim().isEmpty()){

				sql += " AND (LOWER(roleID) like '%"+ roleBean.getSearchText().trim().toLowerCase() + "%' OR" +
						" LOWER(roleDescription) like '%"+ roleBean.getSearchText().trim().toLowerCase() + "%' OR" +
						" LOWER(status) like '%"+ roleBean.getSearchText().trim().toLowerCase() + "%')";
			}
			sql += " order by roleID LIMIT '" + roleBean.getLimit() + "' OFFSET '" + roleBean.getOffset()+"'";

			return sql;
		}*/

		@Override
		public String insertLogInTrailSql() {
			return "insert into "+Table.LOGINTRAIL+
					" (OID, loginID, roleID, signinDate, machineIP, loginStatus)"+ 
					" values (?,?,?,?,?,?)";
		}
}

