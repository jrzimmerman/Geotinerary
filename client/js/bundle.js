(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
L.mapbox.accessToken = 'pk.eyJ1IjoianppbW1lcm1hbiIsImEiOiJJNUp6R3lzIn0.k5J_tYDtoowIGvLx_pdwIg';

// Set default location in case the IP doesn't have one
  var lat = 40.8;
  var lon = -96.67;
  // Grab IP location from freegeoip API
  $.getJSON('http://freegeoip.net/json/', function(json) {
    if (json) {
      lat = json.latitude;
      lon = json.longitude;
    }
    // Build the map
    var map = L.mapbox.map('map', 'jzimmerman.o4hd1peb').setView([lat, lon], 10);
  });
},{}]},{},[1]);
