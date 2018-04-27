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
	geocoder   = new google.maps.Geocoder();

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
	console.log("in updateMap");
	currentLoc = new google.maps.LatLng(lat, long);

	map.panTo(currentLoc);
	
	marker = new google.maps.Marker({
		position: currentLoc,
		icon: "userLoc.png"
	});

	marker.setMap(map);
}

function findCoords(address) {
	var coords;
	geocoder.geocode({'address' : address}, function(results, status){
		if(status == 'OK'){
			coordsObj = results[0].geometry.location;
			coordinates = [coordsObj.nb, coordsObj.ob]
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	})
}


function findJobs() {
	url     = "https://job-os.herokuapp.com/jobInfo";
	request = new XMLHttpRequest();
	request.open("GET", url, true);

	request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status === 200) {		
			data = JSON.parse(request.responseText); 

			for(count = 0; count < data.length; count++){
				if(data[count].address != undefined){

					findCoords(data[count].address);
					jlat     = coordinates[0];
					jlong    = coordinates[1];
					var jLoc = new google.maps.LatLng(jlat, jlong);

					var jMarker = new google.maps.Marker({
						position: jLoc,
						title: data.jobTitle,
						icon: "pin.png"
					});

					jMarker.setMap(map);
					var jInfoWindow = new google.maps.InfoWindow()

					google.maps.event.addListener(jMarker, 'click', function() {
						vInfoWindow.setContent(this.title);
						vInfoWindow.open(map, this);
					});

				}
			}
		}

		if (request.readyState == 4 && request.status != 200){
			document.getElementById("myMap").innerHTML = "<p>Something went wrong</p>";
		}
	};

	request.send();
}