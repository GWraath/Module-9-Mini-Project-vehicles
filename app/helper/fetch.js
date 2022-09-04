const axios = require("axios");
const sql = require("../models/db.js");
const fs = require("fs")
const path = require("path")

function fetchVehicles(result) {
    axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
    .then(response=> {insertVehicles(response.data, result)})
    .catch(error => {console.log(error); result(error, null)})
}

function dbSetUp(result){
    let queries = fs.readFileSync(path.join(__dirname, 'vehicles.sql'), { encoding: "UTF-8" })
    console.log(queries)
    sql.query(queries, (err,res) => {
        console.log(err)
        if (err) {
            result(err, null)
        }
        else {
            fetchVehicles(result)
            console.log('fetching vehicles')
        }
    })
}    

function insertVehicles(vehicles, result){
    let vehicleInsert= 'INSERT INTO VEHICLES (MakeId, MakeName, VehicleTypeId, VehicleTypeName) VALUES ?'
    let vehicleArray=[]
    for (let car of vehicles.Results){
        vehicleArray.push([car.MakeId, car.MakeName, car.VehicleTypeId, car.VehicleTypeName])
    }
    console.log(vehicleArray)
        sql.query(vehicleInsert, [vehicleArray],
         (err,res)=> {
            if (err) {
                result(err, null)
            }
            else {
                result(res,null)
            }
            // console.log(err)
            // console.log(res)
            // console.log(car)
        })
    }

module.exports= {insertVehicles, fetchVehicles, dbSetUp, }