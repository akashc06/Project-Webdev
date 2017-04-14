(function () {
    angular
        .module("Project")
        .controller("ResultController", ResultController);

    function ResultController($location, RestService, $routeParams, UserService, $rootScope){
        var vm = this;
        vm.search = $routeParams['word'];
        vm.userID = $routeParams['uid'];
        var skey = {name: vm.search};
        vm.searchplace = searchplace;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/");
                });
        }


        function searchplace(word) {
            var latLong;
            $.getJSON("http://ipinfo.io", function (ipinfo) {
                //console.log("Found location ["+ipinfo.loc+"] by ipinfo.io");
                latLong = ipinfo.loc.split(",");
                vm.lat = latLong[0];
                vm.lon = latLong[1];
                var obj = {
                    name: word,
                    lat: vm.lat,
                    lon: vm.lon
                };
                RestService
                    .findPlaceByName(obj)
                    .success(function (data) {
                        vm.places = data;
                        $location.url("/home/guest/" + word + "/search");
                    })
            })

        }
        var apiGeolocationSuccess = function(position) {
            vm.Lat = position.coords.latitude;
            vm.Lon = position.coords.longitude;
            a = {name:vm.search,
                lat: vm.Lat, lon: vm.Lon};
            RestService
                .findPlaceByName(a)
                .success(function (data) {
                    if(data.length == 0) {
                        vm.display = "Please enable location services";
                    }else {
                        vm.places = data;
                        vm.pic = vm.places.featured_image;
                    }
                });

        };

        var tryAPIGeolocation = function() {
            jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU",
                function(success) {
                    apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
                })
                .fail(function(err) {
                    alert("API Geolocation error! \n\n"+err);
                });
        };

        function init() {
            var latLong;
            $.getJSON("http://ipinfo.io", function(ipinfo){
                //console.log("Found location ["+ipinfo.loc+"] by ipinfo.io");
                latLong = ipinfo.loc.split(",");
                vm.lat = latLong[0];
                vm.lon = latLong[1];
                a = {lati: vm.lat, lngi: vm.lon};
                RestService
                    .findPlaceByName(a)
                    .success(function (data) {
                        if(data.length == 0) {
                            vm.display = "Please enable location services";
                        }else {
                            vm.places = data;
                            vm.pic = vm.places.featured_image;
                        }
                    });
            });/*
             if (navigator.geolocation) {
             navigator.geolocation.getCurrentPosition(showPosition);
             }
             function showPosition(position) {
             vm.Lat = position.coords.latitude;
             vm.Lon = position.coords.longitude;
             var nkey = {"name": null,
             "lat" : vm.Lat,
             "lon" : vm.Lon};
             RestService
             .findPlaceByName(nkey)
             .success(function (data) {
             vm.places = data;
             })
             }*/

        }
        init();


    }
})();