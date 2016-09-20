
// global variable for collecting asynchronous request info
var data;

/**
* @description An IIFE: makes XMLHttpRequest to a JSON formatted js file, a google map initialise function, 
* and instantiates a knockout object.
 **/

(function(){

/**
* @description Makes an XMLHttpRequest to a JSON file.
* @param {anonymous function} callback - Handles the returned request data.
 **/
function loadJSON(callback) {
                var xobj = new XMLHttpRequest();
                xobj.overrideMimeType("application/json");
                xobj.open('GET', 'js/restaurant-data.json', true);
                xobj.onreadystatechange = function() {
                    if (xobj.readyState == 4 && xobj.status == "200") {
                         callback(xobj.responseText);
                    }
                };
                xobj.send(null);
            };

			// Invoke XMLHttpRequest and pass in a callback function for parsing and assigning response to global var data.
            loadJSON((response) => {
                // Parse JSON string into object
                data = JSON.parse(response);
				
				// Activate google map.
				initMap();
				
				// Activat knockout.js.
				ko.applyBindings(new AppViewModel);
				
            })
				
}());

/**
* @description Knockout view model.
 **/
function AppViewModel() {
	
	var self = this;
	
	self.restaurants = ko.observableArray(data.restaurants);

	self.search_Name = ko.observable('');
	
	
/**
* @description setVisible only restaurant markers that are returned in the search result.
* @param {Object[]} search result
* @param {Object[]} full restaurant list
 **/
    self.showFilteredMarkers = function(filteredSearchArray, restaurantsArray) {
		
		for (var i = 0; i < restaurantsArray.length; i++) {
			restaurantsArray[i].marker.setVisible(false);
		}
		
		for (var i = 0; i < filteredSearchArray.length; i++) {
			
				filteredSearchArray[i].marker.setVisible(true);
			}
			
	};
	
/**
* @description Calculates and returns the result of a restaurant search and calls a 
* function to update the markers to reflect the search results.
 **/
	self.filteredRestaurants = ko.computed(function () {
	
	var searchResult = ko.utils.arrayFilter(self.restaurants(), function (restaurant) {
		    return (
                      (self.search_Name().length == 0 || restaurant.name.toLowerCase().indexOf(self.search_Name().toLowerCase()) > -1)
                   )        
    });
		self.showFilteredMarkers(searchResult, self.restaurants());
	
		return searchResult;
	});
	
/**
* @description Invoke the listener event on the repective google map marker when a restaurant list item is clicked.
* @param {object} restaurant 
 **/
	self.openInfowindow = function(location) {

		google.maps.event.trigger(location.marker, 'click');
    }
	
 }
