(function () {
    angular
        .module("Project")
        .controller("HomeController", HomeController);

    function HomeController(UserService, $location, RestService, $http, $rootScope){
        var vm = this;
        vm.login = login;
        vm.register = register;
        vm.restsearch = restsearch;
        vm.sendKey  = sendKey;
        vm.forgot =forgot;

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

        function sendKey(name) {
            vm.key = name;
        }

        function restsearch(name) {
            $location.url("/home/results/"+name);
        }

        function init() {
            if (navigator.geolocation) {
                var a;
                navigator.geolocation.getCurrentPosition(function (position) {
                    vm.lat = position.coords.latitude;
                    //console.log(vm.lat);
                    vm.long = position.coords.longitude;
                    a = {lati: vm.lat, lngi: vm.long};
                    RestService
                        .findAllCategories(a)
                        .success(function (data) {
                            vm.cats = data;
                            vm.pic = vm.cats.featured_image;
                        });


                });
            }
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
                            newuser.type = "user";
                            UserService
                            .register(newuser)
                            .success(function (newUser) {
                                var user = newUser;
                                $rootScope.currentUser = user;
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
                    if(response){
                        user = response.data;
                        if(user[0]){
                            $rootScope.currentUser = user[0];
                            $location.url("/user/" + user[0]._id);
                        }
                        else{
                            vm.error = "User not found";
                        }
                    }

                });

        }
    }
})();