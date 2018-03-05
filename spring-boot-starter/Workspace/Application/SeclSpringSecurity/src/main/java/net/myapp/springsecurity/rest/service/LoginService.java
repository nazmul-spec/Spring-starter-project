package net.myapp.springsecurity.rest.service;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import net.myapp.springsecurity.dal.bean.LoginBean;
import org.springframework.stereotype.Component;

import net.myapp.springsecurity.dal.bean.ResetPasswordBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.bean.UserTransferBean;
import net.myapp.springsecurity.dal.manager.LoginManager;


@Component
@Path("/login")
public class LoginService {
	
	LoginManager loginManager;
	
	@POST
	@Path("/signin")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public UserTransferBean signin(LoginBean login, @Context HttpServletRequest request) {
		String ipAddress = request.getHeader("X-FORWARDED-FOR");  
		if (ipAddress == null) {  
			ipAddress = request.getRemoteAddr();
		}
		//return loginManager.userValidation(login, request.getRemoteAddr());
		return loginManager.userValidation(login, ipAddress);
	}
	
	@POST
	@Path("/signout")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void signout(String TrailID) {
		loginManager.LoginTrailIDClosed(TrailID);
	}
	
	
	@POST
	@Path("/signinResetPassword")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean signinResetPassword(ResetPasswordBean bean) {
		return loginManager.resetPassword(bean);
	}
	
	
	public void setLoginManager(LoginManager loginManager) {
		this.loginManager = loginManager;
	}

}