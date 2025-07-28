'use strict'

var Product = require('../models/products');
var Provider = require('../models/providers');

function createProduct(req, resp){

    var parameters = req.body;
    
    var newProduct = new Product();

    newProduct.plu = parameters.plu;
    newProduct.name = parameters.name;
    newProduct.description = parameters.description;
    newProduct.unitsAvailable = parameters.unitsAvailable;
    newProduct.provider = parameters.provider;

    newProduct.save().then(
        (productSaved) => {
            resp.status(200).send({'message': 'Product created succesfully', 'product': productSaved});
        },
        err=>{
            resp.status(500).send( {'message':'An error ocurred while creating the provider', 'error': err });
        }
    );
        
}

function createProvider(req, resp){

    var parameters = req.body;
    
    var newProvider = new Provider();

    newProvider.name = parameters.name;
    newProvider.phone = parameters.phone;
    
    newProvider.email = parameters.email;

    newProvider.save().then(
        (providerSaved) => {
            resp.status(200).send({'message': 'Provider created succesfully', 'provider': providerSaved});
        },
        err=>{
            resp.status(500).send( {'message':'An error ocurred while creating the provider', 'error': err });
        }
    );
        
}

async function registerArrivalNewUnits(req, resp){
    
    var parameters = req.body;

    var product = await Product.findOneAndUpdate(
        {'plu': parameters.plu}
    )

    product.unitsAvailable += parameters.quantity;

    await product.save();

    resp.status(200).send(product);

}

async function getProviderInfoByProduct(req, resp){

    var product = await Product.findOne({"plu":req.params.plu}).populate('provider');

    resp.status(200).send(product.provider);
}

module.exports = { createProduct, createProvider, registerArrivalNewUnits, getProviderInfoByProduct }
