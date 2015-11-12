L.mapbox.accessToken = 'pk.eyJ1IjoianppbW1lcm1hbiIsImEiOiJJNUp6R3lzIn0.k5J_tYDtoowIGvLx_pdwIg';

// Set default location in case the IP doesn't have one
  var lat = 40.8;
  var lon = -96.67;
  // Grab IP location from freegeoip API
  $.getJSON('https://freegeoip.net/json/', function(json) {
    if (json) {
      lat = json.latitude;
      lon = json.longitude;
    }
    // Build the map
    var map = L.mapbox.map('map', 'jzimmerman.o4hd1peb').setView([lat, lon], 10);
  });
  map.featureLayer.setGeoJSON(stores);