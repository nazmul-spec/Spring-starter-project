/*connect as csbplatform and create the following tables*/

/*drop objects if existing*/

/*Utility and Charges Group*/
drop table if exists DailyRawLog;
drop table if exists PasswordHistory;
drop table if exists PasswordPolicy;


/*Log Group*/
drop table if exists SMSLog;
drop table if exists PasswordResetLog;
drop table if exists AuditLog;
drop table if exists LoginTrail;

/*Bank, Branch information Group*/
drop table if exists Branch;
drop table if exists Bank;


/*User login info and access role Group*/
drop table if exists Login;
drop table if exists Role;
drop table if exists LeftMenu;
drop table if exists TopMenu;
drop table if exists MetaProperty;

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


CREATE TABLE logging_event
(
  timestmp 									bigint 									NOT NULL,
  formatted_message 						text									NOT NULL,
  logger_name 								varchar(254) 							NOT NULL,
  level_string 								varchar(254) 							NOT NULL,
  thread_name 								varchar(254),
  reference_flag 							smallint,
  arg0									    varchar(254),
  arg1 										varchar(254),
  arg2 										varchar(254),
  arg3 										varchar(254),
  caller_filename 							varchar(254) 							NOT NULL,
  caller_class 								varchar(254) 							NOT NULL,
  caller_method 							varchar(254) 							NOT NULL,
  caller_line 								character(4) 							NOT NULL,
  event_id  								serial 									NOT NULL ,
  
  CONSTRAINT 								p_logging_event PRIMARY KEY (event_id)
)

CREATE TABLE logging_event_exception
(
  event_id 									bigint 									NOT NULL,
  i 										smallint 								NOT NULL,
  trace_line 								varchar(254) 							NOT NULL,
  
  CONSTRAINT logging_event_exception_pkey PRIMARY KEY (event_id, i),
  
  CONSTRAINT logging_event_exception_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.logging_event (event_id)
    
)

CREATE TABLE logging_event_property
(
  event_id 									bigint 									NOT NULL,
  mapped_key 								varchar(254) 							NOT NULL,
  mapped_value 								text,
  
  CONSTRAINT logging_event_property_pkey PRIMARY KEY (event_id, mapped_key),
  CONSTRAINT logging_event_property_event_id_fkey FOREIGN KEY (event_id)REFERENCES public.logging_event (event_id)
)
