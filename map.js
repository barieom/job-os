function init() {
	lat         = 0;
	long        = 0;
	currentLoc  = new google.maps.LatLng(lat, long);

	myMap = {
		zoom:      17, 
		center:    currentLoc, 
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	};

	infowindow = new google.maps.InfoWindow()
	map        = new google.maps.Map(document.getElementById("myMap"), myMap);

	getLocation();
}

function getLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(myPosition){
			lat  = myPosition.coords.latitude;
			long = myPosition.coords.longitude;
			updateMap();
		});
	} else {
		alert("geolocation is not supported by your web browser.");
	}

	findJobs();
}

function updateMap() {
	currentLoc = new google.maps.LatLng(lat, long);

	map.panTo(currentLoc);
	
	marker = new google.maps.Marker({
		position: currentLoc,
		icon: "userLoc.png"
	});

	marker.setMap(map);
}

function findCoords(address, title, department) {
	geocoder.geocode({'address': address}, function(results, status) {
		if(status === 'OK'){
			latitude  = results[0].geometry.bounds.f;
			longitude = results[0].geometry.bounds.b;
			coordinates = [latitude.b, longitude.b]
			putJobOnMap(coordinates, title, department);		
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	})
}

function putJobOnMap(coord, title, department) {
	var jLoc    = new google.maps.LatLng(coord[0], coord[1]);
	link = "markerLink.html?jobTitle="+title;
	var jMarker = new google.maps.Marker({
		map: map,
		position: jLoc,
		title: "<b>" + title + "</b><div>" + department + "<div><a href="+ link + ">Reviews</a>",
		icon: "jobPin.png"
	});

	jMarker.setMap(map);
	var jInfoWindow = new google.maps.InfoWindow()

	google.maps.event.addListener(jMarker, 'click', function() {
		jInfoWindow.setContent(this.title);
		jInfoWindow.open(map, this);
	});
}


function findJobs() {
	url     = "https://job-os.herokuapp.com/jobInfo";
	request = new XMLHttpRequest();
	request.open("GET", url, true);

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status === 200) {	
			data = JSON.parse(request.responseText); 
			geocoder   = new google.maps.Geocoder();
			for(count = 0; count < data.jobinfo.length; count++) {
				if(data.jobinfo[count].address != undefined) {
					findCoords(data.jobinfo[count].address, data.jobinfo[count].jobTitle, data.jobinfo[count].department);
				}
			}
		}
		if (request.readyState == 4 && request.status != 200){
			document.getElementById("myMap").innerHTML = "<p>Something went wrong</p>";
		}
	};

	request.send();
}