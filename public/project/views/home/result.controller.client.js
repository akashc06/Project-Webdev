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
            var key = {name: word};
            RestService
                .findPlaceByName(key)
                .success(function (data) {
                    vm.places = data;
                    $location.url("/home/"+vm.userID + "/" + word);
                })
        }

        function init() {
            RestService
                .findPlaceByName(skey)
                .success(function (data) {
                    vm.places = data;
                })
        }
        init();


    }
})();