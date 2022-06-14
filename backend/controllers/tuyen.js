const Tuyen = require('../models/tuyen.js')

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create an Account
    const tuyen = new Tuyen({
        id: req.body.id,
        name: req.body.name,
        startTime: req.body.startTime,
        lengthTime: req.body.lengthTime,
    });

    // Save account in the database
    Tuyen.create(tuyen, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tuyen."
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
            (req.body.startTime == '') ||
            (req.body.lengthTime == '')) {
                
        return res.status(400).send({
            message: "Invalid input!"
        });
    }
    const tuyen = {
        id: req.params.id,
        name: req.body.name,
        startTime: req.body.startTime,
        lengthTime: req.body.lengthTime
    };
    console.log(tuyen.lengthTime);

    Tuyen.update(tuyen, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the TUYEN"
            });
        else res.send(data);
    });
};

exports.delete = (req, res) => {
    Tuyen.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tuyen with id ${req.params.id}.`
                });
            } 
            else {
                res.status(500).send({
                    message: "Could not delete Tuyen with id " + req.params.id
                });
            }
        } 
        else res.send({ message: "Tuyen was deleted successfully!" });
      });  
};

exports.getAll = (req, res) => {
    const id = req.query.id;

    Tuyen.getAll(id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tuyen."
        });
      else res.send(data);
    });
  };