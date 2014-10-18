"use strict"

var config = require('./config.json');

var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost:27017/" + config.dbName, {native_parser: true});

var url = config.url;

console.log(url);

var request = require("request");

var getJsonData = function () {
    request({
        url: url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
//            console.log(body);

            db.collection(config.collectionName).insert(
                body, function(err, result) {
                    if (err) throw err;
//                    if (result) console.log('Added!');
                });
        }
    });
}

getJsonData();

setInterval(getJsonData, config.interval);

