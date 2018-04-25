function findJobInit() {
	request = new XMLHttpRequest();
	request.open("GET", "https://job-os.herokuapp.com/jobInfo", true);

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			outputString = document.getElementById("AvailJobs");
			reqObj = request.responseText;				

			avail_jobs = JSON.parse(reqObj);
			outputString = "";
			console.log(count);
			for (count = 0; count < avail_jobs.length; count++) {
				outputString += "<p>" + avail_jobs[count].jobTitle + " " + avail_jobs[count].department + " " + avail_jobs[count].jobDescript + " " + avail_jobs[count].WSoS + " " + avail_jobs[count].hourlyRate + " " + avail_jobs[count].hoursPerWeek + " " + avail_jobs[count].link + "</p>";
			}
			outputDiv.innerHTML = outputString;
		} 
	};

	request.send();
}