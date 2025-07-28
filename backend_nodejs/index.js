'use strict'

var mongoose = require('mongoose');
var application = require('./application');

mongoose.connect('mongodb+srv://nevelezv:HbEyuMBHJ6PImOU5@topicosavanzadossw.h16gp1n.mongodb.net/?retryWrites=true&w=majority&appName=topicosavanzadossw').then(
    () => {
        console.log("Database connection succesful. Starting application");
        application.listen(6542, function(){
            console.log("Application started");
        });
    },
    err => {
        console.log("Error when connecting to database. Application not started. " + err);
    }
);
