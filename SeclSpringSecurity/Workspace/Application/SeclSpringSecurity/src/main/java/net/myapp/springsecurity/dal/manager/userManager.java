
package net.myapp.springsecurity.dal.manager;

import net.myapp.springsecurity.dal.bean.UserBean;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface userManager extends BaseManager, UserDetailsService {	
	UserBean findByName(String name);
}


