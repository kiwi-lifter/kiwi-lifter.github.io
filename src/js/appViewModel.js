// global variable for collecting asynchronous request info
var appData;

/**
* @description An IIFE: makes jQuery ajax XMLHttpRequest to a JSON formatted js file, calls a google map initialise function, 
* and instantiates a knockout object.
 **/

( function(){
	
var jqxhr = $.ajax( "js/restaurant-data.json" )
  .done(function() {
	appData = jqxhr.responseJSON;
		
  })
  .fail(function() {
	appData = "";
  })
  .always(function() {
	  
	if(appData){
		
		// Activate google map.
	initMap();
	
	// Activat knockout.js.
	ko.applyBindings(new AppViewModel);
	}
	else {
		$('#danger').show();
	}
	 });
 
/**
* @description Knockout view model.
 **/
function AppViewModel() {
	
	var self = this;
	
	self.restaurants = ko.observableArray(appData.restaurants);

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
 
 }());
