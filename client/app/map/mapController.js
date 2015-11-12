(function(){

    'use strict';

    angular.module('app').controller('main', main);

    
    function main(geoLocationService, dataService){

        var vm =this;
        vm.includeLocation = true;
        vm.location = {};
        vm.message = "Hello from Main";
        

        init();
        
        function init(){
            
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                map.setView([position.coords.latitude, position.coords.longitude], 10);
              });
             }

            L.mapbox.accessToken = 'pk.eyJ1IjoianppbW1lcm1hbiIsImEiOiJJNUp6R3lzIn0.k5J_tYDtoowIGvLx_pdwIg';
            var map = L.mapbox.map('map', 'jzimmerman.o4hd1peb');
            
            map.featureLayer.setGeoJSON(todos);
            
            vm.message = dataService.getFirebaseRoot().toString();
            
            vm.todos = dataService.getData();
        }
        
        vm.save = function(){
            
            dataService.addData({name: vm.name|| '', text: vm.text || '', address: vm.location.address || ''}, 
                                {latitude: vm.location.latitude, longitude: vm.location.longitude});
            
        };
    }
})();