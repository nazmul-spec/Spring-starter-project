package net.myapp.springsecurity.dal.type;

public enum RoleType {
	SA("SA"), 
	Admin("Admin"), 
	AdminMaker("Admin.Maker"), 
	AdminApprover("Admin.Approver"), 
	Agent("Agent"), 
	AgencyStaffLevell("AgencyStaff.Levell"), 
	AgencyStaffLevel2("AgencyStaff.Level2"),
	AgencyStaffLevel3("AgencyStaff.Level3"),
	AgentManager("Agent.Manager"),
	BranchOfficerMaker("Branch.OfficerMaker"),
	BranchOfficerChecker("Branch.OfficerChecker"),
	BranchOfficerApprover("Branch.OfficerApprover"),
	BranchManager("Branch.Manager"),
	SDChecker("SD.Checker"),
	ABDSystemChecker("ABD.SYS.Checker"),
	ABDSystemMaker("ABD.SYS.Maker"),
	ABDChecker("ABD.Checker"),
	ABDMaker("ABD.Maker");

	
	private String value;

	private RoleType(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
