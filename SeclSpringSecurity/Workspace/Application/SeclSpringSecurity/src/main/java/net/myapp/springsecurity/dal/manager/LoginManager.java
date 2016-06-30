package net.myapp.springsecurity.dal.manager;

import net.myapp.springsecurity.dal.bean.LoginBean;
import net.myapp.springsecurity.dal.bean.ResetPasswordBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.bean.UserTransferBean;
import net.myapp.springsecurity.dal.domain.LoginInfo;

public interface LoginManager extends BaseManager {
	
	public LoginInfo getLoginInfoByLoginId(String loginId);
	
	public UserTransferBean userValidation(LoginBean loginBean, String remoteHost);
	
	public void LoginTrailIDClosed(String trailID);

	public ResponseBean resetPassword(ResetPasswordBean bean);

}
