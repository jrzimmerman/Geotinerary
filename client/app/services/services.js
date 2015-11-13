(function(){

'use strict';


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

