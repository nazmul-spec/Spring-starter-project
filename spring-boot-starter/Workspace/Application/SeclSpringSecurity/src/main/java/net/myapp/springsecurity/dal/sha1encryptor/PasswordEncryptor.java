package net.myapp.springsecurity.dal.sha1encryptor;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncryptor implements PasswordEncoder {
	
	public static String sha1(String input) throws NoSuchAlgorithmException {
        MessageDigest mDigest = MessageDigest.getInstance("SHA1");
        byte[] result = mDigest.digest(input.getBytes());
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < result.length; i++) {
            sb.append(Integer.toString((result[i] & 0xff) + 0x100, 16).substring(1));
        }
        return sb.toString();
    }
	
	public static String encryptor (String input)
	{
		String encryptPass = new String();
		try 
		{
			encryptPass = PasswordEncryptor.sha1(input);
		} 
		catch (NoSuchAlgorithmException e) 
		{
			e.printStackTrace();
		}
		return encryptPass;
	}

	@Override
	public String encode(CharSequence rawPassword) {
		return encryptor ((String) rawPassword);
	}

	@Override
	public boolean matches(CharSequence rawPassword, String encodedPassword) {
		return this.encode(rawPassword).equals(encodedPassword);
	}
	
	
}
