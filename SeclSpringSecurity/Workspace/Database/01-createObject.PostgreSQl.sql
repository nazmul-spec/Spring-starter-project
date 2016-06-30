/*connect as csbplatform and create the following tables*/

/*drop objects if existing*/

/*Utility and Charges Group*/
drop table if exists DailyRawLog;
drop table if exists DailyAdvanceRaw;
drop table if exists DailyAdvanceRaw;
drop view if exists View_AccountBalanceHistory;
drop table if exists AccountBalanceHistory;
drop table if exists CalendarDetails;
drop table if exists Calendar;
drop table if exists Holiday;
drop table if exists PasswordHistory;
drop table if exists PasswordPolicy;
drop table if exists ChargeModelItem;
drop table if exists ChargeModelDef;
drop table if exists SegmentItem;
drop table if exists SegmentDef;
drop table if exists ChargeModel;

drop table if exists TagLink;
drop table if exists TagDictionary;

/*Service Group*/
drop table if exists ChequeDetail;
drop table if exists ChequeCollection;
drop table if exists Remittance;
drop table if exists BillCollection;
drop table if exists ZoneAgent;
drop table if exists ZoneBranch;
drop table if exists CompanyZone;
drop table if exists UtilityCompany;
drop table if exists BillType;

/*Log Group*/
drop table if exists AccountHistory;
drop table if exists AccountClosingLog;
drop table if exists SMSLog;
drop table if exists TransLog;
drop table if exists ClientResponseLog;
drop table if exists ClientRequestLog;
drop table if exists ResponseLog;
drop table if exists RequestLog;
drop table if exists CustomerQRCardLog;
drop table if exists PasswordResetLog;
drop table if exists FingerPrintLog;
drop table if exists AuditLog;
drop table if exists LoginTrail;

/*Customet and Account Group*/
drop table if exists CBSAccount;
drop table if exists SignatoryInfo;
drop table if exists CustomerAccount;
drop table if exists Account;
drop table if exists Customer;
drop table if exists FingerPrint;
drop table if exists CustomerQRCard;

/*Agent and Agent Outlet Group*/
drop table if exists AgentServiceStaff;
drop table if exists ServiceTerminal;
drop table if exists AgentWithdrawalRequest;
drop table if exists AgentDepositRequest;
drop table if exists DSTOutlet;
drop table if exists DirectSalesTeam;
drop table if exists dasummarybyoutlet;
drop table if exists ServicePoint;
drop table if exists OutletZone;
drop table if exists OutletArea;
drop table if exists ProductAccTransProfile;
drop table if exists AccountTransactionProfile;
drop table if exists OutletTransactionProfile;
drop table if exists AgentAccount;
drop table if exists Agent;
drop table if exists AgentCategory;


/*Bank, Branch information Group*/
drop table if exists Branch;
drop table if exists Bank;

/*User login info and access role Group*/
drop table if exists Login;
drop table if exists Role;
drop table if exists LeftMenu;
drop table if exists TopMenu;

/*Master data Group*/

drop table if exists Product;
drop table if exists DDLMetaData;
drop table if exists MetaProperty;
drop table if exists GLMasterData;

/*MIS Group*/
drop table if exists DailyRawLog;
drop table if exists DailyAdvanceRaw;
drop table if exists DailyDepositRaw;
commit;

/*
MetaProperty is the table for storing all configuration data be it a value or a list. A property is identified by propertyID
propertyID									: Key for the property
valueJSON									: Can be an arbitrary JSON string, the actual representation is defined by the property itself and it is free form
											: ["Gender", "Designation", "AppointmentType", "WorkingStatus", "ApprovedPostType", "ProgramLevel"]
description									: Description of Value JSON, should contain representation note for the property
createdBy									: who (which login) created the record
createdOn									: when the record was created
updatedBy									: who (which login) last updated the record
updatedOn									: when the record was last updated
*/
create table 								MetaProperty
(
propertyID									varchar(64) 							not null,
valueJSON									text 									not null,
description									text,
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_MetaProperty 							primary key 	(propertyID)
);

/*
MetaProperty is the table for storing all configuration data be it a value or a list. A property is identified by propertyID
propertyID									: Key for the DDLMetaData
valueJSON									: Can be an arbitrary JSON string, the actual representation is defined by the property itself and it is free form
											: ["Gender", "Designation", "AppointmentType", "WorkingStatus", "ApprovedPostType", "ProgramLevel"]
description									: Description of Value JSON, should contain representation note for the property
*/
create table 								DDLMetaData
(
ddlMetaDataID								varchar(64) 							not null,
ddlKey										varchar(128) 							not null,
valueJSON									text 									not null,
status										varchar(8),
description									text,
constraint 									p_DDLMetaData							primary key 	(ddlMetaDataID)
);
/*
menuResourceID 								: Resource ID for this item from which the actual menutext will come
menuDefaulttext 							: If resource is not found for the language, what should be the menutext
menuSequence 								: Ordering sequence of the item from left to right
*/
create table 								TopMenu
(
topMenuResourceID							varchar(64) 							not null,
menuDefaulttext								varchar(32) 							not null,
menuSequence								numeric(4) 								not null,
constraint 									p_TopMenu 								primary key 	(topMenuResourceID)
);

/*
menuResourceID 								: Resource ID for this item from which the actual menutext will come
topMenuID 									: Under which TopMenu this left menu is
menuDefaulttext 							: If resource is not found for the language, what should be the menutext
menuSequence 								: Ordering sequence of the item from top to down
*/
create table 								LeftMenu
(
leftMenuResourceID							varchar(64) 							not null,
topMenuID									varchar(64) 							not null,
menuDefaulttext								varchar(256) 							not null,
menuSequence								numeric(4) 								not null,
constraint 									f_topMenuID_LeftMenu 					foreign key 	(topMenuID)
																					references 		TopMenu(topMenuResourceID),
constraint 									p_LeftMenu 								primary key 	(leftMenuResourceID)
);

/*
This table to use to store user role definition of system
roleID  									: a User role to be indentified by roleID
roleDescription 							: Description of Role and how whats roles to be played with the system
status										: Role status with system. i.e. Maker, Checker, Approver, Active, Inactive (A/I/BM/BC/BA)
makerID										: Who create role
checkerID									: Who checked role
approverID									: Who approved role
rejectionCause								: 
menuJSON 									: Accessible menus for a role which to be used in Web application only. i.e.[{"topmenuid" : "Security_TopMenu", "leftmenuids" : ["Users_Security_Security"]}]

*/
create table 								Role
(
roleID 										varchar(64) 							not null,
roleDescription 							text		 							not null,
status 										varchar(8),
menuJSON 									text,
makerID 									varchar(32),
checkerID 									varchar(32),
approverID 									varchar(32),
rejectionCause 								varchar(1024),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_Role 									primary key 	(roleID)
);

/*
This table to be used to store user Login information.
loginID										: A system user to be identified a Login ID
password									: A Hex code password to be used system Authentication
email										: User Email Address[Mandetory]
mobileNo									: User Mobile number[Optional]
bankID										: User Associated Bank[Optional]
branchID									: User Associated Branch[Optional]
status										: User status with system. i.e. Active, Inactive (A/I)
resetRequired								:
roleJSON 									: User Role with system. A user can perfom multiple Role in system. i.e.["Role1", "Role2", "RoleN"]
blockTime									:
blockStatus									:
rejectionCause								:
*/
create table 								Login
(
loginID										varchar(64) 							not null,
password 									varchar(128) 							not null,
email 										varchar(256),
mobileNo									varchar(64),
bankID										varchar(64),
branchID									varchar(64),
status										varchar(8)								not null,
resetRequired								varchar(2)								not null,
roleJSON									varchar(1024),
blockTime									timestamp,
blockStatus									varchar(8),
rejectionCause								varchar(256),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_Login 								primary key 	(loginID)
);

/*
User Access Trail Information
loginID										: Logged in User ID
roleID										: Logged in User Role ID
signinDate									: Sign in DateTime
signoutDate									: Sign out DateTime
machineIP									: User Machine IP Address
loginStatus									: OK/Failed/Signout
*/
create table 								LoginTrail
(
OID											varchar(256) 							not null,
loginID 									varchar(64) 							not null,
roleID										varchar(64),
signinDate									timestamp,
signoutDate									timestamp,
machineIP									varchar(32),
loginStatus									varchar(8),
constraint 									p_LoginTrail							primary key 	(OID)
);

/*
Associated Bank information to be stored here
bankID										: A bank associated with system to be identified by bankID
bankName									: A bank name associated with system
status										: Bank current Association to be indicated by its Status. i.e. Active, Inactive (A/I)
*/
create table 								Bank
(
bankID										varchar(64) 							not null,
bankName 									varchar(128) 							not null,
status										varchar(8),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,

constraint 									p_Bank									primary key 	(bankID)
);

/*
Branchs information of associated banks[If a assocaited with Inactive Status its all branches to be Inactive]
branchID									: A associated bank branch  with system to be identified by branchID
bankID										: bankID indicated respective Bank which associated branch
branchName									: A bank name associated with system
address										:				
telephoneNo									:			
telephoneNo2								:		
email									    :			
nameOfManager 								:		
telephoneNoOfManager						:	
geoLocationLat								:		
geoLocationLong								:	
accountNoForChargeModel						:
status										: Active, Inactive (A/I)
*/
create table 								Branch
(
branchID									varchar(64) 							not null,
bankID										varchar(64) 							not null,
branchName 									varchar(128) 							not null,
address										text,
telephoneNo									varchar(64),
telephoneNo2								varchar(64),
email										varchar(128),
nameOfManager 								varchar(64),
telephoneNoOfManager						varchar(64),
geoLocationLat								numeric,
geoLocationLong								numeric,
accountNoForChargeModel						varchar(128),
status										varchar(8),
rejectionCause								varchar(156),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									f_bankID_Branch							foreign key 	(bankID)
																					references 		Bank(bankID),
constraint 									p_Branch								primary key 	(branchID)
);

/*
To be used to Store Bank Product Related information
productID 									: Bank Product ID
productName 								: Bank Product Name like Saving, Current, FDR, DPS etc...
productType 								:											
productDefinition	 						:
status	 									:			
rejectionCause	 							:	
makerID		 								:		
checkerID	 								:		
approverID	 								:		
*/
create table 								Product
(
productID									varchar(64) 							not null,
productName									varchar(128) 							not null,
productType									varchar(16),
productDefinition							text,
status										varchar(8),
rejectionCause								varchar(512),
makerID										varchar(32),
checkerID									varchar(32),
approverID									varchar(32),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_Product								primary key 	(productID)
);

/*
This table to be used to account holder scanned finger print.
OID		 									:
accountID 									: Customer Account ID
customerID									:
identifiyerID								: agent/subagent/branchOfficer/Customer IdentificationNumber
Ri											:
Rm											:
Rt											:
Rr											:
Rp											:
Li											:
Lm											:
Lt											:
Lr											:
Lp											:
*/
create table 								FingerPrint
(
OID 										varchar(64),
accountID 									varchar(64),
customerID									varchar(64),
identifiyerID								varchar(64) 							not null,
Ri 											text			 						not null 		default 'NOT_SCANNED',
Rm 											text			 						not null 		default 'NOT_SCANNED',
Rt 											text			 						not null 		default 'NOT_SCANNED',
Rr 											text			 						not null 		default 'NOT_SCANNED',
Rp 											text			 						not null 		default 'NOT_SCANNED',
Li 											text			 						not null 		default 'NOT_SCANNED',
Lm 											text			 						not null 		default 'NOT_SCANNED',
Lt											text			 						not null 		default 'NOT_SCANNED',
Lr 											text			 						not null 		default 'NOT_SCANNED',
Lp											text			 						not null 		default 'NOT_SCANNED',
defaultFP	 								varchar(4) 								not null 		default 'Rt',
roleID										varchar(64),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_FingerPrint							primary key		(OID)
);

/*
This table to be used to account holder scanned finger print.
OID											: 			
fingerPrintID								: 	
identifiyerID								:
accountID 									: Customer Account ID
changeFromFinger							:
changeToFinger 								:
changeReason 								:
applyDate 									:
changeDate 									:
status										:
*/
create table 								FingerPrintLog
(
OID 										varchar(64) 							not null,
fingerPrintID 								varchar(64) 							not null,
identifiyerID								varchar(64),
accountID 									varchar(64),
changeFromFinger 							varchar(1024) 							not null,
changeToFinger 								varchar(1024) 							not null,
changeReason 								varchar(256) 							not null,
applyDate 									timestamp 								not null,
changeDate 									timestamp,
status 										varchar(8),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									f_fingerPrintID_FingerPrintLog			foreign key 	(fingerPrintID)
																					references 		FingerPrint(OID),
constraint 									p_FingerPrintLog						primary key 	(OID)
);

/*
This table to be used to store associated Outlet Area information with system.
outletAreaID								: An outlet area associated with System to be Identified by agentID
name										: name of category
description									: description of category
status										:			
rejectionCause								:	
makerID										:	
checkerID									:		
approverID									:		
*/
create table								OutletArea
(
outletAreaID								varchar(64)								not null,
name										varchar(128) 							not null,
description									text,
status										varchar(8),
rejectionCause								varchar(512),			
makerID										varchar(32),			
checkerID									varchar(32),			
approverID									varchar(32),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_OutletArea							primary key 	(outletAreaID)
);

