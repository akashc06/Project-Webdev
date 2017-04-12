
module.exports = function (app, messsagemodel) {
    app.post("/api/message/:userId", createMessage);
    app.get("/api/message/user/:userId", findAllmessagesforId);
    app.delete("/api/delete/:mid", deleteMessage);
    app.delete("/api/messages/:uid",deleteMessagesforUser);
    /*app.get("/api/user/:userId/review", findAllReviews);
    app.get("/api/rest/:rid/review", findReviewsforRes);
    app.get("/api/review/:reviewId", findReviewById);
    app.put("/api/review/:reviewId", updateReview);
    app.delete("/api/review/:reviewId", deleteReview);*/

    function createMessage(req, res) {
        var userID = req.params.userId;
        var message = req.body;
        messsagemodel.createMessage(message)
            .then(function (message) {
                res.json(message);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteMessagesforUser(req, res) {
        var userID = req.params.uid;
        console.log(userID);
        messsagemodel.deleteMessagesforUser(userID)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteMessage(req, res) {
        var mid = req.params.mid;
        messsagemodel.deleteMessage(mid)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findAllmessagesforId(req, res) {
        var userID = req.params.userId;
        messsagemodel.findAllmessagesforId(userID)
            .then(function (message) {
                res.json(message);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
/*
    function findAllReviews(req, res) {
        var userId = req.params.userId;
        reviewModel.findAllReviews(userId)
            .then(function (reviews) {
                res.json(reviews);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findReviewsforRes(req, res) {
        var reviewID = req.params.rid;
        reviewModel.findReviewsforRes(reviewID)
            .then(function (reviews) {
                console.log(reviews);
                res.json(reviews);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findReviewById(req, res) {
        var ReviewId = req.params.reviewId;
        reviewModel.findReviewById(ReviewId)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateReview(req, res) {
        var reviewId = req.params.reviewId;
        var review = req.body;
        reviewModel.updateReview(reviewId, review)
            .then(function (website) {
                res.json(website);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        reviewModel.deleteReview(reviewId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    /!*function addPage(req, res) {
     var websiteId = req.params.websiteId;
     var pageId = req.params.pageId;
     WebsiteModel.addPage(websiteId, pageId)
     .then(function (website) {
     res.sendStatus(200);
     }, function (err) {
     res.sendStatus(500).send(err);
     });
     }*!/*/
};