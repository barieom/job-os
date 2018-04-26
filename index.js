function indexInit() {
	request1 = new XMLHttpRequest();
	request1.open("GET", "https://job-os.herokuapp.com/r3Jobs", true);

	request1.onreadystatechange = function() {
		if (request1.readyState == 4 && request1.status == 200) {
			outputString = document.getElementById("openjobs");
			reqObj = request.responseText;				

			avail_jobs = JSON.parse(reqObj);
			outputString = "";

			for (count = 0; count < avail_jobs.length; count++) {
				outputString += "<p>" + avail_jobs[count].jobTitle + " " + avail_jobs[count].department + " " + avail_jobs[count].jobDescript + " " + avail_jobs[count].WSoS + " " + avail_jobs[count].hourlyRate + " " + avail_jobs[count].hoursPerWeek + " " + avail_jobs[count].link + "</p>";
			}

			outputString.innerHTML = outputString;
		} 
	};

	request1.send();

	request2 = new XMLHttpRequest();
	request2.open("GET", "https://job-os.herokuapp.com/r3Reviews", true);

	request2.onreadystatechange = function() {
		if (request2.readyState == 4 && request2.status == 200) {
			outputString = document.getElementById("reviewedjobs");
			reqObj = request.responseText;				

			reviews = JSON.parse(reqObj);
			outputString = "";

			for (count = 0; count < avail_jobs.length; count++) {
				outputString += "<p>" + reviews[count].jobTitle + " " + reviews[count].department + " " + reviews[count].overallRating + " " + reviews[count].WSoS + " " + reviews[count].CWrating + " " + reviews[count].hourlyRate + " " + reviews[count].hoursPerWeek + " " + reviews[count].doHW + " " + reviews[count].schedFlex + " " + reviews[count].other +"</p>";
			}

			outputString.innerHTML = outputString;
		} 
	};

	request2.send();
}