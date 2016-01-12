'use strict';

let Car = require('mongoose').model('Car');

module.exports = {
    create: function (car, callback) {
        Car.create(car, callback);
    },
    all: function (query, pagination, callback) {
        query = query || {};
        Car.find(query)
            //.sort(sort)
            .skip(pagination.itemsPerPage * (pagination.page - 1))
            .limit(pagination.itemsPerPage)
            .exec(function (err, cars) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, cars);
                }
            });
    },
    byId: function (carId, callback) {
        Car.findOne({_id: carId}, function (err, car) {
            if (err) {
                callback(err);
            } else {
                callback(null, car);
            }
        })
    },
    update: function (carId, newProps, callback) {
        this.all({_id: carId}, function (cars) {
            callback(cars[0].update(newProps));
        })
    },
    delete: function (carId, callback) {
        Car.find({_id: carId}).remove().exec(function (err, deletedCar) {
            if (err) {
                callback(err);
            } else {
                callback(null, deletedCar);
            }
        })
    }
};