/*
This table to be used to store associated Outlet zone information with system.
outletZoneID								: An outlet zone associated with System to be Identified by agentID
name										: name of category
description									: description of category
outletAreaID								:
*/
create table								OutletZone
(
outletZoneID								varchar(64)								not null,
name										varchar(128) 							not null,
description									text,
outletAreaID								varchar(64)								not null,
status										varchar(8),
makerID										varchar(32),			
checkerID									varchar(32),			
approverID									varchar(32),
rejectionCause								varchar(512),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									f_outletAreaID_OutletZone				foreign key 	(outletAreaID)
																					references 		OutletArea(outletAreaID),
constraint 									p_OutletZone							primary key 	(outletZoneID)
);

/*
This table to be used to store associated Agent Category information with system.
agentCatID 									: An agent category associated with System to be Identified by agentID
name										: name of category
description									: description of category
*/
create table 								AgentCategory
(
agentCatID									varchar(64) 							not null,
name										varchar(128) 							not null,
description									text,
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_AgentCategory							primary key 	(agentCatID)
);

/*
This table to be used to store associated Agent information with system. An Agent can perform its operation from multiple bank
and with a single branch of respective bank
agentID 									: An agent associated with System to be Identified by agentID
loginID										: loginID indicates its Login information with system
bankID										: bankID indicates an agent is associated with this bank
branchID									: branchID indicates an agent is associated respective bank branch
parentAgentID								:
agentType									: Agent Type : Agetn(A), Sub-agetn(SA)
agentName									: Name of Agent
kycJson										:
bankAccountNo								:
status										: Association status with system i. e. Active(A), Inactive(I), Draft(DR), Delete(DE), Bank Make(BM), Bank Approved(BA), Bank Rejected(BR), Cancle(C)
rejectionCause								: 
roleID										:
agentCatID									:
tagLibID									:
*/

create table 								Agent
(
agentID										varchar(64) 							not null,
loginID										varchar(64) 							not null,
password 									varchar(128) 							not null,
bankID										varchar(64),
branchID									varchar(64),
parentAgentID								varchar(64),
agentType									varchar(16),
agentName 									varchar(128) 							not null,
kycJson										text									not null,
bankAccountNo								varchar(64),
status										varchar(8)							not null,
rejectionCause								varchar(512),
roleID										varchar(64) 							not null,
agentCatID									varchar(64)								not null,
tagLibID									varchar(64),
makerID										varchar(32),
checkerID									varchar(32),
approverID									varchar(32),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									c_status_Agent							check 			(status = 'I' or status = 'A' or status = 'AS' or status = 'BM' or status = 'BC' or status = 'BA' or status = 'BR' or status = 'C' or status = 'DR' or status = 'DE' or status = 'ME'),
constraint 									c_agentType_Agent						check			(agentType = 'SA' or agentType = 'A'or agentType = 'BR'),
constraint 									u_loginID_Agent							unique			(loginID),
constraint 									u_bankAccountNo_Agent					unique			(bankAccountNo),
constraint 									f_bankID_Agent							foreign key 	(bankID)
																					references 		Bank(bankID),
constraint 									f_branchID_Agent						foreign key 	(branchID)
																					references 		Branch(branchID),
constraint 									p_Agent									primary key 	(agentID)
);

/*
This table to be used to store associated Agent Account information with system.
agentAccID 									: An agent account associated with System to be Identified by agentID
accountNo									: Agent bank account number
accountType									: Type of account
agentID										: foreign key from agent table
*/
create table 								AgentAccount
(
agentAccID									varchar(64) 							not null,
accountNo									varchar(128) 							not null,
accountType									varchar(64),
agentID										varchar(64)							not null,
constraint 									f_agentID_AgentAccount					foreign key 	(agentID)
																					references 		Agent(agentID),
constraint 									p_AgentAccount							primary key 	(agentAccID)
);

/*
This table to be used to store associated Account Transaction Profile information with system.
accountTpID	 								: An transaction profile associated with System to be Identified by accountTpID
name										: Name of transaction profile 
tpType										: Type	 of transaction profile 
description									: description of transaction profile
maxDpPerTrn									: maximum deposit per transaction
maxDpPerDay									: maximum deposit per day
maxDpPerWeek								: maximum deposit per week
maxDpPerMonth								: maximum deposit per month
maxWdPerTrn									: maximum withdrawal per transaction
maxWdPerDay									: maximum withdrawal per day
maxWdpPerWeek								: maximum withdrawal per week
maxWdPerMonth								: maximum withdrawal per month
maxFdPerTrn								    : maximum Fund transfer per day
maxFdPerWeek								: maximum Fund transfer per week
maxFdPerMonth								: maximum Fund transfer per month
maxNoDpPerDay								: maximum number of deposit per day
maxNoDpPerWeek								: maximum number of deposit per week
maxNoDpPerMonth								: maximum number of deposit per month
maxNoWdPerDay								: maximum number of withdrawal per day
maxNoWdpPerWeek								: maximum number of withdrawal per week
maxNoWdPerMonth								: maximum number of withdrawal per month
maxNoFdPerDay								: maximum number of Fund transfer per day
maxNoFdpPerWeek								: maximum number of Fund transfer per week
maxNoFdPerMonth								: maximum number of Fund transfer per month
enabledMaxDpPerTrn							: Is enabled maximum deposit per transaction
enabledMaxDpPerDay							: Is enabled maximum deposit per day
enabledMaxDpPerWeek							: Is enabled maximum deposit per week
enabledMaxDpPerMonth						: Is enabled maximum deposit per month
enabledMxWdPerTrn							: Is enabled maximum withdrawal per transaction
enabledMaxWdPerDay							: Is enabled maximum withdrawal per day
enabledMaxWdpPerWeek						: Is enabled maximum withdrawal per week
enabledMaxWdPerMonth						: Is enabled maximum withdrawal per month
enabledMxFdPerTrn							: Is enabled maximum fund transfer per transaction
enabledMaxFdPerDay							: Is enabled fund transfer per day
enabledMaxFdPerWeek							: Is enabled fund transfer per week
enabledMaxFdPerMonth						: Is enabled fund transfer per month
enabledMaxNoDpPerDay						: Is enabled number of deposit per day
enabledMaxNoDpPerWeek						: Is enabled number of deposit per week
enabledMaxNoDpPerMonth						: Is enabled number of deposit per month
enabledMaxNoWdPerDay						: Is enabled number of withdrawal per day
enabledMaxNoWdpPerWeek						: Is enabled number of withdrawal per week
enabledMaxNoWdPerMonth						: Is enabled number of withdrawal per month
enabledMaxNoFdPerDay						: Is enabled number of fund transfer per day
enabledMaxNoFdpPerWeek						: Is enabled number of fund transfer per week
enabledMaxNoFdPerMonth						: Is enabled number of fund transfer per month
rejectionCause								: Rejection Cause
status										: Status of TPG Active(A), Inactive(I), Make(BM), Approve(BA)
tpType										: 
									default(DF)		: default transaction profile. Only one default TP can be created. 
													If any product or service or agent dose not associated with any TP, 
													that will be associated with by default default TP
									Specific (SP)	: This type of TP need to define to specific Product or Service or Agent
									not defined(ND)	: When we don't need any limitation for transaction. Such as Foreign Remittance. On that time check tpType. 
													If tpgType is ND then no need to check others parameter.
block....									: Transaction will block (B) or alert (A)
									Block means can't do transaction and Alert means can do transaction but show alert message.
*/
CREATE TABLE								AccountTransactionProfile
(
accountTpID									VARCHAR(64) 						NOT NULL,
name										VARCHAR(128) 						NOT NULL,
tpType										VARCHAR(8),
description									TEXT								NOT NULL         default      ' ',
maxDpPerTrn									NUMERIC(20,6)                       NOT NULL         default       0,
maxDpPerDay									NUMERIC(20,6)                       NOT NULL         default       0,
maxDpPerWeek								NUMERIC(20,6)                       NOT NULL         default       0,
maxDpPerMonth								NUMERIC(20,6)                       NOT NULL         default       0,
maxNoDpPerDay								NUMERIC(20)                         NOT NULL         default       0,
maxNoDpPerWeek								NUMERIC(20)                         NOT NULL         default       0,
maxNoDpPerMonth								NUMERIC(20)                         NOT NULL         default       0,
maxWdPerTrn									NUMERIC(20,6)                       NOT NULL         default       0,
maxWdPerDay									NUMERIC(20,6)                       NOT NULL         default       0,
maxWdPerWeek								NUMERIC(20,6)                       NOT NULL         default       0,
maxWdPerMonth								NUMERIC(20,6)                       NOT NULL         default       0,
maxNoWdPerDay								NUMERIC(20)                         NOT NULL         default       0,
maxNoWdPerWeek								NUMERIC(20)                         NOT NULL         default       0,
maxNoWdPerMonth								NUMERIC(20)                         NOT NULL         default       0,
maxFdPerTrn									NUMERIC(20,6)                       NOT NULL         default       0,
maxFdPerDay									NUMERIC(20,6)                       NOT NULL         default       0,
maxFdPerWeek								NUMERIC(20,6)                       NOT NULL         default       0,
maxFdPerMonth								NUMERIC(20,6)                       NOT NULL         default       0,
maxNoFdPerDay								NUMERIC(20)                         NOT NULL         default       0,
maxNoFdPerWeek								NUMERIC(20)                         NOT NULL         default       0,
maxNoFdPerMonth								NUMERIC(20)                         NOT NULL         default       0,
enabledMaxDpPerTrn							VARCHAR(2),
enabledMaxDpPerDay							VARCHAR(2),
enabledMaxDpPerWeek							VARCHAR(2),
enabledMaxDpPerMonth						VARCHAR(2),
enabledMaxNoDpPerDay						VARCHAR(2),
enabledMaxNoDpPerWeek						VARCHAR(2),
enabledMaxNoDpPerMonth						VARCHAR(2),
enabledMaxWdPerTrn							VARCHAR(2),
enabledMaxWdPerDay							VARCHAR(2),
enabledMaxWdPerWeek							VARCHAR(2),
enabledMaxWdPerMonth						VARCHAR(2),
enabledMaxNoWdPerDay						VARCHAR(2),
enabledMaxNoWdPerWeek						VARCHAR(2),
enabledMaxNoWdPerMonth						VARCHAR(2),
enabledMaxFdPerTrn							VARCHAR(2),
enabledMaxFdPerDay							VARCHAR(2),
enabledMaxFdPerWeek							VARCHAR(2),
enabledMaxFdPerMonth						VARCHAR(2),
enabledMaxNoFdPerDay						VARCHAR(2),
enabledMaxNoFdPerWeek						VARCHAR(2),
enabledMaxNoFdPerMonth						VARCHAR(2),
blockMaxDpPerTrn							VARCHAR(2),
blockMaxDpPerDay							VARCHAR(2),
blockMaxDpPerWeek							VARCHAR(2),
blockMaxDpPerMonth							VARCHAR(2),
blockMaxNoDpPerDay							VARCHAR(2),
blockMaxNoDpPerWeek							VARCHAR(2),
blockMaxNoDpPerMonth						VARCHAR(2),
blockMxWdPerTrn								VARCHAR(2),
blockMaxWdPerDay							VARCHAR(2),
blockMaxWdPerWeek							VARCHAR(2),
blockMaxWdPerMonth							VARCHAR(2),
blockMaxNoWdPerDay							VARCHAR(2),
blockMaxNoWdPerWeek							VARCHAR(2),
blockMaxNoWdPerMonth						VARCHAR(2),
blockMaxFdPerTrn							VARCHAR(2),
blockMaxFdPerDay							VARCHAR(2),
blockMaxFdPerWeek							VARCHAR(2),
blockMaxFdPerMonth							VARCHAR(2),
blockMaxNoFdPerDay							VARCHAR(2),
blockMaxNoFdPerWeek							VARCHAR(2),
blockMaxNoFdPerMonth						VARCHAR(2),
rejectionCause								text,
status										VARCHAR(8),
createdBy 									VARCHAR(64) 							NOT NULL,
createdOn									TIMESTAMP 								NOT NULL,
updatedBy 									VARCHAR(64) 							NULL,
updatedOn 									TIMESTAMP 								NULL,
CONSTRAINT 									p_AccountTransactionProfile				PRIMARY KEY 	(accountTpID)
);

