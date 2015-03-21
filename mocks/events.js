module.exports = function(app) {
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res) {
        res.send({
            'articles': [{
                "title": "Tracking travelers' phones let Cincinnati airport cut security line waits by a third",
                "description": "Going through airport security is a miserable experience, but airports are at least starting to figure out ways to get you through the line quicker. Cincinnati/Northern Kentucky International Airport says that the median wait time in its security lines has dropped by a third, going from 13.2 minutes to 8.9 minutes, after installing a system that tracks travelers' phones to estimate how much traffic each line has. The system allows the airport to display to passengers how long the wait in each of its security lines is. It also allows the airport to adjust its resources to respond to demand. Continue readingâ€¦",
                "image": "https://cdn1.vox-cdn.com/thumbor/UeooeILgrYNspwZ_jRYLAijh4Uk=/0x0:4895x3263/800x536/cdn0.vox-cdn.com/uploads/chorus_image/image/45880778/shutterstock_173131172.0.0.jpg",
                "author": "Jacob Kastrenakes",
                "link": "http://www.theverge.com/2015/3/12/8203555/cvg-airport-cut-security-times-with-phone-tracking",
                "publishedDate": 1426195996000,
                "updatedDate": 1426195996000
            }]
        });
    });

    router.post('/', function(req, res) {
        res.status(201).end();
    });

    router.get('/:id', function(req, res) {
        res.send({
            'articles': {
                id: req.params.id
            }
        });
    });

    router.put('/:id', function(req, res) {
        res.send({
            'articles': {
                id: req.params.id
            }
        });
    });

    router.delete('/:id', function(req, res) {
        res.status(204).end();
    });

    app.use('/api/articles', router);
};