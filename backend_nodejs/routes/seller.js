'use strict'

var express = require('express');
var sellerController = require('../controllers/seller');
var routes = express.Router();
var token = require('../helpers/auth');

routes.post('/api/seller/registerSale', token.validateTokenForSellers, sellerController.registerSale );
routes.get('/api/seller/getAvailableProducts', token.validateTokenForSellers, sellerController.getAvailableProducts );

module.exports = routes;