/*
This table to be used to store associated Outlet Transaction Profile information with system.
outletTpID	 								: An transaction profile associated with System to be Identified by outletTpID
tpType										: tpType of transaction profile 
name										: Name of transaction profile 
description									: description of transaction profile
maxDpPerTrn									: maximum deposit per transaction
maxDpPerDay									: maximum deposit per day
maxDpPerWeek								: maximum deposit per week
maxDpPerMonth								: maximum deposit per month
maxWdPerTrn									: maximum withdrawal per transaction
maxWdPerDay									: maximum withdrawal per day
maxWdpPerWeek								: maximum withdrawal per week
maxWdPerMonth								: maximum withdrawal per month
maxTrnPerDay								: maximum transaction per day
maxTrnPerWeek								: maximum transaction per week
maxTrnPerMonth								: maximum transaction per month
maxNoDpPerDay								: maximum number of deposit per day
maxNoDpPerWeek								: maximum number of deposit per week
maxNoDpPerMonth								: maximum number of deposit per month
maxNoWdPerDay								: maximum number of withdrawal per day
maxNoWdpPerWeek								: maximum number of withdrawal per week
maxNoWdPerMonth								: maximum number of withdrawal per month
enabledMaxDpPerTrn							: Is enabled maximum deposit per transaction
enabledMaxDpPerDay							: Is enabled maximum deposit per day
enabledMaxDpPerWeek							: Is enabled maximum deposit per week
enabledMaxDpPerMonth						: Is enabled maximum deposit per month
enabledMxWdPerTrn							: Is enabled maximum withdrawal per transaction
enabledMaxWdPerDay							: Is enabled maximum withdrawal per day
enabledMaxWdpPerWeek						: Is enabled maximum withdrawal per week
enabledMaxWdPerMonth						: Is enabled maximum withdrawal per month
enabledMaxNoWdPerDay						: Is enabled number of withdrawal per day
enabledMaxNoWdpPerWeek						: Is enabled number of withdrawal per week
enabledMaxNoWdPerMonth						: Is enabled number of withdrawal per month
enabledMaxFdPerTrn							: Is enabled number of transaction per day
enabledMaxFdPerWeek						: Is enabled number of transaction per week
enabledMaxFdPerMonth						: Is enabled number of transaction per month
enabledMaxNoFdPerDay						: Is enabled number of deposit per day
enabledMaxNoFdPerWeek						: Is enabled number of deposit per week
enabledMaxNoFdPerMonth						: Is enabled number of deposit per month
rejectionCause								: Rejection Cause
status										: Status of TPG Active(A), Inactive(I), Make(BM), Approve(BA)
tpType										: 
									default(DF)		: default transaction profile. Only one default TPG can be created. 
													If any product or service or agent dose not associated with any TP, 
													that will be associated with by default default TP
									Specific (SP)	: This type of TPG need to define to specific Product or Service or Agent
									not defined(ND)	: When we don't need any limitation for transaction. Such as Foreign Remittance. On that time check tpType. 
													If tpgType is ND then no need to check others parameter.
block....									: Transaction will block (B) or alert (A)
									Block means can't do transaction and Alert means can do transaction but show alert message.
*/
CREATE TABLE								OutletTransactionProfile
(
outletTpID									VARCHAR(64) 						NOT NULL,
name										VARCHAR(128) 						NOT NULL,
tpType										VARCHAR(8),
description									TEXT								NOT NULL         default      ' ',
maxDpPerTrn									NUMERIC(20,6)                       NOT NULL         default       0,
maxDpPerDay									NUMERIC(20,6)                       NOT NULL         default       0,
maxDpPerWeek								NUMERIC(20,6)                       NOT NULL         default       0,
maxDpPerMonth								NUMERIC(20,6)                       NOT NULL         default       0,
maxWdPerTrn									NUMERIC(20,6)                       NOT NULL         default       0,
maxWdPerDay									NUMERIC(20,6)                       NOT NULL         default       0,
maxWdPerWeek								NUMERIC(20,6)                       NOT NULL         default       0,
maxWdPerMonth								NUMERIC(20,6)                       NOT NULL         default       0,
maxFdPerTrn									NUMERIC(20,6)                       NOT NULL         default       0,
maxFdPerDay									NUMERIC(20,6)                       NOT NULL         default       0,
maxFdPerWeek								NUMERIC(20,6)                       NOT NULL         default       0,
maxFdPerMonth								NUMERIC(20,6)                       NOT NULL         default       0,
maxNoFdPerDay								NUMERIC(20)                         NOT NULL         default       0,
maxNoFdPerWeek								NUMERIC(20)                         NOT NULL         default       0,
maxNoFdPerMonth								NUMERIC(20)                         NOT NULL         default       0,
minBalance									NUMERIC(20,6)                       NOT NULL         default       0,
maxBalance									NUMERIC(20,6)                       NOT NULL         default       0,
enabledMaxDpPerTrn							VARCHAR(2),
enabledMaxDpPerDay							VARCHAR(2),
enabledMaxDpPerWeek							VARCHAR(2),
enabledMaxDpPerMonth						VARCHAR(2),
enabledMaxWdPerTrn							VARCHAR(2),
enabledMaxWdPerDay							VARCHAR(2),
enabledMaxWdPerWeek							VARCHAR(2),
enabledMaxWdPerMonth						VARCHAR(2),
enabledMaxFdPerTrn							VARCHAR(2),
enabledMaxFdPerDay							VARCHAR(2),
enabledMaxFdPerWeek							VARCHAR(2),
enabledMaxFdPerMonth						VARCHAR(2),
enabledMaxNoFdPerDay						VARCHAR(2),
enabledMaxNoFdPerWeek						VARCHAR(2),
enabledMaxNoFdPerMonth						VARCHAR(2),
enabledMinBalance							VARCHAR(2),
enabledMaxBalance							VARCHAR(2),
blockMaxDpPerTrn							VARCHAR(2),
blockMaxDpPerDay							VARCHAR(2),
blockMaxDpPerWeek							VARCHAR(2),
blockMaxDpPerMonth							VARCHAR(2),
blockMxWdPerTrn								VARCHAR(2),
blockMaxWdPerDay							VARCHAR(2),
blockMaxWdPerWeek							VARCHAR(2),
blockMaxWdPerMonth							VARCHAR(2),
blockMaxFdPerTrn							VARCHAR(2),
blockMaxFdPerDay							VARCHAR(2),
blockMaxFdPerWeek							VARCHAR(2),
blockMaxFdPerMonth							VARCHAR(2),
blockMaxNoFdPerDay							VARCHAR(2),
blockMaxNoFdPerWeek							VARCHAR(2),
blockMaxNoFdPerMonth						VARCHAR(2),
blockMinBalance								VARCHAR(2),
blockMaxBalance								VARCHAR(2),
rejectionCause								text,
status										VARCHAR(8),
createdBy 									VARCHAR(64) 							NOT NULL,
createdOn									TIMESTAMP 								NOT NULL,
updatedBy 									VARCHAR(64) 							NULL,
updatedOn 									TIMESTAMP 								NULL,
CONSTRAINT 									p_OutletTransactionProfile				PRIMARY KEY 	(outletTpID)
);

/*
Here ProductAccTransProfile detail to be stored of end client
productAccTpID 								: An Product AccountTransaction profile associated with System to be Identified by productAccTpID
accountTpID 								: to handle a AccountTransaction profile with multiple product
productID 									: to handle a AccountTransaction profile with multiple product
*/
create table 								ProductAccTransProfile
(
productAccTpID 								varchar(64) 							not null,
accountTpID									VARCHAR(64) 							not null,
productID									varchar(64) 							not null,
createdBy 									VARCHAR(64) 							NOT NULL,
createdOn									TIMESTAMP 								NOT NULL,
updatedBy 									VARCHAR(64) 							NULL,
updatedOn 									TIMESTAMP 								NULL,
constraint 									f_productID_ProductTPG					foreign key 	(productID)
																					references 		Product(productID),
constraint 									f_accountTpID_ProductTP					foreign key 	(accountTpID)
																					references 		AccountTransactionProfile(accountTpID),
constraint 									p_ProductAccTransProfile				PRIMARY key 	(productAccTpID)																					
);

/*
Associated Bank information to be stored here
servicePointID								: A ServicePoint associated with system to be identified by servicePointID
servicePointType							: A MasterAgent/SubAgent/Branch associated with system
bankAccountNo								: Core bankAccountNo
addressLine2								:
city										:
postalCode									:
district									:
division									:
thana										:
telephone1									:
telephone2									:
emailAddress								:
longitude									:
latitude									:
photopath									:
photographs									:
applyDate									:
openingDate									:
servicePointStatus						    : I=Inactive, A= Active, BM= Bank Make, BC= Bank Checked, BA= Bank Approved, BR= Bank Reject, C= Cancel
tin											:
tradeLicence  								:
statusNote									:
rejectionCause								:
agentID										:
outletZoneID								:

*/
create table 								ServicePoint
(
servicePointID								varchar(64) 							not null,
servicePointName							varchar(128) 							not null,
bankAccountNo								varchar(128)							not null,
addressLine2								text,
city										varchar(64),
postalCode									varchar(32),
district									varchar(64),
division									varchar(64),
thana										varchar(64),
telephone1									varchar(64),
telephone2									varchar(64),
emailAddress								varchar(128),
longitude									numeric(30,10),
latitude									numeric(30,10),
photopath									varchar(128),
photographs									varchar(128),
applyDate									timestamp  								not null,
openingDate									timestamp,
servicePointStatus							varchar(8)								not null,
tin											varchar(128),
tradeLicence  								varchar(128),
statusNote									varchar(256),
rejectionCause								varchar(512),
bankID										varchar(64) 							not null,
branchID									varchar(64) 							not null,
makerID										varchar(32),
checkerID									varchar(32),
approverID									varchar(32),
agentID										varchar(64)								not null,
outletZoneID								varchar(64)								not null,
outletTpID									varchar(64)								not null,
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									c_svcPointStatus_ServicePoint			check			(servicePointStatus = 'I' or servicePointStatus = 'A' or servicePointStatus = 'BS' or servicePointStatus = 'BM' or servicePointStatus = 'BC' or servicePointStatus = 'BA' or servicePointStatus = 'BR' or servicePointStatus = 'C' or servicePointStatus = 'SB' or servicePointStatus = 'ME'),
constraint 									f_agentID_ServicePoint					foreign key 	(agentID)
																					references 		Agent(agentID),
constraint 									f_outletZoneID_ServicePoint				foreign key 	(outletZoneID)
																					references 		OutletZone(outletZoneID),
constraint 									f_outletTpID_ServicePoint				foreign key 	(outletTpID)
																					references 		OutletTransactionProfile(outletTpID),
constraint 									f_bankID_ServicePoint					foreign key 	(bankID)
																					references 		Bank(bankID),
constraint 									f_branchID_ServicePoint					foreign key 	(branchID)
																					references 		Branch(branchID),
constraint 									p_ServicePoint							primary key 	(servicePointID)
);

/*
Associated Bank information to be stored here
serviceTerminalID							: A service Terminal associated with system to be identified by serviceTerminalID, Note: serviceTerminalID start from ST10000001
servicePointID								:
serviceClientDeviceAddress					: IMEI for sim based device, MAC for non sim based device
biometricDeviceAddress						: Like Finger Print Device
printerDeviceAddress						: Printer Device
cardDeviceAddress							:
serviceTerminalStatus						: I=Inactive, A= Active, BM= Bank Make, BC= Bank Checked, BA= Bank Approved, BR= Bank Reject, C= Cancel
*/
create table 								ServiceTerminal
(
serviceTerminalID							varchar(64) 							not null,
servicePointID								varchar(64) 							not null,
serviceClientDeviceAddress 					varchar(128) 							not null,
biometricDeviceAddress						varchar(128)							not null,
printerDeviceAddress						varchar(128) 							not null,
cardDeviceAddress							varchar(128) 							not null,
bankID										varchar(64) 							not null,
branchID									varchar(64) 							not null,
makerID										varchar(32),
checkerID									varchar(32),
approverID									varchar(32),
serviceTerminalStatus						varchar(8)								not null,
rejectionCause								varchar(512),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									c_svcTrmStatus_ServiceTerminal			check			(serviceTerminalStatus = 'I' or serviceTerminalStatus = 'A' or serviceTerminalStatus = 'BM' or serviceTerminalStatus = 'BC' or serviceTerminalStatus = 'BA' or serviceTerminalStatus = 'BR' or serviceTerminalStatus = 'C'  or serviceTerminalStatus = 'ME'),
constraint 									u_svcDevAddr_ServiceTerminal			unique			(serviceClientDeviceAddress),
constraint 									u_bioDevAddr_ServiceTerminal			unique			(biometricDeviceAddress),
constraint 									u_prntDevAddr_ServiceTerminal			unique			(printerDeviceAddress),
constraint 									u_cardDevAddr_ServiceTerminal			unique			(cardDeviceAddress),
constraint 									f_bankID_ServiceTerminal				foreign key 	(bankID)
																					references 		Bank(bankID),
constraint 									f_branchID_ServiceTerminal				foreign key 	(branchID)
																					references 		Branch(branchID),
constraint 									f_svcPointID_ServiceTerminal			foreign key 	(servicePointID) 
																					references 		ServicePoint(servicePointID),
constraint 									p_ServiceTerminal						primary key 	(serviceTerminalID)
);

/*
This table to be used to store associated Agent information with system. An Agent can perform its operation from multiple bank
and with a single branch of respective bank
OID											:
agentID 									: An agent associated with System to be Identified by agentID
loginID										: loginID indicates its Login information with system
oldPassword 								:
newPassword 								:
bankID										: bankID indicates an agent is associated with this bank
branchID									: branchID indicates an agent is associated respec
resetStatus									: Association status with system i. e. Active(A), Inactive(I)
*/
create table 								PasswordResetLog
(
OID											varchar(64) 							not null,
loginID										varchar(128) 							not null,
oldPassword 								varchar(128) 							not null,
newPassword 								varchar(128) 							not null,
makerID										varchar(32),
checkerID									varchar(32),
approverID									varchar(32),
createdBy									varchar(32)								not null,
createdDate									timestamp								not null,
approvedDate								timestamp,
resetStatus									varchar(8)								not null,
constraint 									c_resetStatus_PasswordResetLog			check			(resetStatus = 'I' or resetStatus = 'A' or resetStatus = 'BM' or resetStatus = 'BC' or resetStatus = 'BA' or resetStatus = 'BR' or resetStatus = 'C'),
constraint 									p_PasswordResetLog						primary key 	(OID)
);

