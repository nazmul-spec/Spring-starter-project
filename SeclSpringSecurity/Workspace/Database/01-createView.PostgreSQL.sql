drop view if exists View_AccountBalanceHistory;


-- csbplatform view based on  AccountBalanceHistoryTable 

/*
For every month every account's last updated balance
*/
CREATE OR REPLACE VIEW View_AccountBalanceHistory AS
SELECT abh.productID, p.productName, abh.accountNo, abh.eodDate, abh.accountBalance, s.servicepointid, s.servicepointname, s.district
FROM
(
	SELECT a.productID, a.accountNo, a.eodDate, b.accountBalance
	FROM
	(
		SELECT productID, accountNo, MAX(eoddate) eodDate
		FROM accountbalancehistory
		GROUP BY to_char(eodDate, 'MON'), productID, accountNo
	) a
	LEFT JOIN
	(
		SELECT productID, accountNo, MAX(eoddate) eodDate, 
		accountBalance
		FROM accountbalancehistory
		GROUP BY to_char(eodDate, 'MON'), productID, accountNo, accountBalance
	) b
	ON a.productID = b.productID AND a.accountNo = b.accountNo AND a.eodDate = b.eodDate
) abh
LEFT JOIN account a ON a.bankaccountno = abh.accountno
LEFT JOIN servicepoint s ON s.servicepointid = a.servicepointid
LEFT JOIN product p ON p.productID = abh.productID;



