
package net.myapp.springsecurity.rest.service;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import net.myapp.springsecurity.dal.db.utils.SpringConfigurator;


@ServerEndpoint(value = "/websocketservice", configurator = SpringConfigurator.class)
public class WebSocketService {
	
	
	//Logger	
	private static final Logger logger = LoggerFactory.getLogger(WebSocketService.class);
	
    public static final Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());
	
	
    @OnOpen
    public void onOpen(Session session){
        try{
            clients.add(session);
        	logger.warn("Session ID "+ session.getId() + " : Client is connected!!!");
        }
        catch(Exception e){
        	logger.error("Session ID "+ session.getId() + " : Exception While trying to connect Client!!!");
        }
    }
    
    @OnClose
    public void onClose(Session session){
    	logger.warn("Session ID "+ session.getId() + " : Client is closed!!!");
        clients.remove(session);
    }
    
    @OnError
    public void onError(Session session, Throwable throwable){
    	logger.error("Session ID "+ session.getId() + " : An Error occured in Client!!!");
    }
    
    @OnMessage
    public void onMessage(Session session, String msg) throws Exception {
    	
    	try {
    		if(clients.size() <= 1){
    			return;
    		}
    		for (Session sess : session.getOpenSessions()) {
	            if (sess.isOpen())
	            	sess.getBasicRemote().sendText(msg);
    		}
    	} catch (IOException e) {  
    		logger.warn("Session ID "+ session.getId() + " : An warn occured while send message to client!!!");
    	}
       
    }

}



