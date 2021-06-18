require('./model/DB')

const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
const bodyparser = require("body-parser");

const employeController = require('./controllers/employeeController');

var app = express();

// Use the bodyparser
app.use(bodyparser.urlencoded({
    extended: true
}));

// Set view
app.set('views', path.join(__dirname, '/view/'));
// Set view engine to Handlebars
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'mainlayout',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    layoutsDir: __dirname + '/view/layouts/'
}));
app.set('view engine', 'hbs');

// Connection to server with port 3000
app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});

// set the controller root path 
app.use('/employee', employeController);