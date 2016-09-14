

var map;
var locations;

   function initMap(data){
	   
	    // map style arrays
  var styles = [{"featureType":"all","elementType":"all","stylers":[{"saturation":-100},{"gamma":0.5}]}] // StyleMapType object 
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Restaurants"});
	
  // Map object
  var mapOptions = {
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  
		map = new google.maps.Map(document.getElementById('map'), 
			 mapOptions);
	/**
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: -36.854222, lng: 174.745765},
			zoom: 14
		}, mapOptions);
		
	**/	
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
  
		locations = data.restaurants;
		
		var largeInfowindow = new google.maps.InfoWindow();
		
        var bounds = new google.maps.LatLngBounds
		
		// The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].name;
		  
		  var test = getYelpInfo(locations[i]);
		  
		  console.log('>>>>>>>>>>>', test);
		  
		  // marker is an object with additional data about the pin for a single location
    var markerImage = {
		url: 'images/marker-orange.png',
		scaledSize: new google.maps.Size(35, 35), // scaled size
	};
		  
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i,
			icon: markerImage
          });
          // Add the marker to locations array.
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
		
		return locations;
	}
	
	// This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    function populateInfoWindow(marker, infowindow) {
		
        // Check to make sure the infowindow is not already opened on this marker.
		
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title+'</div>');
          infowindow.open(map, marker);
		  
          // Make sure the marker property is cleared if the infowindow is closed.
		  
          infowindow.addListener('closeclick',function(){
			  
            infowindow.marker = null;
          });
		  
        }
    }

	// This function will loop through the filtered results and list them.
    function showFilteredMarkers(filteredSearchArray, restaurantsArray) {
		
		for (var i = 0; i < restaurantsArray.length; i++) {
			restaurantsArray[i].marker.setVisible(false);
		}
		
		for (var i = 0; i < filteredSearchArray.length; i++) {
			
				filteredSearchArray[i].marker.setVisible(true);
			}
			
	}
		
		

function generateNonce() {
	return (Math.floor(Math.random() * 1e12).toString());
}

function getYelpInfo(target){

//var YELP_BASE_URL = 'http://api.yelp.com/v2/search/'
var YELP_BASE_URL = ''+ target.web +''
	,YELP_CONSUMER_KEY = '_2Ah0MhfqD-6bTRas90k-g'
	,YELP_TOKEN = 'iPD6CD5VbxITVXljAxqNFbksMf7f4z6C'
	,YELP_CONSUMER_SECRET = '4tvw4xVA9rF-ERUfxIO35I6E0Lo' 
	,YELP_TOKEN_SECRET = 'GaSqIVTr_yhTgPTnabngJCvOAy8';  
	
//var yelpURL = YELP_BASE_URL + 'Ponsonby+Auckland';

var yelpURL = YELP_BASE_URL;

var parameters = {
	oauth_consumer_key: YELP_CONSUMER_KEY,
	oauth_token: YELP_TOKEN,
	oauth_nonce: generateNonce(),
	oauth_timestamp: Math.floor(Date.now()/1000),
	oauth_signature_method: 'HMAC-SHA1',
	oauth_version : '1.0',
	callback: 'cb',

	
	//term: '262 Ponsonby Rd, Ponsonby, Auckland, NZ',
	//term: target.address,
	location: yelpURL,
	//location: 'Ponsonby+Auckland',
	limit: 20                   
	};
	
	

var encodedSignature = oauthSignature.generate('GET',yelpURL, parameters, YELP_CONSUMER_SECRET, YELP_TOKEN_SECRET);
parameters.oauth_signature = encodedSignature;

var settings = {
		url: yelpURL,
		data: parameters,
		cache: true,  //        <----  This is crucial to include as well to prevent jQuery from 
		// adding on a cache-buster parameter "_=23489489749837", 
		// invalidating our oauth-signature
		dataType: 'jsonp',
		success: function(results) {
		// Do stuff with results
		
		console.log(results);
		
		//target.img = results.image_url;
		
		return results;
		},
		fail: function() {
			// Do stuff on fail
			console.log('AJAX request has failed :(');
		},
	};
 

		// Send AJAX request via jQuery library
		$.ajax(settings);
};
