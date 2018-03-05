-- Truncate rows from CSBanking database without dropping the tables
 
truncate table ChargeModelItem;
truncate table ChargeModelDef;
truncate table SegmentItem;
truncate table SegmentDef;

truncate table TagLink;
truncate table TagLib;
truncate table chequeDetail;
truncate table chequeCollection;
truncate table Remittance;
truncate table BillCollection;
truncate table ZoneAgent;
truncate table ZoneBranch;
truncate table CompanyZone;
truncate table UtilityCompany;
truncate table BillType;
truncate table TransLog;
truncate table ClientResponseLog;
truncate table ClientRequestLog;
truncate table ResponseLog;
truncate table RequestLog;
truncate table FingerPrintLog;
truncate table FingerPrint;
truncate table CustomerQRCardLog;
truncate table CustomerQRCard;
truncate table AgentDepositRequest;
truncate table AgentWithdrawalRequest;
truncate table AuditLog;
truncate table SignatoryInfo;
truncate table CustomerAccount;
truncate table Account;
truncate table AccountClosingLog;
truncate table Customer;
truncate table AgentServiceStaff;
truncate table ServiceTerminal;
truncate table ServicePoint;
truncate table OutletZone;
truncate table OutletArea;
truncate table TransactionProfileGroup;
truncate table PasswordResetLog;
truncate table AgentAccount;
truncate table Agent;
truncate table AgentCategory;
truncate table ChargeModel;
truncate table Branch;
truncate table Bank;
truncate table LoginTrail;
truncate table Login;
truncate table Role;
truncate table Product;
truncate table LeftMenu;
truncate table TopMenu;
truncate table MetaProperty;
truncate table DDLMetaData;
truncate table SMSLog;


COMMIT;

