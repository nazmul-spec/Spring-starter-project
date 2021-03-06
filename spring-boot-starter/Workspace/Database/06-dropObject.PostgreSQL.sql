-- Drop tables from CSBanking

drop table if exists ChargeModelItem;
drop table if exists ChargeModelDef;
drop table if exists SegmentItem;
drop table if exists SegmentDef;

drop table if exists TagLink;
drop table if exists TagLib;
drop table if exists chequeDetail;
drop table if exists chequeCollection;
drop table if exists Remittance;
drop table if exists BillCollection;
drop table if exists ZoneAgent;
drop table if exists ZoneBranch;
drop table if exists CompanyZone;
drop table if exists UtilityCompany;
drop table if exists BillType;
drop table if exists TransLog;
drop table if exists ClientResponseLog;
drop table if exists ClientRequestLog;
drop table if exists ResponseLog;
drop table if exists RequestLog;
drop table if exists FingerPrintLog;
drop table if exists FingerPrint;
drop table if exists CustomerQRCardLog;
drop table if exists CustomerQRCard;
drop table if exists AgentDepositRequest;
drop table if exists AgentWithdrawalRequest;
drop table if exists AuditLog;
drop table if exists SignatoryInfo;
drop table if exists CustomerAccount;
drop table if exists Account;
drop table if exists AccountClosingLog;
drop table if exists Customer;
drop table if exists AgentServiceStaff;
drop table if exists ServiceTerminal;
drop table if exists ServicePoint;
drop table if exists OutletZone;
drop table if exists OutletArea;
drop table if exists TransactionProfileGroup;
drop table if exists PasswordResetLog;
drop table if exists AgentAccount;
drop table if exists Agent;
drop table if exists AgentCategory;
drop table if exists ChargeModel;
drop table if exists Branch;
drop table if exists Bank;
drop table if exists LoginTrail;
drop table if exists Login;
drop table if exists Role;
drop table if exists Product;
drop table if exists LeftMenu;
drop table if exists TopMenu;
drop table if exists MetaProperty;
drop table if exists DDLMetaData;
drop table if exists SMSLog;

COMMIT;

