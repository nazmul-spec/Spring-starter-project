package net.myapp.springsecurity.dal.manager.impl;

import static org.junit.Assert.assertTrue;

import net.myapp.springsecurity.dal.manager.impl.PasswordPolicyManagerImpl;

import org.junit.Test;

public class PasswordPolicyManagerImplTest {
	
	@Test
	public void testPasswordMatcher(){
		PasswordPolicyManagerImpl pp = new PasswordPolicyManagerImpl();
		
		//Testing rule one
		String regexLeastNum = "(([^0-9]*)[0-9]([^0-9]*)){1,}";
		assertTrue("Check least number regx true : ", pp.passwordMatcher("eeee1", regexLeastNum));
		assertTrue("Check least number regx false :  ", !pp.passwordMatcher("eeee", regexLeastNum));
		
		String regexMostNum = "(([^0-9]*)[0-9]([^0-9]*)){1,2}";
		assertTrue("Check most number regx true : ", pp.passwordMatcher("ee2ee1", regexMostNum));
		assertTrue("Check most number regx false :  ", !pp.passwordMatcher("ee2e3e1", regexMostNum));
		
		String regexLeastUpperCase = "(([^A-Z]*)[A-Z]([^A-Z]*)){1,}";
		assertTrue("Check least uppercase regx true : ", pp.passwordMatcher("eeUee1", regexLeastUpperCase));
		assertTrue("Check least uppercase regx false :  ", !pp.passwordMatcher("eeee1", regexLeastUpperCase));
		
		String regexMostUpperCase = "(([^A-Z]*)[A-Z]([^A-Z]*)){1,2}";
		assertTrue("Check most uppercase regx true : ", pp.passwordMatcher("eeUeIe1", regexMostUpperCase));
		assertTrue("Check most uppercase regx false :  ", !pp.passwordMatcher("eeUeIIe1", regexMostUpperCase));
		
		String regexLeastLowerCase = "(([^a-z]*)[a-z]([^a-z]*)){1,}";
		assertTrue("Check least lowercase regx true : ", pp.passwordMatcher("eeee1", regexLeastLowerCase));
		assertTrue("Check least lowercase regx false :  ", !pp.passwordMatcher("123", regexLeastLowerCase));
		
		String regexMostLowerCase = "(([^a-z]*)[a-z]([^a-z]*)){1,2}";
		assertTrue("Check most lowercase regx true : ", pp.passwordMatcher("ee1212", regexMostLowerCase));
		assertTrue("Check most lowercase regx false :  ", !pp.passwordMatcher("eeee", regexMostLowerCase));
		
		String regexLeastSpecialCase = "(([A-Za-z0-9]*)[^A-Za-z0-9]([A-Za-z0-9]*)){1,}";
		assertTrue("Check least special cahracter regx true : ", pp.passwordMatcher("ee*ee1", regexLeastSpecialCase));
		assertTrue("Check least special cahracter regx false :  ", !pp.passwordMatcher("eeee", regexLeastSpecialCase));
		
		String regexMostSpecialCase = "(([A-Za-z0-9]*)[^A-Za-z0-9]([A-Za-z0-9]*)){1,2}";
		assertTrue("Check most special cahracter regx true : ", pp.passwordMatcher("ee*&ee1", regexMostSpecialCase));
		assertTrue("Check most special cahracter regx false :  ", !pp.passwordMatcher("ee*&&ee", regexMostSpecialCase));
		
		String regexNotAllowed = "(.*[#$].*){1,}";
		assertTrue("Check not allowed character regx true : ", pp.passwordMatcher("ee$ee1", regexNotAllowed));
		assertTrue("Check not allowed character regx false :  ", !pp.passwordMatcher("eeee", regexNotAllowed));
	}

}
