require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');


// create express app
const app = express();

//parse requests of content-type -application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// parse requests of content-type -application/json
app.use(bodyParser.json())

//Database configuration
const dbConfig = require('./dbConfig');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// connecting to the database
mongoose.connect(dbConfig.url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Successfully connected to the database');
}).catch(error => {
    console.log('Could not connect to the database. Exiting now...', error);
    process.exit();
})

// Require Meme routes
require('./routes.js')(app)

// listen for requests
app.listen(8000, () => {
    console.log("Server is listening on port 8000")
})

module.exports = app; // for testing 