/*
Associated Agent Service Staff information to be stored here
assID										: A AgentServiceStaff associated with system to be identified by AgentServiceStaff. Note: assID start from AGS1000001
servicePointID								: Agent Owner place
agentStaffName								: Bank current Association to be indicated by its Status. i.e. Active, Inactive (A/I)
kycJson					 					:
loginID										:											
roleID										:											
agentID										:											
bankID										:											
branchID									:											
makerID										:											
checkerID									:											
approverID									:											
assStatus									:											
rejectionCause								:										
*/
create table 								AgentServiceStaff
(
OID											varchar(64) 							not null,
assID										varchar(64) 							not null,
servicePointID								varchar(64) 							not null,
agentStaffName								varchar(128) 							not null,
kycJson					 					text									not null,
loginID										varchar(128)							not null,
password									varchar(128)							not null,
roleID										varchar(64) 							not null,
agentID										varchar(64) 							not null,
bankID										varchar(64) 							not null,
branchID									varchar(64) 							not null,
makerID										varchar(32),
checkerID									varchar(32),
approverID									varchar(32),
assStatus									varchar(8)								not null,
rejectionCause								varchar(512),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									c_assStatus_AgentServiceStaff			check			(assStatus = 'I' or assStatus = 'A' or assStatus = 'BM' or assStatus = 'BC' or assStatus = 'BA' or assStatus = 'BR' or assStatus = 'C' or assStatus = 'ME'),
constraint 									u_loginID_AgentServiceStaff				unique			(loginID),
constraint 									f_bankID_AgentServiceStaff				foreign key 	(bankID)
																					references 		Bank(bankID),
constraint 									f_branchID_AgentServiceStaff			foreign key 	(branchID)
																					references 		Branch(branchID),
constraint 									f_agentID_AgentServiceStaff				foreign key 	(agentID)
																					references 		Agent(loginID),
constraint 									f_loginID_AgentServiceStaff				foreign key 	(loginID)
																					references 		Login(loginID),
constraint 									f_svcPointID_AgentServiceStaff			foreign key 	(servicePointID) 
																					references 		ServicePoint(servicePointID),
constraint 									p_AgentServiceStaff						primary key 	(assID)
);

/*
Associated Direct Sales Team information to be stored here
OID											: A DirectSalesTeam associated with system to be identified by OID.
kycJson					 					: set full information like name, father name, mother name, age, gender, age, address......
loginID										: system login ID. Note: Employee RM number	
bankID										: User bank ID 
branchID									: User branch ID 										
makerID										:											
checkerID									:											
approverID									:											
status										:											
rejectionCause								:										
*/
create table 								DirectSalesTeam
(
OID											varchar(64) 							not null,
name										varchar(128) 							not null,
loginID										varchar(128)							not null,
email 										varchar(256),
mobileNo									varchar(64)								not null,
photoPath									varchar(256),
bankID										varchar(64) 							not null,
branchID									varchar(64) 							not null,
makerID										varchar(32),
checkerID									varchar(32),
approverID									varchar(32),
status										varchar(8)								not null,
gender										varchar(8)								not null,
rejectionCause								varchar(512),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									c_status_DSalesTeam						check			(status = 'I' or status = 'A' or status = 'BM' or status = 'BC' or status = 'BA' or status = 'BR' or status = 'C' or status = 'ME'),
constraint 									u_loginID_DSalesTeam					unique			(loginID),
constraint 									f_bankID_DSalesTeam						foreign key 	(bankID)
																					references 		Bank(bankID),
constraint 									f_branchID_DSalesTeam					foreign key 	(branchID)
																					references 		Branch(branchID),
constraint 									f_loginID_DSalesTeam					foreign key 	(loginID)
																					references 		Login(loginID),
constraint 									p_DSalesTeam							primary key 	(OID)
);


/*
This table to be used to store associated Agent Account information with system.
dstOutletID 									: A DSTOutlet associated with system to be identified by dstOutletID.
OID												: DirectSalesTeam table uniqueID
dstRMNumber										: DirectSalesTeam table loginID. Note: RM number means DST employee ID
servicePointID									: Associated Service point for DST
*/
create table 								DSTOutlet
(
dstOutletID									varchar(64) 							not null,
OID											varchar(128) 							not null,
dstRMNumber									varchar(64),
servicePointID								varchar(64)								not null,
constraint 									f_OID_DSTOutlet							foreign key 	(OID)
																					references 		DirectSalesTeam(OID),
constraint 									f_RMNumber_DSTOutlet					foreign key 	(dstRMNumber)
																					references 		DirectSalesTeam(loginID),
constraint 									f_servicePointID_DSTOutlet				foreign key 	(servicePointID)
																					references 		ServicePoint(servicePointID),
constraint 									p_dstOutletID							primary key 	(dstOutletID)
);
/*
Here Customer detail to be stored
customerID									: Auto generated
customerName
customerType								: IPC(Individual Private Customer) or OPSC(Organization Private Sector Customer)
enrollmentType								: Enrolled in CBS or not
natureOfBusiness							: Nature Of Business for SME i.e. Proprietorship, Partnership, Joint Venture etc.
photoIDType									: Photo ID Type like NID, TIN, Passport, BIN etc.
photoID										: Photo ID like NID NO
customerJSON								: Customer Detail Information like Address, Phone etc 
mobileNo									: Customer Mobile number
phoneNoRes									:
phoneNoOffice								:
email										:
otherPhotoID								:
photoPath									:
photoIDPathFront							:
photoIDPathBack								:
customerStatus								: AS(Application Submitted)/ BM(Bank Made)/ BC(Bank Checked)/ BA(Bank Approved)/ A(Active)/ I(Inactive)/ C(Closed/Canceled)/ BR(Bank Rejected)
CBSstatus									: Response received from CBS while sending request for customer creation
CBSfailureReason							: JSON Packet (if CBSstatus = Failed)
submittedBy									: User ID of an Agent
submittedOn
madeBy										: User ID of a Branch.Officer.Maker
madeOn
checkedBy									: User ID of a Branch.Officer.Checker
checkedOn
approvedBy									: User ID of a Branch.Officer.Approver
approvedOn
rejectedBy									: User ID of a Branch.Officer.Checker/ Branch.Officer.Approver
rejectedOn
rejectionReason
activatedBy									: User ID of an Agent (still not sure)
activatedOn
closedBy									: User ID of a Branch.Officer.Maker or other defined role
closedOn
lastChange									: Status/Info etc. (not before the customer is Activated for the 1st time)
changedBy									: User ID of a defined role
changedOn
bankID
branchID
*/
create table 								Customer
(
customerID									varchar(64)								not null,
customerName								varchar(256),
fatherName									varchar(256),
motherName									varchar(256),
customerType								varchar(128)							not null,
natureOfBusiness							varchar(64),
enrollmentType								varchar(64),
photoIDType									varchar(64)	 							not null,
photoID										varchar(64)	 							not null,
customerJSON								text,
mobileNo									varchar(16),
phoneNoRes									varchar(16),
phoneNoOffice								varchar(16),
email										varchar(64),
otherPhotoID								varchar(64),
photoPath									varchar(256)							not null,
photoIDPathFront							varchar(256),
photoIDPathBack								varchar(256),
customerStatus								varchar(8)								not null,
CBSRefNo									varchar(64),
CBSstatus									varchar(64),
CBSfailureReason							text,
applicationDate								date,
submittedBy									varchar(64)								not null,
submittedOn									timestamp								not null,
madeBy										varchar(64),
madeOn										timestamp,
checkedBy									varchar(64),
checkedOn									timestamp,
approvedBy									varchar(64),
approvedOn									timestamp,
rejectedBy									varchar(64),
rejectedOn									timestamp,
rejectionReason								varchar(512),
activatedBy									varchar(64),
activatedOn									timestamp,
closedBy									varchar(64),
closedOn									timestamp,
lastChange									varchar(64),
agentID										varchar(64)								not null,
servicePointID								varchar(64)								not null,
bankID										varchar(64)								not null,
branchID									varchar(64)								not null,
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									f_agentID_Customer						foreign key 	(agentID)
																					references 		Agent(loginID),
constraint 									f_servicePointID_Customer				foreign key 	(servicePointID) 
																					references 		ServicePoint(servicePointID),
constraint 									f_branchID_Customer						foreign key 	(branchID)
																					references 		Branch(branchID),
constraint 									f_bankID_Customer						foreign key 	(bankID)
																					references 		Bank(bankID),
constraint 									p_Customer								primary key 	(customerID)
);

/*
Here Account detail to be stored of end client
accountID 									: User Account No
bankAccountNo								: Account Holder Bank A/C no
accountTitle								: Account Name/Title
mobileNo									: A mobile number to contact
initialDeposit								: Deposit amount at the opening time
initialDepositRefID							: Deposit reference id
dCode										:
approvalDate								: System Account opening date
applicationDate								: Application Submission date by account holder
accountCategory								: Category: Demand Deposit (DD), Time Deposit (TD), Schema Deposit(SD)
accountType									: Type: Customer(CU), Join(JI), Corporate(CO)
productType									: Fixed Deposit Recepit (FDR), Current Deposit (CD), Savings Deposit (SD)
interestRate								: Interest rate
schemaAmount								:
schemaPeriod								: Scheme Tenure 1, 2,3 Years
schemePeriodType							: Monthly(MP), Half-yearly(HP), Yearly(YP)
renewBothPrincipalInterest					: YES(Y), NO(N)
renewPrincipal								: YES(Y), NO(N)
productID									: Product ID
productName									: Product Name
maturityDate								: When schema will be mature
maturityAmount								: After mature, what amount will have
numberOfInstalment							: number of instalment
givenInstallment							: how many instalment is given
encashOnMaturity							: YES(Y), NO(N)
debitAccountNo								: Account to Debit Scheme Amount or Monthly Installment
creditInterestAccountNo						: Account to Credit Interest
encashmentAccountNo							: Account to Credit Maturity Amount or encashment amount
submitterID									:
makerID										:
checkerID									:
approverID									:
accountStatus								: Account Status: (DSTA)DST Approve,(SDA) Service Delivery Approve, (AS) Application Submitted, (BR) Bank Rejected, (BM) Bank Make, (BC) Bank Check, (BA) Bank Approved, (A) Account Active,(I) Account Inactive, (C) Account Closed
*/
create table 								Account
(
accountID									varchar(64) 							not null,
bankAccountNo								varchar(64),
accountTitle								varchar(128) 							not null,
enrollmentType								varchar(64),
accountJson									varchar(4096),
mobileNo									varchar(32),
initialDeposit								numeric(20,6) 							not null,
initialDepositRefID							varchar(256),
CBSRefNo									varchar(256),
dCode										varchar(128),
applicationDate								timestamp,
accountType									varchar(4),
accountCategory								varchar(4),
schemeName									varchar(32),
schemeType									varchar(4),
schemePeriod								varchar(4),
schemePeriodType							varchar(4),
renewBothPrincipalInterest					INTEGER,
renewPrincipal								INTEGER,
productID									varchar(4),
productName									varchar(32),
monthlyInstallment							numeric(20,6) ,
interestRate								numeric(20,6),
schemeAmount								numeric(20,6),
startDate									timestamp,
maturityDate								timestamp,
maturityAmount								numeric(20,6) ,
numberOfInstallment							INTEGER,
givenInstallment							INTEGER,
encashOnMaturity							INTEGER,
debitAccountNo								varchar(64),
creditInterestAccountNo						varchar(64),
encashmentAccountNo							varchar(64),
submitterID									varchar(64),
dstApproverID								varchar(64),
makerID										varchar(64),
checkerID									varchar(64),
approverID									varchar(64),
accountStatus								varchar(4)								not null,
rejectionCause								varchar(512),
openingDate									timestamp,
closingDate									timestamp,
CSBRequestID								varchar(300),
lockedBy 									varchar(64),
lockedOn									timestamp,
lockStatus 									varchar(16),
-- relational fields
agentID										varchar(64)								not null,
servicePointID								varchar(64)								not null,
branchID									varchar(64) 							not null,
bankID										varchar(64) 							not null,
-- Audit specific
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									c_accountStatus_Account					check			(accountStatus = 'A' or accountStatus = 'I' or accountStatus = 'C' or accountStatus = 'AS'  or accountStatus = 'DSTA' or accountStatus = 'BM' or accountStatus = 'BC' or accountStatus = 'BA' or accountStatus = 'BR' or accountStatus = 'SDA'),
constraint 									u_bankAccountNo_Account					unique			(bankAccountNo),
constraint 									f_agentID_Account						foreign key 	(agentID)
																					references 		Agent(loginID),
constraint 									f_servicePointID_Account				foreign key 	(servicePointID) 
																					references 		ServicePoint(servicePointID),
constraint 									f_branchID_Account						foreign key 	(branchID)
																					references 		Branch(branchID),
constraint 									f_bankID_Account						foreign key 	(bankID)
																					references 		Bank(bankID),
constraint 									p_Account								primary key 	(accountID)
);

