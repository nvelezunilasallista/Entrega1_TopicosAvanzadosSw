'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductsSchema = Schema({
    plu: String,
    name: String,
    description : String,
    unitsAvailable: Number,
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider'
    }
});

module.exports = mongoose.model('Product', ProductsSchema, 'Product');
