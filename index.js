function indexInit() {
	var request1 = new XMLHttpRequest();
	request1.open("GET", "https://job-os.herokuapp.com/randomJobs", true);

	request1.onreadystatechange = function() {
		if (request1.readyState == 4 && request1.status == 200) {
			outputString = document.getElementById("openjobs");
			reqObj = request1.responseText;				

			avail_jobs = JSON.parse(reqObj);
			string = "";

			for (count = 0; count < avail_jobs.jobinfo.length; count++) {
				string += "<p>" + avail_jobs.jobinfo[count].jobTitle + " " + avail_jobs.jobinfo[count].department + " " + avail_jobs.jobinfo[count].jobDescript + " " + avail_jobs.jobinfo[count].WSoS + " " + avail_jobs.jobinfo[count].hourlyRate + " " + avail_jobs.jobinfo[count].hoursPerWeek + " " + avail_jobs.jobinfo[count].link + "</p>";
			}

			outputString.innerHTML = string;
		} 
	};

	request1.send();

	var request2 = new XMLHttpRequest();
	request2.open("GET", "https://job-os.herokuapp.com/randomReviews", true);

	request2.onreadystatechange = function() {
		if (request2.readyState == 4 && request2.status == 200) {
			outputString = document.getElementById("reviewedjobs");
			reqObj = request2.responseText;				

			reviews = JSON.parse(reqObj);
			string = "";

			for (count = 0; count < reviews.reviews.length; count++) {
				string += "<p>" + reviews.reviews[count].jobTitle + " " + reviews.reviews[count].department + " " + reviews.reviews[count].overallRating + " " + reviews.reviews[count].WSoS + " " + reviews.reviews[count].CWrating + " " + reviews.reviews[count].hourlyRate + " " + reviews.reviews[count].hoursPerWeek + " " + reviews.reviews[count].doHW + " " + reviews.reviews[count].schedFlex + " " + reviews.reviews[count].other +"</p>";
			}

			outputString.innerHTML = string;
		} 
	};

	request2.send();
}