/**
 * @description Generates google map with markers, listener events  and infowindow populated
 * with Yelp request info.
 * @param {Object} restaurants info - Address, coordinates, name etc of restaurants from JSON file.
 *
 **/

function initMap(targetData) {
console.log('target data' + targetData.length);
    var map;
    // map styles
    var styles = [{
        'featureType': 'all',
        'elementType': 'all',
        'stylers': [{
            'saturation': -100
        }, {
            'gamma': 0.5
        }]
    }]; // StyleMapType object
    var styledMap = new google.maps.StyledMapType(styles, {
        name: 'Restaurants'
    });

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

    // Use restaurant info from data variable for markers.
    var locations = targetData.restaurants,
        marker, largeInfowindow = new google.maps.InfoWindow(),
        bounds = new google.maps.LatLngBounds(),
        j, position, title, markerImage;




    // Generate map markers.
    for (j = 0; j < locations.length; j++) {

        position = locations[j].location;
        title = locations[j].name;

        markerImage = {
            url: 'resources/images/marker-orange.png',
            scaledSize: new google.maps.Size(35, 35) // scaled size
        };


        marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: j,
            icon: markerImage
        });
        // Add the marker object to the restaurant properties in the locations array.
        locations[j].marker = marker;

        bounds.extend(locations[j].marker.position);
    }

    var i, yelpRequest,

        /**
         * @description contains an ajax request to the Yelp api for each restaurant in locations[].
         * @param {Number} i - passed in with its value at this point in the for loop, used for referencing the right
         * restaurant in the array for the Yelp request result to be attached to.
         **/
        makeRequest = function(i) {

            $.ajax(yelpRequest)
                .done(function(results) {

                    // Yelp info object is made a property of the restaurant marker object.
                    locations[i].marker.yelpInfo = results;

                    // Create an onclick event to add an animation and open an infowindow at each marker.
                    locations[i].marker.addListener('click', function() {

                        populateInfoWindow(this, largeInfowindow);
                        markerBounce(this);
                    });

                })
                .fail(function() {
                    $('#danger').show();

                });

        };

    // Generate Yelp requests.
    for (i = 0; i < locations.length; i++) {

        // Create a Yelp request...
        yelpRequest = getYelpInfo(locations[i]);

        // and send it...
        makeRequest(i);

    } // End for loop.


    // Extend the boundaries of the map for each marker.
    map.fitBounds(bounds);
	// Keep markers centered.
	window.onresize = function() {
		map.fitBounds(bounds);
	}


}

/**
 * @description Toggles the map marker on click animaition
 * @param {Object} google marker - The map marker for a restaruant.
 **/
function markerBounce(marker) {

    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        marker.setAnimation(null);
    }, 1400);

}

/**
 * @description Populates the infowindow with HTML amd Yelp restaurant information.
 * @param {Object} google marker - The map marker for a restaruant.
 * @param {Object} google infowindow - Infomation for the respective restaurant.
 **/
function populateInfoWindow(marker, infowindow) {

    // Check to make sure the infowindow is not already opened on this marker.

    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div class="marker-info-panel"><h4>' + marker.yelpInfo.name + '</h4><p>' + marker.yelpInfo.location.address[0] +
            '</p><a href="' + marker.yelpInfo.mobile_url + '" target="_blank"><img src="' + marker.yelpInfo.image_url +
            '" alt="Yelp restaurant image." ></a><p>Ph: ' + marker.yelpInfo.display_phone + '</p></div>');
        infowindow.open(map, marker);
        // Clear marker property when the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}



/**
 * @description Generate random number for Yelp request.
 **/
function generateNonce() {
    return (Math.floor(Math.random() * 1e12).toString());
}

/**
 * @description Function creates a Yelp API request.
 * @param {Object} restaurant
 * @param {handleYelpResults} callback - Handles the successful Yelp request results.
 * @returns {object} - Yelp request setting for the respective restaurant.
 **/
function getYelpInfo(target) {

    var YELP_BASE_URL = '' + target.web + '',
        YELP_CONSUMER_KEY = '_2Ah0MhfqD-6bTRas90k-g',
        YELP_TOKEN = 'iPD6CD5VbxITVXljAxqNFbksMf7f4z6C',
        YELP_CONSUMER_SECRET = '4tvw4xVA9rF-ERUfxIO35I6E0Lo',
        YELP_TOKEN_SECRET = 'GaSqIVTr_yhTgPTnabngJCvOAy8';


    var yelpURL = YELP_BASE_URL;

    var parameters = {
        oauth_consumer_key: YELP_CONSUMER_KEY,
        oauth_token: YELP_TOKEN,
        oauth_nonce: generateNonce(),
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0',
        callback: 'cb',
        location: yelpURL
    };

    var encodedSignature = oauthSignature.generate('GET', yelpURL, parameters, YELP_CONSUMER_SECRET, YELP_TOKEN_SECRET);
    parameters.oauth_signature = encodedSignature;

    var settings = {
        url: yelpURL,
        data: parameters,
        cache: true,
        dataType: 'jsonp'

    };

    return settings;

}
