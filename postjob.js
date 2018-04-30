function postJobSubmit() {
	var jobTitle     = document.getElementById("jobTitle").value;
	var department   = document.getElementById("department").value; 
	var jobDescript  = document.getElementById("jobDescript").value;
	var WSoS         = document.getElementById("WSoS").value;
	var hourlyRate   = document.getElementById("hourlyRate").value;
	var hoursPerWeek = document.getElementById("hoursPerWeek").value;
	var address      = document.getElementById("address").value;	
	var link         = document.getElementById("link").value;

	document.getElementById("jobTitle").value     = "";
	document.getElementById("department").value   = ""; 
	document.getElementById("jobDescript").value  = "";
	document.getElementById("WSoS").value         = "unspecified";
	document.getElementById("hourlyRate").value   = "";
	document.getElementById("hoursPerWeek").value = "";
	document.getElementById("address").value      = "";
	document.getElementById("link").value         = "";

	params = "jobTitle=" + jobTitle + "&department=" + department + "&jobDescript=" +  jobDescript + "&WSoS=" + WSoS + "&hourlyRate=" + hourlyRate + "&hoursPerWeek=" + hoursPerWeek + "&address=" + address + "&link=" + link;
	url    = "https://job-os.herokuapp.com/postJob";

	request = new XMLHttpRequest();
	request.open("POST", url, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}