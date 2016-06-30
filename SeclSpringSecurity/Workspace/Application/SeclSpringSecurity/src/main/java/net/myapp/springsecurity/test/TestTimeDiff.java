package net.myapp.springsecurity.test;

import java.sql.Timestamp;
import java.util.Date;

public class TestTimeDiff {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Timestamp a = new java.sql.Timestamp(new Date().getTime());

		Timestamp b = new java.sql.Timestamp(new Date().getTime());

		long diff = (b.getTime()- a.getTime())/ (1000 * 60 * 60 * 24);	
		System.out.println(diff);

	}

}
