(function () {
    angular
        .module("Project")
        .factory("RestService", RestService);

    function RestService($http) {

        var api ={
            "findAllCategories" : findAllCategories,
            "findRestaurantByID" : findRestaurantByID,
            "findNearByPlaces" : findNearByPlaces,
            "getCity": getCity,
            "findPlaceByName" : findPlaceByName,
            "findPlaceByCity" : findPlaceByCity,
            "getLocation" : getLocation
        };
        return api;


        function getCity() {
            return $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCJ4jJtIKeqWa8eUl2ShjKyWTz2B57uWPU");
        }

        function findAllCategories(a) {
            return $http.post("/api/rest/categories/near/", a);
        }

        function findRestaurantByID(restId) {
            return $http.get("/api/rest/" + restId);
        }

        function findNearByPlaces(lat, lon) {
            var loc = {"latitude": lat,
            "longitude": lon};
            return $http.post("/api/rest/places/near/", loc);
        }

        function findPlaceByName(name) {
            return $http.post("/api/rest/place/name",name);
        }

        function findPlaceByCity(city) {
            return $http.post("/api/rest/place/city",city);
        }

        function getLocation(loc) {
            return $http.get("https://maps.googleapis.com/maps/api/geocode/json?address=mysore&key=AIzaSyC89pv2EHlwGL9eio5DFM_FMRIhoLz9s8Q");
            //return $http.post("/api/rest/location",loc);
        }

    }

})();