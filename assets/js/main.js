var resultContainer = document.querySelector('ul.search-results');
var statusIndicator = document.getElementById("status-indicator");
placesService = new google.maps.places.PlacesService(document.createElement('div'));

function searchForCoffee(){
    document.body.classList.add('resultsLoading');
    updateStatus('Geolocation: Getting location...');
    getLocation(function(location){
        updateStatus('Geolocation: Locked location. Contacting Google...');
        document.body.classList.add('resultsPending');
        getResults(location, function(data){
            updateStatus('Google API: Got results');
            for(let i of Object.keys(data)) {
                getDetails(data[i],function(details){
                    resultContainer.insertAdjacentHTML('beforeend', buildSearchResult(details));
                    console.log(details);
                });
                if(i == (Object.keys(data).length -1)) {
                    document.body.classList.add('resultsVisible');
                }
            }
        });
    });
}

/*
//
// Functions
//
*/
function getLocation(callback) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var location = { lat: position.coords.latitude, lng: position.coords.longitude};
            //var location = { lat: 51.5106143, lng: -0.1317967};
            callback(location);
        });
    } else {
      console.log('Error! Browser doesn\'t support location! :(');
    }
}

function getResults(location, callback){
    var keyword_request = {
        location: location,
        radius: '1000',
        keyword: "(coffee) OR (cafe) OR (breakfast) OR (tea)",
        rankby: 'distance',
    };

    placesService.nearbySearch(keyword_request, function(data){
        callback(data);
    });
}

function getDetails(data, callback){
    placesService.getDetails(data, callback);
}

function buildSearchResult(place){
    if('opening_hours' in place && place.opening_hours.open_now == true){
        var string = `<li class="open" data-rating="${place.rating}">`;
    } else {
        var string = `<li class="closed" data-rating="${place.rating}">`;
    }
    if('photos' in place) {
        string += `<img src="${place.photos[0].getUrl({maxWidth : 400})}" />`;
    } else {
        string += `<img src="blank" />`;
    }
    string += `<h3>${place.name}</h3>`;
    if('reviews' in place) {
        string += `<p>${place.reviews[0].text}</p>`;
    } else {
        string += `<p>No reviews</p>`;
    }
    if('website' in place) {
        string += `<a href="${place.website}">Visit online</a></li>`;
    } else {
        string += `<a href="#" class="nosite">No website</a></li>`;
    }
    return string;
}

function updateStatus(message){
    if(statusIndicator !== null) {
        statusIndicator.insertAdjacentHTML('beforeend', '<li>' + message + '</li>');
    }
}
