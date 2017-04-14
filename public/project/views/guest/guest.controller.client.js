(function () {
    angular
        .module("Project")
        .controller("GuestController", GuestController);

    function GuestController($location, RestService, UserService, $routeParams, $rootScope, $http){
        var vm = this;
        var initkey = $routeParams['key'];
        var key = {name: vm.search};

        vm.login = login;
        vm.searchplace = searchplace;


        function login(user) {
            UserService
                .login(user)
                .then(function (response) {
                    if (response) {
                        $rootScope.currentUser = response.data;
                        user = response.data;
                        console.log(user);
                        if (response) {
                            user = response.data;
                            if (user) {
                                if (initkey) {
                                    $location.url("/home/" + user._id + "/" + initkey);
                                }
                                else {
                                    $location.url("/home/" + user._id);
                                }
                            }
                            else {
                                vm.error = "User not found";
                            }
                        }
                    }
                })
                    .catch(function (err) {
                        vm.error = "Invalid Username/Password";
                    })
        }




        function searchplace(word) {
            jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU",
                function(success) {
                    vm.latitude= success.location.lat;
                        vm.long= success.location.lng;
                        var obj = {name: word,
                        lat:vm.latitude,
                        lon:vm.long};
                    RestService
                        .findPlaceByName(obj)
                        .success(function (data) {
                            vm.places = data;
                            $location.url("/home/guest/"+word+ "/search");
                        })
            })
                .fail(function(err) {
                    alert("API Geolocation error! \n\n"+err);
                });

        }


        var apiGeolocationSuccess = function(position) {
            vm.Lat = position.coords.latitude;
            vm.Lon = position.coords.longitude;
            a = {name:initkey,
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
            tryAPIGeolocation();
        }
        init();


    }
})();