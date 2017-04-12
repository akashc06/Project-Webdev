(function () {
    angular
        .module("Project")
        .controller("GuestController", GuestController);

    function GuestController($location, RestService, UserService, $routeParams){
        var vm = this;
        var initkey = $routeParams['key'];
        var nk = {name: initkey};
        var key = {name: vm.search};

        vm.login = login;
        vm.searchplace = searchplace;

        function login(user) {
            if(user && user.username && user.password){
                UserService
                    .findUserByCredentials(user.username, user.password)
                    .then(function (response) {
                        if(response){
                            user = response.data;
                            if(user[0]){
                                if(initkey){
                                    $location.url("/home/" + user[0]._id + "/" + initkey);
                                }
                                else {
                                    $location.url("/home/" + user[0]._id);
                                }
                            }
                            else{
                                vm.error = "User not found";
                            }
                        }

                    })
                    .catch(function (err) {
                        vm.error = "Invalid Username/Password";
                    })
            }
        }


        function searchplace(word) {
            var key = {name: word};
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