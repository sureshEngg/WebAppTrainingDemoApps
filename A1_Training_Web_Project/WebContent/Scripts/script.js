function submitUserInformation() {
	// var form = document.getElementById("form_registration");
	var firstName = document.getElementById('txt_first_name').value;
	var lastName = document.getElementById("txt_last_name").value;
	var dob = document.getElementById("txt_date_of_birth").value;
	
	var select_nationality = document.getElementById("select_nationality");
	var nationality = select_nationality.options[select_nationality.selectedIndex].text;
	
	var permanentAddress = document.getElementById('txt_address_permanent').value;
	var currentAddress = document.getElementById("txt_address_current").value;
	
	var photoId = document.getElementById("select_id_type");
	var photoIdType = photoId.options[photoId.selectedIndex].text;
	
	var photoId = document.getElementById("txt_photo_id_number").value;

	if (firstName != "" && lastName != "" && dob != "" && nationality != ""
			&& permanentAddress != "" && currentAddress != ""
			&& photoIdType != "" && photoId != "") {

		if (!isValidDate(dob)) {
			alert("Invalid date of birth");
		} else {
			var submitMessage = "User is registerd with below information:-"
					+ "\n\n" + "First name: "
					+ firstName
					+ "\n"
					+ "Last name: "
					+ lastName
					+ "\n"
					+ "Dob: "
					+ dob
					+ "\n"
					+ "Nationality: "
					+ nationality
					+ "\n"
					+ "Permanent address: "
					+ permanentAddress
					+ "\n"
					+ "Current address: "
					+ currentAddress
					+ "\n"
					+ "Photo Id type: "
					+ photoIdType
					+ "\n"
					+ "Photo Id: "
					+ photoId;
			alert(submitMessage);
		}
	}
}

function isValidDate(date) {
	var matches = /^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/.exec(date);
	if (matches == null | matches == "")
		return false;
	var d = matches[2];
	var m = matches[1] - 1;
	var y = matches[3];
	var composedDate = new Date(y, m, d);
	return composedDate.getDate() == d && composedDate.getMonth() == m
			&& composedDate.getFullYear() == y;
}
