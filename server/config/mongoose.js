'use strict';

let mongoose = require('mongoose'),
    models = require('../data/models');

module.exports = function(config) {
    mongoose.connect(config.mongoLabDb);
    let db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...');
    });

    db.on('error', function(err){
        console.log('Database error: ' + err);
    });

    return{
      models:models
    };
 };