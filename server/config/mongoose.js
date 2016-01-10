'use strict';

let mongoose = require('mongoose'),
    UserModel = require('../data/models/User'),
    RealEstateModel = require('../data/models/RealEstate');

module.exports = function(config) {
    mongoose.connect(config.db);
    let db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...')
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });

    UserModel.init();
    RealEstateModel.init();
 };