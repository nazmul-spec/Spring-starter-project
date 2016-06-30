/**
 * @author Kowsar
 */
package net.myapp.springsecurity.dal.db.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.myapp.springsecurity.dal.bean.LogSummaryBean;


public class FileUtil {
	
 
    /**
     * List all files from a directory and its subdirectories
     * @param directoryName to be listed
     * @return List<DirectoryBean>
     */
    public void listFilesAndFilesSubDirectories(String directoryName){
    	File directory = new File(directoryName);

    	//get all the files from a directory
    	File[] fList = directory.listFiles();

    	for (File file : fList){
    		if (file.isFile()){
    			System.out.println(file.getAbsolutePath());
    		} else if (file.isDirectory()){
    			listFilesAndFilesSubDirectories(file.getAbsolutePath());
    		}
    	}
	}
    
    /**
     * used to get log level
     * @param input
     * @return string
     */
    public static String getLevelByPattern(String input) {
    	String threadPattern = "\\b(INFO|ERROR|WARN|FATAL|DEBUG|TRACE)\\b"; 
        return getMatch(input, threadPattern);
    }
    
    /**
     * used to get log thread 
     * @param input
     * @return string
     */
    public static String getThreadByPattern(String input) {
    	String threadPattern = "\\[(.*?)\\]"; 
        return getMatch(input, threadPattern);
    }
    
    /**
     * used to get log date time 
     * @param input
     * @return string
     */
    public static String getDateTimeByPattern(String input) {
    	String datePattern = "\\d\\d\\d\\d-\\d\\d-\\d\\d"; 
        String timePattern = "\\d\\d:\\d\\d:\\d\\d,\\d\\d\\d";
        String dateTimePattern = datePattern + " " + timePattern;
        return getMatch(input, dateTimePattern);
    }
    
    /**
     * used to get log info by match pattern
     * @param input
     * @param regex
     * @return string
     */
    public static String getMatch(String input, String regex) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(input);
        if (matcher.find()) {
            return matcher.group();
        } else {
            return "";
        }
    }
    
    /**
     * used to read log file and like to get list of logs with short message
     * @param fin
     * @return List<LogSummaryBean>
     * @throws IOException
     */
    public static List<LogSummaryBean> readLog(File fin) throws IOException {
    	List<LogSummaryBean> logSummaryBeans = new ArrayList<LogSummaryBean>();
    	FileInputStream fis = new FileInputStream(fin);
    	int lineNum = 0;
    	//Construct BufferedReader from InputStreamReader
    	BufferedReader br = new BufferedReader(new InputStreamReader(fis));
     
    	String line = null;
    	while ((line = br.readLine()) != null) {
    		lineNum++;
    		if(!getDateTimeByPattern(line).trim().isEmpty()){
    			LogSummaryBean logSummaryBean = new LogSummaryBean();
    			logSummaryBean.setLineNum(lineNum);
    			// get date time from object and parse into object
    			logSummaryBean.setLogTime(DateUtil.getTimestamp(getDateTimeByPattern(line), "yyyy-MM-dd HH:mm:ss,SSS"));
    			// get thread and set into object
        		logSummaryBean.setThread(getThreadByPattern(line));
        		String strLevel = getLevelByPattern(line);
        		// get level and set into object
        		logSummaryBean.setLevel(strLevel);
        		int levelIndex = line.indexOf(strLevel);
        		int msgStartIndex = line.indexOf("-", levelIndex) + 1;
        		// get first 20 char of message
        		logSummaryBean.setShortMsg(line.substring(msgStartIndex, (msgStartIndex + 20)) + "...");
        		logSummaryBeans.add(logSummaryBean);
    		}
    	}
     
    	br.close();
    	return logSummaryBeans;
    }
    
    /**
     * used to get specific line message
     * @param fin
     * @param lineNum
     * @return
     */
    public static LogSummaryBean getSingleLogMessage(File fin, int lineNum) throws IOException{
    	LogSummaryBean logSummaryBean = new LogSummaryBean();
    	FileInputStream fis = new FileInputStream(fin);
    	int counter = 0;
    	StringBuilder fullMsg = new StringBuilder();
    	//Construct BufferedReader from InputStreamReader
    	BufferedReader br = new BufferedReader(new InputStreamReader(fis));
     
    	String line = null;
    	while ((line = br.readLine()) != null) {
    		counter++;
    		if(counter == lineNum){
    			if(!getDateTimeByPattern(line).trim().isEmpty()){
            		// get date time from object and parse into object
        			logSummaryBean.setLogTime(DateUtil.getTimestamp(getDateTimeByPattern(line), "yyyy-MM-dd HH:mm:ss,SSS"));
        			// get thread and set into object
            		logSummaryBean.setThread(getThreadByPattern(line));
            		String strLevel = getLevelByPattern(line);
            		// get level and set into object
            		logSummaryBean.setLevel(strLevel);
            		int levelIndex = line.indexOf(strLevel);
            		int msgStartIndex = line.indexOf("-", levelIndex) + 1;
            		fullMsg.append(line.substring(msgStartIndex, line.length()));
            		fullMsg.append("\n");
        		}
    		}
    		else if(counter > lineNum){
    			if(getDateTimeByPattern(line).trim().isEmpty()){
    				fullMsg.append(line);
            		fullMsg.append("\n");
        		}
    			else{
    				logSummaryBean.setFullMsg(fullMsg.toString());
    				break;
    			}
    		}
    		
    	}
     
    	br.close();
    	return logSummaryBean;
    }
}
