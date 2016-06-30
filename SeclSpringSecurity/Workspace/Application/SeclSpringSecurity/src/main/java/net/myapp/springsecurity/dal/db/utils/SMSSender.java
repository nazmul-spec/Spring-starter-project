package net.myapp.springsecurity.dal.db.utils;

import net.myapp.springsecurity.dal.db.utils.RestClient.RequestMethod;



public class SMSSender {

	
	private static final String SERVER_BASE_URL = "http://localhost:4231/";

	public static void CallAll() throws Exception {
		
	
		sendSMS("+8801914012488","Md. Jamal Uddin","05001-01000002");

	}

	private static String getSms(String customerName, String accountID)
	{
		return "Dear "+customerName+", Your A/C No. "+accountID+" has been approved by bank.";
	}

	public static void sendSMS(String mobileNo, String customerName, String accountID) {
		
		try {
			RestClient restClient = new RestClient(SERVER_BASE_URL + "sms/"
					+ "sendSMS","","");
			restClient.AddHeader("Content-Type", "application/json");

			restClient.AddParam("mobileNumber", mobileNo);
			restClient.AddParam("sms", getSms(customerName,accountID));
			restClient.Execute(RequestMethod.POST);
			
			
			
		} catch (Exception exception) {
			exception.printStackTrace();
		}
	}

}
