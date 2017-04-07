package com.app.myDemoApp;

import java.util.Hashtable;
import java.util.Set;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

@Path("/helloWorldREST")
public class HelloWorld {

	@GET
	@Path("/{parameter}")
	public Response responseMsg( @PathParam("parameter") String parameter,
			@DefaultValue("Nothing to say") @QueryParam("value") String value) {

		String output = "Hello from: " + parameter + " : " + value;
		MySQLAccess dao = new MySQLAccess();
		String output1 = "[";
		try {
			dao.readDataBase();
			Hashtable<String, String> employees = dao.getEmployeeDetails();
			Set<String> keys = employees.keySet();
			
			for (String key: keys) {
				output1+= "{"+key+"="+employees.get(key)+"},";
			}
			dao.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return Response.status(200).entity(output+"###\"Details="+output1+"]\"").build();
	}
}