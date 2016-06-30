package net.myapp.springsecurity.dal.converter;

import net.myapp.springsecurity.dal.bean.LoginBean;
import net.myapp.springsecurity.dal.bean.UserBean;
import net.myapp.springsecurity.dal.domain.LoginInfo;

import com.google.gson.Gson;

public class BeanToDomainConverter {
	
	public static LoginInfo convertLoginInfoToBean(LoginBean bean)
	{
		LoginInfo loginInfo = new LoginInfo();
		loginInfo.setLoginId(bean.getLoginId());
		loginInfo.setPassword(bean.getPassword());
		loginInfo.setEmail(bean.getEmail());
		loginInfo.setMobileNo(bean.getMobileNo());
		loginInfo.setStatus(bean.getStatus());
		String roleJSON = new Gson().toJson(bean.getRoleJSONArray());
		loginInfo.setRoleJSON(roleJSON);
		loginInfo.setChangedBy(bean.getChangedBy());
		return loginInfo;
	}
	
	public static UserBean convertUserBeanToBean(LoginBean bean)
	{
		UserBean userBean = new UserBean();
		
		userBean.setName(bean.getLoginId());
		userBean.setPassword(bean.getPassword());
		String [] roleList =  new Gson().fromJson(bean.getRoleJSON(), String[].class);
		for (String role : roleList)
		{
			userBean.addRole(role);
		}
		userBean.setEnabled(bean.getStatus().equalsIgnoreCase("A") ? true : false);
		
		return userBean;
	}
	

}
