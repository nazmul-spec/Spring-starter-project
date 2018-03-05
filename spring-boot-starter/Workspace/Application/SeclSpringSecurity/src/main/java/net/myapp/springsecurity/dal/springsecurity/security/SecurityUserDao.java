
package net.myapp.springsecurity.dal.springsecurity.security;

import net.myapp.springsecurity.dal.bean.LoginBean;
import net.myapp.springsecurity.dal.bean.UserBean;
import net.myapp.springsecurity.dal.converter.BeanToDomainConverter;
import net.myapp.springsecurity.dal.manager.userManager;
import net.myapp.springsecurity.dal.manager.impl.BaseManagerImpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


public class SecurityUserDao extends BaseManagerImpl implements userManager {
	
	private static final Logger logger = LoggerFactory.getLogger(SecurityUserDao.class);
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserBean user = this.findByName(username);
		if (null == user) {	throw new UsernameNotFoundException("The user with name " + username + " was not found");}
		return user;
	}

	@Override
	public UserBean findByName(String name) {
		
		String sql = queryManager.selectUserInfoByLoginIdSql();//sqlgetloginInfoByID
		Object[] param = new Object[] {name};
		
		LoginBean loginBean = new LoginBean();
		try {
			loginBean = (LoginBean)springJdbcDao.getObject(sql, param, LoginBean.class);
		} catch (Exception e) {
			logger.error("Exception occured while trying to get user login info ", e);
		}
		return BeanToDomainConverter.convertUserBeanToBean(loginBean);
	}
}
