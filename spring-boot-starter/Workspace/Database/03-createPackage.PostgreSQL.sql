-- csbplatform database procedures

/* function proc_generate_calendar() is to 
generate full year work calendar. Where each day will define as working day or holiday.
If working day then define working time (Start time and End time).
If holiday then name description.
*/

DROP function IF EXISTS proc_generate_calendar(varchar(64), varchar(64), weekendType[]);
DROP type IF EXISTS weekendType;
DROP type IF EXISTS holidayType;
create type weekendType as (shortName varchar(64), fullName varchar(64), inx numeric(8,0), enabled boolean, startTime varchar(64), endTime varchar(64));
create type holidayType as (name varchar(64), description text, effectiveDate date);

create or replace function proc_generate_calendar (calID varchar(64), chngby varchar(64), weekendRec weekendType[], holidayRec holidayType[]) returns void AS $proc_generate_calendar$
	declare			
		calendarCoursor CURSOR FOR SELECT * FROM Calendar WHERE calendarID = calID;
		i 												integer;
		daysOfYear										integer;
		weekendRecords 									weekendType[];	
		holidayRecords 									holidayType[];	
		weekendRecord									weekendType;
		holidayRecord									holidayType;
		weekDetailIDs			 						integer[];
		status											varchar(8);
		statusHoliday									varchar(8);
		statusWorkDay									varchar(8);
		statusWeekend									varchar(8);
		statusGenerate									varchar(8);
		calendarDay										varchar(8);
		calendarMonth									varchar(8);
		startHour										varchar(8);
		startMunite										varchar(8);
		endHour											varchar(8);
		endMunite										varchar(8);
		oid												varchar(64);
		cid												varchar(64);
		cYear											varchar(64);
		calendarDateStr									varchar(16);
		calendarDate									date;
		calendarDetailRow								calendardetails%rowtype;
				
	BEGIN	
		statusHoliday := 'HD'; statusWorkDay := 'WD'; statusWeekend := 'WE'; statusGenerate := 'G';
		weekendRecords := weekendRec;
		holidayRecords := holidayRec;
		
		for cal in calendarCoursor loop
			cid := calID;
			cYear := cal.calendarYear;
			calendarDateStr := CONCAT(cal.calendarYear, '-01-01');
			calendarDate := to_date(calendarDateStr, 'YYYY-MM-DD');
			daysOfYear := 365;
		
			IF EXTRACT(year FROM (to_date(calendarDateStr, 'YYYY-MM-DD') + integer '365'))='2016' THEN
				daysOfYear := 366;
			END IF;
			
			i := 0;
			LOOP
				i := i+1;
				IF i > daysOfYear THEN
			        EXIT; 
			    END IF;
			    
				weekendRecord := weekendRecords[ EXTRACT(DOW FROM (calendarDate)) + 1];
			    calendarDateStr := to_char(calendarDate, 'YYYY-MM-DD');
			    calendarDay := EXTRACT(DAY FROM DATE(calendarDate));
			    calendarMonth := EXTRACT(MONTH FROM DATE(calendarDate));
			    startHour := SUBSTRING(weekendRecord.startTime from 1 for 2);
			    startMunite := SUBSTRING(weekendRecord.startTime from 4 for 2);
			    endHour := SUBSTRING(weekendRecord.endTime from 1 for 2);
			    endMunite := SUBSTRING(weekendRecord.endTime from 4 for 2);
			    oid := CONCAT(calendarDateStr, '-', calID, '-', i);
			    
			    IF weekendRecord.enabled THEN
			    	status := statusWeekend;
			    ELSE
			    	status := statusWorkDay;
			    END IF;
			    
				INSERT INTO CalendarDetails
				(calendardetailid, calendarID, calendaryear, effectivedate, name, description, status, daynum, monthnum, starthour,
				startminute, endhour, endminute, createdBy, createdon)
				VALUES(oid, cid, cYear, calendarDate, weekendRecord.fullName, weekendRecord.fullName, status, calendarDay, calendarMonth, 
				startHour, startMunite, endHour, endMunite, chngby, now());	
				
				calendarDate := (calendarDate + integer '1');
			END LOOP;
			
			i := 0;
			FOREACH holidayRecord IN ARRAY holidayRecords LOOP
			    calendarDay := EXTRACT(DAY FROM DATE(holidayRecord.effectiveDate));
			    calendarMonth := EXTRACT(MONTH FROM DATE(holidayRecord.effectiveDate));
				i := i+1;
				
				FOR calendarDetailRow IN SELECT * FROM calendardetails where effectiveDate = holidayRecord.effectiveDate and calendarID = calID LOOP
			       IF calendarDetailRow.status = statusWorkDay THEN
			       		UPDATE calendardetails SET name = holidayRecord.name, description = holidayRecord.description, 
			       		status = statusHoliday, updatedBy = chngby, updatedOn = now() 
			       		WHERE calendarDetailID = calendarDetailRow.calendarDetailID;
			       ELSE
			       		INSERT INTO CalendarDetails
						(calendardetailid, calendarID, calendaryear, effectivedate, name, description, status, daynum, monthnum, 
						createdBy, createdon)
						VALUES(
						CONCAT(calendarDetailRow.calendarDetailID, '-', i), calID, calendarDetailRow.calendarYear, holidayRecord.effectiveDate,
						holidayRecord.name, holidayRecord.description, statusHoliday, calendarDay, calendarMonth, chngby, now());	
			       END IF;
			    END LOOP;
       		END LOOP;
		END LOOP;
		
		UPDATE Calendar SET status = statusGenerate where calendarID = calID;
	END;
	
$proc_generate_calendar$ language plpgsql;


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



