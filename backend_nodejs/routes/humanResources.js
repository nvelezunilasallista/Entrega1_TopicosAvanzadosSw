'use strict'

var express = require('express');
var humanResourcesController = require('../controllers/humanResources');
var routes = express.Router();
var token = require('../helpers/auth');

routes.post('/api/humanResources/authorizeSeller', token.validateTokenForHumanResources, humanResourcesController.authorizeSeller);
routes.get('/api/humanResources/getUnauthorizedSellers', token.validateTokenForHumanResources, humanResourcesController.getUnauthorizedSellers );

module.exports = routes;
