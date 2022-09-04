const sql = require("./db.js");

// constructor
const Vehicles = function(vehicles) {
  this.MakeId = vehicles.MakeId;
  this.MakeName = vehicles.MakeName;
  this.VehicleTypeId = vehicles.VehicleTypeId;
  this.VehicleTypeName = vehicles.VehicleTypeName
};

Vehicles.create = (newVehicle, result) => {
  sql.query("INSERT INTO vehicles SET ?", newVehicle, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created vehicle: ", { id: res.insertId, ...newVehicle });
    result(null, { id: res.insertId, ...newVehicle });
  });
};

Vehicles.getAll = (makeid, result) => {
  let query = "SELECT * FROM vehicles";

  if (makeid) {
    query += ` WHERE makeid LIKE '%${makeid}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("vehicles: ", res);
    result(null, res);
  });
};

Vehicles.getOne = (id, result) => {
  let query = "SELECT * FROM vehicles";

  if (id) {
    query += ` WHERE id = '${id}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("vehicles: ", res);
    result(null, res);
  });
};

Vehicles.getByStartingLetter = (letter, result) => {
  let query = "SELECT MakeName FROM vehicles";

  if (letter) {
    query += ` WHERE MakeName LIKE '%${letter}%'`;
  }
  console.log(query)

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("vehicles: ", res);
    result(null, res);
  });
};

Vehicles.updateOne = (id, newMakeId, newMakeName, newVehicleTypeId, newVehicleTypeName, result) => {
  let query = "update vehicles set";

  let comma = false
  if (newMakeId) {
    query += ` MakeId='${newMakeId}'`;
    comma=true 
  }
  if (newMakeName) {
    query += (comma?', ' : ' ')+`MakeName='${newMakeName}'`;
    comma=true 
  }
  if (newVehicleTypeId){
    query += (comma?', ' : ' ')+`VehicleTypeId=${newVehicleTypeId}`;
    comma=true 
  }
  if (newVehicleTypeName){
    query += (comma?', ' : ' ')+`VehicleTypeName="${newVehicleTypeName}"`;
  }
  query +=  ` WHERE id=${id}`
  console.log(query)

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("vehicles: ", res);
    result(null, res);
  });
};

Vehicles.deleteOne = (id,result) => {
  let query = "DELETE FROM vehicles";

  if (id) {
    query += ` WHERE id = '${id}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("vehicles: ", res);
    result(null, res);
  });
};

Vehicles.deleteAll = (result) => {
  let query = "DELETE FROM vehicles";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("vehicles: ", res);
    result(null, res);
  });
};

Vehicles.lockAll = (result) => {
  let query = "LOCK TABLES vehicles read";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("vehicles: ", res);
    result(null, res);
  });
};

Vehicles.unlockAll = (result) => {
  let query = "UNLOCK TABLES";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("vehicles: ", res);
    result(null, res);
  });
};

module.exports = Vehicles;