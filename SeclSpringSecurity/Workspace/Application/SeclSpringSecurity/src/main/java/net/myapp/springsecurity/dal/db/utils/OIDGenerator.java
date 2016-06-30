package net.myapp.springsecurity.dal.db.utils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

/**
 * this class used to generate oid 
 * @author jamal
 *
 */
		
public class OIDGenerator
{
	private static final int NUM_CHARS = 12;
	private static final int NUM_CHARS9 = 9;
	private static String chars = "abcdefghijklmonpqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	private static Random r = new Random();
	
	// get object id base on time
	public static String getOID()
	{
		return Long.toString(System.nanoTime());
	}
	
	// get current time milli second in string
	public static String getMilliSecStr()
	{
		return String.valueOf(System.currentTimeMillis());
	}
	

	public static synchronized String generateId()
	{
		Date today = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd-HHmmss");
		
		String todayAsString = df.format(today);
		
		return todayAsString + "-" + generateRandormNumber(NUM_CHARS);
	}
	
	public static synchronized String generateId(String className)
	{
		Date today = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd-HHmmss");
		
		String todayAsString = df.format(today);
		
		return className+"-"+todayAsString + "-" + generateRandormNumber(NUM_CHARS);
	}
	
	public static synchronized String generatePeriodId()
	{
		return "FY" + generateRandormNumber(NUM_CHARS9);
	}
	
	public static synchronized String generateRandormNumber(int length)
	{
		char[] buf = new char[length];
		
		for (int i = 0; i < buf.length; i++)
		{
			
			buf[i] = chars.charAt(r.nextInt(chars.length()));
			
		}
		return new String(buf);
	}
	public static String generateBankID(int maxNum)
	{
		String cashID = "";
		 
		int maxCashNum = maxNum + 1;		
		
		if(maxCashNum < 10)
		{
			cashID += "10" + maxCashNum;
		}
		else if(maxCashNum < 100)
		{
			cashID += "1" + maxCashNum;
		}				
		else
		{
			cashID += String.valueOf(maxCashNum);
		}
		return cashID;
	}


	
	public static synchronized String getOID(long maxNumber, String preffix, int minDigit) {
		String id = new String();
		id = preffix + String.format("%0" + minDigit + "d", maxNumber + 1);
		return id;
	}
}
