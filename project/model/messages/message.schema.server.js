module.exports = function (mongoose) {

    var MessageSchema = mongoose.Schema({
        from: String,
        from_id: String,
        message: String,
        to: String,
        to_id: String,
        date: { type: Date, default: Date.now }
    }, {collection: 'project.messages'});

    /*UserSchema.post('remove', function () {
     var user = this;
     var websiteModel = require('../website/website.model.server');
     var PageModel = require('../page/page.model.server');
     var widgetModel = require('../widget/widget.model.server');
     PageModel.find({_website: {$in: user.websites}}, '_id', function (err, pages) {
     if(err == null) {
     widgetModel.remove({_page: {$in: pages}}).exec();
     PageModel.remove({_id: {$in: pages}}).exec();
     }
     });
     websiteModel.remove({_id: {$in: user.websites}}).exec();
     })*/

    return MessageSchema;
};