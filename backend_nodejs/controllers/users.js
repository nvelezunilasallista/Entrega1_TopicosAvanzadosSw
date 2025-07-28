'use strict'

var User = require('../models/users');
var token = require('../helpers/auth');
var bcrypt = require("bcryptjs");

async function createUser(req, resp){

    var parameters = req.body;

    var userExists = await User.exists({'idNumber': parameters.idNumber});

    if (userExists) {
        resp.status(500).send( {'message':'Already exists an user with this document number'});
    }
    else{
    
        var salt = bcrypt.genSaltSync(15);
        var newUser = new User();

        newUser.idNumber = parameters.idNumber;
        newUser.password = bcrypt.hashSync(parameters.password, salt);
        newUser.firstName = parameters.firstName;
        newUser.lastName = parameters.lastName;
        newUser.email = parameters.email;
        newUser.role = parameters.role;
        newUser.isAuthorized = parameters.role == 'ventas' ? false : true;

        newUser.save().then(
            (userSaved) => {
                resp.status(200).send({'message': 'User created succesfully', 'user': userSaved});
            },
            err=>{
                resp.status(500).send( {'message':'An error ocurred while creating the user', 'error': err });
            }
        );
    }
}

function loginUser(req, resp){

    var parameters = req.body;

    User.findOne({'idNumber': parameters.idNumber}).then(
        (userFound) => {
            if(userFound == null){
                resp.status(403).send( {'message':'User not found' }); 
            }
            else if(userFound.role == "ventas" && !userFound.isAuthorized){
                resp.status(403).send( {'message':'Seller not authorized' }); 
            }
            else if(bcrypt.compareSync(parameters.password, userFound.password)){
                resp.status(200).send({'message': 'Login Success', 'token': token.generateToken(userFound)});
            }
            else{
                resp.status(403).send({'message': 'Invalid Login'});
            }
        },
        err =>{
            resp.status(500).send( {'message':'An error ocurred while validating the user', 'error': err });  
        }
    );
}

module.exports = {createUser, loginUser}
