(function () {
    angular
        .module("Project")
        .controller("HomeController", HomeController);

    function HomeController(UserService, $location, RestService, $http, $rootScope){
        var vm = this;

        vm.city = "Boston";
        vm.tosay = "Round the globe";
        vm.login = login;
        vm.register = register;
        vm.restsearch = restsearch;
        vm.sendKey  = sendKey;
        vm.forgot =forgot;
        vm.getLocation = getLocation;

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            vm.tosay = "Around you";
            vm.Lat = position.coords.latitude;
            vm.Lon = position.coords.longitude;
            a = {lati: vm.Lat, lngi: vm.Lon};
            RestService
                .findAllCategories(a)
                .success(function (data) {
                    vm.cats = data;
                    vm.pic = vm.cats.featured_image;
                });
        }

        function forgot(user) {
            if(user.email === user.cemail){
                UserService
                    .findUserbyMail(user.email)
                    .success(function (user) {
                        if(user.length != 0){
                            $location.url("/user/" + user[0]._id);
                        }else {
                            alert("Oops! No user found")
                        }
                    })
            }else {
                alert("Emails do not match")
            }
        }

        function sendKey(name, city) {
            vm.key = name;
            vm.city = city;
        }

        function restsearch(name) {
            $location.url("/home/results/"+name);
        }


        function init() {
            getLocation();
            var city = {city: vm.city};
            RestService
                .findPlaceByCity(city)
                .success(function (data) {
                    vm.cats = data;
                    console.log(vm.cats);
                    vm.pic = vm.cats.featured_image;
                });

        }
        init();

        function register(newuser) {
            if (newuser && newuser.username && newuser.password && newuser.cpassword) {
                if (newuser.password === newuser.cpassword) {
                    UserService
                        .findUserByUsername(newuser.username)
                        .success(function (user) {
                            vm.uerror = "Username already taken";
                        })
                        .error(function () {
                            newuser.type = "admin";
                            UserService
                            .register(newuser)
                            .success(function (newUser) {
                                var user = newUser;
                                $rootScope.currentUser = newUser;
                                $location.url("/user/" + newUser._id);
                            })
                                .error(function () {
                                    vm.uerror = "User Registration Failed";
                                })
                    });
                }
                else {
                    vm.uerror = "Passowrds do not match";
                }
            }else {
                vm.uerror = "Enter Username";
            }
        }

        function login(user) {
            UserService
                .login(user)
                .then(function (response) {
                    console.log(response);
                    $rootScope.currentUser = response.data;
                    if(response) {
                        if (vm.key) {
                            $location.url("/home/" + response.data._id + "/" + vm.key);
                        }
                        else {
                            $location.url("/home/" + response.data._id);
                        }
                    }
                    else{
                            vm.error = "User not found";
                    }

                });

        }
    }
})();