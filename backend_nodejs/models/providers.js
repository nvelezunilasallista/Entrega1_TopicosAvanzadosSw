'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProviderSchema = Schema({
    name: String,
    phone: String,
    email: String
});

module.exports = mongoose.model('Provider', ProviderSchema, 'Provider');