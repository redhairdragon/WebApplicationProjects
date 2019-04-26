import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

class ComputeSHA{	
	static byte[] buffer;

	public static void main(String[] args) throws IOException, NoSuchAlgorithmException{
		//check args
		if(args.length!=1){
			System.out.println("Invalid args");
			return;
		}

		FileInputStream in = null;
		String filename = args[0]; 

    	try{
    		in = new FileInputStream(filename);
            MessageDigest md = MessageDigest.getInstance("SHA-1");
    		byte buffer []= new byte[4096];
    		int load_size=in.read(buffer);
    		while(load_size!=-1){    			
    			md.update(Arrays.copyOfRange(buffer,0,load_size));	
    			load_size=in.read(buffer);
    		}
    		byte result[]=md.digest();
            for (byte bytes : result) {
                System.out.print(String.format("%02x", bytes & 0xff));
            }
    		System.out.println("");
    	}
    	finally{
			if (in != null) {
				in.close();
			}
		}
 	}       
}


		
