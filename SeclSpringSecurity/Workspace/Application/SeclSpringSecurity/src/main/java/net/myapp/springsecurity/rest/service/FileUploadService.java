package net.myapp.springsecurity.rest.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import net.myapp.springsecurity.dal.bean.ResponseBean;
import net.myapp.springsecurity.dal.db.utils.Constant;
import net.myapp.springsecurity.dal.manager.FileUploadManager;

@Path("/fileUpload")
public class FileUploadService implements Constant{
	
	String xlsPath;
	FileUploadManager fileUploadManager;
	
	
	@POST
	@Path("/accBlncXlUpload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public ResponseBean uploadAccBlncXlFile(@Context HttpServletRequest req,	@Context HttpServletResponse res) {
		return null;			
	}

	

	public void setXlsPath(String xlsPath) {
		this.xlsPath = xlsPath;
	}


	public void setFileUploadManager(FileUploadManager fileUploadManager) {
		this.fileUploadManager = fileUploadManager;
	}	
		

}
