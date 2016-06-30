package net.myapp.springsecurity.dal.db.utils;

import java.lang.reflect.Type;
import java.util.Date;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;

public class GsonUtil {
	
	private static Gson gson = new Gson();
	
	public synchronized static Object parseObject(String json, Class clazz)
    {
    	gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
        Object obj = null;
        try
        {
            obj = gson.fromJson(json, clazz);
        }
        catch(Exception e)
        {
        	e.printStackTrace();
        }
        finally
        {
            return obj;
        }
    }
    
	public synchronized static Object parseObjectWithDate(String json, Class clazz, String dateFormat)
    {
    	String df = "yyyy-MM-dd HH:mm:ss";
    	
    	if(dateFormat != null){
    		df = dateFormat;
    	}
    	gson = new GsonBuilder().setDateFormat(df).create();
    	
        Object obj = null;
        try
        {
            obj = gson.fromJson(json, clazz);
        }
        catch(Exception e)
        {
        	e.printStackTrace();
        }
        finally
        {
            return obj;
        }
    }
    
	public synchronized static String getJsonWithDate(Object obj, String dateFormat)
    {
    	String df = "yyyy-MM-dd HH:mm:ss";
    	
    	if(dateFormat != null){
    		df = dateFormat;
    	}
    	gson = new GsonBuilder().setDateFormat(df).create();
    	
    	String jsonString = new String();
        try
        {
            jsonString = gson.toJson(obj);
        }
        catch(Exception e)
        {
        	e.printStackTrace();
        }
        finally
        {
            return jsonString;
        }
    }
	
	public synchronized static String getJson(Object obj)
    {
        String jsonString = new String();
        try
        {
            jsonString = gson.toJson(obj);
        }
        catch(Exception e)
        {
        	e.printStackTrace();
        }
        finally
        {
            return jsonString;
        }
    }
    
	public synchronized static String getJsonArrayForQuery(Object obj)
    {
        String jsonString = new String();
        try
        {
            jsonString = gson.toJson(obj);
        }
        catch(Exception e)
        {
        	e.printStackTrace();
        }
        finally
        {
            return jsonString.replace('\"', '\'');
        }
    }
	
	public synchronized static JsonElement toJsonTree(Object obj)
    {
        JsonElement jsonString = null;
        try
        {
            jsonString = gson.toJsonTree(obj);
        }
        catch(Exception e)
        {
        }
        finally
        {
            return jsonString;
        }
    }

	public synchronized static Object parseObject(String json, Type type)
    {
    	gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
        Object obj = null;
        try
        {
            obj = gson.fromJson(json, type);
        }
        catch(Exception e)
        {
        	e.printStackTrace();
        }
        finally
        {
            return obj;
        }
    }
	
	public synchronized static Gson getGsonWithLongDate(){
		GsonBuilder builder = new GsonBuilder(); 
		
		builder.registerTypeAdapter(Date.class, new JsonDeserializer<Date>() {
			@Override
			public Date deserialize(JsonElement json, Type typeOfT,
					JsonDeserializationContext context) throws JsonParseException {
				return new Date(json.getAsJsonPrimitive().getAsLong());
			}
		});
		
		return builder.create();
	}
    	
}
