module.exports = app => {
  const vehicles = require("../controllers/vehicles.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", vehicles.create);

  // // Initialise the database
  router.get("/init", vehicles.init);

  // // Retrieve all Tutorials
  router.get("/", vehicles.findAll);

  // // Retrieve all published Tutorials
  router.get("/search/:letter", vehicles.findByStartingLetter);

  // // Retrieve a single Tutorial with id
  router.get("/:id", vehicles.findOne);

  // // Update a Tutorial with id
  router.put("/:id", vehicles.update);

  // // Delete a Tutorial with id
  router.delete("/:id", vehicles.deleteOne);

  // // Delete all Tutorials
  router.delete("/", vehicles.deleteAll);

  // // lock all vehicles
  router.lock("/", vehicles.lockAll);

  // // unlock all vehicles
  router.unlock("/", vehicles.unlockAll);

  app.use('/api/vehicles', router);
};

