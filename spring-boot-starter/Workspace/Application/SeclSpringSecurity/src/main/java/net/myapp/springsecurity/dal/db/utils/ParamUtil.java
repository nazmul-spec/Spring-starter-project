package net.myapp.springsecurity.dal.db.utils;

import java.util.ArrayList;
import java.util.List;

import net.myapp.springsecurity.dal.bean.ChargeModelDefBean;
import net.myapp.springsecurity.dal.bean.ChargeModelItemBean;

import com.google.common.base.Joiner;

public class ParamUtil {
    
    public synchronized static Object[] getParamsWithoutObject(Object...obj)
    {
        return obj;
    }
    
    public synchronized static String getOids(String[] oids)
    {
        StringBuffer oid = new StringBuffer();
        oid.append("'");
        oid.append(Joiner.on("','").join(oids));
        oid.append("'");
        return oid.toString();
    }
    
    public static Object[] getChargeModelItemSaveParam(ChargeModelItemBean model)
   	{
   		List<Object> objList = new ArrayList<Object>();   	
		objList.add(model.getOID());
		objList.add(model.getChargeKey());
		objList.add(model.getChargeModelDefID());
		objList.add(model.getValueJSON());
		objList.add(model.getCreatedBy());
		objList.add(model.getCreatedON());   		
   		Object[] params = objList.toArray();
   		return params;
   	}
    
    public static Object[] getChargeModelItemUpdateParam(ChargeModelItemBean model)
   	{
   		List<Object> objList = new ArrayList<Object>();
		objList.add(model.getChargeKey());
		objList.add(model.getChargeModelDefID());
		objList.add(model.getValueJSON());
		objList.add(model.getUpdatedBy());
		objList.add(model.getUpdatedOn());
		objList.add(model.getOID());
   		Object[] params = objList.toArray();
   		return params;
   	}
    
    public static Object[] getChargeModelDefSaveParam(ChargeModelDefBean model)
   	{
   		List<Object> objList = new ArrayList<Object>();   	
		objList.add(model.getOID());
		objList.add(model.getName());
		objList.add(model.getDescription());
		objList.add(model.getTstmpEffectiveFrom());
		objList.add(model.getTstmpEffectiveTo());
		objList.add(model.getIsDefault());
		objList.add(model.getCreatedBy());
		objList.add(model.getCreatedON()); 
		objList.add(model.getStatus()); 
   		Object[] params = objList.toArray();
   		return params;
   	}
     
    public static Object[] getChargeModelDefUpdateParam(ChargeModelDefBean model)
   	{
   		List<Object> objList = new ArrayList<Object>();
   		objList.add(model.getName());
		objList.add(model.getDescription());
		objList.add(model.getTstmpEffectiveFrom());
		objList.add(model.getTstmpEffectiveTo());
		objList.add(model.getUpdatedBy());
		objList.add(model.getUpdatedOn());
		objList.add(model.getStatus());
		objList.add(model.getOID());
   		Object[] params = objList.toArray();
   		return params;
   	}
   

    
}
