

'use strict';

define(['app'], function (app) {

    var configurationService = function ($rootScope) {
    	
    	this.server = 'localhost';
        this.port = ':8080';
    	/*this.server = '27.147.140.125';
        this.port = ':8022';*/
        this.app = '/SeclSpringSecurity/rest/';
                
        this.baseUrl = 'http://' + this.server + this.port + this.app;
        this.wsBaseUrl = 'ws://' + this.server + this.port +'/csb-portal/';
        
        this.loginMetaData = 'loginMetaData';
        this.loginCookieStoreKey = 'login.cookie.store.key.platform';
        
        this.messageTimeout = 6000;
        this.version= "Agent Banking Deployment  v1.0.0 Deployed On 2015-08-01";
        
        this.logoImagePath = 'images/common/';
        //this.logoName = this.logoImagePath + 'agrani-bank.png';
        this.logoName = this.logoImagePath + 'cityAgent.png';

    	
    	/***** Connection With RESTful Service ******/
    	this.login = this.app + 'login/signin';
        this.logout = this.app + 'login/signout';
        this.signinResetPassword = this.app + 'login/signinResetPassword';
    	this.combo = this.app + 'combo/comboData';
    	this.ddl = this.app + 'combo/ddlData';
        this.duplicteValidation = this.app + 'duplicteValidation';
	    this.dashboard = this.app + 'dashboard';
	    this.dashboardSummaryData = this.dashboard + '/summaryData';
	    this.dashboardSystemData = this.dashboard + '/systemData';
    	this.userList = this.app + 'user/userList';
    	this.userStatus = this.app + 'user/userStatus';
    	this.userResetPassword = this.app + 'user/userResetPassword';
    	this.userInfo = this.app + 'user/userInfo';
    	this.blockedLogin = this.app + 'user/block';
    	this.bank = this.app + 'bank';
    	this.branch = this.app + 'branch';
    	this.product = this.app + 'product';
    	this.customerList = this.app + 'customer/customerList';
    	this.customerInfo = this.app + 'customer/customerInfo';
    	this.changeCustomerStatus = this.app + 'customer/customerStatus';
    	this.searchCustomer = this.app + 'customer/searchcustomer';
    	this.agentList = this.app + 'agent/agentList';
    	this.agentDetails = this.app + 'agent/agentDetails';
    	this.agentResetPassword = this.app + 'agent/agentResetPassword';
    	this.newAgent = this.app + 'agent/saveOrUpdate';
    	this.newAccount = this.app + 'newAccount';
    	this.newBank = this.app + 'newBank';
    	this.newBranch = this.app + 'newBranch';
    	this.serviceMetaproperty = this.app + 'serviceMetaproperty';
    	this.ddlMetadataUrl = this.app + 'ddlmetadata';
    	this.qrcard = this.app + 'qrcard';
    	this.qrDownloader = this.app + 'qrCardPDFDownloader?';
    	this.openFingerOrder = this.app + 'fingerorder';
    	this.fingerConfigure = this.app + 'fingerConfigure';
    	this.websocketservice =  this.wsBaseUrl + 'websocketservice';
    	this.agentStatement = this.app + 'agentStatement';
    	this.statement = this.app + 'statement';
    	this.gridreportgenerator = this.app + 'gridreportgenerator';
    	this.gridreportall = this.gridreportgenerator + '/all';
    	this.chequecollectiongridreport = this.app + 'chequecollectiongridreport';
    	this.agentgridreportgenerator = this.gridreportgenerator + '/agent';
    	this.accountgridreportgenerator = this.gridreportgenerator + '/account';
    	this.customergridreporturl = this.gridreportgenerator + '/customer';
    	this.usergridreporturl = this.gridreportgenerator + '/users';
    	this.remittanceReportURL = this.gridreportgenerator + '/remittanceReport';
    	this.fundGridReportGenerator = this.gridreportgenerator + '/fundReport';
    	this.depositWithdrawGridReportGenerator = this.gridreportgenerator + '/depositWithdrawReport';
    	this.smslog = this.gridreportgenerator + '/smslog';
    	this.pdfreport = this.app + 'pdfreport';
    	this.chequecollectionpdfreport = this.app + 'chequecollectionpdfreport';
    	this.xlsreport = this.app + 'xlsreport';
    	this.chequecollectionxlsreport = this.app + 'chequecollectionxlsreport';
    	this.requestTrace = this.app + 'requestTrace';
    	this.requestTraceDetails = this.app + 'requestTraceDetails';
    	this.getDirInfos = this.app + 'log/getdirs';
    	this.getLogs = this.app + 'log/getlogs';
    	this.viewLog = this.app + 'log/viewlog';
    	this.pdfreportPath = this.app + 'pdfreport?';
    	this.xlsreportPath = this.app + 'xlsreport?';
    	this.chequecollectionpdfreportPath = this.app + 'chequecollectionpdfreport?';
    	this.chequecollectionxlsreportPath = this.app + 'chequecollectionxlsreport?';
    	this.agentStaff = this.app + 'agentStaff';
    	this.salesTeam = this.app + 'salesteam';
    	/*this.agentStaff = this.agentStaff + '/save';
    	this.agentStaff = this.agentStaff + '/get';*/
    	this.servicePoint = this.app + 'servicepoint';
    	this.servicePointSave = this.servicePoint + '/save';
    	this.servicePointGet = this.servicePoint + '/get';
    	this.servicePointUpdate = this.servicePoint + '/update';
    	this.transprofile = this.app + 'transprofile';
    	this.transprofileSave = this.transprofile + '/save';
    	this.transprofileGet = this.transprofile + '/get';
    	this.transprofileUpdate = this.transprofile + '/update';
    	
    	this.outletTransProfile = this.app + 'outlettransprofile';
    	this.outletTransProfileSave = this.outletTransProfile + '/save';
    	this.outletTransProfileGet = this.outletTransProfile + '/get';
    	this.outletTransProfileUpdate = this.outletTransProfile + '/update';
    	
    	this.passwordPolicy = this.app + 'passwordpolicy';
    	this.passwordPolicySave = this.passwordPolicy + '/save';
    	this.passwordPolicyGet = this.passwordPolicy + '/get';
    	this.passwordPolicyUpdate = this.passwordPolicy + '/update';
    	this.calendar = this.app + 'calendar';
    	this.calendarSave = this.calendar + '/save';
    	this.calendarGet = this.calendar + '/get';
    	this.calendarUpdate = this.calendar + '/update';
    	this.uploadMis = this.app + 'uploadmis';
    	this.uploadMisSave = this.uploadMis + '/save';
    	this.uploadMisGet = this.uploadMis + '/get';
    	this.uploadMisUpdate = this.uploadMis + '/update';
    	this.serviceDelivery = this.app + 'servicedelivery';
    	this.serviceDeliverySave = this.serviceDelivery + '/save';
    	this.serviceDeliveryGet = this.serviceDelivery + '/get';
    	this.serviceDeliveryUpdate = this.serviceDelivery + '/update';
    	this.serviceDeliveryBatchUpdate = this.serviceDelivery + '/updatebatch'
    	this.transaction = this.app + 'transaction';
    	this.remittance = this.app + 'remittance';
    	this.remittanceSave = this.remittance + '/save';
    	this.remittanceGet = this.remittance + '/get';
    	this.remittanceUpdate = this.remittance + '/update';
    	this.billCollection = this.app + 'billcollection';
    	this.billCollectionGet = this.billCollection + '/get';
    	this.companyZone = this.app + 'companyzone';
    	this.companyZoneSave = this.companyZone + '/save';
    	this.companyZoneGet = this.companyZone + '/get';
    	this.companyZoneUpdate = this.companyZone + '/update';
    	this.chequeCollection = this.app + 'chequecollection';
    	this.chequeCollectionGet = this.chequeCollection + '/get';
    	this.utilityCompany = this.app + 'utilityCompany';
    	this.utilityCompanyList = this.utilityCompany + '/list';
    	this.utilityCompanyDetails = this.utilityCompany + '/details';
    	this.utilityCompanyStatusChange = this.utilityCompany + '/changeStatus';

    	this.terminal = this.app + 'terminal';
    	this.serviceTerminalSave = this.terminal + '/save';
    	this.serviceTerminalGet = this.terminal + '/get';
    	this.serviceTerminalUpdate = this.terminal + '/update';
    	
    	this.outletArea = this.app + 'outletArea';
    	this.outletAreaSave = this.outletArea + '/save';
    	this.outletAreaGet = this.outletArea + '/get';
    	this.outletAreaUpdate = this.outletArea + '/update';
    	
    	this.outletZone = this.app + 'outletZone';
    	this.outletZoneSave = this.outletZone + '/save';
    	this.outletZoneGet = this.outletZone + '/get';
    	this.outletZoneUpdate = this.outletZone + '/update';
    	
    	this.role = this.app + 'role';
    	this.serviceRoleSave = this.role + '/save';
    	this.serviceRoleUpdate = this.role + '/update';
    	this.roleGet = this.role + '/get';
    	/*this.serviceRoleUpdate = this.terminal + '/update';*/
    	
    	this.account = this.app + 'account';
    	this.accountSave = this.account + '/save';
    	this.accountGet = this.account + '/get';
    	this.accountUpdate = this.account + '/update';
    	this.accountBatchUpdate = this.account + '/updatebatch';
    	this.customeraccount = this.account + '/customeraccount';
    	this.accountList = this.app + 'accountList/customerAccountList';
    	
    	this.billtype = this.app + 'billtype';
    	this.billtypeGet = this.billtype + '/get';
    	this.billtypeCreate = this.billtype + '/create';
    	this.billtypeUpdate = this.billtype + '/update';
    	this.taglib = this.app + 'taglib';
    	
    	this.chargeModelDef = this.app + 'chargemodeldef';
    	this.chargeModelDefGet = this.chargeModelDef + '/get';
    	this.chargeModelItemsGet = this.chargeModelDef + '/getchargeitem';
    	this.chargeModelDefSave = this.chargeModelDef + '/save';
    	this.chargeModelDefUpdate = this.chargeModelDef + '/update';
    	
    	this.glMasterData = this.app + 'glmasterdata';
    	this.glMasterDataGet = this.glMasterData + '/get';
    	
    	this.chargemodel = this.app + 'chargemodel';
    	this.chargemodelSegmentList = this.chargemodel+ '/getsegmentlist';
    	this.chargeModelItemListGet = this.chargemodel+ '/get';
    	this.chargemodelitemget = this.chargemodel+ '/getchargeitem';
    	this.chargemodelitemsave = this.chargemodel+ '/save';
    	this.chargeModelItemUpdate = this.chargemodel+ '/update';
    	
    	
        this.auditLogData = this.app + 'auditLog/get';
        this.fileUpload = this.app + 'fileUpload';
        this.csbAccXlUpload = this.fileUpload + '/csbAccXlUpload';
        this.getCbsAccountList = this.fileUpload + '/getCbsAccountList';
        this.updateCbsStatus = this.fileUpload + '/updateCbsStatus';
        this.accBlncXlUpload = this.fileUpload + '/accBlncXlUpload';
        this.getAccountBalance = this.fileUpload + '/getAccountBalance';
    };
    
    app.service('configurationService', ['$rootScope', configurationService]);

});


