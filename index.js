
const formEl = document.querySelector('form');

const ipInputEl = document.getElementById('ip-input');

const ipEl = document.getElementById('ip-info');

const locationEl = document.getElementById('location-info');

const timezoneEl = document.getElementById('timezone-info');

const ispEl = document.getElementById('isp-info');

const modal = document.getElementById('modal');

const errorMsgEl = document.getElementById('error-message');

const closeBtn = document.getElementById('close-btn');

// l.map Create a Leaflet map inside the div with id="map"
// [0, 0], 13 Latitude, Longitude. Create a map and show London at zoom 13.
const map = L.map('map').setView([0, 0], 13);


// Loads the map graphics (streets, roads, buildings and without the link the map will be blank
const tileUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2V2ZXRpaDg2MSIsImEiOiJja2h4MzFxaG8wOW5pMzBsdGZ1NXFoeHh5In0.hw5mLyF4KWalDgcxAWrmuw';


// It loads the map tiles (the images that make up the map background).
L.tileLayer(tileUrl, {

    maxZoom: 18,

    attribution: false,

    id: 'mapbox/streets-v11',

    tileSize: 512,

    zoomOffset: -1

}).addTo(map);


// insert the location icon in to the map 

const locationIcon = L.icon({

    iconUrl: 'images/icon-location.svg',

    iconSize: [35, 35],

    iconAnchor: [15, 15]

});


//  L.marker insert the marker icon in to the map 

const marker = L.marker([0, 0], {icon: locationIcon}).addTo(map);

// e.preventDefault prevent the map from refreshing and stops that default behavior
//fetch: This sends a request to the IP API to get details about the IP the user typed.
// ipInputEl.value = the value inside the input field.
//e. is created by the broswer
// renderResults() is a function — usually created by you — that 
// takes the API data and displays it on the page.
// ${ipInputEl.value} is use to fetch any API adrees

formEl.onsubmit = (e) => {

    e.preventDefault();

    fetch(`https://ipapi.co/${ipInputEl.value}/json/`)

        .then(res => res.json())

        .then(data => renderResults(data))

        .catch(error => displayError(error));

    

    e.target.reset();

}

// fetch dadt from this url 
fetch('https://ipapi.co/json/')

// return data in a json format
    .then(res => res.json())

    // thsi display the data on the screen
    .then(data => renderResults(data))


// if there is an erro it display it on the screen 
    .catch(error => displayError(error));

//renderResults(data) This function displays the IP lookup results on the screen and updates the map
function renderResults(data) {

    if (data.error) {

        throw(`${data.reason}`);

    }
    

    ipEl.textContent = data.ip;

    locationEl.textContent = `${data.city}, ${data.region}, ${data.country_name}`;

    if (data.utc_offset !== null) { 

        timezoneEl.textContent = 'UTC: ' + data.utc_offset.slice(0, 3) + ':' + data.utc_offset.slice(3);

    }

    else {

        timezoneEl.textContent = data.timezone;

    }

    ispEl.textContent = data.org;

    map.setView([data.latitude, data.longitude], 13);

    marker.setLatLng([data.latitude, data.longitude]);

    marker.bindPopup(`<b>${data.ip}</b>`).openPopup();

}


function displayError(e) {

    errorMsgEl.textContent = e;

    modal.showModal();

}


// buttton open and close

closeBtn.onclick = () => {

    modal.close();

}

 
