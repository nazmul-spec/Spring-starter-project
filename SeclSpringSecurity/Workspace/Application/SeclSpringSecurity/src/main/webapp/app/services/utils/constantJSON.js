
'use strict';

define(['app'], function (app) {

	var constantJSON = function ($rootScope) {
		
		this.accountReports = [
		                         {"id": 'Acc_Opening_Report', 					"name": "Acc_Opening_Report"},
		                         {"id": 'Acc_Opening_BO_Report',				"name": "Acc_Opening_BO_Report"},
		                         {"id": 'Acc_Summ_Report', 						"name": "Acc_Summ_Report"},
		                         {"id": 'Acc_Summ_BO_Report', 					"name": "Acc_Summ_BO_Report"},
		                         {"id": 'Acc_Monthly_Summ_Report', 				"name": 'Acc_Monthly_Summ_Report'},
		                         {"id": 'Acc_Monthly_Summ_BO_Report', 			"name": 'Acc_Monthly_Summ_BO_Report'},
		                         {"id": 'Approved_AccountOpening_List', 		"name": 'Approved_AccountOpening_List'}
	                          ];
		
		this.summaryReports =  [
		                         {"id": 'Deposit_Transaction_Report', 					"name": "Deposit_Transaction_Report"},
		                         {"id": 'Deposit_Transaction_BO_Report', 				"name": "Deposit_Transaction_BO_Report"},
		                         {"id": 'Withdrawl_Transaction_Report', 				"name": "Withdrawl_Transaction_Report"},
		                         {"id": 'Withdrawl_Transaction_BO_Report', 				"name": "Withdrawl_Transaction_BO_Report"},
		                         {"id": 'DepositWithdrawl_Summary_Report', 				"name": "DepositWithdrawl_Summary_Report"},
		                         {"id": 'DepositWithdrawl_Summary_BO_Report', 			"name": "DepositWithdrawl_Summary_BO_Report"},
		                         {"id": 'Monthly_Summary_Deposit_Report', 				"name": "Monthly_Summary_Deposit_Report"},
		                         {"id": 'Monthly_Summary_Deposit_Report_BO', 			"name": "Monthly_Summary_Deposit_Report_BO"},
		                         {"id": 'Monthly_Summary_FundTransfer_Report', 			"name": "Monthly_Summary_FundTransfer_Report"},
		                         {"id": 'Monthly_Summary_FundTransfer_BO_Report', 		"name": "Monthly_Summary_FundTransfer_BO_Report"},
		                         {"id": 'Fund_Transfer_Detail_Report', 					"name": "Fund_Transfer_Detail_Report"},
		                         {"id": 'Fund_Transfer_Detail_Report_BO', 				"name": "Fund_Transfer_Detail_Report_BO"},
		                         {"id": 'Fund_Transfer_Summary_Report', 				"name": "Fund_Transfer_Summary_Report"},
		                         {"id": 'Fund_Transfer_Summary_Report_BO', 				"name": "Fund_Transfer_Summary_Report_BO"}
	                           ];

		this.agentReportTypes = [
			                         {"agentReportID": 'Agent_Details', 			"agentReportName": "Agent_Details"},
			                         {"agentReportID": 'Agent_List', 				"agentReportName": "Agent_List"}
		                         ];

		this.statisticalTypes = [
		                         {statisticalID: 'User_Status', 							statisticalName: 'User_Status'}
		                        ];
		this.remittanceTypes = [
		                         {remittanceID: 'Remittance_Report',				 							remittanceName: 'Remittance_Report'},
		                         {remittanceID: 'Inward_Remittance_Detail_BO',				 					remittanceName: 'Inward_Remittance_Detail_BO'},
		                         {remittanceID: 'Remittance_Report_Outlet_Wise',				 				remittanceName: 'Remittance_Report_Outlet_Wise'},
		                         {remittanceID: 'Remittance_Report_Daily_Bank_Wise', 							remittanceName: 'Remittance_Report_Daily_Bank_Wise'},
		                         {remittanceID: 'Remittance_Report_Daily_Branch_Wise', 							remittanceName: 'Remittance_Report_Daily_Branch_Wise'},
		                         {remittanceID: 'Remittance_Report_Daily_Agent_Wise', 							remittanceName: 'Remittance_Report_Daily_Agent_Wise'},
		                         {remittanceID: 'Remittance_Report_Monthly_Outlet_Wise', 						remittanceName: 'Remittance_Report_Monthly_Outlet_Wise'},
		                         {remittanceID: 'Remittance_Report_Monthly_Summary_BO', 						remittanceName: 'Remittance_Report_Monthly_Summary_BO'},
		                         {remittanceID: 'Remittance_Report_Summary', 									remittanceName: 'Remittance_Report_Summary'},
		                         {remittanceID: 'Remittance_Report_Summary_BO', 								remittanceName: 'Remittance_Report_Summary_BO'},
		                         ];
		this.remittanceTypesBranchWise = [
		                         {remittanceID: 'Remittance_Report',				 							remittanceName: 'Remittance_Report'},
		                         {remittanceID: 'Remittance_Report_Daily_Branch_Wise', 							remittanceName: 'Remittance_Report_Daily_Branch_Wise'},
		                         {remittanceID: 'Remittance_Report_Daily_Agent_Wise', 							remittanceName: 'Remittance_Report_Daily_Agent_Wise'},
		                         ];
		this.customerTypes = [
		                      {customerID: 'Customer_Details', 			customerName: 'Customer_Details'}
		                     ];

		this.rebBillTypeJSON = [
		                           {rebID: 'Daily_Report_Zone_Wise',			rebName: 'Daily_Report_Zone_Wise'},
		                           {rebID: 'Daily_Report_Branch_Wise',			rebName: 'Daily_Report_Branch_Wise'},
		                           {rebID: 'Daily_Report_Sum_Zone_Wise', 		rebName: 'Daily_Report_Sum_Zone_Wise'},
		                           {rebID: 'Daily_Report_Sum_Branch_Wise',		rebName: 'Daily_Report_Sum_Branch_Wise'}
		                       ];
		
		this.rebBillTypeJSONBranchWise = [
		                           {rebID: 'Daily_Report_Branch_Wise',			rebName: 'Daily_Report_Branch_Wise'}
		                         ];
		
		this.chequeCollectionReportJSONAdmin = [
		                           {url: 'Daily_Bank_Cheque_Collection_Report',			text: 'Daily_Bank_Cheque_Collection_Report'},
		                           {url: 'DateWise_Bank_Cheque_Collection_Report',		text: 'DateWise_Bank_Cheque_Collection_Report'},
		                           {url: 'Daily_Branch_Cheque_Collection_Report', 		text: 'Daily_Branch_Cheque_Collection_Report'},
		                           {url: 'DateWise_Branch_Cheque_Collection_Report',	text: 'DateWise_Branch_Cheque_Collection_Report'},
		                           {url: 'Daily_Agent_Cheque_Collection_Report', 		text: 'Daily_Agent_Cheque_Collection_Report'},
		                           {url: 'DateWise_Agent_Cheque_Collection_Report',		text: 'DateWise_Agent_Cheque_Collection_Report'}
		                       ];
		this.chequeCollectionReportJSONBranch = [
				                           
				                           {url: 'Daily_Branch_Cheque_Collection_Report', 		text: 'Daily_Branch_Cheque_Collection_Report'},
				                           {url: 'DateWise_Branch_Cheque_Collection_Report',	text: 'DateWise_Branch_Cheque_Collection_Report'},
				                           {url: 'Daily_Agent_Cheque_Collection_Report', 		text: 'Daily_Agent_Cheque_Collection_Report'},
				                           {url: 'DateWise_Agent_Cheque_Collection_Report',		text: 'DateWise_Agent_Cheque_Collection_Report'}
				                       ];
		this.chequeCollectionReportJSONAgent = [
				                           
				                           {url: 'Daily_Agent_Cheque_Collection_Report', 		text: 'Daily_Agent_Cheque_Collection_Report'},
				                           {url: 'DateWise_Agent_Cheque_Collection_Report',		text: 'DateWise_Agent_Cheque_Collection_Report'}
				                       ];
		
		this.miscellaneousTypes = [
		                           {miscellaneousID: 'SMS_LOG_REPORT', 					miscellaneousName: 'SMS_LOG_REPORT'}
		                          ];
		
		this.misReportJSONAdmin = [
				                   {misID: 'Agent_Outlet_Wise_Mis_Report',			misName: 'Agent_Outlet_Wise_Mis_Report'}
				                  ];

		this.requestTraceLinks = [
		                          {requestTraceID: 'Request_Trace', 		requestTraceName: 'Request_Trace'},
		                          {logAnalyzerID: 'LogAnalyzer', 			logAnalyzerName: 'LogAnalyzer'},
		                          {auditLogID: 'AuditLog', 					auditLogName: 'AuditLog'}
		                          ];

		this.saAdlMenu = [
		                  {topmenuid:"Request_Trace",leftmenuids: 				["Request_Trace"]},
		                  {topmenuid:"LogAnalyzer",leftmenuids: 				["LogAnalyzer"]},
		                  {topmenuid:"Analytics_TopMenu",leftmenuids: 			["Request_Trace_Details", "AuditLog"]},
		                  {topmenuid:"Security_TopMenu",leftmenuids: 			["Security_ResetPassword"]},
		                  {topmenuid:"NAN",leftmenuids: 						["NAN"]},
		                  {topmenuid:"Profile",leftmenuids: 					["Profile"]}
		                  ];

		this.adAdlMenu = [ 
		                  {topmenuid:"Bank_TopMenu",leftmenuids:				["Branch_ViewDetail"]},
		                  {topmenuid:"ServicePoint_TopMenu",leftmenuids:		["Agent_Agent_BM","Agent_Agent_BA","Agent_ResetPassword","New_Agent_Staff", "New_Agent_Staff_ViewDetails", "Service_Point_Creator","Service_Point_Creator_BM","Service_Point_Creator_BA", "Service_Point_ViewDetails", "Service_Terminal_BM", "Service_Terminal_ViewDetails","Service_Terminal_BA", "Service_Terminal_Admin_BA", "Agent_Staff_Service_BM","Agent_Staff_Service_BA"]},
		                  {topmenuid:"Customer_TopMenu",leftmenuids:			["Customer_Customer","CustomerInfo_MAKE","CustomerInfo_APPROVE","Customer_Account_Creator_BM","Customer_Account_Creator_BA","Account_AccountDetails"]},
		                  {topmenuid:"Service_TopMenu",leftmenuids:			    ["Foreign_Remittance_Creator_BM","Foreign_Remittance_Creator_BM"]},
	                      {topmenuid:"AgentServiceStaff_TopMenu",leftmenuids:	["New_Agent_Staff_Service_BM","New_Agent_Staff_Service_BA","New_Agent_Staff_ViewDetails"]},
		                  {topmenuid:"AgentReport",leftmenuids: 				["Acc_Opening_Report","Acc_Opening_Bo_Report","Acc_Summ_Report","Acc_Summ_BO_Report","Acc_Monthly_Summ_Report","Acc_Monthly_Summ_BO_Report","Approved_AccountOpening_List","Agent_Details","Agent_List","Fund_In_Out_Agent_Wise","Agent_Statement","Branch_Officer_FundInOut","Monthly_Summary_Deposit_Report","Monthly_Summary_Deposit_Report_BO","Deposit_Transaction_Report","Deposit_Transaction_BO_Report","Withdrawl_Transaction_Report","Withdrawl_Transaction_BO_Report","DepositWithdrawl_Summary_Report","DepositWithdrawl_Summary_BO_Report","Fund_Transfer_Detail_Report","Monthly_Summary_FundTransfer_Report","Monthly_Summary_FundTransfer_BO_Report","Fund_Transfer_Summary_Report","Fund_Transfer_Detail_Report_BO","Fund_Transfer_Summary_Report_BO"]},
		                  {topmenuid:"CustomerReport",leftmenuids: 				["Customer_Details","AccountList_Branch_Wise","AccountList_Summary","Account_Statement","Account_Listing_Report","Account_Listing_Summary_Report","Enrollment_Account_Listing_Report","Enrollment_Account_Listing_Summary_Report"]},
		                  {topmenuid:"StatisticalReport",leftmenuids: 			["User_Status","Deposit_Summary_Product_wise","Transaction_Report","Transaction_Summary_Product_wiseTotal","Transaction_Listing_Report","Transaction_Listing_Summary","Toll_Collection_Report"]},
		                  {topmenuid:"BillCollectionREBReport",leftmenuids: 	["Daily_Report_Zone_Wise","Daily_Report_Branch_Wise","Daily_Report_Sum_Zone_Wise","Daily_Report_Sum_Branch_Wise","Daily_R_Stamp_Report_Zone_Wise","Daily_R_Stamp_Report_Branch_Wise","Daily_R_Stamp_Report_Agent_Wise"]},
		                  {topmenuid:"chequeCollectionReport",leftmenuids: 	    ['Daily_Bank_Cheque_Collection_Report','DateWise_Bank_Cheque_Collection_Report','Daily_Branch_Cheque_Collection_Report','DateWise_Branch_Cheque_Collection_Report','Daily_Agent_Cheque_Collection_Report','DateWise_Agent_Cheque_Collection_Report']},
		                  {topmenuid:"MiscellaneousReport",leftmenuids: 		["Fees_Charges_Collection","VAT_Transactional_Fees_Charges","New_Account_Opening_List","SMS_LOG_REPORT"]},
		                  {topmenuid:"RemittanceReport",leftmenuids: 			["Inward_Remittance_Detail_BO","Remittance_Report_Outlet_Wise","Remittance_Report_Daily_Bank_Wise","Remittance_Report_Daily_Branch_Wise","Remittance_Report_Daily_Agent_Wise","Remittance_Report_Monthly_Outlet_Wise","Remittance_Report_Monthly_Summary_BO","Remittance_Report","Remittance_Report_Summary","Remittance_Report_Summary_BO"]},
		                  {topmenuid:"Service_TopMenu",leftmenuids: 			["Bill_ViewDetails"]},
		                  {topmenuid:"MIS_Report_TopMenu",leftmenuids: 			["Agent_Outlet_Wise_Mis_Report"]},
		                  {topmenuid:"Request_Trace",leftmenuids: 				["Request_Trace"]},
		                  {topmenuid:"LogAnalyzer",leftmenuids: 				["LogAnalyzer"]},
		                  {topmenuid:"Analytics_TopMenu",leftmenuids: 			["Request_Trace_Details", "AuditLog"]},
		                  {topmenuid:"Security_TopMenu",leftmenuids: 			["Security_User_ViewDetails","Security_ResetPassword"]},  
		                  {topmenuid:"Setting_TopMenu",leftmenuids: 			["Charge_Model","Charge_Model_Item"]}, 
		                  {topmenuid:"Transaction_TopMenu",leftmenuids: 		["Transaction_Trace_Details","Transaction_Approve_Trace_Details"]},
		                  {topmenuid:"NAN",leftmenuids: 						["NAN"]},
		                  {topmenuid:"AgentServiceStaff_TopMenu",leftmenuids:	["New_Agent_Staff_Service_BA","New_Agent_Staff_ViewDetails"]},
		                  {topmenuid:"Profile",leftmenuids: 					["Profile"]}

		                  ];
		
		this.adminMakerAdAdlMenu = [ 
		                            {topmenuid:"Bank_TopMenu",leftmenuids:				["Branch_ViewDetail"]},
		                            {topmenuid:"ServicePoint_TopMenu",leftmenuids:		["Agent_Agent_BM","Agent_Agent_BA","Agent_ResetPassword","Agent_ResetPasswordBM","New_Agent_Staff", "New_Agent_Staff_ViewDetails", "Service_Point_Creator","Service_Point_Creator_BM","Service_Point_Creator_BA", "Service_Point_ViewDetails", "Service_Terminal_BM", "Service_Terminal_ViewDetails","Service_Terminal_BA", "Service_Terminal_Admin_BA", "Agent_Staff_Service_BM","Agent_Staff_Service_BA"]},
		                            {topmenuid:"Customer_TopMenu",leftmenuids:			["Customer_Customer","CustomerInfo_MAKE","CustomerInfo_APPROVE","Customer_Account_Creator_BM","Customer_Account_Creator_BA","Account_AccountDetails"]},
		                            {topmenuid:"Service_TopMenu",leftmenuids:			["Foreign_Remittance_Creator_BM","Foreign_Remittance_Creator_BM"]},
		                            {topmenuid:"AgentReport",leftmenuids: 				["Agent_Details","Agent_List","Fund_In_Out_Agent_Wise","Agent_Statement","Branch_Officer_FundInOut"]},
		                            {topmenuid:"CustomerReport",leftmenuids: 			["Customer_Details","AccountList_Branch_Wise","AccountList_Summary","Account_Statement","Account_Listing_Report","Account_Listing_Summary_Report","Enrollment_Account_Listing_Report","Enrollment_Account_Listing_Summary_Report"]},
		                            {topmenuid:"StatisticalReport",leftmenuids: 		["User_Status","Deposit_Summary_Product_wise","Transaction_Report","Transaction_Summary_Product_wiseTotal","Transaction_Listing_Report","Transaction_Listing_Summary","Toll_Collection_Report"]},
		                            {topmenuid:"chequeCollectionReport",leftmenuids: 	['Daily_Bank_Cheque_Collection_Report','DateWise_Bank_Cheque_Collection_Report','Daily_Branch_Cheque_Collection_Report','DateWise_Branch_Cheque_Collection_Report','Daily_Agent_Cheque_Collection_Report','DateWise_Agent_Cheque_Collection_Report']},
		                            {topmenuid:"MiscellaneousReport",leftmenuids: 		["Fees_Charges_Collection","VAT_Transactional_Fees_Charges","New_Account_Opening_List","SMS_LOG_REPORT"]},
		                            {topmenuid:"Request_Trace",leftmenuids: 			["Request_Trace"]},
		                            {topmenuid:"MIS_Report_TopMenu",leftmenuids: 		["Agent_Outlet_Wise_Mis_Report"]},
		                            {topmenuid:"LogAnalyzer",leftmenuids: 				["LogAnalyzer"]},
		                            {topmenuid:"Analytics_TopMenu",leftmenuids: 		["Request_Trace_Details", "AuditLog"]},
		                            {topmenuid:"Security_TopMenu",leftmenuids: 			["Security_ResetPassword","Security_BranchUser_Admin_BM","Security_BranchUser_Admin_BA","Security_User_ViewDetails"]},  
		                            {topmenuid:"Transaction_TopMenu",leftmenuids: 		["Transaction_Trace_Details"]},
		                            {topmenuid:"NAN",leftmenuids: 						["NAN"]},
		                            {topmenuid:"Profile",leftmenuids: 					["Profile"]}
		                            ];

		this.adminApproverAdAdlMenu = [ 
		                               {topmenuid:"Bank_TopMenu",leftmenuids:				["Branch_ViewDetail"]},
		                               {topmenuid:"ServicePoint_TopMenu",leftmenuids:		["Agent_Agent_BM","Agent_Agent_BA","Agent_ResetPassword","New_Agent_Staff", "New_Agent_Staff_ViewDetails", "Service_Point_Creator","Service_Point_Creator_BM","Service_Point_Creator_BA", "Service_Point_ViewDetails", "Service_Terminal_BM", "Service_Terminal_ViewDetails","Service_Terminal_BA", "Service_Terminal_Admin_BA", "Agent_Staff_Service_BM","Agent_Staff_Service_BA"]},
		                               {topmenuid:"Customer_TopMenu",leftmenuids:			["Customer_Customer","CustomerInfo_MAKE","CustomerInfo_APPROVE","Customer_Account_Creator_BM","Customer_Account_Creator_BA","Account_AccountDetails"]},
		                               {topmenuid:"Service_TopMenu",leftmenuids:			["Foreign_Remittance_Creator_BM","Foreign_Remittance_Creator_BM"]},
		                               {topmenuid:"AgentReport",leftmenuids: 				["Agent_Details","Agent_List","Fund_In_Out_Agent_Wise","Agent_Statement","Branch_Officer_FundInOut"]},
		                               {topmenuid:"CustomerReport",leftmenuids: 			["Customer_Details","AccountList_Branch_Wise","AccountList_Summary","Account_Statement","Account_Listing_Report","Account_Listing_Summary_Report","Enrollment_Account_Listing_Report","Enrollment_Account_Listing_Summary_Report"]},
		                               {topmenuid:"StatisticalReport",leftmenuids: 			["User_Status","Deposit_Summary_Product_wise","Transaction_Report","Transaction_Summary_Product_wiseTotal","Transaction_Listing_Report","Transaction_Listing_Summary","Toll_Collection_Report"]},
		                               {topmenuid:"chequeCollectionReport",leftmenuids: 	['Daily_Bank_Cheque_Collection_Report','DateWise_Bank_Cheque_Collection_Report','Daily_Branch_Cheque_Collection_Report','DateWise_Branch_Cheque_Collection_Report','Daily_Agent_Cheque_Collection_Report','DateWise_Agent_Cheque_Collection_Report']},
		                               {topmenuid:"MiscellaneousReport",leftmenuids: 		["Fees_Charges_Collection","VAT_Transactional_Fees_Charges","New_Account_Opening_List","SMS_LOG_REPORT"]},
		                               {topmenuid:"Request_Trace",leftmenuids: 				["Request_Trace"]},
		                               {topmenuid:"LogAnalyzer",leftmenuids: 				["LogAnalyzer"]},
		                               {topmenuid:"MIS_Report_TopMenu",leftmenuids: 		["Agent_Outlet_Wise_Mis_Report"]},
		                               {topmenuid:"Analytics_TopMenu",leftmenuids: 			["Request_Trace_Details", "AuditLog"]},
		                               {topmenuid:"Security_TopMenu",leftmenuids: 			["Security_ResetPassword","Security_BranchUser_Admin_BM","Security_BranchUser_Admin_BA","Security_User_ViewDetails"]},
		                               {topmenuid:"Transaction_TopMenu",leftmenuids: 		["Transaction_Approve_Trace_Details"]},
		                               {topmenuid:"NAN",leftmenuids: 						["NAN"]},
					                   {topmenuid:"AgentServiceStaff_TopMenu",leftmenuids:	["New_Agent_Staff_Service_BA","New_Agent_Staff_ViewDetails"]},
		                               {topmenuid:"Profile",leftmenuids: 					["Profile"]}
		                               ];
		
		
		this.branchManagerAdlMenu = [
		                             {topmenuid:"ServicePoint_TopMenu",leftmenuids:			["Agent_ResetPassword","New_Agent_Staff"]},
		                             {topmenuid:"Customer_TopMenu",leftmenuids: 			["Customer_Customer","Account_AccountDetails"]}, 
		                             {topmenuid:"AgentReport",leftmenuids: 					["Agent_Details","Agent_List","Fund_In_Out_Agent_Wise","Agent_Statement","Branch_Officer_FundInOut"]},
		                             {topmenuid:"CustomerReport",leftmenuids: 				["Customer_Details","AccountList_Branch_Wise","AccountList_Summary","Account_Statement","Account_Listing_Report","Account_Listing_Summary_Report","Enrollment_Account_Listing_Report","Enrollment_Account_Listing_Summary_Report"]},
		                             {topmenuid:"StatisticalReport",leftmenuids: 			["User_Status","Deposit_Summary_Product_wise","Transaction_Report","Transaction_Summary_Product_wiseTotal","Transaction_Listing_Report","Transaction_Listing_Summary","Toll_Collection_Report"]},
		                             {topmenuid:"chequeCollectionReport",leftmenuids: 	    ['Daily_Branch_Cheque_Collection_Report','DateWise_Branch_Cheque_Collection_Report','Daily_Agent_Cheque_Collection_Report','DateWise_Agent_Cheque_Collection_Report']},
		                             {topmenuid:"MiscellaneousReport",leftmenuids: 			["Fees_Charges_Collection","VAT_Transactional_Fees_Charges","New_Account_Opening_List","SMS_LOG_REPORT"]},
		                             {topmenuid:"MIS_Report_TopMenu",leftmenuids: 			["Agent_Outlet_Wise_Mis_Report"]},
		                             {topmenuid:"Security_TopMenu",leftmenuids: 			["Security_ResetPassword"]},
		                             {topmenuid:"NAN",leftmenuids: 							["NAN"]},
		                             {topmenuid:"Profile",leftmenuids: 						["Profile"]}
		                             ];

		this.branchOfficerAdlMenu = [
		                             {topmenuid:"Customer_TopMenu",leftmenuids: 			["Customer_Customer"]}, 
		                             {topmenuid:"AgentReport",leftmenuids: 					["Agent_Details","Agent_List","Fund_In_Out_Agent_Wise","Agent_Statement","Branch_Officer_FundInOut"]},
		                             {topmenuid:"CustomerReport",leftmenuids: 				["Customer_Details","AccountList_Branch_Wise","AccountList_Summary","Account_Statement","Account_Listing_Report","Account_Listing_Summary_Report","Enrollment_Account_Listing_Report","Enrollment_Account_Listing_Summary_Report"]},
		                             {topmenuid:"StatisticalReport",leftmenuids: 			["User_Status","Deposit_Summary_Product_wise","Transaction_Report","Transaction_Summary_Product_wiseTotal","Transaction_Listing_Report","Transaction_Listing_Summary","Toll_Collection_Report"]},
		                             {topmenuid:"chequeCollectionReport",leftmenuids: 	    ['Daily_Branch_Cheque_Collection_Report','DateWise_Branch_Cheque_Collection_Report','Daily_Agent_Cheque_Collection_Report','DateWise_Agent_Cheque_Collection_Report']},
		                             {topmenuid:"MiscellaneousReport",leftmenuids: 			["Fees_Charges_Collection","VAT_Transactional_Fees_Charges","New_Account_Opening_List","SMS_LOG_REPORT"]},
		                             {topmenuid:"NAN",leftmenuids: 							["NAN"]},
		                             {topmenuid:"Profile",leftmenuids: 						["Profile"]}
		                             ];

		this.branchOfficerMakerAdlMenu = [
		                                  {topmenuid:"ServicePoint_TopMenu",leftmenuids:		["Service_Point_Creator_BM","Agent_ResetPasswordBM"]},
		                                  {topmenuid:"Agent_TopMenu",leftmenuids:				["Agent_ResetPasswordBM"]},
		                                  {topmenuid:"Customer_TopMenu",leftmenuids:			["CustomerInfo_MAKE","Customer_Account_Creator_BM"]},
		                                  {topmenuid:"AgentReport",leftmenuids: 				["Agent_Details","Agent_List","Fund_In_Out_Agent_Wise","Agent_Statement","Branch_Officer_FundInOut"]},
		                                  {topmenuid:"CustomerReport",leftmenuids: 				["Customer_Details","AccountList_Branch_Wise","AccountList_Summary","Account_Statement","Account_Listing_Report","Account_Listing_Summary_Report","Enrollment_Account_Listing_Report","Enrollment_Account_Listing_Summary_Report"]},
		                                  {topmenuid:"StatisticalReport",leftmenuids: 			["User_Status","Deposit_Summary_Product_wise","Transaction_Report","Transaction_Summary_Product_wiseTotal","Transaction_Listing_Report","Transaction_Listing_Summary","Toll_Collection_Report"]},
		                                  {topmenuid:"chequeCollectionReport",leftmenuids: 	    ['Daily_Branch_Cheque_Collection_Report','DateWise_Branch_Cheque_Collection_Report','Daily_Agent_Cheque_Collection_Report','DateWise_Agent_Cheque_Collection_Report']},
		                                  {topmenuid:"remittanceTypesBranchWise",leftmenuids: 	['Remittance_Report_Daily_Branch_Wise','Remittance_Report_Daily_Agent_Wise','Remittance_Report','Daily_Report_Branch_Wise']},
		                                  {topmenuid:"MiscellaneousReport",leftmenuids: 		["Fees_Charges_Collection","VAT_Transactional_Fees_Charges","New_Account_Opening_List","SMS_LOG_REPORT"]},
			                              {topmenuid:"NAN",leftmenuids: 						["NAN"]},
		                                  {topmenuid:"Profile",leftmenuids: 					["Profile"]}
		                                  ];

		this.branchOfficerCheckerAdlMenu = [
		                                    {topmenuid:"ServicePoint_TopMenu",leftmenuids:		["Service_Point_Creator_BC"]},
		                                    {topmenuid:"Customer_TopMenu",leftmenuids:			["CustomerInfo_CHECK","Customer_Account_Creator_BC"]},
		                                    {topmenuid:"AgentReport",leftmenuids: 				["Agent_Details","Agent_List","Fund_In_Out_Agent_Wise","Agent_Statement","Branch_Officer_FundInOut"]},
		                                    {topmenuid:"CustomerReport",leftmenuids: 			["Customer_Details","AccountList_Branch_Wise","AccountList_Summary","Account_Statement","Account_Listing_Report","Account_Listing_Summary_Report","Enrollment_Account_Listing_Report","Enrollment_Account_Listing_Summary_Report"]},
		                                    {topmenuid:"remittanceTypesBranchWise",leftmenuids: ['Remittance_Report_Daily_Branch_Wise','Remittance_Report_Daily_Agent_Wise','Remittance_Report','Daily_Report_Branch_Wise']},
		                                    {topmenuid:"StatisticalReport",leftmenuids: 		["User_Status","Deposit_Summary_Product_wise","Transaction_Report","Transaction_Summary_Product_wiseTotal","Transaction_Listing_Report","Transaction_Listing_Summary","Toll_Collection_Report"]},
		                                    {topmenuid:"chequeCollectionReport",leftmenuids: 	['Daily_Branch_Cheque_Collection_Report','DateWise_Branch_Cheque_Collection_Report','Daily_Agent_Cheque_Collection_Report','DateWise_Agent_Cheque_Collection_Report']},
		                                    {topmenuid:"MiscellaneousReport",leftmenuids: 		["Fees_Charges_Collection","VAT_Transactional_Fees_Charges","New_Account_Opening_List","SMS_LOG_REPORT"]},
				                            {topmenuid:"NAN",leftmenuids: 						["NAN"]},
		                                    {topmenuid:"Profile",leftmenuids: 					["Profile"]}
		                                    ];

		this.branchOfficerApproverAdlMenu = [
		                                     {topmenuid:"ServicePoint_TopMenu",leftmenuids:		["Service_Point_Creator_BA"]},
		                                     {topmenuid:"Agent_TopMenu",leftmenuids:			["Agent_ResetPasswordBA"]},
		                                     {topmenuid:"Customer_TopMenu",leftmenuids:			["CustomerInfo_APPROVE","Customer_Account_Creator_BA","Customer_Customer","Account_AccountDetails"]},
		                                     {topmenuid:"AgentReport",leftmenuids: 				["Agent_Details","Agent_List","Fund_In_Out_Agent_Wise","Agent_Statement","Branch_Officer_FundInOut"]},
		                                     {topmenuid:"CustomerReport",leftmenuids: 			["Customer_Details","AccountList_Branch_Wise","AccountList_Summary","Account_Statement","Account_Listing_Report","Account_Listing_Summary_Report","Enrollment_Account_Listing_Report","Enrollment_Account_Listing_Summary_Report"]},
		                                     {topmenuid:"StatisticalReport",leftmenuids: 		["User_Status","Deposit_Summary_Product_wise","Transaction_Report","Transaction_Summary_Product_wiseTotal","Transaction_Listing_Report","Transaction_Listing_Summary","Toll_Collection_Report"]},
		                                     {topmenuid:"remittanceTypesBranchWise",leftmenuids:['Remittance_Report_Daily_Branch_Wise','Remittance_Report_Daily_Agent_Wise','Remittance_Report','Daily_Report_Branch_Wise']},
		                                     {topmenuid:"chequeCollectionReport",leftmenuids: 	['Daily_Branch_Cheque_Collection_Report','DateWise_Branch_Cheque_Collection_Report','Daily_Agent_Cheque_Collection_Report','DateWise_Agent_Cheque_Collection_Report']},
		                                     {topmenuid:"MiscellaneousReport",leftmenuids: 		["Fees_Charges_Collection","VAT_Transactional_Fees_Charges","New_Account_Opening_List","SMS_LOG_REPORT"]},
		                                     {topmenuid:"NAN",leftmenuids: 						["NAN"]},
		                                     {topmenuid:"Profile",leftmenuids: 					["Profile"]}
		                                     ];

		this.agentManagerAdlMenu = [
		                            {topmenuid:"ServicePoint_TopMenu",leftmenuids:			["Agent_ResetPassword"]},
		                            {topmenuid:"AgentReport",leftmenuids:					["Agent_Details","Agent_List","Fund_In_Out_Agent_Wise","Agent_Statement"]},
		                            {topmenuid:"CustomerReport",leftmenuids: 				["Customer_Details","AccountList_Branch_Wise","AccountList_Summary","Account_Statement","Account_Listing_Report","Account_Listing_Summary_Report","Enrollment_Account_Listing_Report","Enrollment_Account_Listing_Summary_Report"]},
		                            {topmenuid:"StatisticalReport",leftmenuids: 			["User_Status","Deposit_Summary_Product_wise","Transaction_Report","Transaction_Summary_Product_wiseTotal","Transaction_Listing_Report","Transaction_Listing_Summary","Toll_Collection_Report"]},
		                            {topmenuid:"chequeCollectionReport",leftmenuids: 	    ['Daily_Agent_Cheque_Collection_Report','DateWise_Agent_Cheque_Collection_Report']},
		                            {topmenuid:"MiscellaneousReport",leftmenuids: 			["Fees_Charges_Collection","VAT_Transactional_Fees_Charges","New_Account_Opening_List","SMS_LOG_REPORT"]},
		                            {topmenuid:"NAN",leftmenuids: 							["NAN"]},
		                            {topmenuid:"Profile",leftmenuids: 						["Profile"]}
		                            ];
		 
		this.adbSysMakerAdlMenu = [
	                      {topmenuid:"Agent_TopMenu",leftmenuids:				["Agent_Agent_BM","Agent_ResetPassword","Agent_ResetPasswordBM"]},
	                      {topmenuid:"ServicePoint_TopMenu",leftmenuids:		["Service_Point_Creator_BM","Service_Point_ViewDetails"]},
	                      {topmenuid:"ServiceTerminal_TopMenu",leftmenuids:		["Service_Terminal_BM",,"Service_Terminal_ViewDetails"]},
	                      {topmenuid:"AgentServiceStaff_TopMenu",leftmenuids:	["Agent_Staff_Service_BM","New_Agent_Staff_Service_BM","New_Agent_Staff_ViewDetails"]},
	                      {topmenuid:"DstSalesTeam_TopMenu",leftmenuids:		["Sales_Team","Sales_Team_Admin_BM","DST_Draft"]},
	                      {topmenuid:"AgentReport",leftmenuids: 				["Acc_Opening_Report","Acc_Summ_Report","Acc_Summ_BO_Report","Acc_Monthly_Summ_Report","Approved_AccountOpening_List","Agent_Details","Agent_List","Fund_In_Out_Agent_Wise","Agent_Statement","Branch_Officer_FundInOut","Monthly_Summary_Deposit_Report","Deposit_Transaction_Report","Deposit_Transaction_BO_Report","Withdrawl_Transaction_Report","Withdrawl_Transaction_BO_Report","DepositWithdrawl_Summary_Report","DepositWithdrawl_Summary_BO_Report","Fund_Transfer_Detail_Report","Monthly_Summary_FundTransfer_Report","Fund_Transfer_Summary_Report"]},
		                  {topmenuid:"Request_Trace",leftmenuids: 				["Request_Trace"]},
		                  {topmenuid:"LogAnalyzer",leftmenuids: 				["LogAnalyzer"]},
		                  {topmenuid:"Analytics_TopMenu",leftmenuids: 			["Request_Trace_Details", "AuditLog"]},
		                  {topmenuid:"Security_TopMenu",leftmenuids: 			["Security_User_ViewDetails","Security_ResetPassword"]},  
		                  {topmenuid:"Setting_TopMenu",leftmenuids: 			["Charge_Model","Charge_Model_Item"]}, 
		                  {topmenuid:"Transaction_TopMenu",leftmenuids: 		["Transaction_Trace_Details","Transaction_Approve_Trace_Details"]},
		                  {topmenuid:"NAN",leftmenuids: 						["NAN"]},
		                  {topmenuid:"Profile",leftmenuids: 					["Profile"]}
		                  ];
		
		this.adbSysApproverAdlMenu = [
		    	                  {topmenuid:"Agent_TopMenu",leftmenuids:				["Agent_Agent_BA","Agent_Agent_Admin_BA"]},
			                      {topmenuid:"ServicePoint_TopMenu",leftmenuids:		["Service_Point_Creator_BA","Service_Point_ViewDetails"]},
			                      {topmenuid:"ServiceTerminal_TopMenu",leftmenuids:		["Service_Terminal_BA","Service_Terminal_ViewDetails"]},
			                      {topmenuid:"AgentServiceStaff_TopMenu",leftmenuids:	["New_Agent_Staff_Service_BA","New_Agent_Staff_ViewDetails","Agent_Staff_Service_BA"]},
			                      {topmenuid:"DstSalesTeam_TopMenu",leftmenuids:		["Sales_Team","Sales_Team_Admin_BA","DST_Draft"]},
			                      {topmenuid:"AgentReport",leftmenuids: 				["Acc_Opening_Report","Acc_Summ_Report","Acc_Summ_BO_Report","Acc_Monthly_Summ_Report","Approved_AccountOpening_List","Agent_Details","Agent_List","Fund_In_Out_Agent_Wise","Agent_Statement","Branch_Officer_FundInOut","Monthly_Summary_Deposit_Report","Deposit_Transaction_Report","Deposit_Transaction_BO_Report","Withdrawl_Transaction_Report","Withdrawl_Transaction_BO_Report","DepositWithdrawl_Summary_Report","DepositWithdrawl_Summary_BO_Report","Fund_Transfer_Detail_Report","Monthly_Summary_FundTransfer_Report","Fund_Transfer_Summary_Report"]},
		 		                  {topmenuid:"Request_Trace",leftmenuids: 				["Request_Trace"]},
		 		                  {topmenuid:"LogAnalyzer",leftmenuids: 				["LogAnalyzer"]},
		 		                  {topmenuid:"Analytics_TopMenu",leftmenuids: 			["Request_Trace_Details", "AuditLog"]},
		 		                  {topmenuid:"Security_TopMenu",leftmenuids: 			["Security_User_ViewDetails","Security_ResetPassword"]},  
		 		                  {topmenuid:"Setting_TopMenu",leftmenuids: 			["Charge_Model","Charge_Model_Item"]}, 
		 		                  {topmenuid:"Transaction_TopMenu",leftmenuids: 		["Transaction_Trace_Details","Transaction_Approve_Trace_Details"]},
		 		                  {topmenuid:"NAN",leftmenuids: 						["NAN"]},
		 		                  {topmenuid:"Profile",leftmenuids: 					["Profile"]}
		 		                  ];
		
		this.adbMakerAdlMenu = [
		 	                      {topmenuid:"Customer_TopMenu",leftmenuids:			["Customer_Account_Creator_BM","Customer_Account_Creator_BC","Customer_Customer","CustomerInfo_MAKE","Account_AccountDetails","CustomerList_MAKE"]},
		 	                      {topmenuid:"AgentReport",leftmenuids: 				["Acc_Opening_Report","Acc_Summ_Report","Acc_Summ_BO_Report","Acc_Monthly_Summ_Report","Approved_AccountOpening_List","Agent_Details","Agent_List","Fund_In_Out_Agent_Wise","Agent_Statement","Branch_Officer_FundInOut","Monthly_Summary_Deposit_Report","Deposit_Transaction_Report","Deposit_Transaction_BO_Report","Withdrawl_Transaction_Report","Withdrawl_Transaction_BO_Report","DepositWithdrawl_Summary_Report","DepositWithdrawl_Summary_BO_Report","Fund_Transfer_Detail_Report","Monthly_Summary_FundTransfer_Report","Fund_Transfer_Summary_Report"]},
		 		                  {topmenuid:"Transaction_TopMenu",leftmenuids: 		["Transaction_Trace_Details","Transaction_Approve_Trace_Details"]},
		 		                  {topmenuid:"NAN",leftmenuids: 						["NAN"]},
		 		                  {topmenuid:"Profile",leftmenuids: 					["Profile"]}
		 		                  ];
		 		
 		this.adbCheckerAdlMenu = [
 		    	                  {topmenuid:"Customer_TopMenu",leftmenuids:			["Customer_Account_Creator_BA","Customer_Account_Creator_BC","Customer_Customer","CustomerInfo_APPROVE","Account_AccountDetails","CustomerList_APPROVE"]},
 		    	                  {topmenuid:"AgentReport",leftmenuids: 				["Acc_Opening_Report","Acc_Summ_Report","Acc_Summ_BO_Report","Acc_Monthly_Summ_Report","Approved_AccountOpening_List","Agent_Details","Agent_List","Fund_In_Out_Agent_Wise","Agent_Statement","Branch_Officer_FundInOut","Monthly_Summary_Deposit_Report","Deposit_Transaction_Report","Deposit_Transaction_BO_Report","Withdrawl_Transaction_Report","Withdrawl_Transaction_BO_Report","DepositWithdrawl_Summary_Report","DepositWithdrawl_Summary_BO_Report","Fund_Transfer_Detail_Report","Monthly_Summary_FundTransfer_Report","Fund_Transfer_Summary_Report"]},
 		 		                  {topmenuid:"Transaction_TopMenu",leftmenuids: 		["Transaction_Trace_Details","Transaction_Approve_Trace_Details"]},
 		 		                  {topmenuid:"NAN",leftmenuids: 						["NAN"]},
 		 		                  {topmenuid:"Profile",leftmenuids: 					["Profile"]}
 		 		                  ];



		this.fingerList = [
		                   {fingerID: "ri", Name: "Right Index"},
		                   {fingerID: "rm", Name: "Right Middle"},
		                   {fingerID: "rt", Name: "Right Thumb"},
		                   {fingerID: "rr", Name: "Right Ring"},
		                   {fingerID: "rp", Name: "Right Little"},
		                   {fingerID: "li", Name: "Left Index"},
		                   {fingerID: "lm", Name: "Left Middle"},
		                   {fingerID: "lt", Name: "Left Thumb"},
		                   {fingerID: "lr", Name: "Left Ring"},
		                   {fingerID: "lp", Name: "Left Little"}
		                   ];

		this.configurefingerList = [
		                            {id: "ri", value: "Right Index"},
		                            {id: "rm", value: "Right Middle"},
		                            {id: "rt", value: "Right Thumb"},
		                            {id: "rr", value: "Right Ring"},
		                            {id: "rp", value: "Right Little"},
		                            {id: "li", value: "Left Index"},
		                            {id: "lm", value: "Left Middle"},
		                            {id: "lt", value: "Left Thumb"},
		                            {id: "lr", value: "Left Ring"},
		                            {id: "lp", value: "Left Little"}
		                            ];

		this.statusTypes = [
		                    { statusID : "A", statusName : "Active" },
		                    { statusID : "I", statusName : "Inactive" }
		                    ];

		this.servicePointTypes = [
		                          {requestTraceID: 'Request_Trace', 		requestTraceName: 'Request_Trace'},
		                          {logAnalyzerID: 'LogAnalyzer', 			logAnalyzerName: 'LogAnalyzer'},
		                          {auditLogID: 'AuditLog', 					auditLogName: 'AuditLog'}
		                          ];


		this.fingerList = [
				                   {fingerID: "ri", Name: "Right Index"},
				                   {fingerID: "rm", Name: "Right Middle"},
				                   {fingerID: "rt", Name: "Right Thumb"},
				                   {fingerID: "rr", Name: "Right Ring"},
				                   {fingerID: "rp", Name: "Right Little"},
				                   {fingerID: "li", Name: "Left Index"},
				                   {fingerID: "lm", Name: "Left Middle"},
				                   {fingerID: "lt", Name: "Left Thumb"},
				                   {fingerID: "lr", Name: "Left Ring"},
				                   {fingerID: "lp", Name: "Left Little"}
				                   ];

		this.configurefingerList = [
		                            {id: "ri", value: "Right Index"},
		                            {id: "rm", value: "Right Middle"},
		                            {id: "rt", value: "Right Thumb"},
		                            {id: "rr", value: "Right Ring"},
		                            {id: "rp", value: "Right Little"},
		                            {id: "li", value: "Left Index"},
		                            {id: "lm", value: "Left Middle"},
		                            {id: "lt", value: "Left Thumb"},
		                            {id: "lr", value: "Left Ring"},
		                            {id: "lp", value: "Left Little"}
		                            ];

		this.auditLogActionType = [
		                           {id:	'E',	value:	'Edit'},
		                           {id:	'I',	value:	'Insert'},
		                           {id:	'D',	value:	'Delete'}
		                           ];

		this.auditLogSectionVsTable = [
		                               {table:	'Bank',				section:	'Bank'},
		                               {table:	'Branch',			section:	'Bank'},
		                               {table:	'Customer',			section:	'Customer & Account'},
		                               {table:	'Account',			section:	'Customer & Account'},
		                               {table:	'SignatoryInfo',	section:	'Customer & Account'},
		                               {table:	'CustomerAccount',	section:	'Customer & Account'},
		                               {table:	'FingerPrint',		section:	'Customer & Account'},
		                               {table:	'CustomerQRCard',	section:	'Customer & Account'},
		                               {table:	'ServicePoint',		section:	'Agent System'},
		                               {table:	'ServiceTerminal',	section:	'Agent System'},
		                               {table:	'Agent',			section:	'Agent System'},
		                               {table:	'AgentServiceStaff',section:	'Agent System'},
		                               {table:	'Login',			section:	'Security'},
		                               {table:	'DDLMetaData',		section:	'Settings'},
		                               {table:	'ChargeModel',		section:	'Settings'},
		                               {table:	'MetaProperty',		section:	'Settings'},
		                               {table:	'UtilityCompany',	section:	'Bill Collection'}
		                               ];

		this.statusTypes = [
		                    { statusID : "A", statusName : "Active" },
		                    { statusID : "I", statusName : "Inactive" }
		                    ];

		this.servicePointTypes = [
		                          { id: "MasterAgent", 		value: "Master Service Point" },
		                          { id: "SubAgent", 		value: "Sub Service Point" },
		                          { id: "Branch", 			value: "Branch Service Point" }
		                          ];
		
		this.paymentTypes = [
		                          { id: "CASH", 		value: "Cash" },
		                          { id: "NON_CASH", 			value: "Non Cash" }
		                          ];

		this.docStatusAdmin = [
		                       { statusID : "BM", 	statusName : "Entered/ Edited" },
		                       { statusID : "BR", 	statusName : "Rejected" },
		                       { statusID : "ME", 	statusName : "Edit" },
		                       { statusID : "BA", 	statusName : "Approved" },
		                       { statusID : "A", 	statusName : "Active" },
		                       { statusID : "I", 	statusName : "Inactive" },
		                       { statusID : "C", 	statusName : "Closed"}
		                       ];

		this.docStatusMaker = [
		                       { statusID : "AS", statusName : "Submitted" },
		                       { statusID : "ME", statusName : "Edit" },
		                       { statusID : "BM", statusName : "Entered/ Edited" },
		                       { statusID : "BR", statusName : "Rejected" }
		                       ];

		this.docStatusMakerForAccount = [
		                                 { statusID : "DSTA", statusName : "DST Approved" },
		                                 { statusID : "BR", statusName : "Rejected" }
		                                 ];

		this.customerStatusList = [
		                           { statusID: 'AS', 	statusName: 'Submitted'},
		                           { statusID: 'DSTA', 	statusName: 'DST Approved'},
		                           { statusID: 'BM', 	statusName: 'Entered/ Edited'},
		                           { statusID: 'BA', 	statusName: 'Approved'},
		                           { statusID: 'BR', 	statusName: 'Rejected'},
		                           { statusID: 'A', 	statusName: 'Active'},
		                           { statusID: 'I', 	statusName: 'Inactive'},
		                           { statusID: 'C', 	statusName: 'Canceled'}
		                           ];
		
		this.companyZoneStatusList = [
		                           { statusID: 'AS', 	statusName: 'Submitted'},
		                           { statusID: 'BM', 	statusName: 'Entered/ Edited'},
		                           { statusID: 'BA', 	statusName: 'Approved'},
		                           { statusID: 'BR', 	statusName: 'Rejected'},
		                           { statusID: 'A', 	statusName: 'Active'},
		                           { statusID: 'I', 	statusName: 'Inactive'},
		                           { statusID: 'C', 	statusName: 'Canceled'}
		                           ];

		this.ServicePointStatusList = [
		                               { statusID : "BM", 	statusName : "Entered/ Edited" },
		                               { statusID : "BR", 	statusName : "Rejected" },
		                               { statusID : "ME", 	statusName : "Edit" },
		                               { statusID : "A", 	statusName : "Active" },
		                               { statusID : "SB", 	statusName : "Booked" },
		                               { statusID : "I", 	statusName : "Inactive" },
		                               { statusID : 'C', 	statusName : "Closed"}
		                               ];

		this.accountStatusList = [
			                          { statusID: 'All', 	statusName: 'All'},
			                          { statusID: 'AS', 	statusName: 'Submitted'},
			                          { statusID: 'BM', 	statusName: 'Entered/ Edited'},
			                          { statusID: 'BA', 	statusName: 'Approved'},
			                          { statusID: 'BR', 	statusName: 'Rejected'},
			                          { statusID: 'A', 		statusName: 'Active'},
			                          { statusID: 'I', 		statusName: 'Inactive'},
			                          { statusID: 'C', 		statusName: 'Canceled'}
		                          ];
		
		this.accountStatusForMultiDDL = [		                          
		                          { statusID: 'AS', 	statusName: 'Submitted'},
		                          { statusID: 'BM', 	statusName: 'Entered/ Edited'},
		                          { statusID: 'BA', 	statusName: 'Approved'},
		                          { statusID: 'BR', 	statusName: 'Rejected'},
		                          { statusID: 'A', 		statusName: 'Active'},
		                          { statusID: 'I', 		statusName: 'Inactive'},
		                          { statusID: 'C', 		statusName: 'Canceled'}
	                          ];

		this.getTransTypes = [
		                      { transTypId : "All",  transTypName : "All" },
		                      { transTypId : "Withdrawal",  transTypName : "Withdrawal" },
		                      { transTypId : "SelfDeposit", transTypName : "Self Deposit" },
		                      { transTypId : "BearerDeposit", transTypName : "Bearer Deposit" },
		                      { transTypId : "BalanceInquiry", transTypName : "Balance Inquiry" },
		                      { transTypId : "MiniStatement",  transTypName : "Mini Statement" },
		                      { transTypId : "AccountStatement", transTypName : "Account Statement" },
		                      { transTypId : "Transfer", transTypName : "Transfer" },
		                      { transTypId : "CreateAgentDeposit", transTypName : "Create Agent Deposit" },
		                      { transTypId : "BCreateAgentWithdrawalR", transTypName : "Create Agent Withdrawal" }
		                      ];
		
		this.TransTypes = [
		                     
		                      { transTypId : "Withdrawal",  transTypName : "Withdrawal" },
		                      { transTypId : "SelfDeposit", transTypName : "Self Deposit" },
		                      { transTypId : "BearerDeposit", transTypName : "Bearer Deposit" },
		                      { transTypId : "BalanceInquiry", transTypName : "Balance Inquiry" },
		                      { transTypId : "MiniStatement",  transTypName : "Mini Statement" },
		                      { transTypId : "Transfer", transTypName : "Transfer" },
		                      { transTypId : "InitialDeposit", transTypName : "InitialDeposit" },
		                      { transTypId : "AgentBalanceInquiry", transTypName : "AgentBalanceInquiry" }
		                      ];

		this.transactionStatus = [

		                          { key : "All",  value : "All" },
		                          { key : "OK", value : "OK" },
		                          { key : "Pending",  value : "Pending" },
		                          { key : "Failed", value : "Failed" },
		                          { key : "Cancel", value : "Cancel" }

		                          ];
		this.transStatusForMultiDDL = [		                          
		                          { key : "OK", value : "OK" },
		                          { key : "Pending",  value : "Pending" },
		                          { key : "Failed", value : "Failed" },
		                          { key : "Cancel", value : "Cancel" }

		                          ];
		
		this.chequeStatus = [

		                          { key : "All",  value : "All" },
		                          { key : "AS", value : "Submitted" },
		                          { key : "BR",  value : "Bank Received" }

		                          ];

		this.acknowledgeStatus = [	
		                          { key : "OK", value : "OK" },
		                          { key : "Pending",  value : "Pending" }
		                          ];


		//requestTypes useing for searching type of transaction report
		this.requestTypesforTransactionListingReport = [
		                     { key : "requestId",  value : "CSB Request ID" },
		                     { key : "referenceNo", value : "CBS Reference No" },
		                     { key : "accountID", value : "CSB Account ID" },
		                     { key : "transId", value : "Transaction ID" },
		                     { key : "makerID", value : "Maker ID" },
		                     { key : "serviceTerminalID", value : "Service Terminal ID" }		                     
		                   
		                     ];
		
		this.tollShiftList = [
       		                     { shiftId : "A", lowerLimit: '06:00:00', uperLimit: '11:59:59', shiftName : "Shift A" },
       		                     { shiftId : "B", lowerLimit: '12:00:00', uperLimit: '17:59:59', shiftName : "Shift B" },
       		                     { shiftId : "C", lowerLimit: '18:00:00', uperLimit: '23:59:59', shiftName : "Shift C" }
       		                  ];
		
		this.requestTypes = [
		                     { key : "requestId",  value : "CSB Request ID" },
		                     { key : "referenceNo", value : "CBS Reference No" },
		                     { key : "accountID", value : "CSB Account ID" },
		                     { key : "transId", value : "Transaction ID" },
		                     { key : "makerID", value : "Maker ID" },
		                     { key : "serviceTerminalID", value : "Service Terminal ID" },
		                     { key : "bankAccountNo", value : "Bank Account No" },
		                     { key : "transdate", value : "By Date" },
		                     { key : "branchID",  value : "According to Branch" },
		                     { key : "agentID", value : "Agent ID" },
		                     { key : "servicePointID",  value : "Service Point ID" }

		                     ];
		
		this.SMSRequestTypes = [
			                     { key : "requestID",  value : "Request ID" },
			                     { key : "accountID", value : "Account ID" },
			                     { key : "bankAccountNo", value : "Bank Account No" },
			                     { key : "branchID",  value : "According to Branch" },
			                     { key : "mobileNo", value : "Mobile Number" },
			                     { key : "sendDate", value : "By Date" },
			                     { key : "agentID", value : "Agent ID" },
			                     { key : "referenceNo", value : "Reference No" },
			                     { key : "transID", value : "Transaction ID" },
			                     { key : "servicePointID",  value : "Service Point ID" },
			                     { key : "serviceTerminalID", value : "Service Terminal ID" }
			                     ];


		this.getSettingsMethods = [
		                           { methodId : "Absolute",  methodName : "Absolute" },
		                           { methodId : "Percentage", methodName : "Percentage" }
		                          ];

		this.getAccountTypes = [	
		                        { key : "Bank",  value : "Bank" },
		                        { key : "Branch",  value : "Branch" },
		                        { key : "Agent", value : "Agent" },
		                        { key : "Customer", value : "Customer" },
		                        { key : "Celloscope", value : "Celloscope" }
		                        ];

		this.getTypes = [
		                 { key : "Charge",  value : "Charge" },
		                 { key : "Amount", value : "Amount" },
		                 { key : "Vat", value : "Vat" }
		                ];

		this.schemePeroid = [ 
		                     {name : "DP", value: "Daily"},
		                     {name : "MP", value: "Monthly"},
		                     {name : "YP", value: "Yearly"}
		                    ];
		
		this.photoIDType = [
							   { "ID" : "National_ID", "name": "National ID"},
		                       { "ID" : "Passport", 	"name" : "Passport" },
		                       { "ID" : "Driving_License", 	"name" : "Driving License" }
		                   ];

		this.customerSearchItems = {
				individuaSearchItem : [
				                       {"ID" : "customerID", 	"name" : "Customer ID"},
				                       {"ID" : "nationalID", 	"name" : "National ID"},
				                       {"ID" : "tin", 			"name" : "Tax Identification No"},
				                       {"ID" : "birthReg", 		"name" : "Birth Registration No"},
				                       {"ID" : "passportNo", 	"name" : "Passport No"}
				                      ],
           organizationalSearchItem : [
                                       {"ID" : "fullName", 			"name" : "Full Name"},
                                       {"ID" : "tin", 					"name" : "Tax Identification No"},
                                       {"ID" : "vatRegNo", 			"name" : "Vat Registration No"},
                                       {"ID" : "tradeLicenseNo", 		"name" : "Trade License No"},
                                      ]
		};
		
		this.userStatus = [
						   {"ID":  "A",     "name": "Active"},
	                       { "ID" : "I", 	"name" : "Inactive" }
			];
		this.userStatusForReport = [
						    {"ID":  "A", 	"name": "Active"},
						   { "ID" : "BM", 	"name" : "Entered/ Edited" },
	                       { "ID" : "BR", 	"name" : "Rejected" },
	                       { "ID" : "C", 	"name" : "Closed"},
	                       { "ID" : "I", 	"name" : "Inactive" }
			];
		
		this.adminUserRoleList = [
	                    	{ id: "SD.Checker", value: "Service Delivery Checker" },
		                    { id: "ABD.Maker", value: "Agent Banking Division Maker" },
		                    { id: "ABD.Checker", value: "Agent Banking Division Checker" },
		                    { id: "ABD.SYS.Maker", value: "Agent Banking Division System Maker" },
		                    { id: "ABD.SYS.Checker", value: "Agent Banking Division System Checker" },
	                    ];
		
		this.allUserRoleList = [
	                    	{ id: "SD.Checker", 					value: "Service Delivery Checker" },
		                    { id: "ABD.Maker", 						value: "Agent Banking Division Maker" },
		                    { id: "ABD.Checker", 					value: "Agent Banking Division Checker" },
		                    { id: "ABD.SYS.Maker",					value: "Agent Banking Division System Maker" },
		                    { id: "ABD.SYS.Checker", 				value: "Agent Banking Division System Checker" },
		                    { id: "DST", 							value: "Direct Sales Team" },
		                    { id: "AgencyStaff.Supervisor", 		value: "AgencyStaff Supervisor" },
		                    { id: "AgencyStaff.User", 				value: "AgencyStaff User" }
	                    ];
		
		
	};

	app.service('constantJSON', ['$rootScope', constantJSON]);

});

