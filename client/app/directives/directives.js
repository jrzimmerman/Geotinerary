(function(){

    
       
angular.module('app').controller('mapDirectiveController', ['$scope', 'dataService', function($scope, dataService){
    
        var self = this;
        self.map;
        
        self.setMarker = function(markerLocation){
            var location = markerLocation.location;
            var key = markerLocation.key;

             if (location.length==0)
                 return;

            var marker = new google.maps.Marker({
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                position: new google.maps.LatLng(location[0],location[1]),
                optimized: true,
                map: self.map
            });   
            
            
        }
    
        function initializeMap(){
            if ($scope.vm.location.latitude ==undefined)
                return;
            self.map = new google.maps.Map(self.$element[0], {
                center:new google.maps.LatLng($scope.vm.location.latitude ,$scope.vm.location.longitude),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            
            
          var geoQuery = dataService.getGeoFireNode().query({
                    center: [$scope.vm.location.latitude ,$scope.vm.location.longitude],
                    radius: 15
                });
        
            geoQuery.on("key_entered", function(key, location) {
                var item = {key:key, location:location};
                console.log('key entered on directive controller ' + key);
                self.setMarker(item);
                
            });  
        }
    
        self.init = function( element ) {
            self.$element = element;

            //only initialize map when latitude and longitude are available
            $scope.$watch(function(){return $scope.vm.location.latitude}, initializeMap);

          };
    
        
    }]);
    
angular.module('app').directive('mapDirective', mapDirective);

    function mapDirective(){
        
        return {
            restrict: 'E',
            controller:'mapDirectiveController',
            template: '<div style="height: 400px; width:400px;">This is from directive</div>',
            link: function (scope, elem, attrs, ctrl){
                
                ctrl.init(elem);
         },
            replace: true
            
        };
    }    

})();