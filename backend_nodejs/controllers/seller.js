'use strict'

var Product = require('../models/products');

async function registerSale(req, resp){
    
    var parameters = req.body;

    var product = await Product.findOneAndUpdate(
        {'plu': parameters.plu}
    )

    product.unitsAvailable -= parameters.quantity;

    await product.save();

    resp.status(200).send(product);
}

async function getAvailableProducts(req, resp){
    
    var products = await Product.find({ unitsAvailable: { $gt: 0 } }, '_id plu name description unitsAvailable');

    resp.status(200).send(products);
}

module.exports = {registerSale, getAvailableProducts}