/*
Here CustomerAccount detail to be stored of end client
customerID 									: to handle a customer with multiple account
accountID 									: to handle a account with multiple customer. i.e Join Account
isMandatoryBiometric						: Is this customer biometric mandatory for this account
isBiometricEnable							: Is this customer can use his biometric for this account
*/
create table 								CustomerAccount
(
customerID 									varchar(64) 							not null,
accountID 									varchar(64) 							not null,
isMandatoryBiometric						varchar(2)	 							not null,
isBiometricEnable							varchar(2)	 							not null,
constraint 									f_customerID_CustomerAccount			foreign key 	(customerID)
																					references 		Customer(customerID),
constraint 									f_accountID_CustomerAccount				foreign key 	(accountID)
																					references 		Account(accountID)
);

/*
Here SignatoryInfo detail to be stored
signatoryInfoID								: Auto generated
accountID									:
mandatoryBioAuthCustomer					: JSON : Hole customer IDs whose biometric are mandatory. i.e. [customerID1, customerID2, ..... customerIDn]
bioAuthCustomer								: JSON : Hole customer IDs whose biometric are optional. i.e. [customerID1, customerID2, ..... customerIDn]
mandatoryBioAuthCustomerNo					: Minimum number of mandatory biometric amount
bioAuthCustomerNo							: Minimum number of optional biometric amount
*/
create table 								SignatoryInfo
(
signatoryInfoID								varchar(64)								not null,
accountID									varchar(64)								not null,
mandatoryBioAuthCustomer					text									not null,
bioAuthCustomer								text									not null,
mandatoryBioAuthCustomerNo					numeric(4)								not null,
bioAuthCustomerNo							numeric(4)								not null,
constraint 									f_accountID_SignatoryInfo				foreign key 	(accountID)
																					references 		Account(accountID),
constraint 									p_SignatoryInfo							primary key 	(signatoryInfoID)
);

/*
Audit Log for tracing every change in every table
OID											: primary key
sectionName									: name of the section under which the change was performed (Based on client readability)
tableName									: name of the table for which the trace is
rowKey										: OID of the row for which the trace is
timeOfAction								: time of action
actionType 									: (I)nsert, (E)dit, (D)elete
actionSource 								: (U)ser, (S)ystem, (A)dmin
actionUser 									: Login username if from user end, or System if from system or A if by Admin
rowImageBefore 								: JSON representation of all rows (valid for update and delete), JSON must be line by line for diff capability
rowImageAfter 								: JSON representation of all rows (valid for insert and after), JSON must be line by line for diff capability
*/
create table 								AuditLog
(
OID											varchar(200)							not null,
sectionName 								varchar(200),
tableName									varchar(200)							not null,
rowKey										varchar(200)							not null,
timeOfAction								timestamp								not null			default							CURRENT_timestamp,
actionType									varchar(100)							not null,
actionSource								varchar(100)							not null,
actionUser									varchar(200)							not null,
rowImageBefore								text,
rowImageAfter								text,
constraint 									c_actionType_AuditLog					check			(actionType = 'I' or actionType = 'E' or actionType = 'D'),
constraint 									c_actionSource_AuditLog 				check			(actionSource = 'U' or actionSource = 'S' or actionSource = 'A'),
constraint 									p_AuditLog								primary key 	(OID)
);

/*
This table to be used to store associated Agent Deposit information with system.
OID											:
agentID 									: An agent associated with System to be Identified by agentID
bankID										: bankID indicates an agent is associated with this bank
branchID									: branchID indicates an agent is associated respective bank branch
servicePointID								:
bankAcNo									: Agent bank A/C number
entrydate									: Transaction DataEntry date
transdate									: Transaction Date
amount										: Amount for a Transaction
adviceRefNo									: Come from hard copy
status										: Association status with system i. e. Approved(A), Submitted(S)
*/
create table 								AgentDepositRequest
(
OID 										varchar(64)							not null,
agentID										varchar(64) 							not null,
bankID										varchar(64) 							not null,
branchID									varchar(64) 							not null,
servicePointID								varchar(64) 							not null,
bankAcNo									varchar(16)							not null,
entrydate 									timestamp 								not null,
transdate 									timestamp 								not null,
amount 										numeric(20,6) 							not null,
adviceRefNo 								varchar(200) 							not null,
status										varchar(100),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									c_status_AgentDepositRequest			check			(status = 'S' or status = 'A' or status = 'R'),
constraint 									f_bankID_AgentDepositRequest			foreign key 	(bankID)
																					references 		Bank(bankID),
constraint 									f_branchID_AgentDepositRequest			foreign key 	(branchID)
																					references 		Branch(branchID),
constraint 									f_agentID_AgentDepositRequest			foreign key 	(agentID)
																					references 		Agent(agentID),
constraint 									f_sPointID_AgentDepositRequest			foreign key 	(servicePointID)
																					references 		ServicePoint(servicePointID),
constraint 									p_AgentDepositRequest					primary key		(OID)
);

/*
This table to be used to store associated Agent Withdrawal information with system.
agentID 									: An agent associated with System to be Identified by agentID
bankID										: bankID indicates an agent is associated with this bank
branchID									: branchID indicates an agent is associated respective bank branch
bankAcNo									: Agent bank A/C number
entrydate									: Transaction Data Entry date
transdate									: Transaction Date
amount										: Amount for a Transaction
adviceRefNo									: Come from hard copy
status										: Association status with system i. e. Approved(A), Submitted(S)
*/
create table 								AgentWithdrawalRequest
(
OID 										varchar(64)								not null,
agentID										varchar(64) 							not null,
bankID										varchar(64) 							not null,
branchID									varchar(64)								not null,
servicePointID								varchar(64) 							not null,
bankAcNo									varchar(16)							not null,
entrydate 									timestamp  								not null,
transdate 									timestamp  								not null,
amount 										numeric(20,6) 							not null,
adviceRefNo 								varchar(256) 							not null,
status										varchar(8),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									c_status_AgtWithdrawRequest				check			(status = 'S' or status = 'A' or status = 'R'),
constraint 									f_bankID_AgtWithdrawRequest				foreign key 	(bankID)
																					references 		Bank(bankID),
constraint 									f_branchID_AgtWithdrawRequest			foreign key 	(branchID)
																					references 		Branch(branchID),
constraint 									f_agentID_AgtWithdrawRequest			foreign key 	(agentID)
																					references 		Agent(agentID),
constraint 									f_svPointID_AgtWithdrawRequest			foreign key 	(servicePointID)
																					references 		ServicePoint(servicePointID),
constraint 									p_AgentWithdrawalRequest				primary key		(OID)
);

/*
This table to be used to store Customer QR card information history/log with system.
accountID 									: Customer Account ID
requestDate									: Request date for Card
pdfFileName									: card file Name
pdfGenerationDate							: Card Generation Date
pdfGeneratedBy								: Generation user ID
pdfDownloadedOn								: Card downloaded Date
pdfDownloadedBy								: Card downloaded User ID
accountStatus								: Customer Account status during card generation
generatedAs									: Card generation type like batch or single
remarks										: Remarks if any
cardstatus									: Card Status Generated(G), Downloaded(D)
*/
create table 								CustomerQRCard
(
OID 										varchar(64) 							not null,
accountId 									varchar(64)								not null,
requestDate 								timestamp 								not null,
pdfFileName 								varchar(128) 							not null,
pdfGenerationDate 							timestamp  								not null,
pdfGeneratedBy 								varchar(64) 							not null,
pdfDownloadedOn 							timestamp  								default			null,
pdfDownloadedBy 							varchar(64) 							default			null,
accountStatus 								varchar(8) 							not null,
generatedAs									varchar(100) 							not null,
remarks 									varchar(255) 							default			null,
cardstatus	 								varchar(8) 								not null,
constraint 									c_cardstatus_CustomerQRCard				check			(cardstatus = 'G' or cardstatus = 'D'),
constraint 									p_CustomerQRCard						primary key		(OID)
);

/*
This table to be used to account holder scanned finger print.
OID 										: 
accountID									: Customer Account ID
changeType 									: Card change type will be: Demage, Lost
cardLostDate 								: Card Lost date					
remark		 								: Comments for changes
applyDate 									:
approveDate 								:
approveBy									:
status 										: Status Submitted(S), Approved(A), Generaged(G)
*/
create table 								CustomerQRCardLog
(
OID 										varchar(64) 							not null,
accountID									varchar(64) 							not null,
changeType 									varchar(128)							not null,
cardLostDate 								timestamp ,
remark		 								varchar(256)							not null,
applyDate 									timestamp  								not null,
approveDate 								timestamp,
approveBy									varchar(64),
status 										varchar(8),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_CustomerQRCardLog 					primary key 	(OID)
);
/*
This table to be used to store Bill Types (Such as: Revenue, Utility Bill, Toll, Pasport Fees etc)
OID 										: Bill OID generated by system
billtypeID									: If user could want provide any id
billtypeName								: Bill type name
billtypeDescription							: Descriptio for bill type
makerID										: User id, who make bill type
checkerID									: User id, who check bill type
approverID									: User id, who approve bill type
billTypeStatus								: Bill Type Status Make(BM), Rejected(BR), Active(A), Checked(BC), Submitted(AS)
rejectionCause								: Bill type rejection cause
*/
create table 								BillType
(
OID 										varchar(64) 							not null,
billtypeID 									varchar(64),
billtypeName								varchar(256),
billtypeDescription							varchar(256),
makerID										varchar(64),
checkerID									varchar(64),
approverID									varchar(64),
billTypeStatus								varchar(8)								not null,
rejectionCause								varchar(512),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_BillType								primary key 	(OID)
);


/*
This table to be used to store Utility Company Information.
OID 										: Company OID generated by system
companyName									: Name of the company
companyCode									: if user want to provide any id
vatAmount									:
surCharge									:
location									: Location of company
revenueThreshold							: For which amount stamp will stamp in bill
stampValue									: Value of stamp
contactPerson								: With whom will contact
contactNumber								: In which number will contact
revenueThreshold							: For which amount stamp will stamp in bill
billtypeOID									: OID of bill type table
centralizeBilling							: Will billing amount gose to branch specific accountNumber or a single central account number
debitAccount								: From which account amount will go.
creditAccount								: In which account amount will go.
makerID										: User id, who make bill type
checkerID									: User id, who check bill type
approverID									: User id, who approve bill type
companyStatus								: Company Status Make(BM), Rejected(BR), Active(A), Checked(BC), Submitted(AS)
rejectionCause								: Company rejection cause
changedBy									: Who changed bill type information
*/
create table 								UtilityCompany
(
OID 										varchar(64) 							not null,
companyName									varchar(256)							not null,
companyCode									varchar(256),
vatAmount									numeric(20,6),
surCharge									numeric(20,6),
location									varchar(200),
revenueThreshold							numeric(20,6),
stampValue									numeric(20,6),
contactNumber								varchar(64),
contactPerson								varchar(100),
billtypeOID									varchar(200),
centralizeBilling							varchar(2)									not null,
debitAccount								varchar(16),
creditAccount								varchar(16),
makerID										varchar(64),
checkerID									varchar(64),
approverID									varchar(64),
companyStatus								varchar(4)								not null,
rejectionCause								varchar(512),
cutVat										varchar(2),
useVatAccount								varchar(2),
vatAccount									varchar(16),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_UtilityCompany						primary key 	(OID)
);

/*
This table to be used to store Utility Company Information.
OID 										: Company Zone OID generated by system
zoneName									: Name of the zone
zoneCode									: if user want to provide any id
companyOID									: OID of UtilityCompany table
location									: Location of company
contactPerson								: With whom will contact
contactNumber								: In which number will contact
makerID										: User id, who make bill type
checkerID									: User id, who check bill type
approverID									: User id, who approve bill type
companyZoneStatus							: Company Zone Status Make(BM), Rejected(BR), Active(A), Checked(BC), Submitted(AS)
rejectionCause								: Company rejection cause
changedBy									: Who changed bill type information
*/
create table 								CompanyZone
(
OID 										varchar(200) 							not null,
zoneName									varchar(200)							not null,
zoneCode									varchar(200),
companyOID									varchar(200),
location									varchar(200),
contactNumber								varchar(64),
contactPerson								varchar(100),
makerID										varchar(64),
checkerID									varchar(64),
approverID									varchar(64),
companyZoneStatus							varchar(4)								not null,
rejectionCause								varchar(512),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_CompanyZone							primary key 	(OID)
);

/*
This table to be used to store Utility Company zone branch relation information.
OID 										: Zone Branch OID generated by system
zoneOID										: OID of CompanyZone table
branchID									: branchID of branchTable
debitAccount								: From which account amount will go.
creditAccount								: In which account amount will go.
changedBy									: Who changed bill type information
*/
create table 								ZoneBranch
(
OID 										varchar(64) 							not null,
zoneOID										varchar(64)								not null,
branchID									varchar(64),
debitAccount								varchar(32),
creditAccount								varchar(32),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_ZoneBranch							primary key 	(OID)
);

/*
This table to be used to store Utility Company zone agetn relatin information.
OID 										: Zone Agent OID generated by system
utilityComapnyID							: OID of UtilityCompany table
zoneOID										: OID of CompanyZone table
agentID										: branchID of Agent table
changedBy									: Who changed bill type information
*/
create table 								ZoneAgent
(
OID 										varchar(64) 							not null,
utilityComapnyID							varchar(64)								not null,
companyZoneID								varchar(64)								not null,
agentID										varchar(64)								not null,
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									f_utilityComapnyID_ZoneAgent			foreign key 	(utilityComapnyID)
																					references 		UtilityCompany(OID),
constraint 									f_companyZoneID_ZoneAgent				foreign key 	(companyZoneID)
																					references 		CompanyZone(OID),
constraint 									f_agentID_ZoneAgent						foreign key 	(agentID)
																					references 		Agent(agentID),
constraint 									p_ZoneAgent								primary key 	(OID)
);

