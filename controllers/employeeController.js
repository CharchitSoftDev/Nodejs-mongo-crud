const express = require('express');
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
var router = express.Router();

// The root path /employee/
router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});

// POST request when employee is insert or update 
router.post('/', (req, res) => {
    if (req.body._id == '')
        insertEmployeeRecord(req, res);
    else
        updateEmployeeRecord(req, res);
});

function insertEmployeeRecord(req, res) {
    var employee = new Employee();
    employee.fullname = req.body.fullname;
    employee.email = req.body.email;
    employee.city = req.body.city;
    employee.mobile = req.body.mobile;
    employee.save((err, doc) => {
        // console.log(doc);
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            } else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateEmployeeRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Update Employee",
                    employee: req.body
                });
            } else
                console.log('Error during record insertion : ' + err);
        }
    });
}
// GET the list of employee /employee/list
router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        } else {
            console.log('Error in retrieving employee list :' + err);
        }
    }).lean()
});

//Validations for input form
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
// GET the employee with id /employee/id
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
    }).lean()
});
// using GET to delete the employee /employee/delete/id
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {;
        if (!err) {
            res.redirect('/employee/list');
        } else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

module.exports = router;