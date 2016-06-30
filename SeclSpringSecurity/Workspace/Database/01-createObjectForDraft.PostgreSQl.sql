/*connect as csbplatform and create the following tables*/

/*drop objects if existing*/

/*Agent and Agent Outlet Group*/
drop table if exists AgentServiceStaffDraft;
drop table if exists ServiceTerminalDraft;
drop table if exists DSTOutletDraft;
drop table if exists DirectSalesTeamDraft;
drop table if exists ServicePointDraft;
drop table if exists AgentAccountDraft;
drop table if exists AgentDraft;

drop table if exists TagLinkDraft;
commit;

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

create table 								AgentDraft
(
agentID										varchar(64),
loginID										varchar(64),
password 									varchar(128),
bankID										varchar(64),
branchID									varchar(64),
parentAgentID								varchar(64),
agentType									varchar(16),
agentName 									varchar(128),
kycJson										text,
bankAccountNo								varchar(64),
status										varchar(8),
rejectionCause								varchar(512),
roleID										varchar(64),
agentCatID									varchar(64),
tagLibID									varchar(64),
makerID										varchar(32),
checkerID									varchar(32),
approverID									varchar(32),
createdBy 									varchar(64),
createdOn									timestamp,
updatedBy 									varchar(64),
updatedOn 									timestamp,
constraint 									p_Agent_DR									primary key 	(agentID)
);

/*
This table to be used to store associated Agent Account information with system.
agentAccID 									: An agent account associated with System to be Identified by agentID
accountNo									: Agent bank account number
accountType									: Type of account
agentID										: foreign key from agent table
*/
create table 								AgentAccountDraft
(
agentAccID									varchar(64),
accountNo									varchar(128),
accountType									varchar(64),
agentID										varchar(64),
constraint 									p_AgentAccount_DR							primary key 	(agentAccID)
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
create table 								ServicePointDraft
(
servicePointID								varchar(64),
servicePointName							varchar(128),
bankAccountNo								varchar(128),
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
applyDate									timestamp,
openingDate									timestamp,
servicePointStatus							varchar(8),
tin											varchar(128),
tradeLicence  								varchar(128),
statusNote									varchar(256),
rejectionCause								varchar(512),
bankID										varchar(64),
branchID									varchar(64),
makerID										varchar(32),
checkerID									varchar(32),
approverID									varchar(32),
agentID										varchar(64),
outletZoneID								varchar(64),
outletTpID									varchar(64),
createdBy 									varchar(64),
createdOn									timestamp,
updatedBy 									varchar(64),
updatedOn 									timestamp,
constraint 									p_ServicePoint_DR							primary key 	(servicePointID)
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
create table 								ServiceTerminalDraft
(
serviceTerminalID							varchar(64),
servicePointID								varchar(64),
serviceClientDeviceAddress 					varchar(128),
biometricDeviceAddress						varchar(128),
printerDeviceAddress						varchar(128),
cardDeviceAddress							varchar(128),
bankID										varchar(64),
branchID									varchar(64),
makerID										varchar(32),
checkerID									varchar(32),
approverID									varchar(32),
serviceTerminalStatus						varchar(8),
rejectionCause								varchar(512),
createdBy 									varchar(64),
createdOn									timestamp,
updatedBy 									varchar(64),
updatedOn 									timestamp,
constraint 									p_ServiceTerminal_DR					primary key 	(serviceTerminalID)
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
create table 								AgentServiceStaffDraft
(
OID											varchar(64),
assID										varchar(64),
servicePointID								varchar(64),
agentStaffName								varchar(128),
kycJson					 					text,
loginID										varchar(128),
password									varchar(128),
roleID										varchar(64),
agentID										varchar(64),
bankID										varchar(64),
branchID									varchar(64),
makerID										varchar(32),
checkerID									varchar(32),
approverID									varchar(32),
assStatus									varchar(8),
rejectionCause								varchar(512),
createdBy 									varchar(64),
createdOn									timestamp,
updatedBy 									varchar(64),
updatedOn 									timestamp,
constraint 									p_AgentServiceStaff_DR						primary key 	(assID)
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
create table 								DirectSalesTeamDraft
(
OID											varchar(64),
name										varchar(128),
loginID										varchar(128),
email 										varchar(256),
mobileNo									varchar(64),
photoPath									varchar(256),
bankID										varchar(64),
branchID									varchar(64),
makerID										varchar(32),
checkerID									varchar(32),
approverID									varchar(32),
status										varchar(8),
gender										varchar(8),
rejectionCause								varchar(512),
createdBy 									varchar(64),
createdOn									timestamp,
updatedBy 									varchar(64),
updatedOn 									timestamp,
constraint 									p_DSalesTeam_DR							primary key 	(OID)
);


/*
This table to be used to store associated Agent Account information with system.
dstOutletID 									: A DSTOutlet associated with system to be identified by dstOutletID.
OID												: DirectSalesTeam table uniqueID
dstRMNumber										: DirectSalesTeam table loginID. Note: RM number means DST employee ID
servicePointID									: Associated Service point for DST
*/
create table 								DSTOutletDraft
(
dstOutletID									varchar(64),
OID											varchar(128),
dstRMNumber									varchar(64),
servicePointID								varchar(64),
constraint 									p_dstOutletID_DR							primary key 	(dstOutletID)
);

/*
This table to be used to store tag link information
tagLinkID 									: 
entityID									: 
entityCode									: 
tagLibID                                    : 
*/
create table								TagLinkDraft
(
tagLinkID									varchar(64),
entityID									varchar(64),
entityCode									varchar(128),
tagLibID									varchar(64),
constraint 									p_tLinkID_TLinkDraft					primary key 	(tagLinkID)
);