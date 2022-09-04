const Vehicles = require("../models/vehicles.model.js");
const VehicleFetch = require('../helper/fetch.js')

// Create and Save a new vehicles
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Fields must be filled in."
    });
  }
  console.log(req.body)

  // Create a vehicles
  const vehicles = new Vehicles({
    MakeId: req.body.MakeId,
    MakeName: req.body.MakeName,
    VehicleTypeId: req.body.VehicleTypeId,
    VehicleTypeName: req.body.VehicleTypeName
  });

  // Save vehicles in the database
  Vehicles.create(vehicles, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not create new vehicles at this time."
      });
    else res.send(data);
  });
};

//checks if the data in the db matches whats in the , fetches from 3rd party API
exports.init = (req, res) => {
VehicleFetch.dbSetUp((err, data) => {
  if (err)
      res.status(500).send({
        message:
          err.message || "Could not add all vehicles at this time."
      });
    else res.send({message: 'Vehicles added successfully'});
  })}



// Retrieve all vehicles from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;

  Vehicles.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not retrieve all vehicles at this time."
      });
    else res.send(data);
  });
};

// Retrieve all vehicles from the database.
exports.findByStartingLetter = (req, res) => {
  const letter = req.params.letter;
  Vehicles.getByStartingLetter(letter, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not find make name at this time."
      });
    else res.send(data);
  });
};

// Retrieve all vehicles from the database.
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vehicles.getOne(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not find by ID at this time."
      });
    else res.send(data);
  });
};

// Update a vehicles from the database.
exports.update = (req, res) => {
  const id = req.params.id;
  const newMakeId=req.body.MakeId;
  const newMakeName = req.body.MakeName
  const newVehicleTypeId = req.body.VehicleTypeId
  const newVehicleTypeName = req.body.VehicleTypeName
Vehicles.updateOne(id, newMakeId, newMakeName, newVehicleTypeId, newVehicleTypeName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not update this vehicle."
      });
    else res.send(data);
  });
};

// Delete a vehicles from the database.
exports.deleteOne = (req, res) => {
  const id = req.params.id;
  Vehicles.deleteOne(id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not delete this vehicle."
      });
    else res.send(data);
  });
};

// Delete all vehicles from the database.
exports.deleteAll = (req, res) => {
  Vehicles.deleteAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not delete all vehicles."
      });
    else res.send(data);
  });
};

//locks the table from being written
exports.lockAll = (req, res) => {
  Vehicles.lockAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not lock all vehicles."
      });
    else res.send(data);
  });
};

//unlocks all tables
exports.unlockAll = (req, res) => {
  Vehicles.unlockAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Could not unlock all vehicles."
      });
    else res.send(data);
  });
};