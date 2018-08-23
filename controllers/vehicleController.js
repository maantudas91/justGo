const Vehicle = require('./../models/Vehicle');
const Id = require('valid-objectid');
const utils = require('./../utils/utils');


exports.getVehicles = async function(req, res, next) {
    try{
        const query = Vehicle.find();
        //query.where('status').equals('active');

        const vehicles = await query.exec();
        return res.status(201).jsonp({'success' : true, 'result': vehicles});
    }catch(err) {
        return res.status(503).jsonp({'error' : err});
    }
}


exports.addVehicle = function(req, res, next) {
    var vehicle = new Vehicle(req.body);
    vehicle.save(function (err, veh) {
            if(err){
                if (err.name === 'ValidationError') 
                    return utils.handleValidationError(err, res, true); 
                return res.status(503).jsonp({'error' : err});
            }
            return res.status(201).jsonp({'success' : true});
    });
 }