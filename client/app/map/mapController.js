(function(){

    'use strict';

    angular.module('app').controller('main', main);

    
    function main(dataService){

        var vm =this;
        vm.includeLocation = true;
        vm.location = {};
        vm.message = "Hello from Main";
        vm.name = 'testing';
        vm.lat = 40.00868343656941;
        vm.lon = -79.07890319824219;

        
        

        init();
        
        function init(){
            // HTML 5 Geolocation
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                map.setView([position.coords.latitude, position.coords.longitude], 10);
                vm.lat = position.coords.latitude;
                vm.lon = position.coords.longitude;
              });
             }
            // Mapbox utils
            L.mapbox.accessToken = 'pk.eyJ1IjoianppbW1lcm1hbiIsImEiOiJJNUp6R3lzIn0.k5J_tYDtoowIGvLx_pdwIg';
            var map = L.mapbox.map('map', 'jzimmerman.o4hd1peb');
            
            // Dummy Test data
            map.featureLayer.setGeoJSON(todos);

            // Wire up geoFire
            ////////////////////////////////////////

            // vm.message = dataService.getFirebaseRoot().toString();
            // console.log(vm.message);
            
            // vm.todos = dataService.getData();

            var firebaseRef = new Firebase("https://geotinerary1.firebaseio.com/");
            var geoFire = new GeoFire(firebaseRef);
            // Connect to the example firebase. This is a free account, and so it
            // will fail if given more than 50 concurrent users. Create an account at
            // http://firebaseio.com/ and use your own database if you want to try out
            // this example.

            
            // Create the marker that the user drags to add their message to the map
            
            // // With a cap of 200, listen for new markers being added to the map.
            // geoFire.limit(200).on('child_added', function(snapshot) {
            //     // And for each new marker, add a featureLayer.
            //     L.mapbox.featureLayer(snapshot.val())
            //         .eachLayer(function(l) {
            //             // Which positions markers below the marker you drag, so that
            //             // they don't overlap in the z-index.
            //             l.setZIndexOffset(-1000);
            //             // And each marker should have a label with its title.
            //             var geojson = l.toGeoJSON();
            //             if (geojson && geojson.properties && geojson.properties.title) {
            //                 l.bindLabel(L.mapbox.sanitize(geojson.properties.title), {
            //                     noHide: true
            //                 });
            //             }
            //         })
            //         .addTo(map);
            // });
        /////////////////////////////////////////////

        }

        vm.addMarker = function(){
            // Generate a random color for the marker, just for fun.
            var color = '#' + [
              (~~(Math.random() * 16)).toString(16),
              (~~(Math.random() * 16)).toString(16),
              (~~(Math.random() * 16)).toString(16)].join('');

            var marker = L.marker([vm.lat, vm.lon], {
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
                L.DomEvent.addListener(L.DomUtil.get('add-button'), 'click', vm.addMarker);
            });            
        };

        vm.save = function(){
            
            dataService.addData({name: vm.text|| 'test ', text: vm.text || 'test', address: vm.location.address || '101 test st'}, 
                                {latitude: vm.lat|| 40.00868343656941 , longitude: vm.lon|| -79.07890319824219});
            
        };
  }
})();