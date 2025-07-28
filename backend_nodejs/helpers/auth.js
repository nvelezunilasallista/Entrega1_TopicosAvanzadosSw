'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

var { response } = require('express');
var secret = 'klqhweoih812F!asd';

function generateToken(user){
    var payload = {
        sub : user._id,
        idNumber: user.idNumber, 
        email : user.email,
        role : user.role,
        isAuthorized: user.isAuthorized,
        iat : moment().unix(),
        exp : moment().add('60', 'minutes').unix()
    }

    return jwt.encode(payload, secret);
}

function validateTokenForSellers(req, resp, nextStep){
    try{
        var userToken = req.headers.authorization;
        var cleanToken = userToken.replace('Bearer ', '');
        var payload = jwt.decode(cleanToken, secret);

        req.header.userId = payload.sub; 

        if(payload.role == 'ventas'){
            if(payload.isAuthorized){
                nextStep();
            }
            else{
                resp.status(403).send({message: 'This seller has not been authorized by human resources yet'});
            }
        }
        else{
            resp.status(403).send({message: 'This user is not a seller'});
        } 
    }
    catch(ex){
        resp.status(403).send({message: 'Invalid token'});
    }
}

function validateTokenForHumanResources(req, resp, nextStep){
    try{
        var userToken = req.headers.authorization;
        var cleanToken = userToken.replace('Bearer ', '');
        var payload = jwt.decode(cleanToken, secret);

        req.header.userId = payload.sub; 
        if(payload.role == 'rrhh'){
            nextStep();
        }
        else{
            resp.status(403).send({message: 'This user is not from Human Resources'});
        } 
    }
    catch(ex){
        resp.status(403).send({message: 'Invalid token'});
    }
}

function validateTokenForStore(req, resp, nextStep){
    try{
        var userToken = req.headers.authorization;
        var cleanToken = userToken.replace('Bearer ', '');
        var payload = jwt.decode(cleanToken, secret);

        req.header.userId = payload.sub; 
        if(payload.role == 'bodega'){
            nextStep();
        }
        else{
            resp.status(403).send({message: 'This user doesnt belong to Store'});
        } 
    }
    catch(ex){
        resp.status(403).send({message: 'Invalid token'});
    }
}

module.exports = { generateToken, validateTokenForSellers, validateTokenForHumanResources, validateTokenForStore }
