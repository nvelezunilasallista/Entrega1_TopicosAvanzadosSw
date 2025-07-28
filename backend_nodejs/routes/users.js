'use strict'

var express = require('express');
var userController = require('../controllers/users');
var routes = express.Router();
var token = require('../helpers/auth');

routes.post('/api/createUser', userController.createUser);
routes.post('/api/loginUser', userController.loginUser);

module.exports = routes;
