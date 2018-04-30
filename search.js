function searchBox() {
	var queryString = location.search.split('searchItem=')[1]
	url = "https://job-os.herokuapp.com/reviewInfo?jobTitle=" + queryString;

	request = new XMLHttpRequest();
	request.open("GET", url, true);

	string = "";

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			outputString = document.getElementById("searchResults");
			reqObj = request.responseText;				

			reviews = JSON.parse(reqObj);
			var rating = 0;
			var count;

			for (count = 0; count < reviews.reviews.length; count++) {
				rating += parseFloat(reviews.reviews[count].overallRating);
				reviewNum = count + 1;
				string += "<p>Review " + reviewNum + ":<div>" + reviews.reviews[count].jobTitle + "<div>Department: " + reviews.reviews[count].department + "<div>Overall Rating: " + reviews.reviews[count].overallRating + "<div> Work Study or Standard: " + reviews.reviews[count].WSoS + "<div>Co-Worker Rating: " + reviews.reviews[count].CWrating + "<div>Hourly Rate: " + reviews.reviews[count].hourlyRate + "<div>Hours Per Week: " + reviews.reviews[count].hoursPerWeek + "<div>Can you do homework on the job? " + reviews.reviews[count].doHW + "<div>Schedule Flexibility: " + reviews.reviews[count].schedFlex + "<div>Other: " + reviews.reviews[count].other + "</p>";
			}

			console.log(count);
			console.log(rating);
			rating = rating / count;

			if(string == ""){
				outputString.innerHTML = "There are no reviews for " + queryString + "<div><a href=reviewjob.html>Be the first to write a review!</a>";
			} else if(rating == NaN) {
				outputString.innerHTML = string;
			} else {
				outputString.innerHTML = "Overall Rating: " + rating + "<div>" + string;
			}
		} 
	};

	request.send();



	url2 = "https://job-os.herokuapp.com/oneJobInfo?jobTitle=" + queryString;

	request2 = new XMLHttpRequest();
	request2.open("GET", url2, true);

	request2.onreadystatechange = function() {
		if (request2.readyState == 4 && request2.status == 200) {
			outputString = document.getElementById("searchResults");
			reqObj = request2.responseText;	
			console.log(reqObj);			

			avail_jobs = JSON.parse(reqObj);
			for (count = 0; count < avail_jobs.jobinfo.length; count++) {
				var title = avail_jobs.jobinfo[count].jobTitle;	
				var WSoS = avail_jobs.jobinfo[count].WSoS;
				var url = "https://job-os.herokuapp.com/markerLink.html?jobTitle="+title.replace(/ /g, "%20");
				
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

	request2.send();
}



