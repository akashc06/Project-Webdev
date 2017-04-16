module.exports = function (mongoose) {

    var UserSchema = mongoose.Schema({
        username: {type: String},
        password: String,
        firstname: String,
        lastname: String,
        email: String,
        phone: String,
        type: String,
        google: {
            id:    String,
            token: String
        },
        facebook: {
            id:    String,
            token: String
        },
        dateCreated: { type: Date, default: Date.now }
    }, {collection: 'project.user'});

    /*UserSchema.post('remove', function () {
        var user = this;
        var reviewModel = require('../review/review.model.server');
        reviewModel.find({user: {$in: user.reviews}}, '_id', function (err, pages) {
            if(err == null) {
            }
        });
    });
*/
    return UserSchema;
};