
package net.myapp.springsecurity.dal.manager;

import net.myapp.springsecurity.dal.bean.BranchBean;
import net.myapp.springsecurity.dal.bean.ResponseBean;


public interface BranchManager extends BaseManager {	
	
	public ResponseBean getAllBranch(ResponseBean responseBean, BranchBean model);	
	
	public ResponseBean updateBranchStatus(ResponseBean responseBean, BranchBean branchBean);
	
}


