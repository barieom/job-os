function getJobs() {
	var request1 = new XMLHttpRequest();
	request1.open("GET", "https://job-os.herokuapp.com/jobInfo", true);

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
					string += "<div class='bg_grey fill-div'><a href=" + url + ">" + "<div class='black_text row'>" + "<div class='job_title no_margin col-4 wrap-word'>" + title + "</div><div class='col-8 no_margin'> Affiliation: " + avail_jobs.jobinfo[count].department + "<br> Hourly Rate: " + avail_jobs.jobinfo[count].hourlyRate + "<br> Work Study: " + WSoS + "</div></div></div>";
				} else {
					string += "<div class='bg_white fill-div'><a href=" + url + ">" + "<div class='black_text row'>" + "<div class='job_title no_margin col-4 wrap-word'>" + title + "</div><div class='col-8 no_margin'> Affiliation: " + avail_jobs.jobinfo[count].department + "<br> Hourly Rate: " + avail_jobs.jobinfo[count].hourlyRate + "<br> Work Study: " + WSoS + "</div></div></div>";
				}			
			}
			outputString.innerHTML = string;
		} 
	};

	request1.send();

}

// 					string += "<div class='bg_grey fill-div'><a href=" + url + ">" + "<div class='black_text row'>" + "<div class='job_title no_margin col-4 no-disp-wsm'>" + title + "</div><div class='col-8 no_margin'> " + "<div class='no-disp-wbg'>" + title + "</div>" + "Affiliation: " + avail_jobs.jobinfo[count].department + "<br> Hourly Rate: " + avail_jobs.jobinfo[count].hourlyRate + "<br> Work Study: " + WSoS + "</div></div></div>";