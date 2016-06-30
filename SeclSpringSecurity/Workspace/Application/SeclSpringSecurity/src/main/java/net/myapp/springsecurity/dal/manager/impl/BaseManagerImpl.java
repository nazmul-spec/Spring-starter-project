package net.myapp.springsecurity.dal.manager.impl;

import net.myapp.springsecurity.dal.dao.SpringJdbcDao;
import net.myapp.springsecurity.dal.db.utils.DateUtil;
import net.myapp.springsecurity.dal.manager.BaseManager;
import net.myapp.springsecurity.dal.manager.QueryManager;

public class BaseManagerImpl implements BaseManager {
	
	protected SpringJdbcDao springJdbcDao;
	protected DateUtil dateManager;
	protected QueryManager queryManager;
	
	public void setSpringJdbcDao(SpringJdbcDao springJdbcDao) {
		this.springJdbcDao = springJdbcDao;
	}
	
	public void setDateManager(DateUtil dateManager) {
		this.dateManager = dateManager;
	}
	
	public void setQueryManager(QueryManager queryManager) {
		this.queryManager = queryManager;
	}


}
