/* Author Kowsar */
package net.myapp.springsecurity.dal.manager;

import net.myapp.springsecurity.dal.bean.PasswordPolicyBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;

public interface PasswordPolicyManager extends BaseManager {	
	public ResponseBean getByID(String passwordPolicyID);
	
	public ResponseBean getAll(PasswordPolicyBean passwordPolicyBean);
	
	public ResponseBean save(PasswordPolicyBean passwordPolicyBean);
	
	public ResponseBean update(PasswordPolicyBean passwordPolicyBean);
	
	public ResponseBean updateStatus(String status, PasswordPolicyBean passwordPolicyBean);
	
	public ResponseBean generatePassword();
	
	public ResponseBean getPasswordPolicy();
	
	public ResponseBean validatePassword(String password, String userID);
}


