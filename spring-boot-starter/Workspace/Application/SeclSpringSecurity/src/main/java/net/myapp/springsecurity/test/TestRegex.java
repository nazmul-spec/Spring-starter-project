package net.myapp.springsecurity.test;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TestRegex {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		//Pattern pattern = Pattern.compile("^(?=.*[0-9].*[0-9])[0-9a-zA-Z]{8,12}$")  wd3w3q33wYs4j@;
		String password = "22eF^$.!/33Fe";
		Integer max = 3;
		Integer min = 1;
		
		// !	"	#	$	%	&	'	(	)	*	+	,	-	.	/	:
		// ;	<	=	>	?	@	[	\	]	^	_	`	{	|	}	~
		
		Pattern pattern = Pattern.compile("(([^0-9]*)[0-9]([^0-9]*)){" + min + ",}");  // least 1 number
        Matcher matcher = pattern.matcher(password);
        System.out.println("Input String matches least number regex - "+matcher.matches());
        
        pattern = Pattern.compile("(([^0-9]*)[0-9]([^0-9]*)){" + min + "," + max + "}");  // most 3 number
        matcher = pattern.matcher(password);
        System.out.println("Input String matches Most number regex - "+matcher.matches());
        
        pattern = Pattern.compile("(([^A-Z]*)[A-Z]([^A-Z]*)){" + min + ",}");  // least  upper case
        matcher = pattern.matcher(password);
        System.out.println("Input String matches least upper case regex - "+matcher.matches());
        
        pattern = Pattern.compile("(([^A-Z]*)[A-Z]([^A-Z]*)){" + min + "," + max + "}");  // most  upper case
        matcher = pattern.matcher(password);
        System.out.println("Input String matches most upper case regex - "+matcher.matches());
        
        pattern = Pattern.compile("(([^a-z]*)[a-z]([^a-z]*)){" + min + ",}");  // least  lower case
        matcher = pattern.matcher(password);
        System.out.println("Input String matches least lower case regex - "+matcher.matches());
        
        pattern = Pattern.compile("(([^a-z]*)[a-z]([^a-z]*)){" + min + "," + max + "}");  // most lower case
        matcher = pattern.matcher(password);
        System.out.println("Input String matches most lower case regex - "+matcher.matches());
        
        pattern = Pattern.compile("(([A-Za-z0-9]*)[^A-Za-z0-9]([A-Za-z0-9]*)){" + min + ",}");  // least  special char
        matcher = pattern.matcher(password);
        System.out.println("Input String matches least special char regex - "+matcher.matches());
        
        pattern = Pattern.compile("(([A-Za-z0-9]*)[^A-Za-z0-9]([A-Za-z0-9]*)){" + min + "," + max + "}");  // least  special char
        matcher = pattern.matcher(password);
        System.out.println("Input String matches least special char regex - "+matcher.matches());
        
        pattern = Pattern.compile("(.*[\\^].*){1,}");  // least  special char
        matcher = pattern.matcher(password);
        System.out.println("Input String matches least special char regex - " + matcher.matches());
        
	}

}
