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
				var title = avail_jobs.jobinfo[count].jobTitle;	
				var WSoS = avail_jobs.jobinfo[count].WSoS;
				var url = "search.html?jobTitle="+title.replace(/ /g, "%20");
				
				if (WSoS == "Work Study") { WSoS = "Yes"}
				else if (WSoS == "N/A" || WSoS == "Standard") {WSoS = "Standard"};

				if (count%2==0) {
					string += "<div class='bg_grey fill-div'><a href=" + url + ">" + "<div class='black_text row'>" + "<div class='job_title no_margin col-4'>" + title + "</div><div class='col-8 no_margin'> Affiliation: " + avail_jobs.jobinfo[count].department + "<br> Hourly Rate: " + avail_jobs.jobinfo[count].hourlyRate + "<br> Work Study: " + WSoS + "</div></div></div>";
				} else {
					string += "<div class='bg_white fill-div'><a href=" + url + ">" + "<div class='black_text row'>" + "<div class='job_title no_margin col-4'>" + title + "</div><div class='col-8 no_margin'> Affiliation: " + avail_jobs.jobinfo[count].department + "<br> Hourly Rate: " + avail_jobs.jobinfo[count].hourlyRate + "<br> Work Study: " + WSoS + "</div></div></div>";
				}
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
				var title = reviews.reviews[count].jobTitle;	
				var WSoS = reviews.reviews[count].WSoS;
				var url = "search.html?jobTitle="+title.replace(/ /g, "%20");
				
				if (WSoS == "Work Study") { WSoS = "Yes"}
				else if (WSoS == "N/A" || WSoS == "Standard") {WSoS = "Standard"};

				if (count%2==0) {
					string += "<div class='bg_grey fill-div'><a href=" + url + ">" + "<div class='black_text row'>" + "<div class='job_title no_margin col-4'>" + title + "</div><div class='col-8 no_margin'> \"\ " + reviews.reviews[count].other + "\"\ </div></div></div>";
				} else {
					string += "<div class='bg_white fill-div'><a href=" + url + ">" + "<div class='black_text row'>" + "<div class='job_title no_margin col-4'>" + title + "</div><div class='col-8 no_margin'> \"\ " + reviews.reviews[count].other + "\"\ </div></div></div>";
				}
							
			}

			outputString.innerHTML = string;
		} 
	};

	request2.send();
}








