(function () {
    angular
        .module("Project")
        .controller("ProfileEditController", ProfileEditController);

    function ProfileEditController(UserService, $routeParams){
        var vm = this;
        vm.userID = $routeParams['uid'];
        var uid = $routeParams['uid'];


        function init() {
            var promise = UserService.findUserById(uid);
            promise.success(function (user) {
                vm.user = user;
                vm.username = vm.user.username;
            });
        }
        init();
    }
})();