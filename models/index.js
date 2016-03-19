'use strict';

/**
 * Connection MongoDB
 */
var settings = require('../config'),
    mongoose = require('mongoose');

mongoose.connect("mongodb://" + settings.dbconnect.user + ":" + settings.dbconnect.password + "@" + settings.dbconnect.host + ":" + settings.dbconnect.port + "/" + settings.dbconnect.base);

var db = mongoose.connection;

db.on("error", function (err) {
    console.log("Error during the connection MongoDB: ", err);
});

db.once("open", function () {
    console.log("connection established.");
});

module.exports.mongoose = mongoose;
