var map;
// Create a new blank array for all the listing markers.
var markers = [];
   function initMap(data){
		
		
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -36.854222, lng: 174.745765},
			zoom: 14
		});
		
		
		var locations = data.restaurants;
		
		var largeInfowindow = new google.maps.InfoWindow();
		
        var bounds = new google.maps.LatLngBounds
		
		// The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].name;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Push the marker to our array of markers.
          //markers.push(marker);
		  
		  locations[i].marker = marker;
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
		  
		    //bounds.extend(markers[i].position);
		  
          bounds.extend(locations[i].marker.position);
        }
        // Extend the boundaries of the map for each marker
        map.fitBounds(bounds);
		
		
		// This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
		  
          // Make sure the marker property is cleared if the infowindow is closed.
		  
          infowindow.addListener('closeclick',function(){
			  
            infowindow.marker = null;
          });
		  
        }
      }
			return locations;
	}
	