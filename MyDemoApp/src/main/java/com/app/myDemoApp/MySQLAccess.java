package com.app.myDemoApp;

//Adapted from http://www.vogella.com/tutorials/MySQLJava/article.html
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.Map;

public class MySQLAccess {

	private Connection connect = null;
	private Statement statement = null;
	private PreparedStatement preparedStatement = null;
	private ResultSet resultSet = null;

	final private String host = "127.0.0.1";
	final private String user = "root";
	final private String passwd = "mypassword";

	public void readDataBase() throws Exception {
		try {
			// This will load the MySQL driver, each DB has its own driver
			Class.forName("com.mysql.jdbc.Driver");

			// Setup the connection with the DB
			connect = DriverManager.getConnection("jdbc:mysql://" + host
					+ "/mydb?" + "user=" + user + "&password=" + passwd);

			// Statements allow to issue SQL queries to the database
			statement = connect.createStatement();
			// Result set get the result of the SQL query
			resultSet = statement.executeQuery("select * from mydb.employee");
			writeResultSet(resultSet);

			//To insert a new row in employee table
			//insertNewEmp();

			preparedStatement = connect
					.prepareStatement("SELECT emp_id, emp_name from mydb.employee");
			resultSet = preparedStatement.executeQuery();
			writeResultSet(resultSet);

			/*
			 * // Remove again the insert comment preparedStatement = connect
			 * .prepareStatement
			 * ("delete from feedback.comments where myuser= ? ; ");
			 * preparedStatement.setString(1, "Test");
			 * preparedStatement.executeUpdate();
			 * 
			 * resultSet = statement
			 * .executeQuery("select * from feedback.comments");
			 * writeMetaData(resultSet);
			 */

		} catch (Exception e) {
			System.out.println("Exception==" + e.getMessage());
			throw e;
		} finally {
			//close();
		}

	}

	private void insertNewEmp() {
		// TODO Auto-generated method stub
		// PreparedStatements can use variables and are more efficient
		try {
			preparedStatement = connect
					.prepareStatement("insert into  mydb.employee(emp_id, emp_name) values(?, ?)");
			// "myuser, webpage, datum, summary, COMMENTS from feedback.comments");
			// Parameters start with 1
			preparedStatement.setString(1, "5");
			preparedStatement.setString(2, "shubhangi");
		

			preparedStatement.executeUpdate();
		} catch (Exception e) {
			// TODO: handle exception
		}
	}

	public Hashtable<String, String> writeResultSet(ResultSet resultSet) throws SQLException {
		// ResultSet is initially before the first data set
		Hashtable<String, String> employees = new Hashtable<String, String>();
		while (resultSet.next()) {
			// It is possible to get the columns via name
			// also possible to get the columns via the column number
			// which starts at 1
			// e.g. resultSet.getSTring(2);
			String user = resultSet.getString("emp_id");
			String name = resultSet.getString("emp_name");

			System.out.println("User: " + user);
			System.out.println("name: " + name);
			employees.put(user, name);
		}
		return employees;
	}

	public Hashtable<String, String> getEmployeeDetails() throws SQLException {
		preparedStatement = connect
				.prepareStatement("SELECT emp_id, emp_name from mydb.employee");
		resultSet = preparedStatement.executeQuery();
		//writeResultSet(resultSet);
		// ResultSet is initially before the first data set
		Hashtable<String, String> employees = new Hashtable<String, String>();
		while (resultSet.next()) {
			// It is possible to get the columns via name
			// also possible to get the columns via the column number
			// which starts at 1
			// e.g. resultSet.getSTring(2);
			String user = resultSet.getString("emp_id");
			String name = resultSet.getString("emp_name");

			System.out.println("User: " + user);
			System.out.println("name: " + name);
			employees.put(user, name);
		}
		return employees;
	}
	
	// You need to close the resultSet
	public void close() {
		try {
			if (resultSet != null) {
				resultSet.close();
			}

			if (statement != null) {
				statement.close();
			}

			if (connect != null) {
				connect.close();
			}
		} catch (Exception e) {

		}
	}

	/*
	 * private void writeMetaData(ResultSet resultSet) throws SQLException { //
	 * Now get some metadata from the database // Result set get the result of
	 * the SQL query
	 * 
	 * System.out.println("The columns in the table are: ");
	 * 
	 * System.out.println("Table: " + resultSet.getMetaData().getTableName(1));
	 * for (int i = 1; i<= resultSet.getMetaData().getColumnCount(); i++){
	 * System.out.println("Column " +i + " "+
	 * resultSet.getMetaData().getColumnName(i)); } }
	 * 
	 * 
	 * }
	 */

}
