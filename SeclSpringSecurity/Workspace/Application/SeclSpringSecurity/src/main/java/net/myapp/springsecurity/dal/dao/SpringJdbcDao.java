package net.myapp.springsecurity.dal.dao;

import java.util.List;

import org.springframework.transaction.PlatformTransactionManager;

public interface SpringJdbcDao {
	
	public void saveObject(String sql, Object[] obj) throws Exception;
    
	public Object getObject(String sql, Object[] params, Class clazz) throws Exception;
    
	public List getObjectList(String sql, Object[] params, Class clazz) throws Exception;
    
	public List getPrimitiveList(String sql, Object[] params, Class clazz) throws Exception;
    
    public void deleteObject(String sql, Object[] obj) throws Exception;
    
    public int updateObject(String sql, Object[] objects) throws Exception;
        
    public int count(String sql, Object[] params) throws Exception;
    
    public void saveObjectList(List<String> sql, List<Object[]> obj) throws Exception;
    
    public void executeSql(String sql) throws Exception;
    
    public int getRowCount(String sql) throws Exception;
    
    public long getMaxValue(String sql) throws Exception;
    
    public int[] batchUpdate(String[] array) throws Exception;
    
    public PlatformTransactionManager getTransactionManager();

    public boolean isDuplicateItem(String sql) throws Exception;
	
    public boolean isDuplicate(String searchID, String sql) throws Exception;
    
    public boolean isDuplicate(String searchID,String oid, String sql) throws Exception;

    public long getTableMaxCount(String countSql, String tableName);
}
