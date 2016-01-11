'use strict';

let auth = require('./auth'),
    controllers = require('../controllers'),
    services = require('../data/data-services');

module.exports = function(app) {
    app.get('/register', controllers['users-controller'](app, services['users-data-service']).getRegister);
    app.post('/register', controllers['users-controller'](app, services['users-data-service']).postRegister);
    app.get('/login', controllers['users-controller'](app, services['users-data-service']).getLogin);
    app.post('/login', auth.login);
    app.get('/logout', auth.isAuthenticated, auth.logout);
    app.get('/all-users', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).getAllUsers);
    app.get('/profile', auth.isAuthenticated, function(req, res){
        res.render('users/profile');
    });
    app.get('/profile/:username', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).getAllUsers);
    app.post('/profile', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).updateUser);
    app.get('/profile/delete/:id', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).deleteUser);
    app.get('/admin-panel', auth.isAuthenticated, function(req, res){
        res.render('users/admin-panel');
    });
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('*', function(req, res) {
        res.redirect('/');
    });
};