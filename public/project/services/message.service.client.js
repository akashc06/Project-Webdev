(function () {
    angular
        .module("Project")
        .factory("MessageService", MessageService);

    function MessageService($http) {

        var api ={
            "createMessage" : createMessage,
            "findAllmessagesforId" : findAllmessagesforId,
            "deleteMessage" : deleteMessage,
            "deleteMessagesforUser" : deleteMessagesforUser
        };
        return api;

        function createMessage(userID,message) {
            return $http.post("/api/message/" + userID , message);
        }

        function findAllmessagesforId(userID) {
            return $http.get("/api/message/user/" + userID);
        }

        function deleteMessage(mid) {
            return $http.delete("/api/delete/" + mid);
        }

        function deleteMessagesforUser(uid) {
            return $http.delete("/api/messages/" + uid);
        }
    }

})();