'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var application = express();

var routesUser = require('./routes/users'); 
var routesSeller = require('./routes/seller'); 
var routesStore = require('./routes/store');
var routesHumanResources = require('./routes/humanResources');

application.use(cors())
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({'extended': false}));

application.use(routesUser);
application.use(routesSeller);
application.use(routesStore);
application.use(routesHumanResources);

module.exports = application;