/*
This table to be used to store Bill Collection data. 
OID 										: Bill Collection OID generated by system
csbRequestID								: Request ID for csb system
cbsReferanceID								: CBS response ID.
companyID									: OID of UtilityCompany table
zoneID										: OID of CompanyZone table
zoneCode									: User will put from bill
entryDate									: Entry Date
dueDate										: bill payment last date
billPaymentMonth							: Billing Month
customerName								: Name of Customer
customerMobileNo							: Customer Mobile Number
meterNo										: Meter No
usedUnit									: Unit have been used
billReferenceNumber							: Reference number of bill
bookNumber									: Book Number
billAmount									:
vatAmount									:
meterRent									:
transformerRent								:
penalty										:
othersFee									:
lateFee										:
netBillAmount								:
customerID									:
billType									: OID of BillType table
paymentType									: Payment Type Cash (CASH), Account (ACCOUNT)
accountNumber								: Customer account number provided by utility company
debitAccount								: From which account amount will go.
creditAccount								: In which account amount will go.
revenueCount								: Dose this bill have a stamp
submitterID									: Wser id, who submit this bill from mobile app
makerID										: User id, who make bill type
checkerID									: User id, who check bill type
approverID									: User id, who approve bill type
billStatus									: Bill Status Make(BM), Rejected(BR), Active(A), Checked(BC), Submitted(AS)
rejectionCause								: Company rejection cause
agentID										: Agent ID
servicePointID								: Service Point ID
branchID									: Branch ID
bankID										: Bank ID
submitionDate								: In which date bill submitted
transactionDate								: In which date transaction completed
valueJson									: Extra field will be in json formate
changedBy									: Who changed bill type information
*/
create table 								BillCollection
(
OID 										varchar(64) 							not null,
csbRequestID								varchar(200),
cbsReferanceID								varchar(200),
companyID 									varchar(64)							not null,
zoneID										varchar(64),
zoneCode									varchar(100),
entryDate 									timestamp,
dueDate										timestamp,
billPaymentMonth							varchar(100)							not null,
customerName								varchar(200),
customerMobileNo							varchar(200),
meterNo										varchar(200),
usedUnit									numeric(20,6),
billReferenceNumber 						varchar(200) 							not null,
bookNumber									varchar(100),
billAmount 									numeric(20,6),
vatAmount 									numeric(20,6),
meterRent 									numeric(20,6),
transformerRent								numeric(20,6),
penalty										numeric(20,6),
othersFee									numeric(20,6),
lateFee										numeric(20,6),
netBillAmount								numeric(20,6)							not null,
customerID									varchar(200),
billType									varchar(64),
paymentType									varchar(16)								not null,
accountNumber								varchar(200),
debitAccount								varchar(200),
creditAccount								varchar(200),
revenueCount								numeric(4)								not null,
submitterID									varchar(64),
makerID										varchar(64),
checkerID									varchar(64),
approverID									varchar(64),
billStatus									varchar(8),
rejectionCause								varchar(512),
-- relational fields
agentID										varchar(64)								not null,
servicePointID								varchar(64)								not null,
branchID									varchar(64) 							not null,
bankID										varchar(64) 							not null,
-- Audit specific
submitionDate								timestamp,
transactionDate								timestamp,
valueJson									text,
cutAgentCharge								varchar(2),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_BillCollection 						primary key 	(OID)
);

/*
This table to be used to store Request sent by client apps like androidApp.
requestID									:
requestType									:
requestDate									:
requestDetail								:
requstStatus								:
*/
create table 								RequestLog
(
OID 										varchar(200),
requestID									varchar(256) 							not null,
requestType									varchar(200) 							not null,
requestDate									timestamp	 							not null,
requestDetail								text	 								not null,
requstStatus								varchar(100)							not null,
constraint 									p_RequestLog							primary key		(OID)
);

/*
This table to be used to store Response sent to client apps like androidApp.
requestID									: 
responseDate								: 
responseDetail								:
responseStatus								:
*/
create table 								ResponseLog
(
OID 										varchar(200),
requestID									varchar(256) 							not null,
responseDate								timestamp	 							not null,
responseDetail								text		 							not null,
responseStatus								varchar(100)							not null,
constraint 									p_ResponseLog							primary key		(OID)
);

/*
This table to be used to store Request sent by client apps like androidApp.
requestID 									: Request ID sent to PlatForm
requestDetail								: Request Packet
requestType									:
requestDate									:
requstStatus								: Association status with system i. e. Received(R), Processed(P), FailedProcessed(FP)
*/
create table 								ClientRequestLog
(
OID 										varchar(200),
requestID									varchar(256) 							not null,
requestType									varchar(200) 							not null,
requestDate									timestamp 		 						not null,
requestDetail								text		 							not null,
requstStatus								varchar(100)							not null,
constraint 									p_ClientRequestLog						primary key		(OID)
);

/*
This table to be used to store Response sent to client apps like androidApp.
requestID									: Response ID to be sent by csbPlatForm
responseDate								: Response Packet
responseDetail								: Association status with system i. e. submitted(S), closed(C)
responseStatus								:
*/
create table 								ClientResponseLog
(
OID 										varchar(200),
requestID									varchar(256) 							not null,
responseDate								timestamp 		 						not null,
responseDetail								text		 							not null,
responseStatus								varchar(100)							not null,
constraint 									p_ClientResponseLog						primary key		(OID)
);

/*
requestID									 :
accountID									 :
creditedAccount								 :
debitedAccount								 :
transID										 :
referenceNo									 :
transType									 :
narration									 :
transDate									 :
transAmount 								 :
bankID										 :
branchID									 :
agentID										 :
servicePointID								 :
serviceTerminalID							 :
processCode									 :
reverseRefNo								 :
reverseType									 :
reverseDate									 :
reverserID									 :
reverseStatus								 :
reverseStatusNote							 :
transStatus									 :
transStatusNote								 :
ackStatus 									 :
ackStatusNote								 :
makerID 									 :
chargedParty								 :
chargingParty								 :
*/
create table 								TransLog
(
requestID									varchar(256),
accountID									varchar(64),
creditedAccount								varchar(64),
debitedAccount								varchar(64),
transID										varchar(30),
referenceNo									varchar(30),
transType									varchar(32)  							not null,
narration									varchar(128),
transDate									timestamp,
transAmount 								numeric(20,6)							not null,
bankID										varchar(64),
branchID									varchar(64),
agentID										varchar(64),
servicePointID								varchar(64),
serviceTerminalID							varchar(64),
processCode									varchar(6),
reverseRefNo								varchar(30),
reverseType									varchar(16),
reverseDate									timestamp,
reverserID									varchar(64),
reverseStatus								varchar(8),
reverseStatusNote							varchar(128),
transStatus									varchar(8),
transStatusNote								varchar(128),
ackStatus 									varchar(8),
ackStatusNote								varchar(512),
makerID 									varchar(100),
chargedParty								varchar(16),
chargingParty								varchar(16),
constraint 									p_TransLog								primary key		(requestID)
);

/*
requestID									:
accountID									:
bankAccountNo								:
transID										:
referenceNo									:
transType									:
mobileNo									:
sms											:
sendDate									:
bankID										:
branchID									:
agentID										:
servicePointID								:
serviceTerminalID							:
processCode									:
smsStatus									:
*/
create table 								SMSLog
(
requestID									varchar(256),
accountID									varchar(64),
bankAccountNo								varchar(64),
transID										varchar(30),
referenceNo									varchar(30),
transType									varchar(32),
mobileNo									varchar(32),
sms											text,
sendDate									timestamp,
bankID										varchar(64),
branchID									varchar(64),
agentID										varchar(64),
servicePointID								varchar(64),
serviceTerminalID							varchar(64),
processCode									varchar(6),
smsStatus									varchar(8),
constraint 									p_SMSLog								primary key		(requestID)
);

/*
This table to be used to store interest provision history/log with system.
referenceID 								: 
accountID									: Customer Account ID
status										: Association status with system i. e. submitted(S), closed(C)
*/
create table 								AccountClosingLog
(
OID 										varchar(256)							not null,
referenceID									varchar(64) 							not null,
accountID									varchar(64) 							not null,
status										varchar(2),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									c_status_AccountClosingLog				check			(status = 'C' or status = 'S'),
constraint 									p_AccountClosingLog						primary key		(OID)
);

/*
This table will be used to store Account change history
oid											: identifier ID for this table
accountID									: account ID of account table
rowimageBefore								: JSON representation of all columns of row before change (valid for update and delete), JSON must be line by line for diff capability
rowImageAfter								: JSON representation of all columns of row after change (valid for update and delete), JSON must be line by line for diff capability
*/
create table 								AccountHistory
(
oid											varchar(200)							not null,
accountID									varchar(200)							not null,
rowImageBefore								text,
rowImageAfter								text,
updatedOn									timestamp								not null			default							CURRENT_timestamp,
updatedBy									varchar(200)							not null,
constraint 									p_AccountHistory						primary key 	(OID)
);

/*
This table to be used to store interest provision history/log with system.
IFRID 										: identifiyerID ID for this table
PIN											: Personal Identification number
photoID										: Like NID/BR/PP number
photoIDType									: 
photoIDFrontPath							: Like NID/BR/PP number
photoIDBackPath								: Like NID/BR/PP number
recipientFP
recipientPhotoPath							: Recipient photo
senderName									:
senderCountry								:
amount
applicationDate
currency									: Currency
exchangeRate								: Currency Exchange rate
actualAmount								: Actual Amount from Remitte
actualAmountInBDT							: 
status										:  
creditedAccount								
debitedAccount								
csbRequestID								
*/
create table 								Remittance
(
IFRID										varchar(64) 							not null,
PIN 										varchar(128) 							not null,
photoID 									varchar(64)								not null,
photoIDType									varchar(64)								not null,
photoIDFrontPath							varchar(1024)							not null,
photoIDBackPath								varchar(1024)							not null,
recipientName								varchar(1024)							not null,
recipientMobileNo							varchar(32),
recipientEmail								varchar(1024),
recipientFP									varchar(1024)							not null,
recipientPhotoPath							varchar(1024)							not null,
senderName									varchar(1024)							not null,
senderCountry								varchar(1024)							not null,
amount										numeric(20,6)							not null,
applicationDate								timestamp								not null,
currency									varchar(128),
exchangeHouse								varchar(64)								not null,
exchangeRate								numeric(20,6)											default '1',
dateOfExchange								date,
actualAmount								numeric(20,6)											default '1',
actualAmountInBDT							numeric(20,6),
status										varchar(8)								not null,
bankID										varchar(64)								not null,
branchID									varchar(64)								not null,
servicePointID								varchar(64)								not null,
agentID										varchar(64)								not null,
makerID										varchar(64),
checkerID									varchar(64),
approverID									varchar(64),
creditedAccount								varchar(64),
debitedAccount								varchar(64),
csbRequestID								varchar(512),
rejectionCause								varchar(156),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									c_status_Remittance 					check 			(status = 'A' or status = 'I' or status = 'C' or status = 'AS' or status = 'BM' or status = 'BC' or status = 'BA' or status = 'ME'or status = 'BR'or status = 'Block' or status = 'P'or status = 'OK' or status = 'Failed' or status = 'Cancel'),
constraint 									u_PIN_Remittance						unique			(PIN),
constraint 									f_agentID_Remittance					foreign key 	(agentID)
																					references 		Agent(loginID),
constraint 									f_servicePointID_Remittancet			foreign key 	(servicePointID) 
																					references 		ServicePoint(servicePointID),
constraint 									f_branchID_Remittance					foreign key 	(branchID)
																					references 		Branch(branchID),
constraint 									f_bankID_Remittance						foreign key 	(bankID)
																					references 		Bank(bankID),
constraint 									p_Remittance							primary key 	(IFRID)
);

/*
This table to be used to store cheque Collection information
requestID									:
trackingID									:
chequeFrontPhotoPath						:
chequeBackPhotoPath							:
bearerPhotoPath								:
retryCount 									:
requestType 								:
makerID										:
chequeDetail 								:
requestDate									:
receiptDate									:
bankID										:
branchID									:
servicePointID								:
agentID										:
rejectionCause								:
status										:
*/
create table 								ChequeCollection
(
requestID									varchar(256)							not null,
trackingID									varchar(256) 							not null,
chequeFrontPhotoPath						varchar(255)							not null,
chequeBackPhotoPath							varchar(255)							not null,
bearerPhotoPath								varchar(255)							not null,
retryCount 									varchar(64),
requestType 								varchar(64)								not null,
makerID										varchar(64),
chequeDetail 								text 									not null,
requestDate									timestamp,
receiptDate									timestamp,
bankID										varchar(64)								not null,
branchID									varchar(64)								not null,
servicePointID								varchar(64)								not null,
agentID										varchar(64)								not null,
rejectionCause								varchar(255),
status										varchar(100)							not null,
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									c_status_ChequeCollection				check			(status = 'AS' or status = 'BR'),
constraint 									u_trackingID_ChequeCollection			unique			(trackingID),
constraint 									f_agentID_ChequeCollection				foreign key 	(agentID)
																					references 		Agent(agentID),
constraint 									f_svcPointID_ChequeCollection			foreign key 	(servicePointID) 
																					references 		ServicePoint(servicePointID),
constraint 									f_branchID_ChequeCollection				foreign key 	(branchID)
																					references 		Branch(branchID),
constraint 									f_bankID_ChequeCollection				foreign key 	(bankID)
																					references 		Bank(bankID),
constraint 									p_ChequeCollection 						primary key 	(requestid)
);

