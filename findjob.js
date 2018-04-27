function findJobInit() {
	request = new XMLHttpRequest();
	request.open("GET", "https://job-os.herokuapp.com/jobInfo", true);
	console.log("in findJobInit");

	request.onreadystatechange = function() {
		console.log("A");
		if (request.readyState == 4 && request.status == 200) {
			console.log("B")
			outputString = document.getElementById("AvailJobs");
			reqObj = request.responseText;				

			avail_jobs = JSON.parse(reqObj);
			string = "";

			console.log(avail_jobs.jobinfo.length);
			for (count = 0; count < avail_jobs.jobinfo.length; count++) {
				string += "<p>" + avail_jobs.jobinfo[count].jobTitle + " " + avail_jobs.jobinfo[count].department + " " + avail_jobs.jobinfo[count].jobDescript + " " + avail_jobs.jobinfo[count].WSoS + " " + avail_jobs.jobinfo[count].hourlyRate + " " + avail_jobs.jobinfo[count].hoursPerWeek + " " + avail_jobs.jobinfo[count].address + " " + avail_jobs.jobinfo[count].link + "</p>";
			}

			outputString.innerHTML = string;
		} 
	};

	request.send();
}
