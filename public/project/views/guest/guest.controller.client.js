(function () {
    angular
        .module("Project")
        .controller("GuestController", GuestController);

    function GuestController($location, RestService, UserService, $routeParams, $rootScope, $http){
        var vm = this;
        var initkey = $routeParams['key'];
        var nk = {name: initkey};
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




        function searchplace(word, city) {
            var key = {name: word, city: city};
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                console.log(latitude + "  " + longitude);
            });


            RestService
                .getLocation(key)
                .success(function (locatio) {
                    console.log(locatio.results[0].geometry.location)
                });
            RestService
                .findPlaceByName(key)
                .success(function (data) {
                    vm.places = data;
                    $location.url("/home/guest/"+word+ "/search");
                })
        }

        function init() {
            RestService
                .findPlaceByName(nk)
                .success(function (data) {
                    vm.places = data;
                    console.log(vm.places)
                })
        }
        init();


    }
})();