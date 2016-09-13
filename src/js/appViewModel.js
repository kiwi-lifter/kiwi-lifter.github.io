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
                this.JSONdata = JSON.parse(response);
				
				//Activates google map which returns modified array for use by view model.
				var data = initMap(this.JSONdata);
				
				// Activates knockout.js
				ko.applyBindings(new AppViewModel(data));
				
            });
				
}());


function AppViewModel(data) {

	var self = this;
	
	self.restaurants = ko.observableArray(data);

	self.search_Name = ko.observable('');

	self.filteredRestaurants = ko.computed(function () {
	
	var searchResult = ko.utils.arrayFilter(self.restaurants(), function (restaurant) {
		    return (
                      (self.search_Name().length == 0 || restaurant.name.toLowerCase().indexOf(self.search_Name().toLowerCase()) > -1)
                   )        
    });
		showFilteredMarkers(searchResult, self.restaurants());
	
		return searchResult;
	});

 }
