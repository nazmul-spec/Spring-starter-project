package net.myapp.springsecurity.dal.db.utils;

import java.io.IOException;

import org.jpos.iso.ISOException;
import org.jpos.iso.ISOMsg;
import org.jpos.iso.packager.GenericPackager;
public class ISOMessageParser
{
	 GenericPackager packager;
	 
	 public ISOMessageParser() throws ISOException
		{
			super();
			this.packager =  new GenericPackager("iso87ascii.xml");
		}

    public  ISOMsg parseISO8583Message(String data) throws IOException, ISOException {
       
        // Create ISO Message
        ISOMsg isoMsg = new ISOMsg();
        isoMsg.setPackager(packager);
        isoMsg.unpack(data.getBytes());
       
        return isoMsg;
 
    }
 
   
 
}
