(function () {
    angular
        .module("Project")
        .controller("FollowersController", FollowersController);

    function FollowersController(UserService, MessageService, $routeParams, $location){
        var vm = this;
        vm.admin = "admin";
        vm.userID = $routeParams['uid'];
        var uid = $routeParams['uid'];
        /*vm.reviews = reviews;*/


        vm.deleteMessage = deleteMessage;
        vm.reply = reply;
        vm.sendinfo = sendinfo;


        function sendinfo(id) {
            vm.to_id = id;
        }

        function reply(message) {
            UserService
                .findUserById(vm.userID)
                .success(function (user) {
                    vm.user = user;
                    vm.sender = vm.user.username;
                    vm.sendid = vm.user._id;
                    UserService
                        .findUserById(vm.to_id)
                        .success(function (data) {
                            vm.thisuser = data;
                            var newmessage = {
                                from: vm.sender,
                                from_id: vm.sendid,
                                to: vm.thisuser.username,
                                to_id: vm.thisuser._id,
                                message: message.data
                            };
                            MessageService
                                .createMessage(vm.userID, newmessage)
                                .success(function (message) {
                                    console.log(message)
                                })
                        });
                })

        }

        function init() {
            UserService
                .findUserById(uid)
                .success(function (user) {
                    vm.user = user;
                    vm.lname = user.lastname;
                    vm.fname = user.username;
                });
            UserService
                .findUserById(vm.userID)
                .success(function (data) {
                    vm.user = data;
                    vm.name = vm.user.username;
                    MessageService
                        .findAllmessagesforId(vm.userID)
                        .success(function (messages) {
                            vm.messages = messages;
                        });
                })

        }
        init();


        function deleteMessage(mid) {
            MessageService
                .deleteMessage(mid)
                .success(function () {
                    init();
                })
        }
    }
})();