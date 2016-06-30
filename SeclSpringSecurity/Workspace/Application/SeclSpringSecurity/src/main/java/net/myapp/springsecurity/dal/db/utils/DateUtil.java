package net.myapp.springsecurity.dal.db.utils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class DateUtil {
	
	private static final Logger logger = LoggerFactory.getLogger(DateUtil.class); 
	
	private static String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
	private static String DATE_TIME_FORMAT1 = "yyyy/MM/dd HH:mm:ss";
	private static String DATE_TIME_FORMAT2 = "yyyy-MM-dd";
	
	public synchronized String getFormatDate(final String dateFormat, Date date)
	{
		if(dateFormat != null || !dateFormat.isEmpty())
		{
			DATE_TIME_FORMAT = dateFormat;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_TIME_FORMAT);
		return sdf.format(date);
	}
		
	public synchronized Date getFormatDate(final String dateFormat, String strDate)
	{
		if(dateFormat != null || !dateFormat.isEmpty())
		{
			DATE_TIME_FORMAT = dateFormat;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_TIME_FORMAT);
		Date date = null;
		try 
		{
			date = sdf.parse(strDate);
		}
		catch (Exception e) 
		{
			logger.error("An Exception occured while parse a Date String to Date Object : ", e);
		}
		return date; 
	}

	public synchronized final String getSystemDate(final String dateFormat)
	{
		if(dateFormat != null || !dateFormat.isEmpty())
		{
			DATE_TIME_FORMAT = dateFormat;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_TIME_FORMAT);
		return sdf.format(new Date());
	}
	
	public Date getCurrentDateTime()
	{
		return getFormatDate(DATE_TIME_FORMAT1, getSystemDate(DATE_TIME_FORMAT1));
	}
	
	public synchronized String convertUTCDate(final String dateFormat, String strDate,TimeZone tz)
	{
		SimpleDateFormat sdf = new SimpleDateFormat();
		try
		{
			if(dateFormat != null || !dateFormat.isEmpty())
			{
				DATE_TIME_FORMAT = dateFormat;
			}
			sdf.applyPattern(DATE_TIME_FORMAT);
			sdf.setTimeZone(tz);
			Date date = sdf.parse(strDate);		
			sdf.setTimeZone(TimeZone.getTimeZone("UTC"));			
			strDate = sdf.format(date);
		}
		catch (ParseException e)
		{
			logger.error("An Exception occured while convert a UTC Date to Local Date : ", e);
		}
		return strDate;
	}
	
	public synchronized String convertLocalDate(final String dateFormat, String strDate, TimeZone tz)
	{
		SimpleDateFormat sdf = new SimpleDateFormat();
		try
		{
			if(dateFormat != null || !dateFormat.isEmpty())
			{
				DATE_TIME_FORMAT = dateFormat;
			}
			sdf.applyPattern(DATE_TIME_FORMAT);
			sdf.setTimeZone(TimeZone.getTimeZone("UTC"));			
			Date date = sdf.parse(strDate);
			sdf.setTimeZone(tz);
			strDate = sdf.format(date);
		}
		catch (ParseException e)
		{
			logger.error("An Exception occured while convert a UTC Date to Local Date : ", e);
		}
		return strDate;
	}
	
	
	public String getStringDateFromDate(Date date)
	{
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATE_TIME_FORMAT2);
		
		try 
		{
			String dateStr=simpleDateFormat.format(date).toString();
			return dateStr;
		} 
		catch (Exception e) 
		{
			return null;
		}
	}
	
	public String getMMDDYYYYStringDateFromDate(Date date)
	{
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("mm/dd/yyyy");
		
		try 
		{
			String dateStr=simpleDateFormat.format(date).toString();
			return dateStr;
		} 
		catch (Exception e) 
		{
			return null;
		}
	}
	
	public String getDateTime(final String dateFormat, Date date)
	{
		if(dateFormat != null || !dateFormat.isEmpty())
		{
			DATE_TIME_FORMAT = dateFormat;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_TIME_FORMAT);
		return sdf.format(date);
	}
	
	public Timestamp getTimestamp(Date date)
	{
		try{
			return	new java.sql.Timestamp(date.getTime());
		}catch (Exception e){
			return null;
		}
	}
	
	public static Timestamp getTimestamp(String dateString, String dateFormate)
	{
		String DATE_TIME = "yyyy-MM-dd HH:mm:ss";
		if(dateFormate != null){
			DATE_TIME = dateFormate;
		}
		try{
			SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_TIME);
		    Date parsedDate = dateFormat.parse(dateString);
		    return new java.sql.Timestamp(parsedDate.getTime());
		}catch (Exception e){
			return null;
		}
	}
	
	public String getDateStrFromTimeStamp(Timestamp dateTime, String dateFormate){
		String DATE_FORMATE = "yyyy-MM-dd HH:mm:ss";
		String DATE_STR = null;
		if(dateFormate != null){
			DATE_FORMATE = dateFormate;
		}
		try{
			DATE_STR = new SimpleDateFormat(DATE_FORMATE).format(dateTime);
		}catch(Exception e){
			return null;
		}
		return DATE_STR;
	}
	
	public Date getDateFromTimeStamp(Timestamp dateTime){
		Date date = new Date();
		long longDate = 0L;
		
		if(dateTime != null)
		{
			try{
				longDate = dateTime.getTime();
				date = new Date(longDate);
			}catch(Exception e){
				logger.error("",e);
			}
		}
		
		return date;		
	}
	
	public int getTimeDiff(Timestamp dateTime1, Timestamp dateTime2){
		try {
			return (int) ((dateTime1.getTime() - dateTime2.getTime())/ (1000 * 60 * 60 * 24));
		} catch (Exception e) {
			logger.error("", e);
			return 0;
		}
	}
	
}
