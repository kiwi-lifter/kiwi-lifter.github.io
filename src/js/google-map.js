

var map;


   function initMap(){
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
	
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
  
		var locations = data.restaurants;

		var largeInfowindow = new google.maps.InfoWindow();
		
        var bounds = new google.maps.LatLngBounds
		
		//Uses the location array to create marker object on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].name;

		  
		
		  // marker is an object with additional data about the pin for a single location
    var markerImage = {
		url: 'images/marker-orange.png',
		scaledSize: new google.maps.Size(35, 35), // scaled size
	};
		  
          // Create a marker per location, and put into locations array.
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
	
          bounds.extend(locations[i].marker.position);
        }
		
		var i;
		
		
		for (i = 0; i < locations.length; i++) {
			
			var handleYelpResults = function(results, target){
		
				target.marker.yelpInfo = results;

				// Create an onclick event to open an infowindow at each marker.
				target.marker.addListener('click', function() {
				
					populateInfoWindow(this, largeInfowindow);
					toggleBounce(this);
				});
		
			};
			
			var yelpRequest = getYelpInfo(locations[i], handleYelpResults);
		    
			$.ajax(yelpRequest);
			
			
		
		}

        // Extend the boundaries of the map for each marker
        map.fitBounds(bounds);
			
		return locations;
	}
	
	function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
		  setTimeout(function(){marker.setAnimation(null); }, 1450);
        }
      }
	// This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    function populateInfoWindow(marker, infowindow) {
		
        // Check to make sure the infowindow is not already opened on this marker.
		
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div><img src="' + marker.yelpInfo.image_url+'" alt="Yelp restaurant image."></div>');
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

function getYelpInfo(target, callback){

var YELP_BASE_URL = ''+ target.web +''
	,YELP_CONSUMER_KEY = '_2Ah0MhfqD-6bTRas90k-g'
	,YELP_TOKEN = 'iPD6CD5VbxITVXljAxqNFbksMf7f4z6C'
	,YELP_CONSUMER_SECRET = '4tvw4xVA9rF-ERUfxIO35I6E0Lo' 
	,YELP_TOKEN_SECRET = 'GaSqIVTr_yhTgPTnabngJCvOAy8';  
	

var yelpURL = YELP_BASE_URL;

var parameters = {
	oauth_consumer_key: YELP_CONSUMER_KEY,
	oauth_token: YELP_TOKEN,
	oauth_nonce: generateNonce(),
	oauth_timestamp: Math.floor(Date.now()/1000),
	oauth_signature_method: 'HMAC-SHA1',
	oauth_version : '1.0',
	callback: 'cb',
	location: yelpURL                   
	};
	
	

var encodedSignature = oauthSignature.generate('GET',yelpURL, parameters, YELP_CONSUMER_SECRET, YELP_TOKEN_SECRET);
parameters.oauth_signature = encodedSignature;

var settings = {
		url: yelpURL,
		data: parameters,
		cache: true,  					
		dataType: 'jsonp',
		success: function(results) {
		
		callback(results, target);
		
		},
		fail: function() {
			
			
		},
	};
 
		return settings;
	
};
