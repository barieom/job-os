function markerLinkInit() {
	var queryString = location.search.split('jobTitle=')[1]
	console.log(queryString);

	url="https://job-os.herokuapp.com/reviewInfo?jobTitle=" + queryString;
	console.log(url);

	request = new XMLHttpRequest();
	request.open("GET", url, true);

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			outputString = document.getElementById("singleReview");
			reqObj = request.responseText;				

			reviews = JSON.parse(reqObj);
			string = "";
			console.log(reviews);

			for (count = 0; count < reviews.length; count++) {
				string += "<p>" + reviews[count].jobTitle + " " + reviews[count].department + " " + reviews[count].jobDescript + " " + reviews[count].WSoS + " " + reviews[count].hourlyRate + " " + reviews[count].hoursPerWeek + " " + reviews[count].link + "</p>";
			}

			outputString.innerHTML = string;
		} 
	};

	request.send();

	
}