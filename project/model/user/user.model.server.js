module.exports = function (mongoose, q) {

    var UserSchema = require('./user.schema.server')(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);
    //mongoose.Promise = q.Promise;
    var q = require("q");

    UserModel.createUser = createUser;
    UserModel.findUserById = findUserById;
    UserModel.findUserByUsername = findUserByUsername;
    UserModel.findUserByCredentials = findUserByCredentials;
    UserModel.updateUser =  updateUser;
    UserModel.deleteUser = deleteUser;


    module.exports = UserModel;

    var api ={
        "createUser" : createUser,
        "findUserById" : findUserById,
        "findUserByUsername" : findUserByUsername,
        "findUserByCredentials" : findUserByCredentials,
        "findUserByGoogleId" : findUserByGoogleId,
        "updateUser" : updateUser,
        "deleteUser" : deleteUser,
        "addReview" : addReview,
        "findAllusers" : findAllusers,
        "addFollowing" : addFollowing,
        "addFollower" : addFollower,
        "findUserbytype" : findUserbytype,
        "findUserbyMail" : findUserbyMail,
        "findUserByFacebookId" : findUserByFacebookId
    };
    return api;

    function findUserByFacebookId(facebookId) {
        //return User.findOne({'facebook.id': facebookId});
        var deferred = q.defer();

        UserModel.findOne({'facebook.id': facebookId}, function (err, user) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByGoogleId(googleId) {
        return UserModel.findOne({"google.id": googleId })
    }

    function findUserbytype(type) {
        return UserModel.find({type: type})
    }

    function findUserbyMail(mail) {
        return UserModel.find({email: mail})
    }

    function findAllusers() {
        return UserModel.find()
    }

    function createUser(user) {
        return UserModel.create(user)
    }

    function findUserById(userId) {
        return UserModel.findById(userId)
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel.find({username: username}, function (err, user) {
            if(err){
                deferred.reject(err);
            }
            else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        return UserModel.find({$and: [{username: username}, {password: password}]})
                }

    function updateUser(user) {
        var deferred = q.defer();
        UserModel.update(
            { _id : user.id },
            {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone
            }, function (err, user) {
                if(err){
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.findByIdAndRemove({_id: userId}, function (err, user) {
            if(err){
                deferred.reject(err);
            }
            else {
                user.remove();
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function addReview(userId, ReviewID) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, user) {
            if(err){
                deferred.reject(err);
            }
            else {
                user.reviews.push(ReviewID);
                user.save();
                deferred.resolve();
            }
        });
        return deferred.promise;
    }

    function addFollowing(userId, folloId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, user) {
            if(err){
                deferred.reject(err);
            }
            else {
                user.following.push(folloId);
                user.save();
                deferred.resolve();
            }
        });
        return deferred.promise;
    }

    function addFollower(userId, folloId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, user) {
            if(err){
                deferred.reject(err);
            }
            else {
                user.followers.push(folloId);
                user.save();
                deferred.resolve();
            }
        });
        return deferred.promise;
    }

};
