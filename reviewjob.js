function postJobReview(){
	var jobTitle = document.getElementById("jobTitle").value;
	var department = document.getElementById("department").value; 
	var overallRating = document.getElementById("overallRating").value;
	var WSoS = document.getElementById("WSoS").value;
	var CWrating = document.getElementById("CWrating").value;
	var hourlyRate = document.getElementById("hourlyRate").value;
	var hoursPerWeek = document.getElementById("hoursPerWeek").value;
	var doHW = document.getElementById("doHW").value;
	var schedFlex = document.getElementById("schedFlex").value;
	var other = document.getElementById("other").value;

	document.getElementById("jobTitle").value = "";
	document.getElementById("department").value = ""; 
	document.getElementById("overallRating").value = "";
	document.getElementById("WSoS").value = "unspecified";
	document.getElementById("CWrating").value = "";
	document.getElementById("hourlyRate").value = "";
	document.getElementById("hoursPerWeek").value = "";
	document.getElementById("doHW").value = "unspecified";
	document.getElementById("schedFlex").value = "";
	document.getElementById("other").value = "";

	params = "jobTitle=" + jobTitle + "&department=" + department + "&overallRating=" +  overallRating + "&WSoS=" + WSoS + "&CWrating=" + CWrating + "&hourlyRate=" + hourlyRate + "&hoursPerWeek=" + hoursPerWeek + "&doHW=" + doHW + "&schedFlex=" + schedFlex + "&other=" + other;
	///update URL to right one
	url    = "https://job-os.herokuapp.com/postReview";

	request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}