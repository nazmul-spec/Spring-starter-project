

/*
Date 		: 2016-01-31 12:35:57
ID 			: 01
changedBy	: Mehedi
discription : Alter table chargeModelDef For adding isDefault column.
isDefault	: isDefault specify this chargeModel is default or not.
*/
alter table chargemodeldef
add isDefault 									varchar(2),
ADD constraint 									c_isDefault_ChargeModelDef				check 			(isDefault = 'Y' or isDefault = 'N') 
/*
Date 		: 2016-02-01 12:35:57
ID 			: 02
changedBy	: Mehedi
discription : Alter table transactionProfileGroup For adding tpgFor column.
tpgFor		: tpgFor specify for which this profile is(Transaction Profile for Account Operations or Agent Outlet Operations)
*/
alter table transactionProfileGroup 
Add tpgFor									VARCHAR(64) 						NOT NULL 			default ''

/*
Date 		: 2016-02-14 15:37:00
ID 			: 03
changedBy	: Mehedi
discription : Alter table servicepoint for( rename column tpgID TO outletTpID, drop constraint f_tpgID_ServicePoint and add constraint f_outletTpID_ServicePoint)
*/

alter table servicepoint
drop constraint f_tpgID_ServicePoint;

alter table servicepoint
rename column tpgID TO outletTpID;

alter table servicepoint
add constraint 									f_outletTpID_ServicePoint				foreign key 	(outletTpID)
																					references 		OutletTransactionProfile(outletTpID);

																					
																					
																					
-- 
ALTER table Account add dstApproverID							varchar(64);