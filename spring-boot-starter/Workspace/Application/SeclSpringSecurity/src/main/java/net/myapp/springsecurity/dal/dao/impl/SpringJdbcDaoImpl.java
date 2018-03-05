package net.myapp.springsecurity.dal.dao.impl;

import java.util.List;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.transaction.PlatformTransactionManager;

import net.myapp.springsecurity.dal.dao.SpringJdbcDao;


public class SpringJdbcDaoImpl extends JdbcDaoSupport implements SpringJdbcDao {

	PlatformTransactionManager transactionManager;

	@Override
	public void saveObject(String sql, Object[] obj) throws Exception {
		try {
			
			getJdbcTemplate().update(sql, obj);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	@Override
	public Object getObject(String sql, Object[] params, Class clazz) throws Exception {
		Object obj = null;
		try {
			obj = getJdbcTemplate().queryForObject(sql, params,
					new BeanPropertyRowMapper(clazz));
		} catch (EmptyResultDataAccessException er) {
			//throw new Exception(er);
			return null;
		} catch (Exception e) {
			throw new Exception(e);
		}
		return obj;
	}

	@Override
	public List getObjectList(String sql, Object[] params, Class clazz) throws Exception {
		List list = null;
		try {
			list = getJdbcTemplate().query(sql, params,
					new BeanPropertyRowMapper(clazz));
		} catch (EmptyResultDataAccessException er) {
			//throw new Exception(er);
			return null;
		} catch (Exception e) {
			throw new Exception(e);
		}
		return list;
	}

	@Override
	public List getPrimitiveList(String sql, Object[] params, Class clazz) throws Exception {
		try {
			return getJdbcTemplate().queryForList(sql, params, clazz);
		} catch (EmptyResultDataAccessException er) {
			//throw new Exception(er);
			return null;
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	@Override
	public void deleteObject(String sql, Object[] obj) throws Exception {
		try {
			getJdbcTemplate().update(sql, obj);
		} catch (EmptyResultDataAccessException er) {
			//throw new Exception(er);
			return;
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

		
	@Override
	public int updateObject(String sql, Object[] objects) throws Exception {
		int total = 0;
		try {
			total = getJdbcTemplate().update(sql, objects);
		} catch (EmptyResultDataAccessException er) {
			//throw new Exception(er);
			return 0;
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		return total;
	}

	@Override
	public int count(String sql, Object[] params) throws Exception {
		int total = 0;
		try {
			total = getJdbcTemplate().queryForInt(sql, params);
		} catch (EmptyResultDataAccessException er) {
			//throw new Exception(er);
			return 0;
		} catch (Exception e) {
			throw new Exception(e);
		}
		return total;
	}

	@Override
	public void saveObjectList(List<String> sql, List<Object[]> obj) throws Exception {
		try {
			for (int i = 0; i < sql.size(); i++) {
				getJdbcTemplate().update(sql.get(i), obj.get(i));
			}
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	@Override
	public void executeSql(String sql) throws Exception {
		try {
			getJdbcTemplate().update(sql);
		} catch (Exception e) {
			throw new Exception(e);
		}
	}

	@Override
	public int getRowCount(String sql) throws Exception {
		int total = 0;
		try {
			total = getJdbcTemplate().queryForInt(sql);
		} catch (Exception e) {
			throw new Exception(e);
		}
		return total;
	}

	@Override
	public long getMaxValue(String sql) throws Exception {
		long total = 0;
		try {
			total = getJdbcTemplate().queryForLong(sql);
		} catch (Exception e) {
			throw new Exception(e);
		}
		return total;
	}
	
	@Override
	public int[] batchUpdate(String[] array) throws Exception {
		int[] total = null;
		try {
			total = getJdbcTemplate().batchUpdate(array);
		} catch (Exception e) {
			throw new Exception(e);
		}
		return total;
	}
	
	@Override
	public long getTableMaxCount(String countSql, String tableName) {
		logger.debug("Start getting MAX NUM from table : " + tableName);
		long maxNum = 0;
		
		try {
			maxNum = getJdbcTemplate().queryForInt(countSql);
			logger.info("Successfully got MAX NUM form table : " + tableName);
		} catch (Exception e) {
			logger.error("Exception occured while tring to get MAX NUM form table : " + tableName, e);
		}
		logger.debug("End getting MAX Company Zone NUM.");
		
		return maxNum;
	}

	@Override
	public PlatformTransactionManager getTransactionManager() {
		return transactionManager;
	}

	
	public void setTransactionManager(PlatformTransactionManager transactionManager) {
		this.transactionManager = transactionManager;
	}

	@Override
	public boolean isDuplicateItem(String sql) throws Exception {
		int count = this.count(sql, new Object[] {});
		return count > 0 ? true : false;
	}
	
	@Override
	public boolean isDuplicate(String searchID, String sql) throws Exception {
		int count = this.count(sql, new Object[] {searchID});
		return count > 0 ? true : false;
	}
	
	@Override
	public boolean isDuplicate(String searchID,String oid, String sql) throws Exception {
		int count = this.count(sql, new Object[] {searchID, oid});
		return count > 0 ? true : false;
	}
}
