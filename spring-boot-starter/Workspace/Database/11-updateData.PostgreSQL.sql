-- Update rows from csbplatform database

--Date: 03-08-2015
--Description: Update chargeModel for Showing only active charge model in csbPlatformWebApp (Ticket #26 in NRBCB-CSB)
--Added By: Mehedi
--ID: 01
UPDATE ChargeModel set status = 'I' 
WHERE ChargeKey NOT IN('CashDeposit','CashWithdrawal','FundTransfer', 'ACOpenSaving', 'ACOpenCurrentDeposit', 'ACOpenSND','BalanceInquiry', 'MiniStatement');
commit;
