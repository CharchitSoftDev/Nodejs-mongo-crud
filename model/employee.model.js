const mongoose = require("mongoose");

var schema = mongoose.Schema;

// Employee table
var employeeSchema = new schema({
    fullname: {
        type: String,
        required: [true, 'This is a requried field']
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    }
});

employeeSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Initailizing the employee model
mongoose.model('Employee', employeeSchema);