/*
This table to be used to store cheque Detail information
chequeDetailID								
trackingID									
recipientAccountID							
recipientName								
amount										
dateOnCheque 								
chequeSequence 								
accountNumber 								
payerName									
issuingBank 								
issuingBankBranch 							
bearerName									
bearerPhoneNumber 							
bearerNationalID 							
bearerAddress								
bearerRelationship 							
bankID										
branchID									
servicePointID								
agentID										
status										
*/
create table 								ChequeDetail
(
chequeDetailID								varchar(256) 							not null,
trackingID									varchar(256) 							not null,
recipientAccountID							varchar(255)							not null,
recipientName								varchar(255)							not null,
amount										numeric(20,6)							not null,
dateOnCheque 								timestamp 								not null,
chequeSequence 								varchar(64),
accountNumber 								varchar(64),
payerName									varchar(64),
issuingBank 								varchar(64),
issuingBankBranch 							varchar(64),
bearerName									varchar(64),
bearerPhoneNumber 							varchar(64),
bearerNationalID 							varchar(64),
bearerAddress								text,
bearerRelationship 							varchar(64),
bankID										varchar(64),
branchID									varchar(64),
servicePointID								varchar(64),
agentID										varchar(64),
status										varchar(64),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									f_bankID_ChequeDetail 					foreign key 	(bankID)
																					references 		Bank(bankID),
constraint 									f_branchID_ChequeDetail 				foreign key 	(branchID)
																					references 		Branch(branchID),
constraint 									f_servicePointID_ChequeDetail 			foreign key 	(servicePointID)
																					references 		ServicePoint(servicePointID),
constraint 									f_trackingID_ChequeDetail 				foreign key 	(trackingID)
																					references 		ChequeCollection(trackingID),
constraint 									p_ChequeDetail 							primary key 	(chequeDetailID)
);

/*
This table to be used to store tag lib information
tagLibID 									: tag lib ID for this table
name										: name of tag
description									: desription of tag
rejectionCause								: approver/who approve will put a note why he/she reject it
status                                      : status will be BM (bank make a tagDictionary it will status as BM), BR( bank rejected when approver want to approve tagDictionary), A (Approver Approved tagDictionary)
*/
create table								TagDictionary
(
tagLibID									varchar(64) 							not null,
name										varchar(256) 							not null,
description									text,
rejectionCause 								text,
status										varchar(8),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_TagLib								primary key 	(tagLibID)
);

/*
This table to be used to store tag link information
tagLinkID 									: 
entityID									: 
entityCode									: 
tagLibID                                    : 
*/
create table								TagLink
(
tagLinkID									varchar(64) 							not null,
entityID									varchar(64) 							not null,
entityCode									varchar(128)							not null,
tagLibID									varchar(64),
constraint 									f_tagLibID_TagDict						foreign key 	(tagLibID)
																					references 		TagDictionary(tagLibID),
constraint 									p_tagLinkID_TagLink						primary key 	(tagLinkID)
);

/*
SegmentDef is for defining master segments for various types of ietms (category/dimension) based on what a Charge Model might be defined
For example a charge model may have three different criteria or dimensions like
1. Service Category
2. Agent Outlet Location (Home Agent or Away Agent)
3. Banking Product

For example a few rules of the charge model may be like this
a) For Fund Transfer through Home agent, no charge will be applicable for Savings Account
b) For Fund Transfer through Away agent, a flat 10 Tk. charge will be applicable for Savings Account
c) For Fund Transfer through Away agent, a flat 0.25% charge will be applicable for Current Account etc.

Here there are three implicit criteria/dimensions Fund Trasnfer (Service Category), Current/Savings Account (Product) and Home/Away Agent (Agent Location)

For each criteria and dimensions there is a SegmentDef. A SegmentDef is essentially denoted by a fixed length number that will actually form part of a resultant key or flex-field

For example if we now define the segments like this
1. Agent Location is a 2 length Segment where 00 means does not matter (catch all), 01 means Home and 02 means Away
2. Service category is a 4 length Segment where 0000 means does not matter (catch all), 0001 means Fund Transfer, 0002 means Balance Inquiry
2. Service category is a 3 length Segment where 000 means does not matter (catch all), 001 means Savings account and 002 means Current account
and we define the SegmentDef order the way it is described, then Charge code/key for the above mentioned charge rules are

a) 01-0001-001 : "Fund Transfer through Home agent, no charge will be applicable for Savings Account"
b) 02-0001-001 : "Fund Transfer through Away agent, a flat 10 Tk. charge will be applicable for Savings Account"
c) 02-0001-002 : "Fund Transfer through Away agent, a flat 0.25% charge will be applicable for Current Account"

segmentID									: Key for the property
mnemonic									: Short name, which will be available to UI and Log stream
description									: Details of the Segment Definition
isApplicable								: Whether this segment is in use or applicable for charge code/key generation
codeLength									: fixed length of the geneated code/key for this segment's item. If 2 that means this segment may contain upto 100 items, if 3, then it means that the segment may contain upto 1000 items
orderInCode									: When generating charge key/code in which order this segment's code will appear in the final resultant key.
*/
create table 								SegmentDef
(
segmentID									varchar(64) 							not null,
mnemonic									varchar(64) 							not null,
description									text 									not null,
isApplicable								varchar(2) 								not null,
codeLength									numeric(1) 								not null,
orderInCode									numeric(3) 								not null,
constraint 									c_isApplicable_SegmentDef				check 			(isApplicable = 'Y' or isApplicable = 'N'),
constraint 									p_SegmentDef	 						primary key 	(segmentID)
);

/*
SegmentItem are items under each SegmentDef, they are numeric (char-numeric) codes that are constituent items of a SegmentDef
OID											: Surrogate primary key - combination of segmentID and itemCode
segmentID									: Parent SegmentDef
itemCode									: char-numeric code of the item - 0, 1, .., 9 ..... 00, 01, .., 99 ..... 000, 001, .., 999 .....
mnemonic									: Short name, which will be available to UI and Log stream
description									: Details of the Segment Item
isApplicable								: Whether this item is in use or applicable for charge code/key generation or UI lookup
*/
create table 								SegmentItem
(
OID											varchar(64) 							not null,
segmentID									varchar(64) 							not null,
itemID										varchar(5) 								not null,
mnemonic									varchar(64) 							not null,
description									text 									not null,
isApplicable								varchar(2) 								not null,
constraint 									c_isApplicable_SegmentItem				check 			(isApplicable = 'Y' or isApplicable = 'N'),
constraint 									f_segmentID_SegmentItem 				foreign key 	(segmentID)
																					references 		SegmentDef(segmentID),
constraint 									p_SegmentItem	 						primary key 	(OID)
);

/*
ChargeModelDef defines a Charge Model, at any point of time one ChargeModel should be active/effective
OID											: Surrogate primary key
name										: Name of the Charge Model
description									: Details of the Charge Model
status										: Active/Inactive
effectiveFrom								: Date from which the Charge Model is effective, 2016-01-01 means >= 2016-01-01
effectiveTo									: Date till which the Charge Model is effective, 2016-01-01 means < 2016-01-01
*/
create table 								ChargeModelDef
(
OID											varchar(64) 							not null,
name										varchar(64)								not null,
description									text,
status										varchar(8)								not null,
effectiveFrom								date									not null,
effectiveTo									date									not null,
isDefault 									varchar(2),
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									c_status_ChargeModelDef					check 			(status = 'A' or status = 'I'),
constraint 									c_isDefault_ChargeModelDef				check 			(isDefault = 'Y' or isDefault = 'N'),
constraint 									p_ChargeModelDef 						primary key 	(OID)
);

/*
ChargeModelDef defines a Charge Model, at any point of time one ChargeModel can be active
chargeKey									: Resultant key generated from segments used to generate this charge item.
chargeModelDefID							: Parent Charge Model
valueJSON									: Charge logic in JSON schema
*/
create table 								ChargeModelItem
(
OID											varchar(64) 							not null,
chargeKey									varchar(64)								not null,
chargeModelDefID							varchar(64) 							not null,
valueJSON									text		 							not null,
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									f_cModelDefID_ChargeModelItem			foreign key 	(chargeModelDefID)
																					references 		ChargeModelDef(OID),
constraint 									p_ChargeModelItem	 					primary key 	(OID)
);

/*
PasswordPolicy is the table for storing all passord validation rule and policy.
passwordPolicyID							: Key for the PasswordPolicy
name										: name of the policy
status										: A = Active, I = Inactive
effectiveFrom								: from which date it will be effective
effectiveTo									: to which date it will be continue
description									: Description about password validation rule and policy
policyJson									:
{
	"validity" : {
		"passwordWillRemainValidFor" : 30,
		"lastNoPasswordNotUsedAgain" : 4,
	},
	"validation" : 
	{
		"leastCharacters" :	{
					"ruleNumber" : "1",
					"text" : "Must have at least number of characters",
					"value" : "3",
					"regex" : "XXXXX", 
					"enable" : "Y"
				},
		"mostCharacters" :	{
					"ruleNumber" : "2",
					"text" : "Must have at most no. of characters",
					"value" : "5",
					"regex" : "XXXXX", 
					"enable" : "Y"
				},
		"leastNumbers" : {
					"ruleNumber" : "3",
					"text" : "Must have at least no. of numbers",
					"value" : "2",
					"regex" : "XXXXX", 
					"enable" : "Y"
				},
		"mostNumbers" :	{
					"ruleNumber" : "4",
					"text" : "Must have at most no. of numbers",
					"value" : "4",
					"regex" : "XXXXX",   
				},
		"leastSpecialCharacters" : {
					"ruleNumber" : "5",
					"text" : "Must have at least no. of special characters",
					"value" : "1",
					"regex" : "XXXXX",    
					"enable" : "Y" 
				},
		"mostSpecialCharaccters" : {
					"ruleNumber" : "6",
					"text" : "Must have at most on. of special characters",
					"value" : "2",
					"regex" : "XXXXX",     
				},
		"leaseUpperCaseletters"	: {
					"ruleNumber" : "7",
					"text" : "Must have at least no. of upper-case letters",
					"value" : "1",
					"regex" : "XXXXX", 
					"enable" : "Y"
				},
		"mostUpperCaseletters"	: {
					"ruleNumber" : "8",
					"text" : "Must have at most []upper-case letters",
					"value" : "2",
					"regex" : "XXXXX", 
					"enable" : "N"
				},
		"leastLowerCaseLetter" : {
					"ruleNumber" : "9",
					"text" : "Must have at least no. of lower-case letters",
					"value" : "2",
					"regex" : "XXXXX",   
					"enable" : "Y"
				},
		"mostLowerCaseLetter" : {
					"ruleNumber" : "10",
					"text" : "Must have at most no. of lower-case letters",
					"value" : "2",
					"regex" : "XXXXX",  
					"enable" : "N"   
				},
		"notContaintheseCharacters"	: {
					"ruleNumber" : "11",
					"text" : "Must not contain any of these characters",
					"value" : "$&",
					"regex" : "XXXXX",  
					"enable" : "N"   
				}
	}
}
createdBy									: who (which login) created the record
createdOn									: when the record was created
updatedBy									: who (which login) last updated the record
updatedOn									: when the record was last updated		
*/
create table 								PasswordPolicy
(
passwordPolicyID							varchar(64) 							not null,
name										varchar(64)								not null,
status										varchar(2)								not null,
effectiveFrom								date,
effectiveTo									date,
description									text,
policyJson									text									not null,
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_PasswordPolicy						primary key 	(passwordPolicyID)
);

/*
PasswordHistory is the table for storing all changes on password.
passHistoryID								: Key for the password history
loginID										: User login ID. Comes from login table.
oldPassword									: Previous password
newPassword									: Changed password (Current Passowrd).
updatedBy 									: who (which login) last updated the record
updatedOn 									: when the record was last updated
*/
create table 								PasswordHistory
(
passHistoryID								varchar(64) 							not null,
loginID										varchar(64)								not null,
oldPassword									varchar(128),
newPassword									varchar(128) 							not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_PasswordHistory 						primary key 	(passHistoryID)
);

/*
Holiday is the table for storing all Fixed Holiday
holidayID									: Key for the Holiday
name										: name of the calendar
description									: description of the calendar	
dayNum										: number of the day
monthNum									: number of the month
*/
create table 								Holiday
(
holidayID									varchar(64) 							not null,
name										varchar(64)								not null,
description									text									null,
dayNum										varchar(2)								not null,
monthNum									varchar(2)								not null,
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_Holiday								primary key 	(holidayID)
);

