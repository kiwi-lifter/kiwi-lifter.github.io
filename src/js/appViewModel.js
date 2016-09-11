var GETDATA = (function(){

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
				
				return this.JSONdata;
            });
				
}());

console.log()
function AppViewModel() {
	
	var self = this;

	self.restaurants = ko.observableArray([
		{name: "The Blue Breeze Inn", address: "146 Ponsonby Rd, Ponsonby, Auckland 1011", lat: -36.855828, lng: 174.746299},
		{name: "Ponsonby Central", address: "136/146 Ponsonby Rd, Ponsonby, Auckland 1011", lat: -36.856346, lng: 174.746439},
		{name: "Prego Restaurant", address: "226 Ponsonby Rd, Ponsonby, Auckland 1011", lat: -36.852677, lng: 174.744807},
		{name: "Mekong Baby", address: "262 Ponsonby Rd, Ponsonby, Auckland 1011", lat: -36.850767, lng: 174.744283},
		{name: "SPQR", address: "150 Ponsonby Rd, Ponsonby, Auckland 1011", lat: -36.855723, lng: 174.746135}
	]);
	
	self.search_Name = ko.observable('');

	self.filteredRestaurants = ko.computed(function () {
		
    return ko.utils.arrayFilter(self.restaurants(), function (restaurant) {
            return (
                      (self.search_Name().length == 0 || restaurant.name.toLowerCase().indexOf(self.search_Name().toLowerCase()) > -1)
                   )        
    });
	
});

	
	
	
	
 }

// Activates knockout.js
ko.applyBindings(new AppViewModel());

/**
// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebra)", price: 290 }
    ];    

    // Editable data
    self.seats = ko.observableArray([
        new SeatReservation("Steve", self.availableMeals[0]),
        new SeatReservation("Bert", self.availableMeals[0])
    ]);
}

ko.applyBindings(new ReservationsViewModel());

**/