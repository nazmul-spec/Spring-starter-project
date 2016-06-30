/* Author Ashraful */

package net.myapp.springsecurity.dal.manager;

import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.bean.RoleBean;

public interface RoleManager extends BaseManager {	
	public ResponseBean saveRoleService(RoleBean roleBean); 
	public ResponseBean getAllRole(RoleBean roleBean); 
	public ResponseBean getAllTopMenu(RoleBean roleBean); 
	public ResponseBean getRoleInfoByID(RoleBean roleBean);
	public ResponseBean updateRoleService(RoleBean roleBean);
	public ResponseBean updateTerminalStatus(RoleBean roleBean);
	public ResponseBean updateStatusByAdmin(RoleBean roleBean);

	
}


