function getReviews() {
	if (location.search.split('searchItem=')[1]){
		var queryString = location.search.split('searchItem=')[1]
	} else {
		var queryString = location.search.split('jobTitle=')[1]
	}
	url = "https://job-os.herokuapp.com/reviewInfo?jobTitle=" + queryString;

	request = new XMLHttpRequest();
	request.open("GET", url, true);

	var string = "";

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			var outputString = document.getElementById("reviewListing");
			outputString.innerHTML = "";
			reqObj = request.responseText;				

			reviews = JSON.parse(reqObj);
			var rating = 0;
			var count;

			for (count = 0; count < reviews.reviews.length; count++) {
				rating += parseFloat(reviews.reviews[count].overallRating);
				reviewNum = count + 1;
				string += "<p>Review " + reviewNum + ":<div>" + reviews.reviews[count].jobTitle + "<div>Department: " + reviews.reviews[count].department + "<div>Overall Rating: " + reviews.reviews[count].overallRating + "<div> Work Study or Standard: " + reviews.reviews[count].WSoS + "<div>Co-Worker Rating: " + reviews.reviews[count].CWrating + "<div>Hourly Rate: " + reviews.reviews[count].hourlyRate + "<div>Hours Per Week: " + reviews.reviews[count].hoursPerWeek + "<div>Can you do homework on the job? " + reviews.reviews[count].doHW + "<div>Schedule Flexibility: " + reviews.reviews[count].schedFlex + "<div>Comment: " + reviews.reviews[count].other + "</p>";
			}

			rating = rating / count;

			if(string == "" || string == undefined || string == null) {
				outputString.innerHTML = "There are no reviews for " + queryString + "<div><a href=reviewjob.html>Be the first to write a review!</a>";
			} else if (rating == NaN) {
				outputString.innerHTML = string;
			} else {
				outputString.innerHTML = "Overall Rating: " + rating + "<div>" + string;
			}
		} 
	};

	request.send();
}

function getOpening(){
	if (location.search.split('searchItem=')[1]){
		var queryString = location.search.split('searchItem=')[1]
	} else {
		var queryString = location.search.split('jobTitle=')[1]
	}

	url2 = "https://job-os.herokuapp.com/oneJobInfo?jobTitle=" + queryString;

	request2 = new XMLHttpRequest();
	request2.open("GET", url2, true);

	var string=""

	request2.onreadystatechange = function() {
		if (request2.readyState == 4 && request2.status == 200) {
			var outputString2 = document.getElementById("jobListing");
			reqObj = request2.responseText;	
			outputString2.innerHTML = "";

			avail_jobs = JSON.parse(reqObj);
			document.getElementById("jobTitle").innerHTML = avail_jobs.jobinfo[0].jobTitle;
			for (count = 0; count < avail_jobs.jobinfo.length; count++) {
				var title = avail_jobs.jobinfo[count].jobTitle;	
				var WSoS = avail_jobs.jobinfo[count].WSoS;
				var url = "https://job-os.herokuapp.com/markerLink.html?jobTitle="+title.replace(/%20/g, " ");
				if (WSoS == "Work Study") { WSoS = "Yes"}
				else if (WSoS == "N/A" || WSoS == "Standard" || WSoS == NaN) {WSoS = "Standard"};
				if (count%2==0) {
					string += "<div class='row info_font'>" + " Job Details " + "</div>";
					string += "<div class='job_info_box fill-div black_text row'>" + "<div class='job_title no_margin col-4'>" + title + "</div><div class='col-8 no_margin'> <table class='table'> <tbody> <tr> <td> Affiliation: </td><td>" +avail_jobs.jobinfo[count].department+"</td>" + "</tr><tr><td>Hourly Rate: </td>" + "<td>" + avail_jobs.jobinfo[count].hourlyRate + "</td></tr><tr><td> Work Study:</td><td>" + WSoS + "</td></tr><tr> <td> Hours Per Week: </td><td>" +avail_jobs.jobinfo[count].hoursPerWeek +"</td></tr><tr> <td> Address: </td><td>" +avail_jobs.jobinfo[count].address +"</td></tr><tr> <td> Job Description: </td><td>" +avail_jobs.jobinfo[count].jobDescript +"</td></tr><tr> <td> Link to Apply: </td><td>" + avail_jobs.jobinfo[count].link + "</td></tr>" + "</tbody></table></div></div>";
				}
			}

			outputString2.innerHTML = string;
		} 
	};

	request2.send();
}



