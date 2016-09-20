

var data;

(function(){

function loadJSON(callback) {
                var xobj = new XMLHttpRequest();
                xobj.overrideMimeType("application/json");
                xobj.open('GET', 'js/restaurant-data.json', true);
                xobj.onreadystatechange = function() {
                    if (xobj.readyState == 4 && xobj.status == "200") {
                        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                        callback(xobj.responseText);
                    }
                };
                xobj.send(null);
            };

            loadJSON((response) => {
                // Parse JSON string into object
                data = JSON.parse(response);
				
				//Activates google map
				initMap();
				
				// Activates knockout.js
				ko.applyBindings(new AppViewModel);
				
            })
				
}());


function AppViewModel() {
	
	var self = this;
	
	self.restaurants = ko.observableArray(data.restaurants);

	self.search_Name = ko.observable('');

	// This function will loop through the filtered results and list them.
    self.showFilteredMarkers = function(filteredSearchArray, restaurantsArray) {
		
		for (var i = 0; i < restaurantsArray.length; i++) {
			restaurantsArray[i].marker.setVisible(false);
		}
		
		for (var i = 0; i < filteredSearchArray.length; i++) {
			
				filteredSearchArray[i].marker.setVisible(true);
			}
			
	};
	
	self.filteredRestaurants = ko.computed(function () {
	
	var searchResult = ko.utils.arrayFilter(self.restaurants(), function (restaurant) {
		    return (
                      (self.search_Name().length == 0 || restaurant.name.toLowerCase().indexOf(self.search_Name().toLowerCase()) > -1)
                   )        
    });
		self.showFilteredMarkers(searchResult, self.restaurants());
	
		return searchResult;
	});
	
	self.openInfowindow = function(location) {

		google.maps.event.trigger(location.marker, 'click');
    }
	
	
	
 }
