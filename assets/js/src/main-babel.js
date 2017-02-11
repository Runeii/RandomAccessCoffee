'use strict';

var resultContainer = document.querySelector('ul.search-results');
var statusIndicator = document.getElementById("status-indicator");
var placesService = new google.maps.places.PlacesService(document.createElement('div'));

function searchForCoffee() {
    //Style body to indicate loading
    document.body.classList.add('resultsLoading');
    updateStatus('Geolocation: Getting location...'); //Debug
    //Get user location
    getLocation(function (location) {
        updateStatus('Geolocation: Locked location. Contacting Google...');

        //Let's get results for location
        document.body.classList.add('resultsPending');
        getResults(location, function (data) {
            updateStatus('Google API: Got results');

            //Let's get additional details for each and add to page
            data.forEach(function (element) {
                getDetails(element, function (details) {
                    resultContainer.insertAdjacentHTML('beforeend', buildSearchResult(details));
                    console.log(details);
                });

                //Once complete, add class to body for styling
                if (i == Object.keys(data).length - 1) {
                    document.body.classList.add('resultsVisible');
                }
            });
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
        navigator.geolocation.getCurrentPosition(function (position) {
            var location = { lat: position.coords.latitude, lng: position.coords.longitude };
            //var location = { lat: 51.5106143, lng: -0.1317967};
            callback(location);
        });
    } else {
        console.log('Error! Browser doesn\'t support location! :(');
    }
}

function getResults(location, callback) {
    var url = 'https://api.foursquare.com/v2/venues/search?v=20170211&radius=1000&client_id=X4AF4YA42QRUWO5ERQCZOWMU5ZXGDWUUH5VGSK4FILGPAA14&client_secret=ZIGCEHQ5SOXVXAWJZLHCR2UDUN43VWIQWY4N1YUYSLDA22VM';
    var results;
    $.getJSON(url + '&intent=browse&query=coffee&ll=' + location.lat + ',' + location.lng, function (data) {
        results = data.response.venues;
        $.getJSON(url + '&intent=browse&categoryId=4bf58dd8d48988d1e0931735,56aa371be4b08b9a8d5734c1,5665c7b9498e7d8a4f2c0f06,4bf58dd8d48988d16d941735,4bf58dd8d48988d128941735,56aa371be4b08b9a8d573508&ll=' + location.lat + ',' + location.lng, function (data) {
            Object.assign(results, data.response.venues);
            console.log(results);
        });
    });
}

function getDetails(data, callback) {
    placesService.getDetails(data, callback);
}

function buildSearchResult(place) {
    var string;
    if ('opening_hours' in place && place.opening_hours.open_now === true) {
        string += '<li class="open" data-rating="' + place.rating + '">';
    } else {
        string += '<li class="closed" data-rating="' + place.rating + '">';
    }
    if ('photos' in place) {
        string += '<img src="' + place.photos[0].getUrl({ maxWidth: 400 }) + '" />';
    } else {
        string += '<img src="blank" />';
    }
    string += '<h3>' + place.name + '</h3>';
    if ('reviews' in place) {
        string += '<p>' + place.reviews[0].text + '</p>';
    } else {
        string += '<p>No reviews</p>';
    }
    if ('website' in place) {
        string += '<a href="' + place.website + '">Visit online</a></li>';
    } else {
        string += '<a href="#" class="nosite">No website</a></li>';
    }
    return string;
}

function updateStatus(message) {
    if (statusIndicator !== null) {
        statusIndicator.insertAdjacentHTML('beforeend', '<li>' + message + '</li>');
    }
}
