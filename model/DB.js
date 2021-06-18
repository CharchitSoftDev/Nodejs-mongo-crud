const mongoose = require("mongoose");

//mongoDB connection string
var mongoDB = 'mongodb://127.0.0.1/employee';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded') } else { console.log('Error in DB connection:' + err) }
});

require('./employee.model');