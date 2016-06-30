package net.myapp.springsecurity.dal.manager;

import net.myapp.springsecurity.dal.bean.ResponseBean;

public interface FileUploadManager extends BaseManager {

	public ResponseBean updateCbsStatus(String accountid, String accountstatus);


}
