var resultContainer = document.querySelector('ul.search-results');
var placesService = new google.maps.places.PlacesService(document.createElement('div'));
var debug = true;

function searchForCoffee(){
    document.body.classList.add('searchStarted');
    updateStatus('Geolocation: Getting location...');
    getLocation()
    .then(function(location){

        updateStatus('Geolocation: Locked location.');
        updateStatus('Foursquare: Getting results...');

        getResultsKeyword(location)
        .then(function(results1){
            updateStatus('Foursquare: Got results 50%');
            getResultsCategory(location)
            .then(function(results2){
                updateStatus('Foursquare: Got results 100%.');
                var results = Object.assign(results1, results2);
                console.log(results);
                populateResults(results);
            })
            .catch(function(reason){
                updateStatus('Error: Unable to obtain results (Failed > 50%)');
            });
        })
        .catch(function(reason){
                updateStatus('Error: Unable to obtain results (Failed < 50%)');
        });
    })
    .catch(function(reason){
        updateStatus('Error: Browser doesn\'t support location!');
    });
}

function populateResults(results){
    document.body.classList.add('searchFinished');
    var details = [];
    updateStatus('Foursquare: Getting more details for each business');

    for (var i = 0, len = results.length; i < len; i++) {
        details.push(getBusinessDetails(results[i].id));
    }
    Promise.all(details).then(values=>{
        document.body.classList.add('searchReady');
        for (var i = 0, len = values.length; i < len; i++) {
            console.log(values[i]);
            updateStatus('Building: Result ' + (i + 1) + ' of ' + values.length);
            buildSearchResult(values[i]);
        }
    });/*
    .catch(function(reason){
        updateStatus('Error: Failed to obtain details');
    });*/
}

/*
//
// Functions
//
*/
function getLocation() {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var location = { lat: position.coords.latitude, lng: position.coords.longitude};
                resolve(location);
            });
        } else {
            reject();
        }
    });
}

var foursquareAjaxUrl = 'https://api.foursquare.com/v2/venues/search?v=20170211&radius=1000&client_id=X4AF4YA42QRUWO5ERQCZOWMU5ZXGDWUUH5VGSK4FILGPAA14&client_secret=ZIGCEHQ5SOXVXAWJZLHCR2UDUN43VWIQWY4N1YUYSLDA22VM';
function getResultsKeyword(location) {
    return new Promise((resolve, reject) => {
        $.getJSON(foursquareAjaxUrl + '&intent=browse&query=coffee&ll='+location.lat +',' + location.lng, function(data){
            resolve(data.response.venues);
        });
    });
}
function getResultsCategory(location) {
    return new Promise((resolve, reject) => {
        $.getJSON(foursquareAjaxUrl + '&intent=browse&categoryId=4bf58dd8d48988d1e0931735,56aa371be4b08b9a8d5734c1,5665c7b9498e7d8a4f2c0f06,4bf58dd8d48988d16d941735,4bf58dd8d48988d128941735,56aa371be4b08b9a8d573508&ll='+location.lat +',' + location.lng, function(data){
          resolve(data.response.venues);
        });
    });
}
function getBusinessDetails(business) {
    return new Promise((resolve, reject) => {
        $.getJSON('https://api.foursquare.com/v2/venues/'+ business + '?v=20170211&client_id=X4AF4YA42QRUWO5ERQCZOWMU5ZXGDWUUH5VGSK4FILGPAA14&client_secret=ZIGCEHQ5SOXVXAWJZLHCR2UDUN43VWIQWY4N1YUYSLDA22VM&', function(data){
          resolve(data.response.venue);
        });
    });
}

function getDetails(data, callback){
    //Let's get additional details for each and add to page
    data.forEach(function(element){
        getDetails(element,function(details){
            resultContainer.insertAdjacentHTML('beforeend', buildSearchResult(details));
            console.log(details);
        });

        //Once complete, add class to body for styling
        if(i == (Object.keys(data).length -1)) {
            document.body.classList.add('resultsVisible');
        }
    });
    placesService.getDetails(data, callback);
}

function buildSearchResult(place){
    var string = '';
    if('hours' in place) {
        if(place.hours.isOpen === true){
            string += `<li class="open" data-rating="${place.likes.count}">`;
        } else {
            string += `<li class="closed" data-rating="${place.likes.count}">`;
        }
    } else {
        string += `<li class="unconfirmed" data-rating="${place.likes.count}">`;
    }
    if('bestPhoto' in place) {
        string += `<div class="picture"><img src="${place.bestPhoto.prefix}${place.bestPhoto.width}x${place.bestPhoto.height}${place.bestPhoto.suffix}" /></div>`;
    } else {
        string += `<div class="picture noimage"></div>`;
    }
    string += `<h3>${place.name}</h3>`;
    if(place.tips.count > 1) {
        string += `<p>${place.tips.items[0].text}</p>`;
    } else {
        string += `<p>No tips</p>`;
    }
    if('url' in place) {
        string += `<a href="${place.url}">Visit online</a></li>`;
    } else {
        string += `<a href="#" class="nosite">No website</a></li>`;
    }
    resultContainer.insertAdjacentHTML('beforeend',string);
}

function updateStatus(message){
    if(debug === true) {
        var statusIndicator = document.getElementById("status-indicator");
        if(statusIndicator !== null) {
            statusIndicator.insertAdjacentHTML('afterbegin','<li>' + message + '</li>');
        }
    }
}
