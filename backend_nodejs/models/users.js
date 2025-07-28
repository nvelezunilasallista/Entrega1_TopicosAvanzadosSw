'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema({
    idNumber: String,
    password: String,
    firstName : String,
    lastName: String,
    email: String,
    role:   {
                type: String,
                enum : ['ventas','rrhh', 'bodega'],
                default: 'user'
            },
    isAuthorized : Boolean
});

module.exports = mongoose.model('User', UserSchema, 'User');
