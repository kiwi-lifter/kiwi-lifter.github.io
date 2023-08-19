/**
 * @description  makes jQuery ajax XMLHttpRequest to a JSON formatted js file, calls a google map initialise function,
 * and instantiates a knockout object.
 **/

var runApp = function() {

	// this var holds the restaurants data from the JSON file
	var restaurantInfo;

    var result = $.ajax('resources/data/restaurant-data.json')
        .done(function() {
            restaurantInfo = result.responseJSON;
        })
        .fail(function() {
            restaurantInfo = "";
        })
        .always(function() {
			// Check if restuarant data is there.
            if (restaurantInfo) {
				// Check that google map object is there.
				if (typeof google === 'object' && typeof google.maps === 'object') {
					// Activate google map and pass the restaruant data as a param.
					 initMap(restaurantInfo);

					// Activate knockout.js.
					ko.applyBindings(new AppViewModel());
				}
				else {
					$('#danger').show();
				}

            } else {
                $('#danger').show();
            }
        });

    /**
     * @description Knockout view model.
     **/
    function AppViewModel() {

        var self = this;

        self.restaurants = ko.observableArray(restaurantInfo.restaurants);

        self.searchName = ko.observable('');

        /**
         * @description setVisible only restaurant markers that are returned in the search result.
         * @param {Object[]} search result
         * @param {Object[]} full restaurant list
         **/
        self.showFilteredMarkers = function(filteredSearchArray, restaurantsArray) {

            for (var i = 0; i < restaurantsArray.length; i++) {
                restaurantsArray[i].marker.setVisible(false);
            }

            for (var j = 0; j < filteredSearchArray.length; j++) {

                filteredSearchArray[j].marker.setVisible(true);
            }

        };

        /**
         * @description Calculates and returns the result of a restaurant search and calls a
         * function to update the markers to reflect the search results.
         **/
        self.filteredRestaurants = ko.computed(function() {

            var searchResult = ko.utils.arrayFilter(self.restaurants(), function(restaurant) {
                return (
                    (self.searchName().length === 0 || restaurant.name.toLowerCase().indexOf(self.searchName().toLowerCase()) > -1)
                );
            });
            self.showFilteredMarkers(searchResult, self.restaurants());

            return searchResult;
        });

        /**
         * @description Invoke the listener event on the respective google map marker when a restaurant list item is clicked.
         * @param {object} restaurant
         **/
        self.openInfowindow = function(location) {

            google.maps.event.trigger(location.marker, 'click');
        };


    }

};

/**
 * @description  Displays warning message if the google map api fails to load.
 **/
var googleMapFail = function(){
	console.log('dispaly html error message');
	$('#danger').show();
}
