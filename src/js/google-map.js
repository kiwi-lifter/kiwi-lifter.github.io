var map;

   function initMap(){
 
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -36.848461, lng: 174.763336},
			zoom: 14
		});
		
		var auckland = {lat: -36.842067, lng: 174.755712};
		var marker = new google.maps.Marker({
			position: auckland,
			map: map,
			title: 'First Marker!'
		});
		
		var infowindow = new google.maps.InfoWindow({
			content: 'Do you ever feel like an InfoWindow, floating through the wind,' +
			' ready to start again?'
		});
		marker.addListener('click', function(){
			infowindow.open(map, marker);
		});
	}
	
	initMap();