module.exports = function (mongoose) {

    var ReviewSchema = mongoose.Schema({
        placeID: String,
        user_name: String,
        type: String,
        place: String,
        description: String,
        user: String,
        date: { type: Date, default: Date.now }
    }, {collection: 'project.reviews'});

    ReviewSchema.post('remove', function () {
     var review = this;
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
     })

    return ReviewSchema;
};