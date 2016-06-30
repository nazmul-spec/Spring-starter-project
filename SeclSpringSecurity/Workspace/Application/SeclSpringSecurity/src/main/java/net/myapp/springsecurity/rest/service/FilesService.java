/**
 * @author mehedi.hasan
 *
 */
package net.myapp.springsecurity.rest.service;

import java.io.File;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

@Path("/files")
public class FilesService {	
	String photoServerPath;
	
	@POST
	@Path("/upload")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public Response uploadFile(@Context HttpServletRequest req,	@Context HttpServletResponse res) {
		String path = manageRequest(req, res);	
		
		return Response.status(200).entity(path).build(); 
	}
	
	private String manageRequest(HttpServletRequest req, HttpServletResponse res) {
		String str = "";
		try {			
		FileItemFactory factory = new DiskFileItemFactory();
		ServletFileUpload upload = new ServletFileUpload(factory);		  
		 List items = null;
		  //items = upload.parseRequest((RequestContext) req);
		 items = upload.parseRequest((HttpServletRequest) req);		
		  Iterator iter = items.iterator();

		  while (iter.hasNext()) {
		      FileItem item = (FileItem) iter.next();
		      if (item.isFormField()) {
		          System.out.println("FORM FIELD");

		      } else {
		       if (!item.isFormField()) {
		           String fileName = item.getName();
		           System.out.println("File Name:" + fileName);
				File fullFile  = new File(item.getName());
		        File rootDirectory = new File(photoServerPath+"/" + req.getParameter("fileType") +"/");		        
		        if (!rootDirectory.exists()) {  
	        		rootDirectory.mkdirs();  
	           } 		       
		        File savedFile = new File(rootDirectory.getPath(), req.getParameter("fileName")+".jpg");		        
				item.write(savedFile);
				str = savedFile.getAbsolutePath();
				
				return str;
		       }
		      }		  
		  }
		} catch (Exception e) {
			e.printStackTrace();
			
			return null;
		}
		
		return str;
    }
	
	public void setPhotoServerPath(String photoServerPath) {
		this.photoServerPath = photoServerPath;
	}	
}