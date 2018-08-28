const Vehicle = require('./../models/Vehicle');
const BU = require('./../models/BU');
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


exports.listVehiclebyBU = function (req,res){
    let buid = req.params.buid;
    //buid validate
    if (!Id.isValid(buid)) {
        return res.status(403).jsonp({'success' : false, msg: 'Invalid BU id'});
    }else{
        let query = BU.findById(buid);
        query.populate('vehicles', 'name reg_no');
        query.select('vehicles -_id');

        query.exec(function( err, vehs){
            if(err)
                return res.status(403).jsonp({'success' : false});
            return res.status(200).jsonp({'success' : true, 'result': vehs});   
        });
    }
    
    
}