/*
Calendar is the table for storing all about list of calendar name and description.
calendarID									: Key for the Calendar
calendarYear								: Year of the calendar
name										: Name of the calendar
description									: Description of the calendar	
status										: Generated (G), Not Generated (GN)
calendarJson								: Calendar JSON will hold working time, weekend and fixed holiday information
{
	"workingTime" : {"startHour" : "10", "startMinute" : "30", "endHour" : "07", "endMinute" : "30"},
	"weekends"	: [
		{"shortName" : "Sun", "fullName" : "Sunday", "index" : 0, "enabled" : false},
		{"shortName" : "Mon", "fullName" : "Monday", "index" : 1, "enabled" : false},
		{"shortName" : "Tue", "fullName" : "Tuesday", "index" : 2, "enabled" : false},
		{"shortName" : "Wed", "fullName" : "Wednesday", "index" : 3, "enabled" : false},
		{"shortName" : "Thu", "fullName" : "Thursday", "index" : 4, "enabled" : false},
		{"shortName" : "Fri", "fullName" : "Friday", "index" : 5, "enabled" : true},
		{"shortName" : "Sat", "fullName" : "Saturday", "index" : 6, "enabled" : true}
	],
	"holidays" : [
		{
			"name" : "Language Day", 
			"description" : "International Mother Language Day", 
			"effectiveDate" : "2016-02-21", 
			"calendarYear" : "2016", 
			"monthNum" : "01", 
			"dayNum" : "21"
		},
		{
			"name" : "Independent Day", 
			"description" : "Independent Day", 
			"effectiveDate" : "2016-03-26", 
			"calendarYear" : "2016", 
			"monthNum" : "02", 
			"dayNum" : "26"
		}
	]
}
*/
create table 								Calendar
(
calendarID									varchar(64) 							not null,
calendarYear								varchar(4)	 							not null,
name										varchar(64)								not null,
description									text									null,
calendarJson								text									null,
status										varchar(8)								not null,
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									p_Calendar								primary key 	(calendarID)
);

/*
CalendarDetails is the table for storing all about holiday, weekend or working day.
CalendarDetailID							: Key for the HolidayCalendar
calendarYear								: Year of the calendar
effectiveDate								: On which date it is effective
name										: Name of the day
description									: Description of the day
status										: Status of the day - Weekend(WE), Holiday(HD), WorkDay(WD)
dayNum										: Number of the day
monthNum									: Number of the month
startHour									: If working day start hour of the day
startMinute									: If working day start minute of the day
endHour										: If working day start hour of the day
endMinute									: If working day start minute of the day
*/
create table 								CalendarDetails
(
calendarDetailID							varchar(64) 							not null,
calendarYear								varchar(4)	 							not null,
effectiveDate								date									not null,
name										varchar(64)								not null,
description									text									null,
status										varchar(8)								not null,
dayNum										varchar(2)								not null,
monthNum									varchar(2)								not null,
startHour									varchar(2)								null,
startMinute									varchar(2)								null,
endHour										varchar(2)								null,
endMinute									varchar(2)								null,
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
calendarID									varchar(64) 							not null,
constraint 									f_calendarID_CalendarDetails			foreign key 	(calendarID)				references 		Calendar(calendarID),							
constraint 									p_CalendarDetails						primary key 	(calendarDetailID)
);

/*
GLMasterData is the table for storing all Bank GL Related data
glID										: Key for the GL
glType										: GL Type like DR, CR, VAT
description									: description of the GL	
mnemonic									: GL name
glNo										: Bank GL No
*/
create table 								GLMasterData
(
glID										varchar(64) 							not null,
glType										varchar(8)								not null,
description									text									null,
mnemonic									varchar(64)								not null,
glNo										varchar(32)								not null,
createdBy 									varchar(64) 							not null,
createdOn									timestamp 								not null,
updatedBy 									varchar(64) 							null,
updatedOn 									timestamp 								null,
constraint 									u_mnemonic_GLMasterData					unique			(mnemonic),
constraint 									p_GLMasterData							primary key 	(glID)
);


/*
Here CBS Pregenerated Account List to be stored of end client
accountNo           : Account Holder Bank A/C no
accountTitle        : Account Name/Title
accountType         : Type: Customer(CU), Join(JI), Corporate(CO)
productType         : Fixed Deposit Recepit (FDR), Current Deposit (CD), Savings Deposit (SD)
productID           : Product ID
submitterID         :
makerID             :
checkerID           :
approverID          :
accountStatus       : Account Status: (AS) Application Submitted, (BR) Bank Rejected, (BM) Bank Make, (BC) Bank Check, (BA) Bank Approved, (A) Account Active,(I) Account Inactive, (C) Account Closed
customerID			:
accountShortName	:
branchID			:
schemeCode			:
currencyCode		:
currentBalance		:
*/
create table		CBSAccount
(
accountID			varchar(64)			NOT NULL,
accountNo			varchar(64)			not null,
accountTitle        varchar(128)        not null,
productID			varchar(4),
accountStatus		varchar(4)			not null,
makerID				varchar(64),
checkerID			varchar(64),
approverID			varchar(64),
rejectionCause		varchar(512),
openingDate         timestamp,
closingDate         timestamp,
-- Audit specific
createdBy			varchar(64)			not null,
createdOn			timestamp			not null,
updatedBy			varchar(64)			null,
updatedOn			timestamp			null,
customerID			varchar(64),
accountShortName	varchar(4),
branchID			varchar(64),
schemeCode			varchar(64),
currencyCode		varchar(64),
currentBalance		varchar(64),
constraint          c_accountStatus_CBSAccount    check   (accountStatus = 'A' or accountStatus = 'U' or accountStatus = 'UA' or accountStatus = 'I' or accountStatus = 'C' or accountStatus = 'AS' or accountStatus = 'BM' or accountStatus = 'BC' or accountStatus = 'BA' or accountStatus = 'BR'),
constraint          p_CBSAccount       primary key  (accountID),
constraint 			c_accountNo_CBSAccount 	UNIQUE(accountNo)
);

/*
Here Account Balance History table info
accountNo           : Account Holder Bank A/C no
accountID           : Account Holder Bank account id
eodDate        		: date of end of the day
accountBalance      : last balance of account
productID			: productID from product table
agentCode         	: code of agent
status           	: i.e: 'A' for Active
*/ 
create table		AccountBalanceHistory
(
accountBalanceHistoryID			varchar(64)			not null,
accountNo						varchar(16)			not null,
accountID						varchar(16)			not null,
eodDate		         			timestamp			not null,
accountBalance         			numeric(22,2)		not null,
productID	         			varchar(16)			not null,
agentCode	         			varchar(16)			not null,
status							varchar(4)			null,
createdBy						varchar(64)			not null,
createdOn						timestamp			not null,
updatedBy						varchar(64)			null,
updatedOn						timestamp			null,
constraint          			p_AccBlncHtry       primary key  (accountBalanceHistoryID)
);
/*
This table is for keeping daily raw data for Deposit from CBS in Excel
processDay			:	
processTime			:	
sol_id              :    
sol_desc            :    
cust_id             :    
gl_sub_head_code    :    
schm_code           :    
schm_desc           :    
foracid             :    
acct_name           :    
sector_code         :    
acct_occp_code      :    
addr                :   
acct_opn_timestamp  :     
close_flg           :     
acct_cls_timestamp  :     
acct_crncy_code     :     
rate                :     
tran_timestamp_bal  :     
prov                :     
rmcode              :     
gender              :     
date_of_birth       :     
deposit_period_mths :     
maturity_timestamp  :     
maturity_amount     :     
acct_status         :     
ac_status           :     
cust_occp_code      :     
auto_renew_flag     :     
sub_sector_code     :     
type                :    
sorttype            :     
division_name       :     
first_tran_timestamp:     
rmcode1             :     
*/
create table                                                DailyDepositRaw
(
processDay													date,
processTime													timestamp,
sol_id                                                      varchar(64),
sol_desc                                                    varchar(64),
cust_id                                                     varchar(64),
gl_sub_head_code                                            varchar(64),
schm_code                                                   varchar(64),
schm_desc                                                   varchar(64),
foracid                                                     varchar(64),
acct_name                                                   varchar(256),
sector_code                                                 varchar(64),
acct_occp_code                                              varchar(64),
addr                                                        varchar(350),
acct_opn_timestamp                                          timestamp,
close_flg                                                   varchar(64),
acct_cls_timestamp                                          timestamp,
acct_crncy_code                                             varchar(64),
rate                                                        numeric(15,3),
tran_timestamp_bal                                          numeric(15,3),
prov                                                        numeric(15,3),
rmcode                                                      numeric(15,3),
gender                                                      varchar(64),
date_of_birth                                               date,
deposit_period_mths                                         timestamp,
maturity_timestamp                                          timestamp,
maturity_amount                                             numeric(15,3),
acct_status                                                 varchar(64),
ac_status                                                   varchar(64),
cust_occp_code                                              varchar(64),
auto_renew_flag                                             varchar(64),
sub_sector_code                                             varchar(64),
type                                                        varchar(64),
sorttype                                                    varchar(64),
division_name                                               varchar(64),
first_tran_timestamp                                        timestamp,
rmcode1                                                     varchar(64)
);

/*
This table is for keeping daily raw data for Advance from CBS in Excel
processDay					  :
processTime					  :
sol_id                        :
sol_desc                      :
cust_id                       :
gl_sub_head_code              :
foracid                       :
substr_acct_name_1_30_        :
rmcode                        :
schm_code                     :
schm_desc                     :
acct_occp_code                :
acct_opn_timestamp            :
acct_cls_timestamp            :
close_flg                     :
prov                          :
ref_desc                      :
lim_sanct_timestamp           :
rate                          :
sanct_lim                     :
dis_amt                       :
lim_exp_timestamp1            :
pastdue                       :
tran_timestamp_bal            :
cramt                         :
addr                          :
proc_fee                      :
sub_sector_code               :
economic_purpose_code         :
guaranty_coverage_code        :
gender                        :
date_of_birth                 :
sanct_levl_code               :
sanct_auth_code               :
repay                         :
flow_amt                      :
inst_timestamp                :
num_of_flows                  :
lr_int_freq_type              :
overdue                       :
ate                           :
dueno                         :
cust_occp_code                :
rmcode_new                    :
rmname                        :
unitcode                      :
unitname                      :
currencycode                  :
tran_timestamp_bal_original   :
dollarrate                    :
*/
create table                                                DailyAdvanceRaw
(
processDay													date,
processTime													timestamp,
sol_id                                                      varchar(64),
sol_desc                                                    varchar(64),
cust_id                                                     varchar(64),
gl_sub_head_code                                            varchar(64),
foracid                                                     varchar(64),
substr_acct_name_1_30_                                      varchar(64),
rmcode                                                      varchar(64),
schm_code                                                   varchar(64),
schm_desc                                                   varchar(64),
acct_occp_code                                              varchar(64),
acct_opn_timestamp                                          timestamp,
acct_cls_timestamp                                          timestamp,
close_flg                                                   varchar(64),
prov                                                        numeric(15,3),
ref_desc                                                    varchar(64),
lim_sanct_timestamp                                         timestamp,
rate                                                        numeric(15,3),
sanct_lim                                                   numeric(15,3),
dis_amt                                                     numeric(15,3),
lim_exp_timestamp1                                          timestamp,
pastdue                                                     numeric(15,3),
tran_timestamp_bal                                          numeric(15,3),
cramt                                                       numeric(15,3),
addr                                                        varchar(350),
proc_fee                                                    numeric(15,3),
sub_sector_code                                             numeric(15,3),
economic_purpose_code                                       numeric(15,3),
guaranty_coverage_code                                      numeric(15,3),
gender                                                      varchar(64),
date_of_birth                                               date,
sanct_levl_code                                             varchar(64),
sanct_auth_code                                             varchar(64),
repay                                                       numeric(15,3),
flow_amt                                                    numeric(15,3),
inst_timestamp                                              timestamp,
num_of_flows                                                numeric(15,3),
lr_int_freq_type                                            varchar(64),
overdue                                                     numeric(15,3),
ate                                                         numeric(15,3),
dueno                                                       numeric,
cust_occp_code                                              varchar(64),
rmcode_new                                                  varchar(64),
rmname                                                      text,
unitcode                                                    varchar(64),
unitname                                                    varchar(64),
currencycode                                                varchar(64),
tran_timestamp_bal_original                                 numeric(15,3),
dollarrate                                                  numeric(15,3)                                             
);

/*
This table is for keeping daily raw data history log
processDay					  	:
rawType						  	: Advance or Deposit
processStatus					: Success or Error
statusMessage				  	: Error Message if Error
recordCount					  	: Number of rows in raw file
recordProcessed				  	: Number of rows processed and saved
*/
create table                                                DailyRawLog
(
processDay													date,
rawType														varchar(16),
processStatus												varchar(16),
statusMessage 												varchar(256),
recordCount                                          		numeric(8,0),
recordProcessed                                        		numeric(8,0)
);

/*
This table is for keeping MIS report data for Deporsit and Advanced
oid								  	:
reportDate						  	: date of the report
outleID								: oid of outlet
outletName						  	: name of outlet
totalDeposit         			  	: total deposit of outlet on a day
totalAdvance         				: total advance of outlet on a day
*/
create table                                                DASummaryByOutlet
(
oid															varchar(64)			NOT NULL,
reportDate													date,
outletID													varchar(16),
outletName													varchar(16),
totalDeposit                                          		numeric(22,2),
totalAdvance                                        		numeric(22,2)
);