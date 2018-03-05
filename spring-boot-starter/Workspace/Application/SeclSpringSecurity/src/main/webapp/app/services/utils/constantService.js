
'use strict';

define(['app'], function (app) {

	var constantService = function ($rootScope) {

		this.getAppLayout = function () {
			var layout = {
					header: { location: 'app/views/layout/app/Header.html', isVisible: true },
					leftPanel: { location: 'app/views/layout/app/LeftPanel.html', isVisible: true},
					footer: { location: 'app/views/layout/app/Footer.html', isVisible: true},
			};
			return layout;
		};

		this.getWebLayout = function () {
			var layout = {
					header: { location: 'app/views/layout/web/Header.html', isVisible: false },
					leftPanel: { location: 'app/views/layout/web/LeftPanel.html', isVisible: false },
					footer: { location: 'app/views/layout/web/Footer.html', isVisible: true},
			};
			return layout;
		};

		this.regexForDecimalNumber = /^[0-9.]+$/;
		this.regexForEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/; // give 99.00%
		this.regexForMobileNo = /^(\+|\-)?[0-9]{11,13}$/;
		this.regexForPhoneNo = /^(\+|\-)?[0-9]{6,13}$/;
		this.regexForBankAccNo = /^[0-9]{13}$/;
		this.regexForNumericField = /^[0-9]+$/;
		this.regexForAmountField = /^\d{0,24}(\.\d{0,2}){0,1}$/;
			/*/^\d{0,2}(\.\d{0,2}){0,1}$;*/

		this.inputFieldType = {
				'TEXT'				:'text',
				'PASSWORD'			:'password',
				'CONFIRM_PASSWORD'	:'confirm password',
				'E-MAIL'			:'email',
				'MOBILE'			:'mobileNo',
				'PHONE'				:'phoneNo'
		};

		this.inputFieldAction = {
				'CHANGE'		:'ng-change',
				'BLUR'			:'ng-blur'
		};
		
		this.fieldValidationResult = {
				fieldObj		: '',
				compareObj		: '',
				fieldID			: '',
				compareFieldID	: '',
				fieldType		: '',
				fieldMsg		: 'BLANK',
				showMsg			: false,
				msgColor		: 'red',
				changeORblur	: '',
				mandatory		: false,
				fieldMsgStyle	: {
					'color'		:'red'
				}
		};

		this.getRandomInt = function (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		this.pageItemTextBn = {
				"customer":						"কাস্টমার",
				"account":						"অ্যাকাউন্ট",
				"agent":						"এজেন্ট",
				"chargeModel": 					"চার্জ মডেল",
				"ddlMetadata":					"ডিডিএল মেটা ডেটা",
				"requestLog":					"রিকুয়েস্ট লগ",
				"bank":							"ব্যাংক",
				"branch":						"ব্রাঞ্চ",
				"customerQrCard":				"কাস্টমার এবিসি কার্ড",
				"accountStatement":				"অ্যাকাউন্ট স্টেটমেন্ট",
				"agentStatement":				"এজেন্ট স্টেটমেন্ট",
				"depositSummaryItem":			"জমা সারাংশ",
				"fundInOutItem":				"ফান্ড ইন/আউট",
				"transactionSummaryItem":		"লেনদেন সারাংশ",
				"user":							"ইউজার",
				"agentStaff":					"এজেন্ট স্টাফ",
				"servicePoint":					"এজেন্ট আউটলেট",
				"OutletArea":					"আউটলেট  এরিয়া",
				"OutletZone":					"আউটলেট  জোন",
				"serviceTerminal":				"সার্ভিস টার্মিনাল",
				"fingerOrder":					"ফিংগার অর্ডার",
				"settings":						"সেটিংস",
				"auditLog":						"অডিট লগ",
				"transaction":					"ট্রানজেকশন",
				"machine":						"মেশিন",
				"product":						"প্রোডাক্ট",
				"role":							"রোল",
				"remittance":					"রেমিটেন্স",
				"billCollection":				"বিল সংগ্রহ",
				"utilityCompany":				"ইউটিলিটি কোম্পানি",
				"billType":						"বিল টাইপ",
				"chequeCollection":				"চেক সংগ্রহ",
				"transProfileGroup":			"ট্রান্স. প্রোফাইল গ্রুপ",
				"passwordPolicy":				"পাসওয়ার্ড পলিসি",
				"taglib":						"টাগ",
				"calendar":						"ক্যালেন্ডার",
				"salesTeam":					"সেলস টিম"
		};
		
		

		this.GET_LIST_OF_DDL = "GetListOfDDLs";
		this.GET_ONE_DDL = "GetOneDDL";
		this.SERVICE_POINT_BY_DISTRICT = "ServicePointByDistrict";

		this.ddlKey = {
				'CUSTOMER_TYPE'				:'CustomerType',
				'NATIONALITY'				:'Nationality',
				'OCCUPATION'				:'Occupation',
				'DIVISION'					:'Division', 
				'DISTRICT'					:'District', 
				'THANA'						:'Thana', 
				'COUNTRY'					:'Country',
				'CUSTOMER_CONCENTRATION'	:'CustomerConcentration', 
				'SECTOR'					:'Sector', 
				'SECTOR_TYPE'				:'SectorType', 
				'NATURE_OF_OWNERSHIP'		:'NatureofOwnership', 
				'LEGAL_FORM'				:'LegalForm', 
				'GROUP_TYPE'				:'GroupType', 
				'AFFILIATION'				:'Affiliation', 
				'PRODUCT'					:'Product', 
				'ACCOUNT_TYPE'				:'AccountType', 
				'ACCOUNT_CATEGORY'			:'AccountCategory',
				'AGENT_TYPE'				:'AgentType',
				'CUSTOMER_CATEGORY'			:'CustomerCategory'
		};

		this.comboType = {
				"SERVICE_POINT":"ServicePoint",
				"PARENT_AGENT":"ParentAgent",
				"AGENT":"Agent",
				"USER_ROLE":"UserRole",
				"PRODUCT":"Product",
				"ACC_TRANS_PROFILE":"AccountTransactionProfile"
		};

		this.agentType = {
				"AGENT":"A",
				"SUB_AGENT":"SA",
				"BRANCH":"BR"
		};
		
		this.servicePointType = {
				"MASTER_AGENT":"MasterAgent",
				"SUB_AGENT":"SubAgent",
				"BRANCH":"Branch"
		};

		this.fileType = {
				"AGENT":"agent",
				"AGENT_STAFF":"agentStaff",
				"CUSTOMER":"customer",
				"DST" : "dst"
		};

		this.roleType = {
				SA 						: 'SA', 
				Admin					: 'Admin', 
				AdminMaker				: 'Admin.Maker', 
				AdminApprover			: 'Admin.Approver', 
				Agent					: 'Agent', 
				AgencyStaffLevell		: 'AgencyStaff.Levell', 
				AgencyStaffLevel2		: 'AgencyStaff.Level2',
				AgencyStaffLevel3		: 'AgencyStaff.Level3',
				AgentManager			: 'Agent.Manager',
				BranchOfficerMaker		: 'Branch.OfficerMaker',
				BranchOfficerApprover	: 'Branch.OfficerApprover',
				BranchManager			: 'Branch.Manager',
				ABDSysMaker				: 'ABD.SYS.Maker', 
				ABDSysChecker			: 'ABD.SYS.Checker',
				ABDMaker				: 'ABD.Maker', 
				ABDChecker				: 'ABD.Checker'
		};

		this.docStatusType = {
				BANK_SUBMITTED 			: 'BS', 
				APPLICATION_SUBMITTED	: 'AS', 
				BANK_MAKE				: 'BM', 
				BANK_CHECKED			: 'BC', 
				BANK_APPROVED			: 'BA',
				BANK_REJECTED			: 'BR',
				MAKE_EDITABLE			: 'ME',
				BOOKED					: 'SB',
				DRAFT					: 'DR',
				ACTIVE					: 'A',
				INACTIVE				: 'I',
				CLOSED					: 'C',
				SERVICE_DELIVERY_APPROVE: 'SDA'
		};

		this.customerTypeID = {
				"Individual_Private_Sector" 		: "IndividualPrivateCustomer",
				"Organizational_Private_Sector" 	: "OrganizationOtherPublicCustomer",
				"Organizational_Government_Sector" 	: "OrganizationGovtCustomer",
				"Organization_Other_Public_Sector" 	: "OrganizationOtherPublicCustomer"
		};

		this.SPForAgent = 'SPForAgent';

		this.AlertMessage = 'AlertMessage';   
		this.AlertModalMessage = 'AlertModalMessage';
		this.userlogin = 'SignIn';
		this.userlogout = 'SignOut';

		this.menuDisable = false;

		this.Active = 'A';
		this.Inactive = 'I';

		this.Save = 'Save';
		this.GetAll = 'GetAll';
		this.GET_OPERATIONAL_BANK_AC_NO = 'GET_OPERATIONAL_BANK_AC_NO';
		this.PerserISOMessage = 'PerserISOMessage';
		this.GetById = 'GetById';
		this.GET_BY_REFERENCE_NO = 'GET_BY_REFERENCE_NO';
		this.updateStatus = "changeStatus";
		this.setDefaultChargeModel = "setDefaultChargeModel";
		this.checkEffectivePeriodValidity = "checkEffectivePeriodValidity";
		this.UPDATE_STATUS_BY_ADMIN = "UPDATE_STATUS_BY_ADMIN";
		this.getAllCharges = "getAllCharges";
		this.getUtilityCharges = "getUtilityCharges";
		this.addCharge = "addCharge";
		this.getCharge = "getCharge";
		this.updateCharge = "updateCharge";
		this.UpdateChargeModelValueJSON = "UpdateChargeModelValueJSON";
		this.UTILITY = "UTILITY";
		this.GENERATE_CALENDAR = "GENERATE_CALENDAR";
		this.CHANGE_DAY = "CHANGE_DAY";
		this.UPDATE_STATUS = "UPDATE_STATUS";

		this.GetBankApprovedCustomers = "GetBankApprovedCustomers";
		this.GetCustomersAccountList = "GetCustomersAccountList";
		this.GetAdminUserList = 'GetAdminUserList';
		this.GetAllApplicationSubmittedCustomers = 'GetAllApplicationSubmittedCustomers';
		this.getSummaryData = 'getSummaryData';
		this.getSystemData = 'getSystemData';
		this.getServiceData = 'getServiceData';
		this.QRCardByCustomer = 'QRCardByCustomer';
		this.QRCardByDate = 'QRCardByDate';
		this.GetBankID = 'GetBankID';
		this.GENERATE_PASSWORD = 'GENERATE_PASSWORD';
		this.GET_PASSWORD_POLICY = 'GET_PASSWORD_POLICY';
		this.VALIDATE_PASSWORD = 'VALIDATE_PASSWWORD';
		
		this.GET_BLOCKED_USER_LIST = "GET BLOCKED USER LIST";
		this.GET_BLOCKED_IP_LIST = "GET BLOCKED IP LIST";
		this.UNBLOCK_USER_BY_LOGIN_ID = "UNBLOCK USER BY LOGIN ID";
		this.UNBLOCK_IP_BY_MACHINE_IP = "UNBLOCK IP BY MACHINE IP";


		this.Danger = 'danger';
		this.Success = 'success';
		this.Info = 'info';
		this.Warning = 'warning';

		this.Bangla = 'বাংলা';
		this.English = 'English';

		this.LanguageChange = 'languageChange';
		this.DuplicateValidation = 'duplicateValidation';

		this.RowEn = 'Items';
		this.RowBn = 'আইটেম';
		
		this.AllEn = 'All';
		this.AllBn = 'সব';

		this.cardViewEn = 'Card View';
		this.cardViewBn = 'কার্ড ভিউ';
		this.listViewEn = 'List View';
		this.listViewBn = 'লিস্ট ভিউ';
		this.chartViewEn = 'Chart View';
		this.chartViewBn = 'চার্ট ভিউ';
		this.calenderViewEn = 'Calender View';
		this.calenderViewBn = 'ক্যালেন্ডার ভিউ';
		this.ViewDetailsEn = 'View Details';
		this.ViewDetailsBn = 'বৃত্তান্ত দেখুন';
		this.lockEn = 'Lock';
		this.lockBn = 'লক করুন';
		this.unLockEn = 'Unlock';
		this.unLockBn = 'আনলক করুন';
		this.SystemOverviewEn = 'System Overview';
		this.SystemOverviewBn = 'সিস্টেম ওভারভিউ';
		this.ServiceOverviewEn = 'Service Overview';
		this.ServiceOverviewBn = 'সার্ভিস ওভারভিউ';
		this.transListEn = 'Transaction List';
		this.transListBn = 'ট্রানজেকশন তালিকা';

		this.NewEn = 'New';
		this.NewBn = 'নতুন';

		this.DeleteEn = 'Delete';
		this.DeleteBn = 'অপসারণ';
		this.RejectEn = "Reject";
		this.RejectBn = "বাতিল";

		this.Add = "Add";
		this.ADD = "ADD";
		this.Update = "Update";
		this.UPDATE = "UPDATE";
		this.Approve = "Approve";
		this.Reject = "Reject";

		this.updateAgentStatus = "changeStatus";
		this.updateBankStatus = "changeStatus";
		this.updateBranchStatus = "changeStatus";

		this.All = "All";
		this.ServicePoint = 'ServicePoint';

		this.Bank = "Bank";
		this.User = "User";
		this.UserInfo = "UserInfo";
		this.Subledger="Subledger";
		this.Branch = "Branch";
		this.FingerOrder= "FingerOrder";   
		this.Ledger = "Ledger";
		this.LedgerGroup = "LedgerGroup";
		this.LedgerCategory = "LedgerCategory";
		this.LedgerInfo = "LedgerInfo";
		this.Account = "Account";
		this.Agent = "Agent";
		this.Period = "Period";
		this.CompanyZone = "CompanyZone";
		this.UtilityCompany = "UtilityCompany";
		this.Product = "Product";

		this.ComboFailMessage = "Unable to load Combo";
		this.SetDataFail = "Unable to set Data";

		this.ID = "ID";  
		this.GetByMultipleID = "GetByMultipleID";  
		this.AgentInfo = "AgentInfo";
		this.SalesTeamInfo = "SalesTeamInfo";
		this.AgentStaffInfo = "AgentStaffInfo";
		this.AccountInfo = "AccountInfo";
		this.AgentIDs = "AgentIDs";
		this.PeriodUpdate = "PeriodUpdate";
		this.PeriodInfoByID = "PeriodInfoByID";
		this.BankInfo = "BankInfo";
		this.updateCategoryStatus = "updateCategoryStatus";
		this.AgentStatement = "AgentStatement";
		this.AccountStatement = "AccountStatement";
		this.TrialBalanceStatement = "TrialBalanceStatement";
		this.BalanceSheetStatement = "BalanceSheetStatement";
		this.IncomeStatement = "IncomeStatement";
		this.Day = "Day";
		this.Week = "Week";
		this.hasActivePeriod = "hasActivePeriod";
		this.bankBranch = "bankBranch";
		this.agraniBankID = "101";


		this.ServicePointIDEn = "Agent Outlet ID";
		this.ServicePointIDBn = "এজেন্ট আউটলেট আইডি";
		this.AgentStaffNameEn = "Agent Staff Name";
		this.AgentStaffNameBn = "এজেন্ট স্টাফের নাম";
		this.NationalityEN = "Nationality";
		this.NationalityBn = "জেন্ডার";
		this.GenderBn = "জাতীয়তা";
		this.GenderEn = "Gender";
		this.ServicePointStatusEn = "Agent Outlet Status";
		this.ServicePointStatusBn = "এজেন্ট আউটলেট স্ট্যাটাস";

		this.ServicePointNameEn = "Agent Outlet Name";
		this.ServicePointTypeEn = "Type"
		this.CityEn = "City";
		this.AckStatusEn = "Ack Status";
		this.AckStatusBn = "স্বীকার করা";
		this.transStatusEn = "trans. Status";
		this.transStatusBn = "ট্রান্স. স্ট্যাটাস";
		
		this.OutletNameEn= "Agent Outlet";
		this.OutletNameBn= "এজেন্ট আউটলেট";

		this.ServicePointNameBn = "এজেন্ট আউটলেট নাম";
		this.ServicePointEn = "Agent Outlet";
		this.ServicePointBn = "এজেন্ট আউটলেট";
		this.ServicePointTypeBn = "এজেন্ট আউটলেট প্রকার"
		this.CityBn = "শহর";
		this.districtNameBn = "জেলার নাম";
		this.districtNameEn = "District Name";
		
		this.submit = "submit";
		this.resetByUser = "resetByUser";
		this.resetByAdmin = "resetByAdmin";

		this.ApproveEn = "Approve";
		this.RejectEn = "Reject";
		this.ApproveBn = "অনুমোদন";
		this.RejectBn = "বাতিল";
		this.View = "View";
		this.Print = "Print";
		this.Calendar = "Calendar";
		
		this.NameEn = "Name";
		this.NameBn = "নাম";
		
		this.effectiveFromEn = "Effective From";
		this.effectiveFromBn = "কার্যকারিতা শুরু";
		this.effectiveToEn = "Effective to";
		this.effectiveToBn = "কার্যকারিতা শেষ";	
		
		this.CustomerIDFEn = "Customer ID";
		this.CustomerIDFBn = "গ্রাহকের আইডি";
		this.CustomerIDEn = "CSB Customer ID";
		this.CustomerNameEn = "Customer Name";
		this.CustomerIDBn = "সিএসবি গ্রাহকের আইডি";
		this.CustomerNameBn = "গ্রাহকের নাম";
		this.ProductNameBn = "পণ্যের নাম";
		this.ProductNameEn = "Product Name";
		this.ProductBn = "পণ্য";
		this.ProductEn = "Product";
		this.ProductIDBn = "পণ্যের আইডি";
		this.ProductIDEn = "Product ID";
		this.ProductTypeEn = "Product Type";
		this.ProductTypeBn = "পণ্যের টাইপ";
		this.ProductDefinitionEn = "Product Definition";
		this.ProductDefinitionBn = "পণ্যের ডেফিনিশন";
		this.CustomerTypeEn = "Customer Type";
		this.CustomerTypeBn = "কাস্টমার টাইপ";
		this.BankAccountNoEn = "Bank Account No";
		this.BankAccountNoBn = "ব্যাংক হিসাব নং";
		
		this.tagLibIDEn = "Tag ID";
		this.tagLibNameEn = "Tag Name";
		this.tagLibIDBn = "টাগ আইডি";
		this.tagLibNameBn = "টাগ নাম";		
		
		this.TransProfileIDEn = "Trans. Profile ID";
		this.TransProfileNameEn = "Trans. Profile Name";
		this.TransProfileForEn = "Trans. Profile For";
		this.TransProfileTypeEn = "Trans. Profile Type";
		this.TransProfileDescriptionEn = "Description";
		this.TransProfileStatueEn = "Status";
		this.TransProfileIDBn = "ট্রান্স. প্রোফাইল আইডি";
		this.TransProfileNameBn = "ট্রান্স. প্রোফাইল নাম";
		this.TransProfileForBn = "ট্রান্স. প্রোফাইল ফর";
		this.TransProfileTypeBn = "ট্রান্স. প্রোফাইল টাইপ";
		this.TransProfileDescriptionBn = "বিবরণ";
		this.TransProfileStatueBn = "অবস্থা";

		this.TotalAccountEn = "Total Account";
		this.TotalAccountBn = "মোট অ্যাকাউন্ট ";
		this.AccountIDEn = "Account ID";
		this.AccountTitleEn = "Account Title";
		this.AccountTypeEn = "Account Type";
		this.AccountCategoryEn = "Account Category";
		this.NationalIDNoEn = "National ID";
		this.MobileNoEn = "Mobile No";
		this.AccountOpeningDateEn = "Account Opening Date";
		this.ApplicationDateEn = "Application Submitted on";
		this.DatesofExEn = "Date Of Exchange";
		this.DatesofExBn = "এক্সচেঞ্জ  তারিখ";
		this.AccountIDBn = "অ্যাকাউন্ট আইডি";
		this.CSBAccountIDBn = "সি এস বি অ্যাকাউন্ট আইডি";
		this.AccountTitleBn = "অ্যাকাউন্ট শিরোনাম";
		this.AccountTypeBn = "অ্যাকাউন্ট ধরণ";
		this.AccountCategoryBn = "অ্যাকাউন্ট শ্রেণী";
		this.NationalIDNoBn = "ন্যাশনাল আইডি";
		this.MobileNoBn = "মোবাইল নং";
		this.AccountOpeningDateBn = "অ্যাকাউন্ট খোলার তারিখ" ;
		this.ApplicationDateBn = "অ্যাপ্লিকেশান জমার তারিখ";
		this.AccountBalanceBn = "অ্যাকাউন্ট জমা";
		this.AccountBalanceEn = "Account Balance";
		this.FatherNameEn = "Father's Name";
		this.FatherNameBn = "পিতার নাম";
		this.PermanentEn = "Permanent";
		this.PermanentBn = "স্থায়ী";
		this.PresentEn = "Present";
		this.PresentBn = "বর্তমান";
		this.InitialDepositEn = "Initial Deposit";
		this.InitialDepositBn = "প্রাথমিক আমানত";
		this.AccountStatusEn = "Account Status";
		this.AccountStatusBn = "অ্যাকাউন্ট অবস্থা";
		this.debitedAccountEn = "Debited Account";
		this.debitedAccountBn = "ডেবিট অ্যাকাউন্ট";
		this.creditedAccountEn = "Credited To";
		this.creditedAccountBn = "ক্রেডিটেড টু";
		this.csbBankAccountNoEn = "Bank Account";
		this.csbBankAccountNoBn = "ব্যাংক অ্যাকাউন্ট";

		this.ACOpeningDateEn = "A/C Opening Date";
		this.ACOpeningDateBn = "অ্যাকাউন্ট খোলার তারিখ" ;
		this.ACNameEn = "Account Name";
		this.ACNameBn = "অ্যাকাউন্টের নাম";
		this.ACNumberEn = "A/C Number";
		this.ACNumberBn = "অ্যাকাউন্ট নম্বর";
		this.ACOpeningBalanceEn = "Opening Balance";
		this.ACOpeningBalanceBn = "প্রারম্ভিক জমা";
		this.ACStatusEn = "A/C Status";
		this.ACStatusBn = "অ্যাকাউন্টের অবস্থা";
		this.RMCodeEn = "RM Code";
		this.RMCodeBn = "আরএম কোড";
		this.DistrictEn = "District";
		this.DistrictBn = "জেলা" ;
		
		this.DepositDateEn = "Deposit Date";
		this.DepositDateBn = "ডিপোজিট তারিখ";
		
		this.WithdrawalDateEn = "Withdrawal Date";
		this.WithdrawalDateBn = "উত্তোলন তারিখ";
		
		this.TransactionIdEn = "Transaction Id";		
		this.TransactionIdBn = "ট্রানস্যাকশন আইডি";		
		
		this.AccountNumberEn = "Account Number";
		this.AccountNumberBn = "অ্যাকাউন্ট নম্বর";
		this.AccountHoldersNameEn = "Account Holders Name";
		this.AccountHoldersNameBn = "একাউন্টধারী এর নাম";
		this.TransferDateEn = "Transfer Date";
		this.TransferDateBn = "স্থানান্তর তারিখ";
		this.TransferredToEn = "Transferred To";
		this.TransferredToBn = "স্থানান্তরিত";
        this.TransferredAccountNameEn = "Transferred A/C Name";
        this.TransferredAccountNameBn = "স্থানান্তরিত অ্যাকাউন্টের নাম";
        this.BeneficiaryBankEn = "Beneficiary Bank";
        this.BeneficiaryBankBn = "সুবিধাভোগী ব্যাংক";
        this.BeneficiaryBranchEn = "Beneficiary Branch";
        this.BeneficiaryBranchBn = "সুবিধাভোগী ব্রাঞ্চ";
        this.TransactionIdEn = "Transaction ID";
        this.TransactionIdBn = "লেনদেন আইডি";
        this.TransferAmountEn = "Transfer Amount";
        this.TransferAmountBn = "স্থানান্তর পরিমাণ";
        this.NumberofCBLTransEn = "Number of CBL Transfer";
        this.NumberofCBLTransBn = "সিবিএল  স্থানান্তর সংখ্যা";
        this.NumberofOthersTransEn = "Number of Other Transfer";
        this.NumberofOthersTransBn = "অন্যান্য স্থানান্তর সংখ্যা";
        this.AmountofCBLEn = "Amount of CBL";
        this.AmountofCBLBn = "সিবিএল এর পরিমাণ";
        this.AmountofOthersEn = "Amount of Others";
        this.AmountofOthersBn = "অন্যদের পরিমাণ";
        this.TotalNumberEn = "Total Number";
        this.TotalNumberBn = "মোট সংখ্যা";
        this.TotalAmountEn = "Total Amount";
        this.TotalAmountBn = "মোট পরিমাণ";
        


		this.AccountBalanceEn = "Balance of Accounts";
		this.AccountBalanceBn = "অ্যাকাউন্ট ব্যালেন্স";
		this.NmbrOfAccountEn = "No. of A/Cs";
		this.NmbrOfAccountBn = "অ্যাকাউন্ট সংখ্যা";
		
		this.LoginIdEn = 'Login ID';
		this.EmailEn = 'Email';
		this.RoleEn = 'Role';
		this.LoginIdBn = 'লগইন আইডি';
		this.EmailBn = 'ইমেইল';
		this.RoleBn = 'ভূমিকা';
		
		
		this.RMNoEn = 'RM No';
		this.RMNoBn = 'আরএম  নম্বর';
		this.MakerIDEn = 'Maker ID';
		this.MakerIDBn = 'মেকার আইডি';	
		

		this.RoleIDEn = 'Role ID';
		this.RoleIDBn = 'ভূমিকা আইডি';
		this.RoleDescriptionEn = 'Role Description';
		this.RoleDescriptionBn = 'ভূমিকার  বিস্তারিত';
		
		this.SMSEn = "SMS";
		this.SMSBn = "এসএমএস";
		this.sendDateEn = "Send Date";
		this.sendDateBn = "পাঠানোর তারিখ";

		this.machineIPEn = 'Machine IP';
		this.machineIPBn = 'মেশিন আইপি';
		this.signinDateEn = 'Sign In Date';
		this.signinDateBn = 'সাইন ইন এর সময়কাল';
		this.signoutDateEn = 'Sign Out Date';
		this.signoutDatePBn = 'সাইন আউট এর সময়কাল';

		this.ChangedByEn='Changed By';
		this.ChangedByBn='পরিবর্তনকারী';
		this.CreatedByEn='Created By';
		this.CreatedByBn='প্রস্তুতকারক';

		this.BankNameEn='Bank Name';
		this.BankIDEn = "Bank ID";
		this.BankNameBn='ব্যাংকের নাম';
		this.BankIDBn = "ব্যাংক আইডি";

		this.BranchNameEn='Branch Name';
		this.BranchIDEn = "Branch ID";
		this.BranchNameBn='ব্রাঞ্চের নাম';
		this.BranchIDBn = "ব্রাঞ্চ আইডি";

		this.AgentIDEn = "Agent ID";
		this.AgentNameEn = "Agent Name";
		this.totalTerminalEn = "Total Terminal";
		this.AgentStaffIDEn = "Agent Staff ID";
		this.AgentStaffIDBn = "এজেন্ট স্টাফ আইডি";
		this.DeviceIDEn = "Device ID";
		this.AgentIDBn = "এজেন্ট আইডি";
		this.AgentNameBn = "এজেন্টের নাম";
		this.totalTerminalBn = "মোট টার্মিনাল";
		this.DeviceIDBn = "ডিভাইস আইডি";
		this.AgentTypeEn = "Agent Type";
		this.AgentTypeBn = "এজেন্ট টাইপ";

		this.PeriodIDBn = 'মেয়াদ আইডি';
		this.PeriodNameBn = 'নাম';
		this.FinancialYearBn = 'আর্থিক বৎসর';
		this.PeriodTypeBn = 'মেয়াদ প্রকার';
		this.EffectiveFromBn = 'আরম্ভ';
		this.EffectiveToBn = 'শেষ';
		this.OpenDateBn = 'শুরুর তারিখ';
		this.ClosingDateBn = 'শেষ তারিখ';
		this.PeriodStatusBn = 'অবস্থা';
		this.PeriodIDEn = 'Period ID';
		this.PeriodNameEn = 'Name';
		this.FinancialYearEn = 'Fin. Year';
		this.PeriodTypeEn = 'Period Type';
		this.EffectiveFromEn = 'Effective From';
		this.EffectiveToEn = 'Effective To';
		this.OpenDateEn = 'Opening';
		this.ClosingDateEn = 'Closing';
		this.PeriodStatusEn = 'Status';
		this.shiftEn = 'Shift';
		this.shiftBn = 'শিফট';
		
		this.YearEn = "Year";
		this.YearBn = "বৎসর";

		this.SubledgerIDBn = 'সাব-খতিয়ান আইডি';
		this.SubledgerNameBn = 'নাম';
		this.SubledgerTypeBn = 'প্রকার';
		this.OpeningBalanceBn = 'প্রারম্ভিক জমা';
		this.SubledgerBalanceBn = 'সাব-খতিয়ান জমা';
		this.ClosingBalanceBn = 'শেষ স্থিতি';
		this.DescriptionBn = 'বিবরণ';
		this.LedgerIDBn = 'খতিয়ান আইডি';
		this.SubledgerIDEn = 'Subledger ID';
		this.SubledgerNameEn = 'Name';
		this.SubledgerTypeEn = 'Type';
		this.OpeningBalanceEn = 'Opening Bal.';
		this.SubledgerBalanceEn = 'Subledger Bal.';
		this.ClosingBalanceEn = 'Closing Bal.';
		this.DescriptionEn = 'Description';

		this.TransactionIDEn = "Tran. ID";
		this.ReferanceIDEn = "Ref. ID";
		this.TranDateEn = "Tran. Date";
		this.DebitEn = "Debit";
		this.CreditEn = "Credit";
		this.BalanceEn = "Balance";
		this.TransactionIDBn = "ট্রান্স আইডি";
		this.ReferanceIDBn = "রেফ আইডি";
		this.TranDateBn = "ট্রান্স তারিখ";
		this.DebitBn = "ডেবিট";
		this.CreditBn = "ক্রেডিট";
		this.BalanceBn = " জমা";

		this.OpeningBalanceBn = 'প্রারম্ভিক জমা';
		this.LedgerBalanceBn = 'খতিয়ান হিসাব';
		this.ClosingBalanceBn = 'সমাপনী হিসাব';
		this.LedgerStatusBn = 'অবস্থা';
		this.LedgerNameEn = 'Name';
		this.LedgerTypeEn = 'Type';
		this.OpeningBalanceEn = 'Opening Bal.';
		this.LedgerBalanceEn = 'Ledger Bal.';
		this.ClosingBalanceEn = 'Closing Bal.';

		this.ItemEn = "Item";
		this.NumberEn = "Number";
		this.AmountEn = "Amount";
		this.ItemBn = "আইটেমটি";
		this.NumberBn = "সংখ্যা";
		this.AmountBn = "মোট";

		this.transdateEn = "Trans. Date";
		this.transdateBn = "ট্রান্স তারিখ";
		this.entrydateEn = "Entry Date";
		this.entrydateBn = "এণ্ট্রির তারিখ";
		this.bankAcNoEn = "Account";
		this.bankAcNoBn = "অ্যাকাউন্ট ";

		this.totalAccountEn = "Number of Account";
		this.totalAccountBn = "অ্যাকাউন্ট সংখ্যা";
		
		this.transactionAmountEn = "Transaction Amount";
		this.transactionAmountBn = "লেনদেনের পরিমান";
		this.totalAmountEn = "Total Amount";
		this.totalAmountBn = "মোট";
		this.transAmountEn = "Transaction Amount";
		this.UserIdEn = "User ID";
	    this.UserIdBn = "ব্যবহারকারী আইডি";     
		
		this.debitAmountBn = "ডেবিট টাকা";
		this.debitAmountEn = "Dr. Amount";
		this.creditAmountBn = "ক্রেডিট টাকা";
		this.creditAmountEn = "Cr. Amount";
		
		this.bookNoBn = "বই নং";
		this.bookNoEn = "Book No.";
		this.meterRentBn = "মিটার বিল";
		this.meterRentEn = "Meter Rent";
		this.transformerRentBn = "ট্রান্সফরমার বিল";
		this.transformerRentEn = "Transformer Rent";
		this.othersFeeBn = "অন্যান্য বিল";
		this.othersFeeEn = "Others Fee";
		this.lateFeeBn = "বিলম্ব ফি";
		this.lateFeeEn = "Late Fee";
		this.penaltyBn = "পেনাল্টি";
		this.penaltyEn = "Penalty";
		
		this.transAmountBn = "লেনদেনের পরিমাণ";
		this.fundInBn = "জমা";
		this.fundInEn = "Fund In";
		this.fundOutBn = "উত্তোলন";
		this.fundOutEn = "Fund Out";
		
		this.ThreadEn = "[Thread]";
		this.DateTimeEn = "Date Time";
		this.LevelEn = "Level";
		this.MessageEn = "Message";
		this.ThreadBn = "[থ্রেড]";
		this.DateTimeBn = "তারিখ ও সময়";
		this.LevelBn = "লেভেল";
		this.MessageBn = "মেসেজ";
		

		this.withdrawalBn = "উত্তোলন";
		this.withdrawalEn = "Withdrawal";
		this.depositBn = "জমা";
		this.depositEn = "Deposit";
		this.fundTransferBn = "তহবিল স্থানান্তর";
		this.fundTransferEn = "Fund Transfer";
		this.requestTypeEn = "Request Type";
		this.requestTypeBn = "রিকোয়েস্ট টাইপ";
		
		
		this.DateEn = "Date";
		this.DateBn = "তারিখ";
		
		this.TransactionTypeEn = "Transaction type";
		this.TransactionTypeBn = "ট্রান্সেকশন ধরন";
		
		this.NumberOfTransactionEn = "Number of Transaction";
		this.NumberOfTransactionBn = "ট্রান্সেকশন সংখ্যা";
		
		this.totalAmountEn = "Total Amount";
		this.totalAmountBn = "মোট পরিমাণ";
		
		this.utilityBn = "ইউটিলিটি";
		this.utilityEn = "Utility";
		this.agentBn = "এজেন্ট চার্জ";
		this.agentEn = "Agent Charge";
		this.celloscopeBn = "সেলেস্কপ চার্জ";
		this.celloscopeEn = "Celloscope Charge";
		this.vatEn = "Vat";
		this.vatBn = "ভ্যাট";

		this.jsonBn = "জেসন";
		this.jsonEn = "JSON";
		this.propertyIDBn = "আইডি";
		this.propertyIDEn = "ID";

		this.fileNameEn = "File Name";
		this.requestedDateEn = "Request Date";
		this.pdfGenerationDateEn = "PDF Generation Date";
		this.fileNameBn = "ফাইলের নাম";
		this.requestedDateBn = "রিকোয়েস্ট  তারিখ";
		this.pdfGenerationDateBn = "পিডিএফ জেনারেট তারিখ";
		this.passwordEn = "Password";
		this.passwordBn = "পাসওয়ার্ড";
		this.resetEn = "Reset Password";
		this.resetBn = "পাসওয়ার্ড রিসেট";
		this.resetPassword = "resetPassword";
		this.ErrorMessage = 'ErrorMessage';
		this.DefaultCode = 'Df1000';
		this.DuplicateData = 'Du1000';
		this.OldPasswordDidNotMached = 'OPDNM1000';
		this.changeStatusSuccess = 'CSS1000';
		this.changeStatusFailed = 'CSF1000';
		/*this.Admin = "Admin";
		this.BranchOfficer = "Branch.Officer";
		this.BranchManager = "Branch.Manager";
		this.AgentManager = "Agent.Manager";
		this.BranchOfficerMaker = 'Branch.OfficerMaker';
		this.BranchOfficerChecker = 'Branch.OfficerChecker';
		this.BranchOfficerApprover = 'Branch.OfficerApprover';*/

		this.changeFromFingerBn = "আঙুল হতে পরিবর্তন করুন";
		this.changeFromFingerEn = "Change Form Finger";
		this.changeToFingerBn = "আঙুল থেকে পরিবর্তন করুন";
		this.changeToFingerEn = "Change To Finger";
		this.changeReasonBn = "পরিবর্তনের কারণ";
		this.changeReasonEn = "Change Reason";
		this.applyDateBn = "আবেদনের তারিখ";
		this.applyDateEn = "Apply Date";
		this.changeDateBn = "পরিবর্তনের তারিখ";
		this.changeDateEn = "Change Date";

		this.slNoEn = "#";
		this.slNoBn = "#";
		this.requestIDBn = "রিকোয়েস্ট আইডি";
		this.requestIDEn = "Request ID";
		this.transactionTypeBn = "লেনদেনের ধরন";
		this.transactionTypeEn = "Transaction Type";
		this.transactionDateBn = "লেনদেনের তারিখ";
		this.transactionDateEn = "Transaction Date";
		this.customerAccNoEn = "Customer Acc No";
		this.customerAccNoBn = "কাস্টমার অ্যাকাউন্ট নাম্বার";
		this.statusBn = "স্ট্যাটাস";
		this.statusEn = "Status";
		this.viewDetailBn = "ভিউ  ";
		this.viewDetailEn = "View";
		this.defaultBn = "ডিফল্ট";
		this.defaultEn = "Default";
		
		this.AccountIDBn = "অ্যাকাউন্ট আইডি";
		this.AccountIDEn = "Account ID";
		this.CSBAccountIDEn = "CSB Account ID";
		this.AccountNameBn = "অ্যাকাউন্টের নাম";
		this.AccountNameEn = "Account Name";
		this.AccountStatusBn = "অ্যাকাউন্ট অবস্থা";
		this.AccountStatusEn = "Account Stauts";
		this.accountBalanceBn = "অ্যাকাউন্ট হিসাব";
		this.accountBalanceEn = "Account Balance";

		this.companyEn = "Company";
		this.companyBn = "কোম্পানি";
		this.locationEn = "Location";
		this.locationBn = "অবস্থান";
		this.billTypeEn = "Bill Type";
		
		this.billtypeIDEN = "Bill Type ID";
		this.billtypeIDBN = "বিল টাইপ আইডি";
		this.billtypeNameEN = "Bill Type Name";
		this.billtypeNameBN = "বিল টাইপ নাম";
	
		this.billTypeBn = "বিল প্রকার";
		this.draweeLocationEn = "Drawee Location";
		this.draweeLocationBn = "উত্তোলন অবস্থান";
		this.billAmountEn = "Bill";
		this.billAmountBn = "বিল";
		this.vatAmountEn = "Vat";
		this.vatAmountBn = "ভ্যাট";
		this.netBillAmountEn = "Net Bill";
		this.netBillAmountBn = "নেট বিল";
		this.stampCountEn = "Stamp";
		this.stampCountBn = "স্ট্যাম্প";
		
		this.CompanyCodeEn = "Company Code";
		this.CompanyCodeBn = "কোম্পানি কোড";
		this.ContactNumberEn = "Contact Number";
		this.ContactNumberBn = "কন্টাক্ট নম্বর";
		this.ContactPersonEn = "Contact Person";
		this.ContactPersonBn = "কন্টাক্ট পারসন";
		this.CentralizeBillingEn = "Centralized Billing";
		this.CentralizeBillingBn = "সেন্ট্রালাইজড বিলিং";
		
		this.trackingIDEn = 'Tracking ID';
		this.requestDateEn ='Request Date';
		this.receiptDateEn ='Bank Receipt Date';
		this.trackingIDBn = 'ট্র্যাকিং আইডি';
		this.requestDateBn ='পাঠানোর তারিখ';
		this.receiptDateBn ='ব্যাংক গ্রহনের তারিখ';
		
		this.recipientAccountIDEn = 'Recipient ACC ID';
		this.recipientNameEn ='Recipient Name';
		this.amountEn ='Amount';
		this.recipientAccountIDBn = 'প্রাপকের আইডি';
		this.recipientNameBn ='প্রাপকের  নাম';
		this.amountBn ='পরিমাণ';
		this.MonthEn ='Months';
		this.MonthBn ='মাস';
		this.TotalEn ='Total';
		this.TotalBn ='মোট';
		
		this.pinEN ="PIN";
		this.pinBN ="পিন";
		this.senderNameEN ="Sender Name";
		this.senderNameBN ="প্রেরকের নাম";
		this.senderCountryEN ="Sender Country";
		this.senderCountryBN ="প্রেরকের দেশ";
		this.recipientNameEN ="Recipient Name";
		this.recipientNameBN ="প্রাপকের নাম";
		this.recipientMobileEN ="Recipient Mobile";
		this.recipientMobileBN ="প্রাপকের মোবাইল";
		this.recipientEmailEN ="Recipient Email";
		this.recipientEmailBN ="প্রাপকের  ই -মেইল";
		this.currencyEN ="Currency";
		this.currencyBN ="মুদ্রা";
		this.exchangeRateEN ="Exchange Rate";
		this.exchangeRateBN ="বিনিময় হার";
		this.actualAmountEN ="Actual Amount";
		this.actualAmountBN ="প্রকৃত পরিমাণ";
		this.amountInBDTEN ="Amount In BDT";
		this.amountInBDTBN ="বাংলাদেশী টাকায় পরিমাণ";
		
		this.ServiceTerminalIDEn = "Service Terminal ID";
		this.MobileIMEIEn = "Mobile IMEI";
		this.BiometricDeviceAddressEn = "Biometric Device";
		this.PrinterDeviceAddressEn = "Printer Device Address";
		this.CardDeviceAddressEn = "Card Device Address";
		
		this.MobileIMEIBn = "মোবাইল আই এম ই আই";
		this.BiometricDeviceAddressBn = "বায়োমেট্রিক ডিভাইস";
		this.PrinterDeviceAddressBn = " প্রিন্টার ডিভাইস এড্রেস";
		this.CardDeviceAddressBn = "কার্ড ডিভাইস এড্রেস";
		
		this.ServicePointEn = "Agent Outlet";        
		this.ServiceTerminalIDBn = "সেবা টার্মিনাল আইডি";
		this.ServicePointBn = "এজেন্ট আউটলেট";
		
		this.outletAreaIDEn = "Outlet Area ID";        
		this.outletAreaNameEn = "Outlet Area Name";
		
		this.outletZoneIDEn = "Outlet Zone ID";        
		this.outletZoneNameEn = "Outlet Zone Name";
		this.outletZoneIDBn = "আউটলেট জোন আইডি";        
		this.outletZoneNameBn = "আউটলেট জোনের নাম";
		this.districtEn = "District";
		this.districtBn = "জেলা";
		this.ExchangeHouseEn = "Exchange House";
		this.ExchangeHouseBn = "এক্সচেঞ্জ হাউজ";
		this.beneficiaryNameEn = "Beneficiary Name";
		this.beneficiaryNameBn = "প্রাপকের নাম";
		this.remitterNameEn = "Remitter Name";
		this.remitterNameBn = "অর্থপ্রেরক  নাম";
		this.remittingCountryEn = "Remitting Country";
		this.remittingCountryBN = "অর্থপ্রেরক  দেশ";
		this.remittanceAmountEn = "Remittance Amount ";
		this.remittanceAmountBn = "রেমিটেন্স টাকার পরিমাণ";
		this.remarksEn = "Remarks";
		this.remarksBn = "মন্তব্য";
		this.DateOfExchangeEn = "Date of Exchange";
		this.DateOfExchangeBn = "এক্সচেঞ্জ তারিখ";
		
		this.PayOutAmountEn = "Payout Amount";
		this.PayOutAmountBn = "পরিশোধের পরিমাণ";
		this.AmountSendBySenderEn = "Amount Sent By Sender";
		this.AmountSendBySenderBn = "প্রেরকের দ্বারা প্রেরিত টাকার পরিমাণ";
		
		this.sectionNameEn = "Section";
		this.tableNameEn = "Table Name";
		this.timeOfActionEn = "Time of Action";
		this.actionTypeEn = "Action Type";
		this.actionUserEn = "Action User";
		this.sectionNameBn = "সেকশন";
		this.tableNameBn = "টেবিলের নাম";
		this.timeOfActionBn = "অ্যাকশান এর সময়কাল";
		this.actionTypeBn = "অ্যাকশান এর ধরণ";
		this.actionUserBn = "অ্যাকশান ইউজার";

		this.actionEn = "Action";
		this.actionBn = "অ্যাকশান";
		
		/*{ title: constantService.CompanyNameEn, 		field: 'companyName', 			visible: true },
        { title: constantService.EntryDateEn,		 	field: 'entryDateStr', 			visible: true },
        { title: constantService.BillPaymentMonthEn, 	field: 'billPaymentMonth', 		visible: true },
        { title: constantService.CustomerNameEn,		field: 'customerName', 			visible: true },
        { title: constantService.BillRefNoEn,			field: 'billReferenceNumber', 	visible: true },
        { title: constantService.NetBillEn,			field: 'netBillAmount', 		visible: true },
        { title: constantService.PaymentTypeEn,		field: 'paymentType',	 		visible: true }*/
		this.CompanyNameEn = "Company Name";
		this.agentNameEn = "Agent Name";
		this.EntryDateEn = "Entry Date";
		this.BillPaymentMonthEn = "Pay Month";
		this.CustomerNameEn = "Customer Name";
		this.BillRefNoEn = "Bill Ref. No";
		this.NetBillEn = "Net Bill";
		this.PaymentTypeEn = "Pay In";
		
		this.CompanyNameBn = "কোমপানির নাম";
		this.agentNameBn = "এজেন্টের নাম";
		this.EntryDateBn = "এণ্ট্রি তারিখ";
		this.BillPaymentMonthBn = "পেমেন্ট মাস";
		this.CustomerNameBn = "গ্রাহকের নাম";
		this.BillRefNoBn = "বিল রেফারেন্স";
		this.NetBillBn = "নেট বিল";
		this.PaymentTypeBn = "প্রদান";
		
		this.ZoneNameBn = "এলাকা";
		this.ZoneNameEn = "Zone";
		this.companyZone = "এলাকা";
		this.ZoneStatusBn = "এলাকা স্ট্যাটাস";
		this.ZoneStatusEn = "Zone Status";
		
		this.tpgForAccount='Account';
		this.tpgForOutlet='Outlet';
		this.BANK_DRAFT_S = "DR";
		this.BANK_DRAFT = "BANK_DRAFT";
		this.BANK_MAKE_S = "BM";
		this.BANK_MAKE = "BANK_MAKE";
		this.BANK_CHECKED_S = "BC";
		this.BANK_CHECKED = "BANK_CHECKED";
		this.BANK_APPROVED_S = "BA";
		this.BANK_APPROVED = "BANK_APPROVED";
		this.BANK_REJECTED_S = "BR";
		this.MAKE_EDITABLE_S = "ME"
		this.BANK_CANCLE_S = "C";
		this.BANK_ACTIVE_S = "A";
		this.DST_APPROVED_S = "DSTA";
		this.BANK_REJECTED = "BANK_REJECTED";
		this.SELECT_BY_ID = "SELECT_BY_ID";
		this.WORK_CALENDAR_BY_ID = "WORK_CALENDAR_BY_ID";
		this.SELECT_ALL = 'SELECT_ALL';
		this.REB_DAILY_REPORT_BRANCH = 'REB_DAILY_REPORT_BRANCH';
		this.REB_DAILY_REPORT_ZONE = 'REB_DAILY_REPORT_ZONE';
		this.REB_DAILY_REPORT_SUMMARY_BRANCH = 'REB_DAILY_REPORT_SUMMARY_BRANCH';
		this.REB_DAILY_REPORT_SUMMARY_ZONE = 'REB_DAILY_REPORT_SUMMARY_ZONE';
		this.REB_DAILY_REPORT_SUMMARY_ZONE_XLS = 'REB_DAILY_REPORT_SUMMARY_ZONE_XLS';
		this.REB_DAILY_REPORT_SUMMARY_Branch_XLS = 'REB_DAILY_REPORT_SUMMARY_Branch_XLS';
		this.SELECT_BY_PARAM = 'SELECT_BY_PARAM';
		this.GET_LOCKED_ACCOUNT = 'GET_LOCKED_ACCOUNT';
		this.VALID_AGENT_ID = 'VALID_AGENT_ID';
		this.VALID_AGENT_ACCOUNT = 'VALID_AGENT_ACCOUNT';
		this.LOCK_STATUS = 'LOCK_STATUS';
		this.UPDATE_LOCK_STATUS = 'UPDATE_LOCK_STATUS';
		this.LOCK_STATUS_S = 'Locked';
		this.UNLOCK_STATUS_S = 'Unlocked';

		this.GET_ALL_TOP_MENU = 'GET_ALL_TOP_MENU';
		//Reports
		this.ACCOUNT_LIST_DETAIL = "ACCOUNT_LIST_DETAIL";
		this.PRINT_CUSTOMER_INFO = "PRINT_CUSTOMER_INFO";
		this.ACCOUNT_LIST_SUMMARY = "ACCOUNT_LIST_SUMMARY";
		this.FUND_IN_OUT_BRANCH = "FUND_IN_OUT_BRANCH";
		this.TRANSACTION_SUMMARY_BRANCH = 'TRANSACTION_SUMMARY_BRANCH';
		this.TRANSACTION_LISTING_SUMMARY_REPORT = 'TRANSACTION_LISTING_SUMMARY_REPORT';
		this.FUND_IN_OUT_AGENT = 'FUND_IN_OUT_AGENT';
		this.DEPOSIT_SUMMARY_PRODUCTWISE = 'DEPOSIT_SUMMARY_PRODUCTWISE';
		this.USER_STATUS = 'USER_STATUS';
		this.REMITTANCE_ALL_LIST = 'REMITTANCE_ALL_LIST';
		this.BANK_WISE_REMITTANCE_ALL_LIST = 'BANK_WISE_REMITTANCE_ALL_LIST';
		this.AGENT_WISE_REMITTANCE_ALL_LIST = 'AGENT_WISE_REMITTANCE_ALL_LIST';
		this.BRANCH_WISE_REMITTANCE_ALL_LIST = 'BRANCH_WISE_REMITTANCE_ALL_LIST';
		this.NEW_ACCOUNT_LIST = 'NEW_ACCOUNT_LIST';
		this.AGENT_DETAILS = 'AGENT_DETAILS';
		this.CUSTOMER_DETAILS = 'CUSTOMER_DETAILS';
		this.AGENT_TERMINAL_DETAILS = 'AGENT_TERMINAL_DETAILS';
		this.AGENT_LIST = 'AGENT_LIST';
		this.TRANSACTION_REPORT ='TRANSACTION_REPORT';
		this.TRANSACTION_LISTING_REPORT ='TRANSACTION_LISTING_REPORT';
		this.Daily_Bank_Cheque_Collection_Report ='Daily_Bank_Cheque_Collection_Report';
		this.DateWise_Bank_Cheque_Collection_Report = 'DateWise_Bank_Cheque_Collection_Report';
		this.Daily_Branch_Cheque_Collection_Report = 'Daily_Branch_Cheque_Collection_Report';
		this.DateWise_Branch_Cheque_Collection_Report = 'DateWise_Branch_Cheque_Collection_Report';
		this.Daily_Agent_Cheque_Collection_Report = 'Daily_Agent_Cheque_Collection_Report';
		this.DateWise_Agent_Cheque_Collection_Report = 'DateWise_Agent_Cheque_Collection_Report';
		this.TOLL_COLLECTION_REPORT = 'TOLL_COLLECTION_REPORT';
		this.ACCOUNT_LISTING_REPORT ='ACCOUNT_LISTING_REPORT';
		this.APP_ACCOUNT_LISTING_REPORT ='APP_ACCOUNT_LISTING_REPORT';
		this.ACCOUNT_LISTING_SUMMARY_REPORT ='ACCOUNT_LISTING_SUMMARY_REPORT';
		this.Enrollment_Account_Listing_Report = 'Enrollment_Account_Listing_Report';
		this.Enrollment_Account_Listing_Summary_Report = 'Enrollment_Account_Listing_Summary_Report';
		this.TRANSACTION_LIST ='TRANSACTION_LIST';		
		this.TRANSACTION_LIST_BY_TYPE ='TRANSACTION_LIST_BY_TYPE';
		this.TRANSACTION_DETAIL ='TRANSACTION_DETAIL';
		this.TRANSACTION_DETAIL_BY_ID ='TRANSACTION_DETAIL_BY_ID';
		this.REVERSE_TRANSACTION ='REVERSE_TRANSACTION';
		this.TRANSACTION_DETAIL_BY_STATUS ='TRANSACTION_DETAIL_BY_STATUS';
		this.APPROVE_REVERSE_TRANSACTION ='APPROVE_REVERSE_TRANSACTION';
		this.ACCOUNT_OPENING_DETAIL_REPORT ='ACCOUNT_OPENING_DETAIL_REPORT';
		this.FUND_TRANSFER_DETAIL_REPORT ='FUND_TRANSFER_DETAIL_REPORT';
		this.FUND_TRANSFER_DETAIL_BO_REPORT ='FUND_TRANSFER_DETAIL_BO_REPORT';
		this.FUND_TRANSFER_SUMMARY_REPORT ='FUND_TRANSFER_SUMMARY_REPORT';
		this.FUND_TRANSFER_SUMMARY_BO_REPORT ='FUND_TRANSFER_SUMMARY_BO_REPORT';
		this.ACCOUNT_OPENING_SUMMARY_REPORT ='ACCOUNT_OPENING_SUMMARY_REPORT';
		this.ACCOUNT_OPENING_SUMMARY_BO_REPORT = 'ACCOUNT_OPENING_SUMMARY_BO_REPORT';
		this.APP_ACC_OPENING_REPORT ='APP_ACC_OPENING_REPORT';
		this.UPLOAD_MIS = 'UPLOAD_MIS';
		this.CHECK_MIS = 'CHECK_MIS';
		this.PROCESSED = 'PROCESSED';
		this.NOT_PROCESSED = 'NOT_PROCESSED';
		
		this.DEPOSIT_TRANSACTION_REPORT = 'DEPOSIT_TRANSACTION_REPORT';
		this.WITHDRAWAL_TRANSACTION_REPORT = 'WITHDRAWAL_TRANSACTION_REPORT';
		this.DEPOSIT_WITHDRAWAL_SUMMARY_REPORT = 'DEPOSIT_WITHDRAWAL_SUMMARY_REPORT';
		
		this.DEPOSIT_TRANSACTION_BO_REPORT = 'DEPOSIT_TRANSACTION_BO_REPORT';
		this.WITHDRAWAL_TRANSACTION_BO_REPORT = 'WITHDRAWAL_TRANSACTION_BO_REPORT';
		this.DEPOSIT_WITHDRAWAL_SUMMARY_BO_REPORT = 'DEPOSIT_WITHDRAWAL_SUMMARY_BO_REPORT';		
		
		this.REMITTANCE_REPORT_SUMMARY = 'REMITTANCE_REPORT_SUMMARY';
		this.REMITTANCE_REPORT_SUMMARY_BO = 'REMITTANCE_REPORT_SUMMARY_BO';
		
		// end Reports
		this.GET_APPLICATION_SUBMITTED_CUSTOMER_LIST = "GetASCustomerList";
		this.GET_BANK_REJECTED_CUSTOMER_LIST = "GetBRCustomerList";
		this.GET_BANK_MADE_CUSTOMER_LIST = "GetBMCustomerList";
		this.GET_BANK_CHECKED_CUSTOMER_LIST = "GetBCCustomerList";
		this.GET_ALL_CUSTOMER_LIST = "GetAllCustomerList";
		this.GET_CUSTOMER_INFO_BY_CUSTOMER_ID = "GetCustomerInfoByCustomerID";
		this.MAKE_CUSTOMER = "MakeCustomer";
		this.REMAKE_CUSTOMER = "RemakeCustomer";
		this.CHECK_CUSTOMER = "CheckCustomer";
		this.APPROVE_CUSTOMER = "ApproveCustomer";
		this.REJECT_CUSTOMER = "RejectCustomer";
		this.CANCEL_CUSTOMER = "CancelCustomer";
		this.AGENT_PASSWORD_RESET_INFO = "AGENT_PASSWORD_RESET_INFO";

		this.GET_ADMIN_OFFICER_LIST_FOR_BM = "GetAdminOfficerListForBM";
		this.GET_ADMIN_OFFICER_LIST_FOR_BA = "GetAdminOfficerListForBA";
		this.GET_USER_LIST_FOR_BM = "GetUserListForBM";
		this.GET_USER_LIST_FOR_BA = "GetUserListForBA";
		this.GET_USER_LIST_FOR_SA = "GetUserListForSA";
		this.GET_AGENT_INFO_BY_ID = "GetAgentDetailsByID";
		this.CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
		this.UPDATE_PASSWORD_REQUEST = "UPDATE_PASSWORD_REQUEST";
		this.GET_ALL_RESET_PASSWORD = "GET_ALL_RESET_PASSWORD";
		this.SMS_LOG_REPORT = "SMS_LOG_REPORT";
		this.GET_USER_LIST_FOR_Manager_BMBA = 'GetUserListForManagerBMBA';
		this.MakeEditable = 'MakeEditable';
		this.GET_USER_LIST_FOR_ABD_USER = 'GetUserListForABDuser';
		this.GET_MONTHYLY_DEPOST_TRANS = 'GET_MONTHYLY_DEPOST_TRANS';
		this.GET_MONTHYLY_DEPOST_TRANS_BO = 'GET_MONTHYLY_DEPOST_TRANS_BO';
		this.GET_ACC_OPE_MON_SUMM = 'GET_ACC_OPE_MON_SUMM';
		this.ACCOUNT_OPENING_DETAIL_BO_REPORT = 'ACCOUNT_OPENING_DETAIL_BO_REPORT';
		this.ACCOUNT_OPENING_SUMMARY_BO_REPORT = 'ACCOUNT_OPENING_SUMMARY_BO_REPORT';
		this.GET_MONTHYLY_FT_SUMMARY = 'GET_MONTHYLY_FT_SUMMARY';
		this.GET_MONTHYLY_FT_SUMMARY_BO = 'GET_MONTHYLY_FT_SUMMARY_BO';
		this.GET_ACC_OPE_MON_SUMM_OB = 'GET_ACC_OPE_MON_SUMM_OB';
		this.GET_MONTHYLY_REMITTANCE_SUMMARY = 'GET_MONTHYLY_REMITTANCE_SUMMARY';
		this.GET_MONTHYLY_REMITTANCE_SUMMARY_BO = 'GET_MONTHYLY_REMITTANCE_SUMMARY_BO';
		this.GET_MADE_EDITABLE_UC_LIST = "GET MADE EDITABLE Utility Company LIST";
		this.GET_BANK_REJECTED_UC_LIST = "GET BANK REJECTED Utility Company LIST";
		this.GET_BANK_MADE_UC_LIST = "GET BANK MADE Utility Company LIST";
		this.INWARD_REMITTANCE_BO_REPORT = "INWARD_REMITTANCE_BO_REPORT";
		this.GET_ALL_FOR_MAKER = "GET ME & BR Utility Company";
		this.MAKE_UC = "Make_Utility_Company";
		this.MAKE_EDITABLE_UC = "Make_Editable_Utility_Company";
		this.APPROVE_UC = "Approve_Utility_Company";
		this.REJECT_UC = "Reject_Utility_Company";
		
		this.getPageItemText = function(pageDataBegin, pageDataEnd, pageDataTotal, recordTypeText, language){
			var pageItemText = "";
			if(language == 'English'){
				pageItemText = "Showing "+pageDataBegin+
				" - "+pageDataEnd+
				" of total "+pageDataTotal+
				" "+recordTypeText+".";
			}
			else {
				pageItemText = "মোট "+this.convertEnNumberToBn(pageDataTotal)+
				"টি "+recordTypeText+
				" এর মধ্যে "+this.convertEnNumberToBn(pageDataBegin)+
				"নং থেকে "+this.convertEnNumberToBn(pageDataEnd)+
				"নং পর্যন্ত দেখানো হল।";
			}

			return pageItemText;       	
		};

		this.formatNumber = function (num, decimalpoint) {
			num = new Number(num).toFixed(decimalpoint);
			num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return num;
		};

		this.getNumber = function (num) {
			return typeof num === 'string' ? num.replace(/[\$,]/g, '')*1 : typeof num === 'number' ? num : 0;
		};

		this.convertStringToInteger = function (pageSize){        	
			if(typeof pageSize === 'string'){
				return parseInt(pageSize);
			}
			return pageSize;
		};

		this.convertEnNumberToBn = function (obj) {
			if (obj == undefined || obj == null) {
				return obj;
			}
			var regex = /^[0-9||০-৯.]+$/;
			if (!regex.test(obj)) {
				return obj;
			}
			var nobj = obj.toString();
			var newStr = "";
			for (var i = 0; i < nobj.length; i++) {
				switch (nobj[i]) {
				case "0": newStr += "০"; break;
				case "1": newStr += "১"; break;
				case "2": newStr += "২"; break;
				case "3": newStr += "৩"; break;
				case "4": newStr += "৪"; break;
				case "5": newStr += "৫"; break;
				case "6": newStr += "৬"; break;
				case "7": newStr += "৭"; break;
				case "8": newStr += "৮"; break;
				case "9": newStr += "৯"; break;
				case "০": newStr += "০"; break;
				case "১": newStr += "১"; break;
				case "২": newStr += "২"; break;
				case "৩": newStr += "৩"; break;
				case "৪": newStr += "৪"; break;
				case "৫": newStr += "৫"; break;
				case "৬": newStr += "৬"; break;
				case "৭": newStr += "৭"; break;
				case "৮": newStr += "৮"; break;
				case "৯": newStr += "৯"; break;

				case ".": newStr += "."; break;
				}
			}
			return newStr;
		};

		this.dateFormat = function (dateToBeFormatted){

			var date = new Date(dateToBeFormatted);

			var dd = date.getDate();
			if(dd<10){	dd='0'+dd;}
			var mm = date.getMonth()+1;//January is 0! 
			if(mm<10){	mm='0'+mm;}
			var yyyy = date.getFullYear();

			date = yyyy+'-'+mm+'-'+dd;  

			return date;
		};
		
		this.dateTimeFormat = function (dateToBeFormatted){
			
			//"yyyy/MM/dd HH:mm:ss"

			var date = new Date(dateToBeFormatted);

			var dd = date.getDate();
			if(dd<10){	dd='0'+dd;}
			var mm = date.getMonth()+1;//January is 0! 
			if(mm<10){	mm='0'+mm;}
			var yyyy = date.getFullYear();
			var hh = date.getHours();
			if(hh<10){	hh='0'+hh;}
			var mi = date.getMinutes();
			if(mi<10){	mi='0'+mi;}
			var ss = date.getSeconds();
			if(ss<10){	ss='0'+ss;}

			date = yyyy+'/'+mm+'/'+dd+' '+hh+':'+mi+':'+ss;

			return date;
		};
		
		
		this.dateTimeMilisecondsFormat = function (dateToBeFormatted){
			
			//"yyyy-MM-dd HH:mm:ss,SSS"

			var date = new Date(dateToBeFormatted);

			var dd = date.getDate();
			if(dd<10){	dd='0'+dd;}
			var mm = date.getMonth()+1;//January is 0! 
			if(mm<10){	mm='0'+mm;}
			var yyyy = date.getFullYear();
			var hh = date.getHours();
			if(hh<10){	hh='0'+hh;}
			var mi = date.getMinutes();
			if(mi<10){	mi='0'+mi;}
			var ss = date.getSeconds();
			if(ss<10){	ss='0'+ss;}
			var SSS = date.getMilliseconds();
			if(SSS<10){	SSS='00'+SSS;}
			else if(SSS>10 && SSS<100){ SSS='0'+SSS;}

			//date = yyyy+'-'+mm+'-'+dd;  
			date = yyyy+'-'+mm+'-'+dd+' '+hh+':'+mi+':'+ss+','+SSS;

			return date;
		};
		
		this.isAlphaNumeric = function isAlphaNumeric(str) 
		{
			var code, i, len;
			var numb = false;
			var alch = false;
			for (i = 0, len = str.length; i < len; i++) {
				code = str.charCodeAt(i);
				if ((code > 47 && code < 58)) // numeric (0-9)) 
				{ 
					numb = true;
				}
				if ((code > 64 && code < 91) || // upper alpha (A-Z)
						(code > 96 && code < 123)) // lower alpha (a-z)
				{ 
					alch=true;
				}

			}
			if(numb == true && alch == true)
			{
				return true;
			}
			return false;
		};
		
		this.isValidFieldForPolicy = function (fieldValidationResult)
		{
			fieldValidationResult.showMsg = false;

			if(fieldValidationResult.mandatory 
					&& fieldValidationResult.changeORblur == this.inputFieldAction.BLUR) {

				if($(fieldValidationResult.fieldID).val().trim() =='')
				{
					fieldValidationResult.fieldMsg = 'CannotLeaveThisEmpty';
					fieldValidationResult.showMsg = true;
					fieldValidationResult.msgColor = 'red';
				}
				else
					fieldValidationResult.showMsg = false;

				fieldValidationResult.fieldMsgStyle.color = fieldValidationResult.msgColor;
				return fieldValidationResult;
			}

			if(fieldValidationResult.fieldType == this.inputFieldType.PASSWORD)
			{
				if(fieldValidationResult.changeORblur == this.inputFieldAction.CHANGE)
				{
					if ($(fieldValidationResult.fieldID).val().trim().length < parseInt(fieldValidationResult.passLength)) {
						//fieldValidationResult.fieldMsg = 'UseAtleastEightCharacter';
						fieldValidationResult.fieldMsg = 'UseAtleastCharacterOfPolicy';
						fieldValidationResult.showMsg = true;
						fieldValidationResult.msgColor = 'red';
					} 
//					else if (!this.isAlphaNumeric($(fieldValidationResult.fieldID).val().trim())){
//						fieldValidationResult.fieldMsg = 'UseAlphanumericCharacter';
//						fieldValidationResult.showMsg = true;
//						fieldValidationResult.msgColor = 'red';
//					}
					else if ($(fieldValidationResult.fieldID).val().trim().length > (parseInt(fieldValidationResult.passLength)-1) 
							//&& (this.isAlphaNumeric($(fieldValidationResult.fieldID).val().trim()))
							)
					{
						fieldValidationResult.fieldMsg = 'PasswordStrengthFair';
						fieldValidationResult.showMsg = true;
						fieldValidationResult.msgColor = 'green';
					}	
				}

				fieldValidationResult.fieldMsgStyle.color = fieldValidationResult.msgColor;
				return fieldValidationResult;
			}
			else if(fieldValidationResult.fieldType == this.inputFieldType.CONFIRM_PASSWORD)
			{
				if ($(fieldValidationResult.fieldID).val().trim() !='' && $(fieldValidationResult.compareFieldID).val().trim() !== $(fieldValidationResult.fieldID).val().trim()) {
					fieldValidationResult.fieldMsg = 'PasswordCnfPasswordNM';
					fieldValidationResult.showMsg = true;
					fieldValidationResult.msgColor = 'red';
				}
				else if ($(fieldValidationResult.fieldID).val().trim() !='' && $(fieldValidationResult.compareFieldID).val().trim() === $(fieldValidationResult.fieldID).val().trim()) {
					
					fieldValidationResult.fieldMsg = 'PasswordCnfPasswordM';
					fieldValidationResult.showMsg = true;
					fieldValidationResult.msgColor = 'green';
				}

				fieldValidationResult.fieldMsgStyle.color = fieldValidationResult.msgColor;
				return fieldValidationResult;
			}

		};
		
		
		this.isValidField = function (fieldValidationResult)
		{
			fieldValidationResult.showMsg = false;

			if(fieldValidationResult.mandatory 
					&& fieldValidationResult.changeORblur == this.inputFieldAction.BLUR) {

				if($(fieldValidationResult.fieldID).val().trim() =='')
				{
					fieldValidationResult.fieldMsg = 'CannotLeaveThisEmpty';
					fieldValidationResult.showMsg = true;
					fieldValidationResult.msgColor = 'red';
				}
				else
					fieldValidationResult.showMsg = false;

				fieldValidationResult.fieldMsgStyle.color = fieldValidationResult.msgColor;
				return fieldValidationResult;
			}

			if(fieldValidationResult.fieldType == this.inputFieldType.PASSWORD)
			{
				if(fieldValidationResult.changeORblur == this.inputFieldAction.CHANGE)
				{
					if ($(fieldValidationResult.fieldID).val().trim().length < 8) {
						fieldValidationResult.fieldMsg = 'UseAtleastEightCharacter';
						fieldValidationResult.showMsg = true;
						fieldValidationResult.msgColor = 'red';
					} 
					else if (!this.isAlphaNumeric($(fieldValidationResult.fieldID).val().trim())){
						fieldValidationResult.fieldMsg = 'UseAlphanumericCharacter';
						fieldValidationResult.showMsg = true;
						fieldValidationResult.msgColor = 'red';
					}
					else if ($(fieldValidationResult.fieldID).val().trim().length > 7 
							&& (this.isAlphaNumeric($(fieldValidationResult.fieldID).val().trim())))
					{
						fieldValidationResult.fieldMsg = 'PasswordStrengthFair';
						fieldValidationResult.showMsg = true;
						fieldValidationResult.msgColor = 'green';
					}	
				}

				fieldValidationResult.fieldMsgStyle.color = fieldValidationResult.msgColor;
				return fieldValidationResult;
			}
			else if(fieldValidationResult.fieldType == this.inputFieldType.CONFIRM_PASSWORD)
			{
				if ($(fieldValidationResult.fieldID).val().trim() !='' && $(fieldValidationResult.compareFieldID).val().trim() !== $(fieldValidationResult.fieldID).val().trim()) {
					fieldValidationResult.fieldMsg = 'PasswordCnfPasswordNM';
					fieldValidationResult.showMsg = true;
					fieldValidationResult.msgColor = 'red';
				}
				else if ($(fieldValidationResult.fieldID).val().trim() !='' && $(fieldValidationResult.compareFieldID).val().trim() === $(fieldValidationResult.fieldID).val().trim()) {
					
					fieldValidationResult.fieldMsg = 'PasswordCnfPasswordM';
					fieldValidationResult.showMsg = true;
					fieldValidationResult.msgColor = 'green';
				}

				fieldValidationResult.fieldMsgStyle.color = fieldValidationResult.msgColor;
				return fieldValidationResult;
			}

		};

	};

	app.service('constantService', ['$rootScope', constantService]);

});
