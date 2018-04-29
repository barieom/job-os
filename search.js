function searchBox() {
	console.log("in search box");
	//search = document.getElementById("mySearc").value;
	//console.log(search);

	outputString = document.getElementById("searchItem").value;
	console.log(outputString);
	//outputString.innerHTML = search;

	// url="https://job-os.herokuapp.com/reviewInfo?jobTitle=" + queryString;

	// request = new XMLHttpRequest();
	// request.open("GET", url, true);

	// request.onreadystatechange = function() {
	// 	if (request.readyState == 4 && request.status == 200) {
	// 		outputString = document.getElementById("singleReview");
	// 		reqObj = request.responseText;				

	// 		reviews = JSON.parse(reqObj);
	// 		string = "";
	// 		var rating = 0;
	// 		var count;

	// 		for (count = 0; count < reviews.length; count++) {
	// 			rating += reviews[count].overallRating;
	// 			string += "<p>" + reviews[count].jobTitle + " " + reviews[count].department + " " + reviews[count].overallRating + " " + reviews[count].WSoS + " " + reviews[count].CWrating + " " + reviews[count].hourlyRate + " " + reviews[count].hoursPerWeek + " " + reviews[count].doHW + " " + reviews[count].schedFlex + " " + reviews[count].other + "</p>";
	// 		}

	// 		rating = rating / count;
	// 		console.log(rating);

	// 		if(string == ""){
	// 			outputString.innerHTML = "There are no reviews for " + queryString + "<div><a href=reviewjob.html>Be the first to write a review!</a>";
	// 		} else if(rating == NaN) {
	// 			outputString.innerHTML = string;
	// 		} else {
	// 			outputString.innerHTML = "Overall Rating: " + rating + "<div>" + string;
	// 		}
	// 	} 
	// };

	// request.send();
}



