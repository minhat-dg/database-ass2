const Nhanvien = require('../models/nhanvien.js')

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
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

    Nhanvien.create(nhanvien, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Nhanvien."
            });
        else res.send(data);
    });

};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    else if ((isNaN(req.params.id) || req.params.id == '') ||
            (req.body.id== '') || 
            (req.body.name == '') ||
            (req.body.sex == '') ||
            (req.body.inDay == '') ||
            (req.body.dob == '') ||
            (req.body.salary == '') ||
            (req.body.homeNumber == '') ||
            (req.body.street == '') ||
            (req.body.province == '') ||
            (req.body.phone == '')) {
                
        return res.status(400).send({
            message: "Invalid input!"
        });
    }
    const nhanvien = new Nhanvien({
        id: req.params.id,
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

    Nhanvien.update(nhanvien, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the Nhanvien"
            });
        else res.send(data);
    });
};

exports.delete = (req, res) => {
    Nhanvien.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Nhanvien with id ${req.params.id}.`
                });
            } 
            else {
                res.status(500).send({
                    message: "Could not delete Nhanvien with id " + req.params.id
                });
            }
        } 
        else res.send({ message: "Nhanvien was delete successfully!" });
      });  
};

exports.getAll = (req, res) => {
    const id = req.query.id;

    Nhanvien.getAll(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Nhanvien."
        });
      else res.send(data);
    });
  };


