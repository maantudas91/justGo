const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');



// brand Schema
const vehicleSchema = mongoose.Schema({
    name : { type: String, required : [ true, 'Vehicle name is required']},
    vehicle_type : String,
    reg_no : { type: String, unique : true },
    status: { type: String, enum : ['active','inactive'], default: 'active' },
},{ collection: 'vehicles' });

vehicleSchema.plugin(timestamps);

const Vehicle = module.exports = mongoose.model('Vehicle', vehicleSchema);
