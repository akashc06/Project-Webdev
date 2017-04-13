
module.exports = function (app, z) {

    app.post("/api/rest/categories/near/", findAllCategories);
    app.get("/api/rest/:restId", findRestaurantByID);
    app.post("/api/rest/places/near/", findNearByPlaces);
    app.post("/api/rest/place/name", findPlaceByName);
    app.post("/api/rest/place/city", findPlaceByCity);
    /*app.put("/api/review/:reviewId", updateReview);
    app.delete("/api/review/:reviewId", deleteReview);*/

    function findPlaceByName(req, res) {
        var obj = req.body;
        var name = obj.name;
        z
            .search({
                q: name
            })
            .then(function(data) {
                res.json(data);
            })
            .catch(function(err) {
                console.error(err);
            });
    }

    function findPlaceByCity(req, res) {
        var obj = req.body;
        var city = obj.city;
        z
            .search({
                entity_type: city,
                count: 9
            })
            .then(function(data) {
                res.json(data);
            })
            .catch(function(err) {
                console.error(err);
            });
    }


    function findAllCategories(req, res) {
        var loc = req.body;
        var lat = loc.lati;
        var lon = loc.lngi;
        z
            .search({
                lat: lat,
                lon: lon,
                count: 9
            })
            .then(function(data) {
                res.json(data);
            })
            .catch(function(err) {
                console.error(err);
            });
    }

    function findNearByPlaces(req, res) {
        var loc = req.body;
        z
            .search({
                lat: loc.latitude,
                lon: loc.longitude,
                count: 6,
                start:3
            })
            .then(function(data) {
                res.send(data);
            })
            .catch(function(err) {
                console.error(err);
            });
    }

    function findRestaurantByID(req, res) {
        var restId = req.params.restId;
        z
            .restaurant({
                res_id: restId
            })
            .then(function(data) {
                res.json(data);
            })
            .catch(function(err) {
                console.error(err);
            });

    }

    };