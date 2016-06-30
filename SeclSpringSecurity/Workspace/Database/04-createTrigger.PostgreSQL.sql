CREATE OR REPLACE FUNCTION tr_au_Subledger()   
RETURNS trigger AS 
$BODY$
 
BEGIN
--set @changeSet = DATE_FORMAT(NOW(), '%Y%m%d%H%i%s');
	if (new.subledgerName != old.subledgerName) then
		insert into AuditTrail	
			(tableName, rowKey, changeSet, columnName, changeTime, oldValue, newValue, changedBy) 
		values 					
			("Subledger", old.subledgerID, @changeSet, "subledgerName", NOW(), old.subledgerName, new.subledgerName, new.changedBy);
	end if;
	if (new.subledgerType != old.subledgerType) then
		insert into AuditTrail 
			(tableName, rowKey, changeSet, columnName, changeTime, oldValue, newValue, changedBy) 
		values 
			("Subledger", old.subledgerID, @changeSet, "subledgerType", NOW(), old.subledgerType, new.subledgerType, new.changedBy);
	end if;
	if (new.openingBalance != old.openingBalance) then
		insert into AuditTrail 
			(tableName, rowKey, changeSet, columnName, changeTime, oldValue, newValue, changedBy) 
		values 
			("Subledger", old.subledgerID, @changeSet, "openingBalance", NOW(), old.openingBalance, new.openingBalance, new.changedBy);
	end if;
	if (new.subledgerBalance != old.subledgerBalance) then
		insert into AuditTrail 
			(tableName, rowKey, changeSet, columnName, changeTime, oldValue, newValue, changedBy) 
		values 
			("Subledger", old.subledgerID, @changeSet, "subledgerBalance", NOW(), old.subledgerBalance, new.subledgerBalance, new.changedBy);
	end if;
	if (new.closingBalance != old.closingBalance) then
		insert into AuditTrail 
			(tableName, rowKey, changeSet, columnName, changeTime, oldValue, newValue, changedBy) 
		values 
			("Subledger", old.subledgerID, @changeSet, "closingBalance", NOW(), old.closingBalance, new.closingBalance, new.changedBy);
	end if;
	if (new.subledgerStatus != old.subledgerStatus) then
		insert into AuditTrail 
			(tableName, rowKey, changeSet, columnName, changeTime, oldValue, newValue, changedBy) 
		values 
			("Subledger", old.subledgerID, @changeSet, "subledgerStatus", NOW(), old.subledgerStatus, new.subledgerStatus, new.changedBy);
	end if;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE

