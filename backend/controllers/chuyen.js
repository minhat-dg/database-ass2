const Chuyen = require('../models/chuyen.js')

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create an Account
    const chuyen = new Chuyen({
        id: req.body.id,
        carNum: req.body.carNum,
        tuyenId: req.body.tuyenId,
        date: req.body.date,
        cost: req.body.cost,
    });

    // Save account in the database
    Chuyen.create(chuyen, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Chuyen."
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
            (req.body.carNum == '') ||
            (req.body.tuyenId == '') ||
            (req.body.date == '') ||
            (req.body.cost == '')) {
                
        return res.status(400).send({
            message: "Invalid input!"
        });
    }
    const chuyen = {
        id: req.params.id,
        carNum: req.body.carNum,
        tuyenId: req.body.tuyenId,
        date: req.body.date,
        cost: req.body.cost,
    };

    Chuyen.update(chuyen, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the TUYEN"
            });
        else res.send(data);
    });
};

exports.delete = (req, res) => {
    Chuyen.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found chuyen with id ${req.params.id}.`
                });
            } 
            else {
                res.status(500).send({
                    message: "Could not delete chuyen with id " + req.params.id
                });
            }
        } 
        else res.send({ message: "chuyen was deleted successfully!" });
      });  
};

exports.getAll = (req, res) => {
    const id = req.query.id;

    Chuyen.getAll(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Chuyen."
        });
      else res.send(data);
    });
};

exports.getByTuyenId = (req, res) => {
    Chuyen.getByTuyenId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found chuyen with tuyen ${req.params.id}.`
                });
            } 
            else {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving Chuyen."
                });
            }
        } 
        else res.send(data);
      });  
};