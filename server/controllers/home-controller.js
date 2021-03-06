"use strict";

module.exports = function (app, carsData, reData) {
    return {
        getLast: function (req, res) {
            let data = {};
            carsData.getLast(10, function (err, cars) {
                if (err) {
                    req.session.error = 'Last cars could not be obtained: ' + err.errmsg;
                    res.redirect('/');
                    return;
                }
                data.cars = cars;
                reData.getLast(10, function (err, re) {
                    if (err) {
                        req.session.error = 'Last real estates could not be obtained: ' + err.errmsg;
                        res.redirect('/');
                        return;
                    }
                    data.re = re;

                    res.render('index', {cars: cars, re: re});
                });
            });
        }
    }
};