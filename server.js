var path = require('path');
var express = require('express');
var app = express();


// Create the GeoJSON FeatureCollection of points in which we'll store
// the additions to our itinerary.
var points = { type: 'FeatureCollection', features: [] };



app.use(express.static(path.join(__dirname, 'client')));
app.listen(process.env.PORT || 3000);