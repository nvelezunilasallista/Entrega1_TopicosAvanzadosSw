'use strict'

var User = require('../models/users');

function authorizeSeller(req, resp){

    var parameters = req.body;

    User.findOneAndUpdate(
        {'idNumber': parameters.idNumber}, 
        { $set: {isAuthorized : true}}, 
        { returnDocument : "after"}
    ).then(
        (authorizedSeller) => {
            resp.status(200).send({'message': 'Seller has been authorized properly', 'seller': authorizedSeller});
        },
        err => {
            resp.status(500).send({'message':'An error ocurred while updating the seller', 'error': err });
        }
    );

}

function getUnauthorizedSellers(req, resp){

    User.find(
        {'role': 'ventas', 'isAuthorized' : false}
    ).then(
        (sellers) => {
            resp.status(200).send(sellers);
        },
        err => {
            resp.status(500).send({'message':'An error ocurred while getting the list', 'error': err });
        }
    );

}

module.exports = {authorizeSeller, getUnauthorizedSellers}
