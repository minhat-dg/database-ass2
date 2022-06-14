const Nhanvien = require('../models/nhanvien.js')

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create an Account
    const nhanvien = new Nhanvien({
        id: req.body.id,
        name: req.body.name,
        sex: req.body.sex,
        inDay: req.body.inDay,
        dob: req.body.dob,
        salary: req.body.salary,
        homeNumber: req.body.homeNumber,
        street: req.body.street,
        province: req.body.province,
        phone: req.body.phone,
    });

    // Save account in the database
    Nhanvien.create(nhanvien, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tuyen."
            });
        else res.send(data);
    });

};


