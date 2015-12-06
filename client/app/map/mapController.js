(function() {

  'use strict';

  angular.module('app').controller('main', main);


  function main(dataService) {

    var vm = this;
    vm.includeLocation = true;
    vm.location = {};
    vm.name = 'testing';

    vm.save = function() {

      dataService.addData({
        name: vm.name || 'Test Todo',
        text: vm.text || 'Testing Todos',
        address: vm.location.address || '101 Test St'
      }, {
        latitude: vm.location.latitude || 40.00868343656941,
        longitude: vm.location.longitude || -79.07890319824219
      });

    };

    vm.addMarker = function() {
      // Generate a random color for the marker, just for fun.
      var color = '#' + [
        (~~(Math.random() * 16)).toString(16), (~~(Math.random() * 16)).toString(16), (~~(Math.random() * 16)).toString(16)
      ].join('');

      var marker = L.marker([lat, lon], {
          draggable: true,
          icon: L.mapbox.marker.icon({
              'marker-color': color
            })
            // Add a form to that marker that lets them specify a message and click Add
            // to add the data.
        })
        .bindPopup('<fieldset class="clearfix input-pill pill mobile-cols"><input type="text" id="vm.text" class="col9" /><button id="add-button" class="col3">Add</button></fieldset>')
        .addTo(map)
        .openPopup();
      // Every time the marker is dragged, update the form.
      marker.on('dragend', function(e) {
        marker.openPopup();

        // When the user clicks Add
        L.DomEvent.addListener(L.DomUtil.get('add-button'), 'click', vm.save);
      });
    };

    init();

    function init() {
      // HTML 5 Geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          map.setView([position.coords.latitude, position.coords.longitude], 10);
        });
      }
      // Mapbox utils
      L.mapbox.accessToken = 'pk.eyJ1IjoianppbW1lcm1hbiIsImEiOiJJNUp6R3lzIn0.k5J_tYDtoowIGvLx_pdwIg';
      var map = L.mapbox.map('map', 'jzimmerman.o4hd1peb');

      vm.searchMap = function(input) {
        var geocoder = L.mapbox.geocoder('mapbox.places');
        geocoder.query(input, showMap);

        // work on point an area and location
        function showMap(err, data) {
          // if area, fit to bounds
          if (data.lbounds) {
            map.fitBounds(data.lbounds);
          } else if (data.latlng) {
            // otherwise zoom to location
            map.setView([data.latlng[0], data.latlng[1]], 13);
          }
        }
      };

      vm.todos = dataService.getData();
      console.log(vm.todos);

      // var firebaseRef = new Firebase("https://geotinerary1.firebaseio.com/");
      // var geoFire = new GeoFire(firebaseRef);
      // Connect to the example firebase. This is a free account, and so it
      // will fail if given more than 50 concurrent users. Create an account at
      // http://firebaseio.com/ and use your own database if you want to try out
      // this example.


      // Generate a random color for the marker, just for fun.
      var color = '#' + [
        (~~(Math.random() * 16)).toString(16), (~~(Math.random() * 16)).toString(16), (~~(Math.random() * 16)).toString(16)
      ].join('');

      var marker = L.marker([vm.lat || 40.00868343656941, vm.lon || -79.07890319824219], {
          draggable: true,
          icon: L.mapbox.marker.icon({
              'marker-color': color
            })
            // Add a form to that marker that lets them specify a message and click Add
            // to add the data.
        })
        .bindPopup('<fieldset class="clearfix input-pill pill mobile-cols"><input type="text" id="message" class="col9" /><button id="add-button" class="col3">Add</button></fieldset>')
        .addTo(map)
        .openPopup();

      // Every time the marker is dragged, update the form.
      marker.on('dragend', function(e) {
        marker.openPopup();
        // When the user clicks Add
        L.DomEvent.addListener(L.DomUtil.get('add-button'), 'click', vm.save);
      });

    }
  }
})();
