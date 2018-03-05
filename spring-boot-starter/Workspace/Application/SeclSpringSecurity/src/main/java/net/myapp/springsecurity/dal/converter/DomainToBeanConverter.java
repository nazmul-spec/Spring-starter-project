package net.myapp.springsecurity.dal.converter;

//import java.util.Date;

import net.myapp.springsecurity.dal.bean.LoginBean;
import net.myapp.springsecurity.dal.bean.MenuJsonBean;
import net.myapp.springsecurity.dal.bean.RoleBean;
import net.myapp.springsecurity.dal.domain.LoginInfo;
import net.myapp.springsecurity.dal.domain.Role;

import com.google.gson.Gson;
//import com.cscope.csbBankingApp.dal.domain.CustomerQRCard;

public class DomainToBeanConverter {
	
	public static LoginBean convertLoginInfoToBean(LoginInfo domain)
	{
		LoginBean loginBean = new LoginBean();
		loginBean.setLoginId(domain.getLoginId());
		//loginBean.setPassword(domain.getPassword());
		loginBean.setEmail(domain.getEmail());
		loginBean.setMobileNo(domain.getMobileNo());
		loginBean.setBankID(domain.getBankID());
		loginBean.setBranchID(domain.getBranchID());
		loginBean.setBranchName(domain.getBranchName());
		loginBean.setStatus(domain.getStatus());
		loginBean.setResetRequired(domain.getResetRequired());
		loginBean.setRoleJSON(domain.getRoleJSON());
		loginBean.setChangedBy(domain.getChangedBy());
		return loginBean;
	}
	

	
	public static RoleBean convertRoleToBean(Role domain)
	{
		RoleBean roleBean = new RoleBean();
		roleBean.setRoleID(domain.getRoleID());
		roleBean.setRoleDescription(domain.getRoleDescription());
		MenuJsonBean[] menuJsonBean = new Gson().fromJson(domain.getMenuJSON(), MenuJsonBean[].class);
		roleBean.setMenuJSON(menuJsonBean);
		
		return roleBean;
	}
	

}
