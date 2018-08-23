const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const User = require('./User');
const Vehicle = require('./Vehicle');


// brand Schema
const orderSchema = mongoose.Schema({
    name : String,
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    reg_no : String,
    status: { type: String, enum : ['active','inactive'], default: 'active' },
    otp : Number,
    start_time : { type : Date },
    end_time : { type : Date },
    trip_type : { type: String, enum : ['single','round'], default: 'single' },
    vehicle : { type: Schema.Types.ObjectId, ref: 'Vehicle' },
    km_driven : Number
},{ collection: 'orders' });

orderSchema.plugin(timestamps);

const Order = module.exports = mongoose.model('Order', orderSchema);