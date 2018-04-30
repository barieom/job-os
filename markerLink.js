function markerLinkInit() {
	var queryString = location.search.split('jobTitle=')[1]
	job =  queryString.replace(/%20/g, " ");

	url = "https://job-os.herokuapp.com/reviewInfo?jobTitle=" + queryString;
	console.log(url);

	request = new XMLHttpRequest();
	request.open("GET", url, true);

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			outputString = document.getElementById("singleReview");
			reqObj = request.responseText;				

			reviews = JSON.parse(reqObj);
			string = "";
			var rating = 0;
			var count;

			for (count = 0; count < reviews.reviews.length; count++) {
				rating += reviews.reviews[count].overallRating;
				reviewNum = count + 1;
				string += "<p>Review " + reviewNum + ":<div>" + reviews.reviews[count].jobTitle + "<div>Department: " + reviews.reviews[count].department + "<div>Overall Rating: " + reviews.reviews[count].overallRating + "<div> Work Study or Standard: " + reviews.reviews[count].WSoS + "<div>Co-Worker Rating: " + reviews.reviews[count].CWrating + "<div>Hourly Rate: " + reviews.reviews[count].hourlyRate + "<div>Hours Per Week: " + reviews.reviews[count].hoursPerWeek + "<div>Can you do homework on the job? " + reviews.reviews[count].doHW + "<div>Schedule Flexibility: " + reviews.reviews[count].schedFlex + "<div>Other: " + reviews.reviews[count].other + "</p>";
			}

			rating = rating / count;

			if(string == ""){
				outputString.innerHTML = "There are no reviews for " + job + "<div><a href=reviewjob.html>Be the first to write a review!</a>";
			} else if(rating == NaN) {
				outputString.innerHTML = string;
			} else {
				outputString.innerHTML = "Overall Rating: " + rating + "<div>" + string;
			}
		} 
	};

	request.send();
}