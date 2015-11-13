(function(){

'use strict';

/*
* Add Marker service
*-----------------------------------------------------
*/

angular.module('app').factory('markerService', [function(){
    
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
    .bindPopup('<fieldset class="clearfix input-pill pill mobile-cols">' +
      '<input type="text" id="name" class="col9" />' +
      '<input type="text" id="desc" class="col9" />' +
      '<button id="add-button" class="col3">Add</button></fieldset>')
      .addTo(map)
      .openPopup();
  // Every time the marker is dragged, update the form.
  marker.on('dragend', function(e) {
      marker.openPopup();

      // When the user clicks Add
      L.DomEvent.addListener(L.DomUtil.get('add-button'), 'click', addData());
  }); 
  
  var service = {
        addMarker : addMarker,
    };
    
    return service;

}]);

/*
* Firebase service
*-----------------------------------------------------
*/    

  angular.module('app').factory('dataService', ['$firebase','$q', function($firebase,$q){
    
    var firebaseRef = new Firebase("https://geotinerary1.firebaseio.com/");
    var geoFire = new GeoFire(firebaseRef);

    var getFirebaseRoot = function(){
      return firebaseRef;
    };
    
    var getGeoFireNode = function(){
      return geoFire;   
    };
    
    var getItineraryNode = function(){
      return getFirebaseRoot().child("Interary");   
    };
    
    var addData = function(data, locationData){
      // persist our data to firebase
      var ref = getItineraryNode();
      
      return  $firebase(ref).$push(data).then(function(childRef){
             addGeofireData({key: childRef.name(), latitude: locationData.latitude, longitude: locationData.longitude});
      });
    };
    
    var addGeofireData = function(data){
      var defer = $q.defer();  
      
      geoFire.set(data.key, [data.latitude, data.longitude]).then(function() {
          defer.resolve();
        }).catch(function(error) {
          defer.reject(error);
      });
      
      return defer.promise;
    };
    
    var getData = function(callback){
      var ref = getItineraryNode();
      return $firebase(ref).$asArray(); 
    };
    
            
    var service = {
        addData : addData,
        getData: getData,
        getFirebaseRoot: getFirebaseRoot,
        getGeoFireNode : getGeoFireNode
    };
    
    return service;
    
  }]);
  

})();
