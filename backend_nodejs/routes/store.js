'use strict'

var express = require('express');
var storeController = require('../controllers/store');
var routes = express.Router();
var token = require('../helpers/auth');

routes.post('/api/store/createProduct', token.validateTokenForStore, storeController.createProduct );
routes.post('/api/store/createProvider', token.validateTokenForStore, storeController.createProvider );
routes.put('/api/store/registerArrivalNewUnits', token.validateTokenForStore,  storeController.registerArrivalNewUnits );
routes.get('/api/store/getProviderInfoByProduct/:plu', token.validateTokenForStore,  storeController.getProviderInfoByProduct );

module.exports = routes;
