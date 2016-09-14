var map;

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
          infowindow.setContent('<div>' + marker.title + '</div>');
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
	
	
	
	
//(function($){	


function nonce_generate() {
    return (Math.floor(Math.random() * 1e12).toString());
}


var yelp_url = 'http://api.yelp.com/v2/search/?location=Auckland+New+Zealand';
  var parameters = {
      oauth_consumer_key: '_2Ah0MhfqD-6bTRas90k-g',
      oauth_token: 'iPD6CD5VbxITVXljAxqNFbksMf7f4z6C',
      oauth_nonce: nonce_generate(),
      oauth_timestamp: Math.floor(Date.now() / 1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0',
      callback: 'cb'
  };
  var encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, '4tvw4xVA9rF-ERUfxIO35I6E0Lo', 'GaSqIVTr_yhTgPTnabngJCvOAy8');
  parameters.oauth_signature = encodedSignature;
  var settings = {
      url: yelp_url,
      data: parameters,
      cache: true,
      dataType: 'jsonp',
      success: function(results) {
        console.log(results);
      },
      error: function() {
		  
        console.log('The Yelp API call failed :(');
		
		console.log('parameters', parameters);
      }
  };
  $.ajax(settings);

/**
function generateNonce() {
	return (Math.floor(Math.random() * 1e12).toString());
}

var YELP_BASE_URL = 'http://api.yelp.com/v2/search?term=food&location='
	,YELP_CONSUMER_KEY = '_2Ah0MhfqD-6bTRas90k-g'
	,YELP_TOKEN = 'iPD6CD5VbxITVXljAxqNFbksMf7f4z6C'
	,YELP_CONSUMER_SECRET = '4tvw4xVA9rF-ERUfxIO35I6E0Lo' 
	,YELP_TOKEN_SECRET = 'GaSqIVTr_yhTgPTnabngJCvOAy8';  
	
var yelpURL = YELP_BASE_URL + 'Ponsonby+Auckland';

var parameters = {
	oauth_consumer_key: YELP_CONSUMER_KEY,
	oauth_token: YELP_TOKEN,
	oauth_nonce: generateNonce(),
	oauth_timestamp: Math.floor(Date.now()/1000),
	oauth_signature_method: 'HMAC-SHA1',
	oauth_version : '1.0',
	callback: 'cb'              // This is crucial to include for jsonp implementation in 
                               // AJAX or else the oauth-signature will be wrong.
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
		},
		fail: function() {
			// Do stuff on fail
			console.log('AJAX request has failed :(');
		},
	};
 

		// Send AJAX request via jQuery library
		var test = $.ajax(settings);


**/

/**
// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: '_2Ah0MhfqD-6bTRas90k-g',
  consumer_secret: '4tvw4xVA9rF-ERUfxIO35I6E0Lo',
  token: 'BtWHvXNuE1nUP0afRuHL2-e6TJT90yAB',
  token_secret: 'Ef8tveoD40HEEIA4hHA0F5ihgjc',
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'food', location: 'Auckland' })
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});

// See http://www.yelp.com/developers/documentation/v2/business
yelp.business('yelp-san-francisco')
  .then(console.log)
  .catch(console.error);

yelp.phoneSearch({ phone: '+15555555555' })
  .then(console.log)
  .catch(console.error);

// A callback based API is also available:
yelp.business('yelp-san-francisco', function(err, data) {
  if (err) return console.log(error);
  console.log(data);
});	
	**/
//}(jQuery));