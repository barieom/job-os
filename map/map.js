function init() {
	lat         = 0;
	long        = 0;
	currentLoc  = new google.maps.LatLng(lat, long);

	myMap = {
		zoom:      10, 
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