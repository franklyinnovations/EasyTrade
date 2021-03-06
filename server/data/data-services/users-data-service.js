'use strict';

let User = require('mongoose').model('User');

module.exports = {
    create: function (user, callback) {
        User.create(user, callback);
    },
    all: function (query, callback) {
        query = query || {};
        User.find(query, 'username firstName lastName email age role', function (err, users) {
            if (err) {
                callback(err);
            } else {
                callback(null, users);
            }
        });
    },
    one: function (query, callback) {
        query = query || {};
        User.findOne(query, function (err, user) {
            if (err) {
                callback(err);
            } else {
                callback(null, user);
            }
        });
    },
    update: function (username, newProps, callback) {
        let updateProps = {$set: newProps};
        User.findOneAndUpdate({username: username}, updateProps, function (err, user) {
            if (err) {
                callback(err);
            } else {
                callback(null, user);
            }
        });
    },
    delete: function (username, callback) {
        User.remove({username: username}, function (err) {
            if (err) {
                callback(err);
            }
            callback();
        });
    }
};